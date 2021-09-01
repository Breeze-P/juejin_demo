import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { fetchArticle, clearArticle } from './articleSlice';
import CommentsList from "./comments";
import "./style.css";
import {addHistory} from "../../states/historySlice";

// 渲染文章组件
const Article = (props) => {
    const { article, status, error } = useSelector((state) => state.articleDetail);
    const { footer_choice, header_a_choice, header_b_choice, } = useSelector((state) => state.categories);
    const { history } = useSelector((state) => state.history);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { dicName } = props;

    useEffect(() => {
        dispatch(fetchArticle(id));
        window.scrollTo(0,0);
        return () => {
            dispatch(clearArticle());
        };
    }, [id, dispatch]);

    const dic = {
        1: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/636691cd590f92898cfcda37357472b8.svg",
        2: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f597b88d22ce5370bd94495780459040.svg",
        3: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e108c685147dfe1fb03d4a37257fb417.svg",
        4: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/2c3fafd535a0625b44a5a57f9f536d77.svg",
        5: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg",
        6: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/74bd93adef7feff4fee26d08c0845b4f.svg"
    }
    let content;

    if (status === 'loading') {
        content = <div className="loader">Loading...</div>;
    } else if (status === 'error') {
        content = <div className="error">{error}</div>
    } else if (status === 'succeeded') {
        if (history.indexOf(article) === -1){
            dispatch(addHistory(article));
        }
        content =
            <div className="article-container">
                <div className="main-tab-bar-container">
                    <ul className="tab-list">
                        <Link to={`/${footer_choice}/${dicName[header_a_choice]}${(header_b_choice) ? `/${dicName[header_b_choice]}` : ''}`} className="tab-item">
                            <div className="return-return" onClick={() => {window.scrollTo(0,0)}}>
                                <i className="iconfont icon-exit">

                                </i>
                            </div>
                        </Link>
                        <li className="tab-item tab-title">
                            {article.article_info.title}
                        </li>
                        <li className="tab-item">
                            <i className="iconfont icon-dian">

                            </i>
                        </li>
                    </ul>
                </div>
                <div className="article-area">
                    <article className="article">
                        <div className="author-info-container">
                            <img className="author-avatar" src={article.author_user_info.avatar_large} alt="头像"/>
                            <div className="author-info-box">
                                <div className="author-name">
                                    <span className="name">{article.author_user_info.user_name}</span>
                                    <span className="author-level">
                                        <img src={dic[article.author_user_info.level]} alt={`level-${article.author_user_info.level}`}/>
                                    </span>
                                </div>
                                <div className="meta-box">
                                    <span>{new Date(parseInt(article.article_info.ctime) * 1000).toLocaleDateString()
                                    }</span>
                                    <span className="views-count">
                                        {`阅读 ${article.article_info.view_count}`}
                                    </span>
                                </div>
                            </div>
                            <button className="follow-button">关注</button>
                        </div>
                        <img className="article-hero" src={article.article_info.cover_image} alt="主题图片"/>
                        <h1 className="article-title">
                            {article.article_info.title}
                        </h1>
                        <div className="article-content" dangerouslySetInnerHTML={{__html:article.article_content}}>

                        </div>
                    </article>
                    <div className="tag-board-box">
                        <div className="tag-board">
                            <span className="tag-title">文章分类</span>
                            <span className="tag">{article.category_info.first_category_name}</span>
                        </div>
                        <div className="tag-board">
                            <span className="tag-title">文章标签</span>
                            <span className="tag">{article.category_info.second_category_name}</span>
                        </div>
                    </div>
                    <CommentsList id={id}/>
                </div>
                <div className="message-board">
                    <div className="comment-box">
                        <input type="text" name="comment" className="comment" placeholder="输入评论..."/>
                    </div>
                    <div className="message-box">
                        <span className="like-num">
                            <i className="iconfont icon-digg">
                                👍
                            </i>
                            {article.article_info.digg_count}
                        </span>
                        <span className="comment-nim">
                            <i className="iconfont icon-comment">
                                💬
                            </i>
                            {article.article_info.comment_count}
                        </span>
                    </div>
                </div>
            </div>
    }

    return (
        <div className="main-article-box">
            {content}
            <div className="bottom-container">
                到底了~~~
            </div>
        </div>
    )
}

export default Article;