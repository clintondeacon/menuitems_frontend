import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetMenusState {
    data: any[];
    meta: {
        last_page: number[];
        current_page: number[];
    } | null;
    currentPage: number;
    selectedCuisine: string | null;
    cuisines: { name: string; slug: string | null }[];
}

const initialState: SetMenusState = {
    data: [],
    meta: null,
    currentPage: 1,
    selectedCuisine: null,
    cuisines: [],
};

const setMenuSlice = createSlice({
    name: "setMenus",
    initialState,
    reducers: {
        setData: (
            state,
            action: PayloadAction<{
                data: any[];
                meta: SetMenusState["meta"];
                append: boolean;
            }>
        ) => {
            if (action.payload.append) {
                state.data = [...state.data, ...action.payload.data];
            } else {
                state.data = action.payload.data;
            }
            state.meta = action.payload.meta;
        },
        setPageAndCuisine: (
            state,
            action: PayloadAction<{ currentPage: number; selectedCuisine: string | null }>
        ) => {
            state.currentPage = action.payload.currentPage;
            state.selectedCuisine = action.payload.selectedCuisine;
        },
        setCuisines: (state, action: PayloadAction<{ name: string; slug: string | null }[]>) => {
            state.cuisines = action.payload;
        },
    },
});

export const { setData, setPageAndCuisine, setCuisines } = setMenuSlice.actions;
export default setMenuSlice.reducer;
