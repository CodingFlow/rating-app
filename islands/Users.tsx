import { Button } from "../components/Button.tsx";
import {
    Dispatch,
    StateUpdater,
    useEffect,
    useState,
} from "https://esm.sh/v128/preact@10.22.0/hooks";

interface UsersProps {
    ratingServiceUrl: string;
}

type User = {
    id: string;
    username: string;
};

async function getData(
    setData: Dispatch<StateUpdater<User[]>>,
    ratingServiceUrl: string,
) {
    const response = await (await fetch(`${ratingServiceUrl}/users`, {
        headers: new Headers([["Content-Type", "application/json"]]),
    })).json();

    setData(response);
}

function onSelectUser(
    users: User[],
    setSelectedUser: Dispatch<StateUpdater<User>>,
    newUserId: string,
) {
    const newUser = users.find((user) => user.id === newUserId) ??
        { id: "", username: "" };
    setSelectedUser(newUser);
}

function onUsernameInput(
    user: User,
    setUser: Dispatch<StateUpdater<User>>,
    newName: string,
) {
    setUser({ ...user, username: newName });
}

async function onCreate(
    user: User,
    setUsers: Dispatch<StateUpdater<User[]>>,
    ratingServiceUrl: string,
) {
    const response = await (await fetch(`${ratingServiceUrl}/users`, {
        method: "post",
        body: JSON.stringify({
            name: user.username,
        }),
    })).json();

    getData(setUsers, ratingServiceUrl);
}

export default function Users({ ratingServiceUrl }: UsersProps) {
    const [users, setUsers] = useState<User[]>([{ id: "", username: "" }]);
    const [user, setUser] = useState<User>({ id: "", username: "" });

    useEffect(() => {
        getData(setUsers, ratingServiceUrl);
    }, []);

    return (
        <div class="flex flex-col gap-2">
            <select size={10} value={user.id}>
                {users.map((item) => (
                    <option
                        value={item.id}
                        onInput={() =>
                            onSelectUser(
                                users,
                                setUser,
                                item.id,
                            )}
                    >
                        {item.username}
                    </option>
                ))}
            </select>
            <label for="username">User Name</label>
            <input
                id="username"
                type="text"
                value={user.username}
                onInput={(e) =>
                    onUsernameInput(user, setUser, e.currentTarget.value)}
            >
            </input>
            <button
                onClick={() => onCreate(user, setUsers, ratingServiceUrl)}
                class="p-1 border bg-orange-100 shadow-md rounded-md"
            >
                Create
            </button>
        </div>
    );
}
