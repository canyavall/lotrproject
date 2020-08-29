import {MapValuesMessage} from "../map/map.types";

export enum Move {
    north = "n",
    south = "s",
    east = "e",
    west = "w"
}

export interface PositionInMapResponse {
    endGame: boolean
    message: undefined | MapValuesMessage
    imgSrc: undefined | string
}

export type Moves = Move[]