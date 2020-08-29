import React from 'react';
import './App.css';
import useApp from "./App.hook";
import {Move} from "./App.types";

function App() {
    const {pressKey, state,  restart} = useApp()

    return (
        <div className="App">
            <div className="App-header">
                <h1>Destroy Da One Ring</h1>
            </div>
            <div className="App-body">
                <button className="direction-button" onClick={() => pressKey(Move.north)}>North</button>
                <button className="direction-button" onClick={() => pressKey(Move.south)}>South</button>
                <button className="direction-button" onClick={() => pressKey(Move.west)}>West</button>
                <button className="direction-button" onClick={() => pressKey(Move.east)}>East</button>
            </div>
            <h2>{state.message}</h2>
            {state.imgSrc && <div><img width="300px" src={state.imgSrc}/></div>}
            {state.endGame &&
            <button className="restart" onClick={() => restart()}>Restart Game</button>
            }
        </div>
    );
}

export default App;
