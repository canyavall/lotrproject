import React from 'react';
import './App.css';
import useApp from "./App.hook";
import {Move} from "./App.types";

function App() {
    const {pressKey, state, restart} = useApp()

    return (
        <div className="App">
            <div className="App-header">
                <h1>Destroy Da One Ring</h1>
            </div>
            <div className="App-body">
                <div className="sideDiv">
                    <div className="center">
                        <button className="direction-button" onClick={() => pressKey(Move.west)}>West</button>
                    </div>

                </div>
                <div className="centerDiv">
                    <h2>{state.message}</h2>
                    <button className="direction-button" onClick={() => pressKey(Move.north)}>North</button>
                    {state.imgSrc && <div className="imgContainer"><img width="300px" src={state.imgSrc}/></div>}
                    <button className="direction-button" onClick={() => pressKey(Move.south)}>South</button>
                    {state.endGame &&
                    <div className="restartButton">
                        <button className="restart" onClick={() => restart()}>Restart Game</button>
                    </div>
                    }
                </div>
                <div className="sideDiv">
                    <div className="center">
                        <button className="direction-button" onClick={() => pressKey(Move.east)}>East</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;
