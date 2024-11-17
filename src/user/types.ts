export type User = {
    id: string;
    username: string;
    password: string;
    created_at: string;
    profile_img: string | null;
};

export type FetchUserParams = {
    user_id: string;
};
