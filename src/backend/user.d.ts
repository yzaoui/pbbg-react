/**
 * For /user API.
 */

export interface Request {
}

export interface Response {
    mining: LevelProgress;
}

interface LevelProgress {
    level: number;
    relativeExp: number;
    relativeExpToNextLevel: number;
}
