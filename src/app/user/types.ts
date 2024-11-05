export type License = {
    id: string;
    user_id: string;
    game_id: string;
    acquisition: string;
    expires: string | null;
};

export type AddUserGameParams = {
    gameId: string;
};
