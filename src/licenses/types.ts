import { Game } from '../games/types';

export type License = {
    id: string;
    user_id: string;
    game_id: string;
    acquisition: string;
    expires: string | null;
};

export type OwnedGame = Game & {
    custom_display_image?: string | null;
};

export type AddLicenseParams = {
    gameId: string;
};
