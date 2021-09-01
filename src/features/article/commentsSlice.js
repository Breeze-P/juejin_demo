import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getCommentsByArticleId} from "../../fake-api";

// 评论state
const initialState = {
    comments: [],
    total: 0,
    has_more: 0,
    offset: 0,
    status: 'idle',
    error: null,
};

export const fetchComments = createAsyncThunk('comments/fetchComments',
    async (articleId, offset = 0, limit = 10) => {
        return await getCommentsByArticleId(articleId, offset = 0, limit = 10);
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments(state, action) {
            return initialState;
        },
    },
    extraReducers: {
        [fetchComments.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            action.payload.data.comments.map((comment) =>
                {
                    state.comments.push(comment);
                    return null;
                }
            );
            state.offset += 10;
            state.total = action.payload.total;
            state.has_more = action.payload.has_more;
        },
        [fetchComments.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;