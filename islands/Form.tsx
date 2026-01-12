import { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface UsersProps<TResponse, TItem> {
    ratingServiceUrl: string;
    mapData: MapData<TResponse, TItem>;
    entity: Signal<TItem>;
    entities: Signal<TItem[]>;
    fields: Field[];
    entityIdFieldName: string;
}

export type Field = {
    fieldName: string;
    inputId: string;
    inputText: string;
};

export type MapData<TResponse, TItem> = (data: TResponse) => TItem[];

async function getData<TResponse, TItem>(
    items: Signal<TItem[]>,
    mapData: MapData<TResponse, TItem>,
    ratingServiceUrl: string,
) {
    const response = await fetch(ratingServiceUrl, {
        headers: new Headers([["Content-Type", "application/json"]]),
    });

    const data = await response.json() as TResponse;

    items.value = mapData(data);
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

async function onCreate<TResponse, TItem>(
    item: Signal<TItem>,
    items: Signal<TItem[]>,
    mapData: MapData<TResponse, TItem>,
    ratingServiceUrl: string,
) {
    const response = await fetch(ratingServiceUrl, {
        method: "post",
        body: JSON.stringify({
            items: [
                item.value,
            ],
        }),
    });

    const data = await (response).json();

    getData(items, mapData, ratingServiceUrl);
}

export default function Form<TResponse, TItem extends Record<string, any>>(
    {
        ratingServiceUrl,
        mapData,
        fields,
        entity,
        entities,
        entityIdFieldName,
    }: UsersProps<TResponse, TItem>,
) {
    useEffect(() => {
        getData(entities, mapData, ratingServiceUrl);
    }, []);

    return (
        <div class="flex flex-col gap-2">
            <select size={10} value={entity.value[entityIdFieldName]} onInput={(event) =>
                            onSelectItem<TItem>(
                                entities,
                                entity,
                                entityIdFieldName,
                                event.currentTarget.value,
                            )}>
                {entities.value.map((item) => (
                    <option value={item[entityIdFieldName]}>
                        {item[entityIdFieldName]}
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
                onClick={() => onCreate(entity, entities, mapData, ratingServiceUrl)}
                class="p-1 border bg-orange-100 shadow-md rounded-md"
            >
                Create
            </button>
        </div>
    );
}
