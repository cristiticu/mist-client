export type Game = {
    id: string;
    title: string;
    description: string;
    price: number;
    added_at: string;
    positive_reviews: number;
    negative_reviews: number;
    image_src: string | null;
};

export type FetchGameParams = {
    id: string;
};

export type FetchGamesParams = {
    limit: number;
    offset: number;
};
