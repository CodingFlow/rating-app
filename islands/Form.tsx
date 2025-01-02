import { Signal } from "@preact/signals";
import { useEffect } from "@preact/hooks";

interface UsersProps<T> {
    ratingServiceUrl: string;
    entity: Signal<T>;
    entities: Signal<T[]>;
    fields: Field[];
    entityIdFieldName: string;
}

export type Field = {
    fieldName: string;
    inputId: string;
    inputText: string;
};

async function getData<T>(
    items: Signal<T[]>,
    ratingServiceUrl: string,
) {
    const response: T[] = await (await fetch(ratingServiceUrl, {
        headers: new Headers([["Content-Type", "application/json"]]),
    })).json();

    items.value = response;
}

function onSelectItem<T extends Record<string, any>>(
    entities: Signal<T[]>,
    selectedEntity: Signal<T>,
    idFieldName: string,
    selectedId: string,
) {
    const newItem = entities.value.find((entity) =>
        entity[idFieldName] === selectedId
    )!;

    selectedEntity.value = newItem;
}

function onFieldInput<T>(
    user: Signal<T>,
    field: string,
    newName: string,
) {
    user.value = { ...user.value, [field]: newName };
}

async function onCreate<T>(
    item: Signal<T>,
    items: Signal<T[]>,
    ratingServiceUrl: string,
) {
    const response = await (await fetch(ratingServiceUrl, {
        method: "post",
        body: JSON.stringify(item.value),
    })).json();

    getData(items, ratingServiceUrl);
}

export default function Form<T extends Record<string, any>>(
    {
        ratingServiceUrl,
        fields,
        entity,
        entities,
        entityIdFieldName,
    }: UsersProps<T>,
) {
    useEffect(() => {
        getData(entities, ratingServiceUrl);
    }, []);

    return (
        <div class="flex flex-col gap-2">
            <select size={10} value={entity.value[entityIdFieldName]}>
                {entities.value.map((item) => (
                    <option
                        value={item.id}
                        onInput={() =>
                            onSelectItem<T>(
                                entities,
                                entity,
                                entityIdFieldName,
                                item.id,
                            )}
                    >
                        {item.username}
                    </option>
                ))}
            </select>
            {fields.map((field) => (
                <>
                    <label for={field.inputId}>{field.inputText}</label>
                    <input
                        id={field.inputId}
                        type="text"
                        value={entity.value[field.fieldName]}
                        onInput={(e) =>
                            onFieldInput(
                                entity,
                                field.fieldName,
                                e.currentTarget.value,
                            )}
                    >
                    </input>
                </>
            ))}
            <button
                onClick={() => onCreate(entity, entities, ratingServiceUrl)}
                class="p-1 border bg-orange-100 shadow-md rounded-md"
            >
                Create
            </button>
        </div>
    );
}
