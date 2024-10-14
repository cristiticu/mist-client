export type Game = {
    id: string;
    title: string;
    description: string;
    price: number;
    added_at: string;
    positive_reviews: number;
    negative_reviews: number;
};

export type FetchGameParams = {
    id: string;
};
