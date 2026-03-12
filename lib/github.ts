"use server";

import { GITHUB_USERNAME } from "@/constants";


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
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
            {
                next: { revalidate: 0 }, // Always fetch fresh list on reload
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch repositories");
        }

        const repos: GithubRepo[] = await response.json();

        // Filter rules:
        // 1. Must have a description
        // 2. Is not the profile README (repo named GITHUB_USERNAME)
        // 3. Is not a fork
        // 4. MUST have the 'portfolio' topic to be shown as a completed project
        const filteredRepos = repos.filter(
            (repo) =>
                repo.description &&
                repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase() &&
                !(repo as any).fork &&
                repo.topics.includes("portfolio")
        );

        // Sort by push date (latest first)
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
 * Returns the URL only if it's a custom-set social preview image.
 * Otherwise returns null to signal fallback to local images.
 */
export async function getCustomSocialPreview(repoUrl: string): Promise<string | null> {
    try {
        // We use a server-side fetch to get the HTML and find the og:image tag
        // Using a shorter revalidation time (1 minute) to ensure latest images are picked up
        const response = await fetch(repoUrl, { 
            next: { revalidate: 60 },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 PortfolioBot'
            }
        });

        
        if (!response.ok) return null;
        
        const html = await response.text();
        const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
        
        if (ogImageMatch && ogImageMatch[1]) {
            const ogImageUrl = ogImageMatch[1];
            
            // GitHub serves custom social previews from repository-images.githubusercontent.com
            // Generated previews are typically from opengraph.githubassets.com
            if (ogImageUrl.includes("repository-images.githubusercontent.com")) {
                return ogImageUrl;
            }
        }
        
        return null;
    } catch (error) {
        console.error("Error fetching social preview:", error);
        return null;
    }
}

