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
                next: { revalidate: 3600 }, // Cache for 1 hour
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
