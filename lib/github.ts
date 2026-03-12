"use server";

import { GITHUB_USERNAME } from "@/constants";

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
        const response = await fetchWithTimeout(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
            {
                next: { revalidate: 3600 }, // Cache for 1 hour to reduce hits
            },
            10000 // 10s timeout for main repo list
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
 * Returns the URL only if it's a custom-set social preview image.
 * Otherwise returns null to signal fallback to local images.
 */
export async function getCustomSocialPreview(repoUrl: string): Promise<string | null> {
    try {
        // Use a shorter timeout for preview-scraping as it's secondary
        const response = await fetchWithTimeout(repoUrl, { 
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 PortfolioBot'
            }
        }, 5000); // 5s timeout

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
        // Silently fail for previews as we have fallbacks
        return null;
    }
}

