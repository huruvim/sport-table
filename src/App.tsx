import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";

const App = () => {
    const { count } = useSelector((state: RootState) => state.team)
    const dispatch = useDispatch()

    return (
        <div className="App">
            <div>
                <div>Hello React</div>
                <div>{count}</div>
                <button onClick={() => dispatch({type: 'INCREMENT'})}>increment</button>
                <button onClick={() => dispatch({type: 'DECREMENT'})}>decrement</button>
            </div>
        </div>
    );
}

export default App;
