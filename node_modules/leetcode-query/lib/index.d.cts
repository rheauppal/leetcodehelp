import EventEmitter from 'eventemitter3';
import { Fetcher } from '@fetch-impl/fetcher';

/**
 * Cache class
 */
declare class Cache {
    private _table;
    /**
     * Get an item from the cache.
     * @param key The key of the item.
     * @returns {any} The item, or null if it doesn't exist.
     */
    get(key: string): unknown;
    /**
     * Set an item in the cache.
     * @param key The key of the item.
     * @param value The value of the item.
     * @param expires The time in milliseconds until the item expires.
     */
    set(key: string, value: unknown, expires?: number): void;
    /**
     * Remove an item from the cache.
     * @param key The key of the item.
     */
    remove(key: string): void;
    /**
     * Clear the cache.
     */
    clear(): void;
    /**
     * Load the cache from a JSON string.
     * @param json A {@link CacheTable}-like JSON string.
     */
    load(json: string): void;
}
declare const cache: Cache;
declare const caches: {
    [key: string]: Cache;
};

interface AllQuestionsCount {
    difficulty: string;
    count: number;
}
interface Contributions {
    points: number;
    questionCount: number;
    testcaseCount: number;
}
interface Profile$1 {
    realName: string;
    websites: string[];
    countryName: string | null;
    skillTags: string[];
    company: string | null;
    school: string | null;
    starRating: number;
    aboutMe: string;
    userAvatar: string;
    reputation: number;
    ranking: number;
}
interface AcSubmissionNum {
    difficulty: string;
    count: number;
    submissions: number;
}
interface TotalSubmissionNum {
    difficulty: string;
    count: number;
    submissions: number;
}
interface SubmitStats {
    acSubmissionNum: AcSubmissionNum[];
    totalSubmissionNum: TotalSubmissionNum[];
}
interface Badge {
    id: string;
    displayName: string;
    icon: string;
    creationDate?: string;
}
interface MatchedUser {
    username: string;
    socialAccounts: unknown;
    githubUrl: null;
    contributions: Contributions;
    profile: Profile$1;
    submissionCalendar: string;
    submitStats: SubmitStats;
    badges: Badge[];
    upcomingBadges: Badge[];
    activeBadge: Badge | null;
}
interface RecentSubmission {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
}
interface UserProfile {
    allQuestionsCount: AllQuestionsCount[];
    matchedUser: MatchedUser | null;
    recentSubmissionList: RecentSubmission[] | null;
}
interface Contest {
    title: string;
    startTime: number;
}
interface ContestInfo {
    attended: boolean;
    trendDirection: string;
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
    rating: number;
    ranking: number;
    contest: Contest;
}
interface ContestRanking {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: null | {
        name: string;
    };
}
interface UserContestInfo {
    userContestRanking: ContestRanking;
    userContestRankingHistory: ContestInfo[];
}
interface TopicTag {
    name: string;
    slug: string;
    translatedName: string | null;
}
interface CodeSnippet {
    lang: string;
    langSlug: string;
    code: string;
}
interface OfficialSolution {
    id: string;
    canSeeDetail: boolean;
    paidOnly: boolean;
    hasVideoSolution: boolean;
    paidOnlyVideo: boolean;
}
interface ChallengeQuestion {
    id: string;
    date: string;
    incompleteChallengeCount: number;
    streakCount: number;
    type: string;
}
type ProblemDifficulty = "Easy" | "Medium" | "Hard";
interface Problem {
    questionId: string;
    questionFrontendId: string;
    boundTopicId: unknown;
    title: string;
    titleSlug: string;
    content: string;
    translatedTitle: string | null;
    translatedContent: string | null;
    isPaidOnly: boolean;
    difficulty: ProblemDifficulty;
    likes: number;
    dislikes: number;
    isLiked: boolean | null;
    similarQuestions: string;
    exampleTestcases: string;
    contributors: unknown[];
    topicTags: TopicTag[];
    companyTagStats: unknown;
    codeSnippets: CodeSnippet[];
    stats: string;
    hints: string[];
    solution: OfficialSolution;
    status: unknown;
    sampleTestCase: string;
    metaData: string;
    judgerAvailable: boolean;
    judgeType: string;
    mysqlSchemas: unknown[];
    enableRunCode: boolean;
    enableTestMode: boolean;
    enableDebugger: boolean;
    envInfo: string;
    libraryUrl: string | null;
    adminUrl: string | null;
    challengeQuestion: ChallengeQuestion;
    /** null if not logged in */
    note: string | null;
}
type SubmissionStatus = "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Memory Limit Exceeded" | "Output Limit Exceeded" | "Compile Error" | "Runtime Error";
interface Submission {
    /**
     * Submission ID
     */
    id: number;
    /**
     * Submission Language
     */
    lang: string;
    /**
     * Submission Time (Relative)
     */
    time: string;
    /**
     * Submission Time (Unix Time in Seconds)
     */
    timestamp: number;
    /**
     * Submission Status
     */
    statusDisplay: SubmissionStatus;
    /**
     * Submission Runtime, in milliseconds
     */
    runtime: number;
    /**
     * URL path of the submission without domain
     */
    url: string;
    /**
     * true if the submission is still pending
     */
    isPending: boolean;
    /**
     * Title of the problem
     */
    title: string;
    /**
     * Submission Memory Usage, in MB
     */
    memory: number;
    /**
     * Problem Slug
     */
    titleSlug: string;
}
interface Whoami {
    userId: number | null;
    username: string;
    avatar: string | null;
    isSignedIn: boolean;
    isMockUser: boolean;
    isPremium: boolean | null;
    isAdmin: boolean;
    isSuperuser: boolean;
    isTranslator: boolean;
    permissions: string[];
}
interface SubmissionDetail {
    id: number;
    problem_id: number;
    runtime: number;
    runtime_distribution: [number, number][];
    runtime_percentile: number;
    memory: number;
    memory_distribution: [number, number][];
    memory_percentile: number;
    code: string;
    details: {
        status_code: number;
        runtime: string;
        memory: string;
        total_correct: string;
        total_testcases: string;
        compare_result: string;
        input_formatted: string;
        input: string;
        expected_output: string;
        code_output: string;
        last_testcase: string;
    };
}
interface ProblemList {
    total: number;
    questions: {
        acRate: number;
        difficulty: "Easy" | "Medium" | "Hard";
        freqBar: null;
        questionFrontendId: string;
        isFavor: boolean;
        isPaidOnly: boolean;
        status: string | null;
        title: string;
        titleSlug: string;
        topicTags: {
            name: string;
            id: string;
            slug: string;
        }[];
        hasSolution: boolean;
        hasVideoSolution: boolean;
    }[];
}
interface DailyChallenge {
    date: string;
    link: string;
    question: Problem;
}

interface CacheItem {
    /**
     * The key of the item.
     */
    key: string;
    /**
     * The value of the item.
     */
    value: unknown;
    /**
     * The expiration time of the item in milliseconds since the Unix epoch.
     */
    expires: number;
}
/**
 * A simple in-memory cache table.
 */
interface CacheTable {
    [key: string]: CacheItem;
}
interface ICredential {
    /**
     * The authentication session.
     */
    session?: string;
    /**
     * The csrf token.
     */
    csrf?: string;
}
interface LeetCodeGraphQLQuery {
    operationName?: string;
    variables?: {
        [key: string]: unknown;
    };
    query: string;
    headers?: {
        [key: string]: string;
    };
}
interface LeetCodeGraphQLResponse {
    data: UserProfile | RecentSubmission[] | any;
}

declare class Credential$1 implements ICredential {
    /**
     * The authentication session.
     */
    session?: string;
    /**
     * The csrf token.
     */
    csrf?: string;
    constructor(data?: ICredential);
    /**
     * Init the credential with or without leetcode session cookie.
     * @param session
     * @returns
     */
    init(session?: string): Promise<this>;
}

type Release = (value: void | PromiseLike<void>) => void;
declare class Mutex extends EventEmitter {
    protected space: number;
    protected used: number;
    protected releases: Release[];
    constructor(space?: number);
    lock(): Promise<number>;
    unlock(): number;
    resize(space: number): number;
    full(): boolean;
    waiting(): number;
    emit(event: "lock" | "unlock" | "all-clear"): boolean;
    emit(event: "wait", { lock, release }: {
        lock: Promise<void>;
        release: Release;
    }): boolean;
    emit(event: string): boolean;
    on(event: "lock" | "unlock" | "all-clear", listener: () => void): this;
    on(event: "wait", listener: ({ lock, release }: {
        lock: Promise<void>;
        release: Release;
    }) => void): this;
    on(event: string, listener: (...args: unknown[]) => void): this;
    once(event: "lock" | "unlock" | "all-clear", listener: () => void): this;
    once(event: "wait", listener: ({ lock, release }: {
        lock: Promise<void>;
        release: Release;
    }) => void): this;
    once(event: string, listener: (...args: unknown[]) => void): this;
}
declare class RateLimiter extends Mutex {
    private time_mutex;
    private count;
    private last;
    private timer?;
    interval: number;
    constructor({ limit, interval, concurrent }?: {
        limit?: number | undefined;
        interval?: number | undefined;
        concurrent?: number | undefined;
    });
    lock(): Promise<number>;
    reset(): void;
    cleaner(): void;
    set limit(limit: number);
    emit(event: "lock" | "unlock" | "all-clear"): boolean;
    emit(event: "wait", { lock, release }: {
        lock: Promise<void>;
        release: Release;
    }): boolean;
    emit(event: "time-lock" | "time-unlock" | "timer-reset"): boolean;
    emit(event: string): boolean;
    on(event: "lock" | "unlock" | "all-clear", listener: () => void): this;
    on(event: "wait", listener: ({ lock, release }: {
        lock: Promise<void>;
        release: Release;
    }) => void): this;
    on(event: "time-lock" | "time-unlock" | "timer-reset", listener: () => void): this;
    on(event: string, listener: (...args: unknown[]) => void): this;
    once(event: "lock" | "unlock" | "all-clear", listener: () => void): this;
    once(event: "wait", listener: ({ lock, release }: {
        lock: Promise<void>;
        release: Release;
    }) => void): this;
    once(event: "time-lock" | "time-unlock" | "timer-reset", listener: () => void): this;
    once(event: string, listener: (...args: unknown[]) => void): this;
}

declare class LeetCode extends EventEmitter {
    /**
     * The credential this LeetCode instance is using.
     */
    credential: Credential$1;
    /**
     * The internal cache.
     */
    cache: Cache;
    /**
     * Used to ensure the LeetCode instance is initialized.
     */
    private initialized;
    /**
     * Rate limiter
     */
    limiter: RateLimiter;
    /**
     * If a credential is provided, the LeetCode API will be authenticated. Otherwise, it will be anonymous.
     * @param credential
     * @param cache
     */
    constructor(credential?: Credential$1 | null, cache?: Cache);
    /**
     * Get public profile of a user.
     * @param username
     * @returns
     *
     * ```javascript
     * const leetcode = new LeetCode();
     * const profile = await leetcode.user("jacoblincool");
     * ```
     */
    user(username: string): Promise<UserProfile>;
    /**
     * Get public contest info of a user.
     * @param username
     * @returns
     *
     * ```javascript
     * const leetcode = new LeetCode();
     * const profile = await leetcode.user_contest_info("jacoblincool");
     * ```
     */
    user_contest_info(username: string): Promise<UserContestInfo>;
    /**
     * Get recent submissions of a user. (max: 20 submissions)
     * @param username
     * @param limit
     * @returns
     *
     * ```javascript
     * const leetcode = new LeetCode();
     * const submissions = await leetcode.recent_submissions("jacoblincool");
     * ```
     */
    recent_submissions(username: string, limit?: number): Promise<RecentSubmission[]>;
    /**
     * Get submissions of the credential user. Need to be authenticated.
     *
     * @returns
     *
     * ```javascript
     * const credential = new Credential();
     * await credential.init("SESSION");
     * const leetcode = new LeetCode(credential);
     * const submissions = await leetcode.submissions({ limit: 100, offset: 0 });
     * ```
     */
    submissions({ limit, offset, slug, }?: {
        limit?: number;
        offset?: number;
        slug?: string;
    }): Promise<Submission[]>;
    /**
     * Get detail of a submission, including the code and percentiles.
     * Need to be authenticated.
     * @param id Submission ID
     * @returns
     */
    submission(id: number): Promise<SubmissionDetail>;
    /**
     * Get a list of problems by tags and difficulty.
     * @param option
     * @param option.category
     * @param option.offset
     * @param option.limit
     * @param option.filters
     * @returns
     */
    problems({ category, offset, limit, filters, }?: {
        category?: string;
        offset?: number;
        limit?: number;
        filters?: {
            difficulty?: "EASY" | "MEDIUM" | "HARD";
            tags?: string[];
        };
    }): Promise<ProblemList>;
    /**
     * Get information of a problem by its slug.
     * @param slug Problem slug
     * @returns
     *
     * ```javascript
     * const leetcode = new LeetCode();
     * const problem = await leetcode.problem("two-sum");
     * ```
     */
    problem(slug: string): Promise<Problem>;
    /**
     * Get daily challenge.
     * @returns
     *
     * @example
     * ```javascript
     * const leetcode = new LeetCode();
     * const daily = await leetcode.daily();
     * ```
     */
    daily(): Promise<DailyChallenge>;
    /**
     * Check the information of the credential owner.
     * @returns
     */
    whoami(): Promise<Whoami>;
    /**
     * Use GraphQL to query LeetCode API.
     * @param query
     * @returns
     */
    graphql(query: LeetCodeGraphQLQuery): Promise<LeetCodeGraphQLResponse>;
    emit(event: "receive-graphql", res: Response): boolean;
    emit(event: "update-csrf", credential: Credential$1): boolean;
    emit(event: string, ...args: unknown[]): boolean;
    on(event: "receive-graphql", listener: (res: Response) => void): this;
    on(event: "update-csrf", listener: (credential: Credential$1) => void): this;
    on(event: string, listener: (...args: unknown[]) => void): this;
    once(event: "receive-graphql", listener: (res: Response) => void): this;
    once(event: "update-csrf", listener: (credential: Credential$1) => void): this;
    once(event: string, listener: (...args: unknown[]) => void): this;
}

declare class Credential implements ICredential {
    /**
     * The authentication session.
     */
    session?: string;
    /**
     * The csrf token.
     */
    csrf?: string;
    constructor(data?: ICredential);
    /**
     * Init the credential with or without leetcode session cookie.
     * @param session
     * @returns
     */
    init(session?: string): Promise<this>;
}

declare class LeetCodeCN extends EventEmitter {
    /**
     * The credential this LeetCodeCN instance is using.
     */
    credential: Credential;
    /**
     * The internal cache.
     */
    cache: Cache;
    /**
     * Used to ensure the LeetCodeCN instance is initialized.
     */
    private initialized;
    /**
     * Rate limiter
     */
    limiter: RateLimiter;
    /**
     * If a credential is provided, the LeetCodeCN API will be authenticated. Otherwise, it will be anonymous.
     * @param credential
     * @param cache
     */
    constructor(credential?: Credential | null, cache?: Cache);
    /**
     * Get public profile of a user.
     * @param username
     * @returns
     *
     * ```javascript
     * const leetcode = new LeetCodeCN();
     * const profile = await leetcode.user("jacoblincool");
     * ```
     */
    user(username: string): Promise<UserResult>;
    /**
     * Use GraphQL to query LeetCodeCN API.
     * @param query
     * @param endpoint Maybe you want to use `/graphql/noj-go/` instead of `/graphql/`.
     * @returns
     */
    graphql(query: LeetCodeGraphQLQuery, endpoint?: string): Promise<LeetCodeGraphQLResponse>;
    emit(event: "receive-graphql", res: Response): boolean;
    emit(event: "update-csrf", credential: Credential): boolean;
    emit(event: string, ...args: unknown[]): boolean;
    on(event: "receive-graphql", listener: (res: Response) => void): this;
    on(event: "update-csrf", listener: (credential: Credential) => void): this;
    on(event: string, listener: (...args: unknown[]) => void): this;
    once(event: "receive-graphql", listener: (res: Response) => void): this;
    once(event: "update-csrf", listener: (credential: Credential) => void): this;
    once(event: string, listener: (...args: unknown[]) => void): this;
}

interface NumAcceptedQuestion {
    difficulty: string;
    count: number;
}
interface NumFailedQuestion {
    difficulty: string;
    count: number;
}
interface NumUntouchedQuestion {
    difficulty: string;
    count: number;
}
interface UserProfileUserQuestionProgress {
    numAcceptedQuestions: NumAcceptedQuestion[];
    numFailedQuestions: NumFailedQuestion[];
    numUntouchedQuestions: NumUntouchedQuestion[];
}
interface Medal {
    name: string;
    year: number;
    month: number;
    category: string;
}
interface Ranking {
    currentLocalRanking: number;
    currentGlobalRanking: number;
    currentRating: string;
    totalLocalUsers: number;
    totalGlobalUsers: number;
}
interface SocialAccount {
    provider: string;
    profileUrl: string;
}
interface Profile {
    userSlug: string;
    realName: string;
    aboutMe: string;
    userAvatar: string;
    location: string;
    gender: string;
    websites: unknown[];
    skillTags: string[];
    contestCount: number;
    asciiCode: string;
    medals: Medal[];
    ranking: Ranking;
    socialAccounts: SocialAccount[];
}
interface UserProfilePublicProfile {
    username: string;
    haveFollowed?: unknown;
    siteRanking: number;
    profile: Profile;
}
interface UserResult {
    userProfileUserQuestionProgress: UserProfileUserQuestionProgress;
    userProfilePublicProfile: UserProfilePublicProfile;
}

declare const BASE_URL = "https://leetcode.com";
declare const BASE_URL_CN = "https://leetcode.cn";
declare const USER_AGENT = "Mozilla/5.0 LeetCode API";

declare const fetcher: Fetcher;
declare const _fetch: (input: string | URL | Request, init?: RequestInit | undefined) => ReturnType<typeof fetch>;

export { type AcSubmissionNum, type AllQuestionsCount, BASE_URL, BASE_URL_CN, type Badge, Cache, type CacheItem, type CacheTable, type ChallengeQuestion, type CodeSnippet, type Contest, type ContestInfo, type ContestRanking, type Contributions, Credential$1 as Credential, type DailyChallenge, type ICredential, LeetCode, LeetCodeCN, type LeetCodeGraphQLQuery, type LeetCodeGraphQLResponse, type MatchedUser, Mutex, type OfficialSolution, type Problem, type ProblemDifficulty, type ProblemList, type Profile$1 as Profile, RateLimiter, type RecentSubmission, type Release, type Submission, type SubmissionDetail, type SubmissionStatus, type SubmitStats, type TopicTag, type TotalSubmissionNum, USER_AGENT, type UserContestInfo, type UserProfile, type Whoami, _fetch, cache, caches, LeetCode as default, _fetch as fetch, fetcher };
