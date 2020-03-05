import { Friendship } from "./friends";

export type UserResponse = UserProfile;

export interface UserProfile {
    username: string;
    friendship: Friendship | null;
}
