// fetching ONLY PROBLEMS
import { LeetCode } from 'leetcode-query';
import * as fs from 'fs';

interface Problem {
    acRate: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    freqBar: null;
    questionFrontendId: string;
    isFavor: boolean;
    isPaidOnly: boolean; //if user has free then check for those 
    status: string | null;
    title: string; // displayed
    titleSlug: string; // id
    topicTags: { name: string }[];
    hasSolution: boolean;
    hasVideoSolution: boolean;
    description?: string; // Add the description property
}

async function getAllProblems() {
    const leetcode = new LeetCode();
    const allProblems: Problem[] = [];
    let hasMore = true;
    let offset = 0;
    const limit = 100; // Adjust this if the API allows a higher limit
    let count = 1

    try {
        while (hasMore) {
            const problemResponse = await leetcode.problems({ limit, offset });
            const problems = problemResponse.questions as Problem[];
            // for (const problem of problems) {
            //     const problemDetail = await leetcode.problem(problem.titleSlug);
            //     problem.description = problemDetail.content;
            //     allProblems.push(problem);
            // }
            allProblems.push(...problems);
            if (problems.length < limit) {
                hasMore = false;
            } else {
                offset += limit;
            }
            count ++;
        }

        fs.writeFileSync('output1.json', JSON.stringify(allProblems, null, 2));
    } catch (error) {
        console.error('Error fetching problems:', error);
    }
}

getAllProblems();
