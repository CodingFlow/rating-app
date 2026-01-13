import { MapData } from "./Common.ts";

export type Uuid = string;

export type Rating = {
    id: Uuid;
    userId: Uuid;
    serviceId: Uuid;
    score: number;
};

export type RatingResponse = {
    items: Rating[];
};

export const mapRatingResponse: MapData<RatingResponse, Rating> = (data) => {
    return data.items;
};
