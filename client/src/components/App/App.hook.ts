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
    message: "Sam! I was waiting for you! Let's go!!",
    moves: [],
    endGame: false,
    imgSrc: "https://img1.looper.com/img/gallery/frodo-baggins-entire-backstory-explained/intro-1582640416.jpg",
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
                    dispatch({
                        ...initialState,
                        imgSrc:"https://img.cinemablend.com/filter:scale/quill/8/0/f/e/4/2/80fe42c3bc4c116f7d4f8c0d08c5641f7c4b9798.jpg?mw=600",
                        message: "Looks like we lost the connection with the Mount Doom"
                    })
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