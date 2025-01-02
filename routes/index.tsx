import { useSignal } from "@preact/signals";
import Form from "../islands/Form.tsx";
import { ratingServiceUrl } from "../islands/environment-variables.tsx";

type User = {
    id: number;
    username: string;
};

export default function Home() {
    const users = useSignal<User[]>([]);
    const user = useSignal<User>({ id: 0, username: "" });

    return (
        <div class="px-4 py-8 mx-auto bg-amber-200">
            <div class="w-full columns-2">
                <div class="">
                    <h2>Users</h2>
                    <Form
                        ratingServiceUrl={`${ratingServiceUrl}/users`}
                        entities={users}
                        entity={user}
                        entityIdFieldName="id"
                        fields={[{
                            fieldName: "username",
                            inputId: "username",
                            inputText: "Username",
                        }]}
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
