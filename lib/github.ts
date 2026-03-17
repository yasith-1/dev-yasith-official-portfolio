"use server";

import { GITHUB_USERNAME, PROJECTS, Project } from "@/constants";

// Helper for fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 8000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

export interface GithubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    stargazers_count: number;
    language: string;
    topics: string[];
    pushed_at: string;
}

export async function getGithubProjects() {
    try {
        const revalidateTime = process.env.NODE_ENV === "development" ? 0 : 300;

        const response = await fetchWithTimeout(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
            {
                next: { revalidate: revalidateTime }, // Auto-sync in dev, cache in prod
            },
            10000
        );

        if (!response.ok) {
            throw new Error("Failed to fetch repositories");
        }

        const repos: GithubRepo[] = await response.json();

        const filteredRepos = repos.filter(
            (repo) =>
                repo.description &&
                repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase() &&
                !(repo as any).fork &&
                repo.topics.includes("portfolio")
        );

        return filteredRepos.sort((a, b) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        return [];
    }
}

/**
 * Fetches the social preview image for a GitHub repository.
 */
export async function getCustomSocialPreview(repoUrl: string): Promise<string | null> {
    try {
        const revalidateTime = process.env.NODE_ENV === "development" ? 0 : 300;
        
        const response = await fetchWithTimeout(repoUrl, {
            next: { revalidate: revalidateTime },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 PortfolioBot'
            }
        }, 4000);

        if (!response.ok) return null;

        const html = await response.text();
        const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);

        if (ogImageMatch && ogImageMatch[1]) {
            const ogImageUrl = ogImageMatch[1];
            if (ogImageUrl.includes("repository-images.githubusercontent.com")) {
                return ogImageUrl;
            }
        }

        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Enhanced function to fetch, filter, and scrape previews in one server-side pass.
 */
export async function getEnhancedProjects(): Promise<Project[]> {
    try {
        // 1. Get dynamic repos
        const githubRepos = await getGithubProjects();

        // 2. Prep return list starting with static projects
        const staticWithPreviews = await Promise.all(
            PROJECTS.map(async (project) => {
                if (project.link.includes("github.com/") &&
                    project.link.replace(/\/$/, "").split("/").length > 4) {
                    const customPreview = await getCustomSocialPreview(project.link);
                    if (customPreview) return { ...project, image: customPreview };
                }
                return project;
            })
        );

        // 3. Transform dynamic repos
        const dynamicProjects: Project[] = await Promise.all(
            githubRepos.map(async (repo) => {
                let cleanRepoName = repo.name;
                if (cleanRepoName.toLowerCase().startsWith(`${GITHUB_USERNAME.toLowerCase()}-`) || 
                    cleanRepoName.toLowerCase().startsWith(`${GITHUB_USERNAME.toLowerCase()}_`)) {
                    cleanRepoName = cleanRepoName.substring(GITHUB_USERNAME.length + 1);
                }

                const title = cleanRepoName
                    .split(/[-_]/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                const customPreview = await getCustomSocialPreview(repo.html_url);

                return {
                    title,
                    description: repo.description,
                    image: customPreview || `https://opengraph.githubassets.com/${repo.id}/${GITHUB_USERNAME}/${repo.name}`,
                    link: repo.html_url,
                };
            })
        );

        // 4. Merge
        const merged = [...staticWithPreviews];
        dynamicProjects.forEach(dProj => {
            const isDuplicate = merged.some(sProj =>
                sProj.link.toLowerCase().includes(dProj.link.toLowerCase()) ||
                sProj.title.toLowerCase() === dProj.title.toLowerCase()
            );
            if (!isDuplicate) merged.push(dProj);
        });

        return merged;
    } catch (error) {
        console.error("Error in getEnhancedProjects:", error);
        return PROJECTS;
    }
}

