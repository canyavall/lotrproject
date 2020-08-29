import {act, renderHook} from '@testing-library/react-hooks'
import useApp, {initialState} from "../App.hook";
import {Move} from "../App.types";
import {mockedMoveResponse} from "./App.mock";

describe("AppHook test", () => {

    test("Initial hook working", () => {
        const {result} = renderHook(() => useApp())
        const state = result.current.state
        expect(state).toEqual(initialState)
    })

    test("PressKey is working", async () => {
        const {result} = renderHook(() => useApp())
        fetchMock.mockResponseOnce(JSON.stringify(mockedMoveResponse))

        await act(async () => {
            result.current.pressKey(Move.east)
        });
        expect(result.current.state.endGame).toEqual(true)
    })

    test("Restart is working is working", async () => {
        const {result} = renderHook(() => useApp())
        fetchMock.mockResponseOnce(JSON.stringify(mockedMoveResponse))

        await act(async () => {
            result.current.pressKey(Move.east)
        });

        expect(result.current.state.endGame).toEqual(true)

        await act(async () => {
            result.current.restart()
        });

        expect(result.current.state.endGame).toEqual(false)

    })

    test("Request return 500", async () => {
        const {result} = renderHook(() => useApp())
        fetchMock.mockResponseOnce(JSON.stringify({}), {status:500})

        await act(async () => {
            result.current.pressKey(Move.east)
        });
        const expectedResult = {
            message: 'Looks like we lost the connection with the Mount Doom',
            moves: [],
            endGame: false,
            imgSrc: 'https://img.cinemablend.com/filter:scale/quill/8/0/f/e/4/2/80fe42c3bc4c116f7d4f8c0d08c5641f7c4b9798.jpg?mw=600'
        }

        expect(result.current.state).toEqual(expectedResult)

    })

})