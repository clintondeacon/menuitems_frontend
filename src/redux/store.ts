import { configureStore } from "@reduxjs/toolkit";
// @ts-ignore
import setMenuReducer from "./setMenuSlice.ts";

const store = configureStore({
    reducer: {
        setMenus: setMenuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
