export type UserResponse = UserProfile;

export interface UserProfile {
    username: string;
    friends: boolean | null;
}
