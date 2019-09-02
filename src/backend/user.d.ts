/**
 * For /user API.
 */
export type UserStatsResponse = UserStats;

export interface UserStats {
    username: string;
    gold: number;
    mining: LevelProgress;
}

export interface LevelProgress {
    level: number;
    relativeExp: number;
    relativeExpToNextLevel: number;
}
