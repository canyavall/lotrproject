import {GameMap, GameMapVector, MapValues, MapValuesMessage} from "../map/map.types";
import {Move, Moves, PositionInMapResponse} from "./move.types";
import defaultMap from "../map/default.map";

export class MoveController {
    private readonly map: GameMap;
    private readonly moves: Moves;
    private mapLength: number;
    private readonly mapSize: GameMapVector;
    private readonly startPosition: GameMapVector;
    private endGame: boolean;
    private imgSrc: string | undefined;
    private message: MapValuesMessage | undefined;

    constructor(map: GameMap, moves: Moves) {
        this.map = map
        this.moves = moves
        this.mapLength = map && map.length
        this.mapSize = map && map[0] && [map.length, map[0].length]
        this.startPosition = this.findFrodo()
        this.endGame = false
    }

    findFrodo = (): GameMapVector => {
        for (let i = 0; i < this.map.length; i++) {
            for (let u = 0; u < this.map[i].length; u++) {
                if (this.map[i][u] === MapValues.frodo) {
                    return [i, u]
                }
            }
        }
        throw new Error("Frodo was afraid to start the journey")
    }

    positionState = (position: GameMapVector): void => {

        //Out of the map
        if (position[0] < 0 || position[1] < 0 || position[0] >= this.mapSize[0] || position[1] >= this.mapSize[1]) {
            this.endGame = true
            this.message = MapValuesMessage.out
            this.imgSrc = "https://c4.wallpaperflare.com/wallpaper/112/584/930/artwork-volcano-the-lord-of-the-rings-lava-wallpaper-preview.jpg"
        } else {
            const currentPositionState: string = this.map[position[0]][position[1]]
            switch (currentPositionState) {
                case MapValues.nothing:
                    this.endGame = false
                    this.message = MapValuesMessage.nothing
                    this.imgSrc = "https://sm.ign.com/t/ign_ap/news/h/heres-how-/heres-how-many-miles-frodo-sam-walked-to-get-to-mt_8b9n.1280.jpg"
                    break;
                case MapValues.orc:
                    this.endGame = true
                    this.message = MapValuesMessage.orc
                    this.imgSrc = "https://happymag.tv/wp-content/uploads/2019/12/orc-870x524.jpg"
                    break
                case MapValues.ring:
                    this.endGame = true
                    this.message = MapValuesMessage.ring
                    this.imgSrc = "https://huttshead.files.wordpress.com/2009/11/screen-shot-2009-11-10-at-2-36-32-pm1.png"
                    break
                default:
                    this.endGame = true
                    this.imgSrc = "https://c4.wallpaperflare.com/wallpaper/112/584/930/artwork-volcano-the-lord-of-the-rings-lava-wallpaper-preview.jpg"
                    this.message = MapValuesMessage.out
            }
        }
    }

    positionInMap = (startPosition: GameMapVector = this.startPosition, moves: Moves = this.moves): PositionInMapResponse => {
        let currentMove = moves[0]

        switch (currentMove) {
            case Move.north:
                startPosition[0]--
                break;
            case Move.south:
                startPosition[0]++
                break
            case Move.west:
                startPosition[1]--
                break
            case Move.east:
                startPosition[1]++
                break
            default:
                throw new Error("Frodo tried to move into another dimension!! That's not allowed!!")
        }

        this.positionState(startPosition)

        // Remove used move from array
        moves.shift()

        if (!this.endGame && moves && moves.length > 0) {
            return this.positionInMap(startPosition, moves)
        }

        return {
            endGame: this.endGame,
            message: this.message,
            imgSrc: this.imgSrc
        }
    }
}

const moveController = (req: any, res: any) => {
    let moves = req.query && req.query.moves

    //check incoming data is an array
    if (!Array.isArray(moves)) moves = [moves]

    if (moves && moves.length > 0) {
        //let's prepare the game
        const move = new MoveController(defaultMap, moves)
        try {
            const positionInMap = move.positionInMap()
            return {endGame: positionInMap.endGame, message: positionInMap.message, imgSrc: positionInMap.imgSrc}
        } catch (e) {
            return {endGame: true, message: e.message}
        }

    } else {
        return {endGame: true, message: "No moves were provided"}
    }
}

export default moveController