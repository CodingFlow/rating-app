import { useSignal } from "@preact/signals";
import { ratingServiceUrl } from "../islands/environment-variables.tsx";
import RatingsForm from "../islands/RatingsForm.tsx";
import { Rating } from "../shared/Ratings.ts";

export default function Home() {
    const ratings = useSignal<Rating[]>([]);
    const rating = useSignal<Rating>({
        id: "00000000-0000-0000-0000-000000000000",
        userId: "00000000-0000-0000-0000-000000000000",
        serviceId: "00000000-0000-0000-0000-000000000000",
        score: 0
    });

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
