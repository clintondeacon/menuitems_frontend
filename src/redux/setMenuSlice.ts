import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    meta: null,
};

const setMenuSlice = createSlice({
    name: "setMenus",
    initialState,
    reducers: {
        setData(state, action) {
            const { data, meta, append } = action.payload;
            state.data = append ? [...state.data, ...data] : data;
            state.meta = meta;
        },
    },
});

export const { setData } = setMenuSlice.actions;
export default setMenuSlice.reducer;
