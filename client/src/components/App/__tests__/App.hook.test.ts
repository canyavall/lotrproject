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

        const pressKey = result.current.pressKey
        pressKey(Move.east)
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        await act(async () => {
        });

        expect(result.current.state.endGame).toEqual(true)
    })

})