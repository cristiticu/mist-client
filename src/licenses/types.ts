export type License = {
    id: string;
    user_id: string;
    game_id: string;
    acquisition: string;
    expires: string | null;
    custom_image_src: string | null;
};

export type AddLicenseParams = {
    gameId: string;
};
