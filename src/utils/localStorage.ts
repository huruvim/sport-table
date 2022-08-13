import {RootState} from "../redux/store";

const storeStateKey = 'scoresState';

export const setLocalStorageState = (state: RootState) => {
    const persistedState = JSON.stringify(state);
    return localStorage.setItem(storeStateKey, persistedState);
}

export const getLocalStorageState = () => {
    const persistedState = localStorage.getItem(storeStateKey);
    if (!persistedState) {
        return;
    }
    return JSON.parse(persistedState);
}