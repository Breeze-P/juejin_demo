import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getCategories} from "../fake-api";

// 目录state
const initialState = {
    categories: [],
    footer_choice: 'hot',
    header_a_choice: 0,
    header_b_choice: 0,
    status: 'idle',
    error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const res = await getCategories();
    return res.data.categories;
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        changeFooterChoice(state, action) {
            state.footer_choice = action.payload;
        },
        changeHeaderAChoice(state, action) {
            state.header_a_choice = action.payload;
        },
        changeHeaderBChoice(state, action) {
            state.header_b_choice = action.payload;
        },
    },
    extraReducers: {
        [fetchCategories.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.categories = action.payload;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.status =  'failed';
            state.error = action.error.message;
        },
    },
});

export const { changeFooterChoice, changeHeaderAChoice, changeHeaderBChoice } = categoriesSlice.actions;

export default categoriesSlice.reducer;