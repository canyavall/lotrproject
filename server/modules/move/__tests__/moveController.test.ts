import {MoveController} from "../moveController";
import defaultMap from "../../map/default.map";
import {Move} from "../move.types";
import {MapValuesMessage} from "../../map/map.types";

describe("moveController tests", () => {

    describe("findFrodo method", () => {


        test("Find frodo initial position in map", () => {
            const newMoveController = new MoveController(defaultMap, [Move.east])
            const findFrodo = newMoveController.findFrodo()
            const expectedResult = [5, 0]

            expect(findFrodo).toEqual(expectedResult)
        })

        test("Frodo not found in map", () => {
            let expectedError = ""
            try {
                new MoveController([], [Move.east])
            } catch (e) {
                expectedError = e.message
            }

            expect(expectedError).toEqual("Frodo was afraid to start the journey")
        })
    })

    describe("positionState method", () => {


        test("positionState", () => {
            const newMoveController = new MoveController(defaultMap, [Move.east])
            const positionState = newMoveController.positionState([5, 1])
            expect(positionState).toEqual(MapValuesMessage.nothing)

            const positionState2 = newMoveController.positionState([5, 3])
            expect(positionState2).toEqual(MapValuesMessage.orc)
        })


    })

    describe("positionInMap method", () => {

        test("Calculate position after 1 move", () => {
            const newMoveController = new MoveController(defaultMap, [Move.east])
            const positionState = newMoveController.positionInMap()
            expect(positionState).toEqual(MapValuesMessage.nothing)
        })

        test("Calculate position after 3 moves (orc found)", () => {
            const newMoveController = new MoveController(defaultMap, [Move.east, Move.east, Move.east])
            const positionState = newMoveController.positionInMap()
            expect(positionState).toEqual(MapValuesMessage.orc)
        })

        test("Calculate position out of the map", () => {
            const newMoveController = new MoveController(defaultMap, [Move.west])
            const positionState = newMoveController.positionInMap()
            expect(positionState).toEqual(MapValuesMessage.out)
        })

        test("Calculate position out of the map on top", () => {
            const newMoveController = new MoveController(defaultMap, [Move.north, Move.north, Move.north, Move.north, Move.north, Move.north])
            const positionState = newMoveController.positionInMap()
            expect(positionState).toEqual(MapValuesMessage.out)
        })

        test("Wrong parameter parsed", () => {
            // @ts-ignore
            const newMoveController = new MoveController(defaultMap, [Move.e, "p"])
            let expectedError = undefined
            try {
                newMoveController.positionInMap()
            } catch (e) {
                expectedError = e.message
            }

            expect(expectedError).toEqual("Frodo tried to move into another dimension!! That's not allowed!!")
        })


    })

})