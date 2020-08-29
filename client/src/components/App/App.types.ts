export enum Move {
    north = "n",
    south = "s",
    east = "e",
    west = "w"
}

export interface MoveResponse{
    endGame: boolean;
    message: string;
    imgSrc: string;
}