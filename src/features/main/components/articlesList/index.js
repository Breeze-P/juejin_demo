import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {clearArticles, fetchArticles} from "../../../../states/articlesSlice";
import './style.css';

// 文章列表组件
const ArticlesList = (props) => {
    const dispatch = useDispatch();

    const { articles, status, error, offset, total} = useSelector(
        (state) => state.articles
    );

    const { id, ho, dic } = props;

    useEffect(() => {
        dispatch(fetchArticles({categoryId: id, sortBy: ho}));
        return () => {
            dispatch(clearArticles());
        }
    }, [dispatch, id, ho]);

    window.addEventListener('scroll',() => handleScroll(offset));

    // 实现无限下拉与阶段加载
    function handleScroll(offset){
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight;
        if (totalHeight * 0.67 < scrollY && offset < total && status === 'succeeded'){
            dispatch(fetchArticles({categoryId: id, sortBy: ho,
                offset: offset,
                limit: ((offset + 10) < total)? 10: (total - offset)
            }));
        }
    }

    const ref = useRef();

    let content;

    if (status === 'loading') {
        content = <div className="loader">Loading...</div>  // 做一个酷一点的动画
    } else if (status === 'error') {
        content = <div className="error">{error}</div>
    } else if (status === 'succeeded') {
        const articlesList = articles.map(
            (item, index) =>
                <Link to={`/article/${item.article_id}`} key={item.article_id + index}>
                    <li className="article-card-box">
                        <div className="article-meta-box">
                            <div className="auth-message-box">
                                <div className="auth-popover-box">
                                    <span>{item.author_user_info.user_name}</span>
                                </div>
                                <p className="dividing"/>
                                <span className="date">{
                                    new Date(parseInt(item.article_info.ctime) * 1000).toLocaleDateString()
                                }</span>
                            </div>
                        </div>
                        <div className="article-title-box">
                            {item.article_info.title}
                        </div>
                        <div className="article-wrapper">
                            <div className="article-info-box">
                                <div className="article-content-box" style={{"WebkitBoxOrient": "vertical"}}>
                                    {item.article_info.brief_content}
                                </div>
                                <img src={item.article_info.cover_image} data-title={item.article_info.title} alt="图片过期了"/>
                            </div>
                            <div className="article-action-wrapper">
                                <ul className="article-action-box">
                                    <li>
                                        <i className="iconfont icon-view">
                                            {'👀'}
                                        </i>
                                        <span>{item.article_info.view_count}</span>
                                    </li>
                                    <li>
                                        <i className="iconfont icon-digg">
                                            {'👍'}
                                        </i>
                                        <span>{item.article_info.digg_count}</span>
                                    </li>
                                </ul>
                                <div className="article-tag-list">
                                    <span>{dic[item.category_info.first_category_id]}</span>
                                    <span>{dic[item.category_info.second_category_id]}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <div className='line'/>
                </Link>
        )

        content =
            <ul className="article-list">
                {articlesList}
            </ul>
    }

    return (
        <div className="articles-container" ref={ref}>
            {content}
            <div className="bottom-container">
                到底了~~~
            </div>
        </div>
    );
};

export default ArticlesList;
