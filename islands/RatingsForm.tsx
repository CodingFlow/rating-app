import { Signal } from "@preact/signals";
import Form from "./Form.tsx";
import { mapRatingResponse, Rating } from "../shared/Ratings.ts";

interface RatingsProps {
    ratingServiceUrl: string;
    rating: Signal<Rating>;
    ratings: Signal<Rating[]>;
}

export default function RatingsForm(
    {
        ratingServiceUrl,
        rating,
        ratings,
    }: RatingsProps,
) {
    return <>
        <div>Score: {rating.value.score}</div>
        <Form
            ratingServiceUrl={`${ratingServiceUrl}`}
            mapData={mapRatingResponse}
            entities={ratings}
            entity={rating}
            entityIdFieldName="id"
            fields={[{
                fieldName: "ratingId",
                inputId: "ratingId",
                inputText: "Rating Id",
            }]}
        />
    </>;
}
