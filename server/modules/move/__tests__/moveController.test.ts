import {MoveController} from "../moveController";
import defaultMap from "../../map/default.map";
import {Move} from "../move.types";

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


    describe("positionInMap method", () => {

        test("Calculate position after 1 move", () => {
            const newMoveController = new MoveController(defaultMap, [Move.east])
            const positionState = newMoveController.positionInMap()
            const expectedResult = {
                "endGame": false,
                "imgSrc": "https://sm.ign.com/t/ign_ap/news/h/heres-how-/heres-how-many-miles-frodo-sam-walked-to-get-to-mt_8b9n.1280.jpg",
                "message": "Nothing is found."
            }
            expect(positionState).toEqual(expectedResult)
        })

        test("Calculate position after 3 moves (orc found)", () => {
            const newMoveController = new MoveController(defaultMap, [Move.east, Move.east, Move.east])
            const positionState = newMoveController.positionInMap()
            const expectedResult = {
                "endGame": true,
                "imgSrc": "https://happymag.tv/wp-content/uploads/2019/12/orc-870x524.jpg",
                "message": "Orc found, Frodo is dead."
            }
            expect(positionState).toEqual(expectedResult)
        })

        test("Calculate position out of the map", () => {
            const newMoveController = new MoveController(defaultMap, [Move.west])
            const positionState = newMoveController.positionInMap()
            const expectedResult = {
                "endGame": true,
                "imgSrc": "https://c4.wallpaperflare.com/wallpaper/112/584/930/artwork-volcano-the-lord-of-the-rings-lava-wallpaper-preview.jpg",
                "message": "Falls out of the map"
            }
            expect(positionState).toEqual(expectedResult)
        })

        test("Calculate position out of the map on top", () => {
            const newMoveController = new MoveController(defaultMap, [Move.north, Move.north, Move.north, Move.north, Move.north, Move.north])
            const positionState = newMoveController.positionInMap()
            const expectedResult = {
                "endGame": true,
                "imgSrc": "https://c4.wallpaperflare.com/wallpaper/112/584/930/artwork-volcano-the-lord-of-the-rings-lava-wallpaper-preview.jpg",
                "message": "Falls out of the map"
            }

            expect(positionState).toEqual(expectedResult)
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