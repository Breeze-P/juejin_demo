import { configureStore } from '@reduxjs/toolkit';
import articles from './articlesSlice';
import categories from './categoriesSlice';
import articleDetail from '../features/article/articleSlice';
import comments from '../features/article/commentsSlice';
import history from './historySlice'

// 创建全局store供组件调用
export default configureStore({
    reducer: {
        categories,
        articles,
        articleDetail,
        comments,
        history
    },
});
