import { Friendship } from "./friends";

export type UserResponse = UserProfile;

export interface UserProfile {
    id: number;
    username: string;
    friendship: Friendship | null;
}
