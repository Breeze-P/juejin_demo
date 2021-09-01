import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getArticleById} from "../../fake-api";

// 文章state，加载全局文章状态，定义reducer利用数据API获取文章数据。
const initialState = {
    article: null,
    status: 'idle',
    error: null,
};

export const fetchArticle = createAsyncThunk('article/fetchArticle',
    async (articleId) => {
        return await getArticleById(articleId);
    }
);

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        clearArticle(state, action) {
            return initialState;
        },
    },
    extraReducers: {
        [fetchArticle.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchArticle.fulfilled]: (state, action) => {
            if (action.payload.code === 404) {
                state.status = 'failed';
                state.error = action.payload.error_message;
            } else {
                state.status = 'succeeded'
                state.article = action.payload.data.article;
            }
        },
        [fetchArticle.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export const { clearArticle } = articleSlice.actions;

export default articleSlice.reducer;