import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Users from "../islands/Users.tsx";
import { ratingServiceUrl } from "../islands/environment-variables.tsx";

export default function Home() {
    const count = useSignal(3);

    return (
        <div class="px-4 py-8 mx-auto bg-[#86efac]">
            <div class="w-full columns-2">
                <div class="">
                    <h2>Users</h2>
                    <Users ratingServiceUrl={ratingServiceUrl} />
                </div>
                <div class="">
                    <h2>Services</h2>
                </div>
            </div>
            <Counter count={count} />
        </div>
    );
}
