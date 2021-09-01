import {createSlice} from '@reduxjs/toolkit';

// 历史state
const initialState = {
    history: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addHistory(state, action){
            state.history.push(action.payload);
        },
        clearHistory(state, action){
            return initialState;
        },
    },
});

export const { addHistory, clearHistory } = historySlice.actions;

export default historySlice.reducer;