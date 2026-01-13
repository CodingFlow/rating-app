import { Signal } from "@preact/signals";

export type MapData<TResponse, TItem> = (data: TResponse) => TItem[];

export async function getData<TResponse, TItem>(
    items: Signal<TItem[]>,
    mapData: MapData<TResponse, TItem>,
    serviceUrl: string,
) {
    const response = await fetch(serviceUrl, {
        headers: new Headers([
            ["Content-Type", "application/json"],
            ["Host", "dogs"],
        ]),
    });

    const data = await response.json() as TResponse;

    items.value = mapData(data);
}
