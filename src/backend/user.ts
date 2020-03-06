import { FriendInfo, Friendship } from "./friends";

export type UserResponse = UserProfile;

export type UserSearchResponse = FriendInfo[];

export interface UserProfile {
    id: number;
    username: string;
    friendship: Friendship | null;
}
