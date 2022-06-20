import { combineReducers, configureStore } from '@reduxjs/toolkit';
import folderReducer from './reducer/folder';

const rootReducer = combineReducers({
    folderReducer
});

export const Store = () => {
    return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof Store>;
export type AppDispatch = AppStore['dispatch'];
