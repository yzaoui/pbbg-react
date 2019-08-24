/**
 * For /user API.
 */
export interface Response {
    username: string;
    mining: LevelProgress;
}

interface LevelProgress {
    level: number;
    relativeExp: number;
    relativeExpToNextLevel: number;
}
