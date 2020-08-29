import {useEffect, useReducer} from "react";
import {Move, MoveResponse} from "./App.types";
import queryString from "querystring";

interface AppHookState {
    message?: string;
    moves?: Move[];
    endGame?: boolean;
    imgSrc?: string;
}

export const initialState: AppHookState = {
    message: "Help Frodo to destroy the Ring!!!",
    moves: [],
    endGame: false,
    imgSrc: "https://i.pinimg.com/736x/28/b9/8f/28b98f7cdce838278d683d3b809c8f1e.jpg",
}

const reducer = (state:AppHookState, action:any) => ({...state, ...action})

const useApp = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const pressKey = (val: Move) => dispatch({moves: [...state.moves, val]})

    const restart = () => dispatch(initialState)

    useEffect(() => {
        if (state.moves && state.moves.length > 0) {
            const requestMoveMessage = async (): Promise<void> => {
                const queryObject = {
                    moves: state.moves
                }
                const queryStr = queryString.stringify(queryObject)
                const response = await fetch("/move?" + queryStr)
                if (response && response.status && response.status >= 200 && response.status < 300) {
                    const data: MoveResponse = await response.json()
                    if (data && data.message) {
                        const newState: AppHookState = {
                            message: data.message
                        }
                        if (data.endGame) newState.endGame = true
                        if (data.imgSrc) newState.imgSrc = data.imgSrc
                        dispatch(newState)
                    }
                } else {
                    dispatch({message: "Looks like we lost the connection with the Mount Doom"})
                }
            }
            //only send requests if game is not over
            !state.endGame && requestMoveMessage()
        }
    }, [state.moves])

    return {
        pressKey,
        state,
        restart
    }
}

export default useApp