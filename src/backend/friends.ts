export type FriendsResponse = Friends;

export interface Friends {
    friendInfos: FriendInfo[];
}

export interface FriendInfo {
    userId: number;
    username: string;
    friendship: Friendship;
}

export type Friendship = "none" | "request-sent" | "request-received" | "confirmed";
