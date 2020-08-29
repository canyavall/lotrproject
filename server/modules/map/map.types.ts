export enum MapValuesMessage {
    nothing = "Nothing is found.",
    frodo = "Frodo is here",
    orc = "Orc found, Frodo is dead.",
    ring = "Ring is destroyed.",
    out = "Falls out of the map"
}

export enum MapValues {
    nothing = "-",
    frodo = "F",
    orc = "O",
    ring = "D"
}

export type GameMap = string[][];

export type GameMapVector = [number, number]