import { createStore } from 'redux';
import rootReducer from './rootReducer';
import {getLocalStorageState, setLocalStorageState} from "../utils/localStorage";

const persistedState: RootState = getLocalStorageState();
const store = createStore(rootReducer, persistedState);


store.subscribe(() => {
    const state = store.getState()
    console.log(state)
    setLocalStorageState(state);
})

export type RootState = ReturnType<typeof rootReducer>

export default store;
