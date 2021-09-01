import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {clearHistory} from "../../../../states/historySlice";
import {Link} from "react-router-dom";

// 历史组件，浏览浏览过的文章列表
const History = (props) => {
    const dispatch = useDispatch();

    const { history } = useSelector(
        (state) => state.history
    );

    const { dic } = props;

    let content;

    if (history.length > 0) {
        const historyList = history.map(
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
                {historyList}
            </ul>
    } else {
        content = null;
    }

    return (
        <div className="articles-container">
            <div className="main-tab-bar-container">
                <ul className="tab-list">
                    <li className="tab-item">
                    </li>
                    <li className="tab-item tab-title">
                        历史记录
                    </li>
                    <li className="tab-item">
                        <button className="clear-history" onClick={() => dispatch(clearHistory())}>
                            删除历史
                        </button>
                    </li>
                </ul>
            </div>
            {content}
            <div className="bottom-container">
                到底了~~~
            </div>
        </div>
    );
};

export default History;