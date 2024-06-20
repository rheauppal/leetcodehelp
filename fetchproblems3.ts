// fetching problems with descriptions
import { LeetCode } from 'leetcode-query';
import * as fs from 'fs';

interface Problem {
    acRate: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    freqBar: null;
    questionFrontendId: string;
    isFavor: boolean;
    isPaidOnly: boolean;
    status: string | null;
    title: string;
    titleSlug: string;
    topicTags: { name: string }[];
    hasSolution: boolean;
    hasVideoSolution: boolean;
    description?: string;
}

async function getAllProblems() {
    const leetcode = new LeetCode();
    const allProblems: Problem[] = [];
    let hasMore = true;
    let offset = 0;
    const limit = 100;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second
    const requestDelay = 500; // 0.5 second

    async function fetchWithRetry(slug: string, retries: number = 0): Promise<any> {
        try {
            return await leetcode.problem(slug);
        } catch (error) {
            if (retries < maxRetries) {
                console.warn(`Retrying (${retries + 1}/${maxRetries}) for problem ${slug}...`);
                await new Promise(res => setTimeout(res, retryDelay));
                return fetchWithRetry(slug, retries + 1);
            } else {
                throw error;
            }
        }
    }

    try {
        while (hasMore) {
            const problemResponse = await leetcode.problems({ limit, offset });
            const problems = problemResponse.questions as Problem[];
            for (const problem of problems) {
                try {
                    const problemDetail = await fetchWithRetry(problem.titleSlug);
                    problem.description = problemDetail.content;
                    allProblems.push(problem);
                    // Delay between requests to avoid rate limiting
                    await new Promise(res => setTimeout(res, requestDelay));
                } catch (error) {
                    console.error(`Error fetching problem ${problem.titleSlug}:`, error);
                }
            }
            if (problems.length < limit) {
                hasMore = false;
            } else {
                offset += limit;
            }
        }

        fs.writeFileSync('output3.json', JSON.stringify(allProblems, null, 2));
    } catch (error) {
        console.error('Error fetching problems:', error);
    }
}

getAllProblems();
