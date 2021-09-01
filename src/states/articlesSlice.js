import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getArticles} from "../fake-api";

// 文章列表state，定义reducer与异步加载数据。
const initialState = {
    articles: [],
    total: 0,
    has_more: 0,
    offset: 0,
    status: 'idle',
    error: null,
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles',
    async ({categoryId= 0, sortBy = 'hot', offset = 0, limit = 10}) => {
        return await getArticles(categoryId, sortBy, offset, limit);
});

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        clearArticles(state, action){
            return initialState;
        },
    },
    extraReducers: {
        [fetchArticles.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchArticles.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            action.payload.data.articles.map((article) => {
                state.articles.push(article);
                return null;
            })
            state.total = action.payload.total;
            state.has_more = action.payload.has_more;
            state.offset += 10;
        },
        [fetchArticles.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export const { clearArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
