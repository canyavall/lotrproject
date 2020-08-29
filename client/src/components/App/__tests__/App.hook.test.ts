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

})