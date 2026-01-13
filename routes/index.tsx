import { signal } from "@preact/signals";
import {
    ratingServiceServerSideUrl,
    ratingServiceUrl,
} from "../shared/environment-variables.ts";
import RatingsForm from "../islands/RatingsForm.tsx";
import { mapRatingResponse, Rating } from "../shared/Ratings.ts";
import { getData } from "../shared/Common.ts";

export default async function Home() {
    const ratings = signal<Rating[]>([]);
    const rating = signal<Rating>({
        id: "00000000-0000-0000-0000-000000000000",
        userId: "00000000-0000-0000-0000-000000000000",
        serviceId: "00000000-0000-0000-0000-000000000000",
        score: 0,
    });

    await getData(ratings, mapRatingResponse, ratingServiceServerSideUrl);

    return (
        <div class="px-4 py-8 mx-auto bg-amber-200">
            <div class="w-full columns-2">
                <div class="">
                    <div>
                        <h2>Ratings</h2>
                    </div>
                    <RatingsForm
                        ratingServiceUrl={`${ratingServiceUrl}`}
                        ratings={ratings}
                        rating={rating}
                    />
                </div>
            </div>
            <div class="w-full columns-2">
                <div class="">
                    <h2>Services</h2>
                </div>
            </div>
        </div>
    );
}
