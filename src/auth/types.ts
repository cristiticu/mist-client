export type AuthState = {
    token: string;
};

export type LoginParams = {
    username: string;
    password: string;
};
export type LoginResponse = {
    access_token: string;
    token_type: string;
};
