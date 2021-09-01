import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, clearComments } from '../commentsSlice';

// 渲染评论组件
const CommentsList = (props) => {
    const {comments, status, error, offset, total} = useSelector((state) => state.comments);
    const dispatch = useDispatch();
    const { id } = props;

    // 实现无限下拉与阶段加载
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight;
        if (totalHeight * 0.9 < scrollY && offset < total && status === 'succeeded'){
            dispatch(fetchComments({articleId: id,
                offset: offset,
                limit: ((offset + 10) < total)? 10: (total - offset)
            }));
        }
    }, [dispatch, id, status, total, offset])

    useEffect(() => {
        dispatch(fetchComments({articleId: id}));
        return () => {
            dispatch(clearComments());
        };
    }, [id, dispatch]);

    useEffect(() => {
        window.addEventListener('scroll',handleScroll);
        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[offset, handleScroll])

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
        content =
            comments.map((comment, index) =>
                <li className="comment-board" key={comment.comment_id + index}>
                    <div className="user-popover-box">
                        <img src={comment.user_info.avatar_large} alt="头像"/>
                    </div>
                    <div className='content-box'>
                        <div className="meta-box">
                            {/* eslint-disable-next-line react/style-prop-object */}
                            <span className="name">{comment.user_info.user_name}</span>
                            <span className="level">
                                    {(comment.user_info.level) ? <img src={dic[comment.user_info.level]} alt="level"/>: null}
                                </span>
                            <span className="position">
                                {comment.user_info.job_title}
                                </span>
                        </div>
                        <div className="content">
                            {comment.comment_info.comment_content}
                        </div>
                        <div className="reply-state">
                                <span className="time">{new Date(parseInt(comment.comment_info.ctime) * 1000).toLocaleDateString()
                                }</span>
                            <div className="action-box">
                                <div className="like-action action">

                                </div>
                                <div className="comment-action action">

                                </div>
                            </div>
                        </div>
                        {(comment.reply_infos.length)?
                            <ul className="sub-comment-list">
                                {comment.reply_infos.map((reply, index) =>
                                        <li className="sub-comment-box" key={reply.reply_id + index}>
                                            <div className="user-popover-box">
                                                <img src={reply.user_info.avatar_large} alt="头像"/>
                                            </div>
                                            <div className='content-box'>
                                                <div className="meta-box">
                                                    {/* eslint-disable-next-line react/style-prop-object */}
                                                    <span className="name">{comment.user_info.user_name}</span>
                                                    <span className="level">
                                                {(reply.user_info.level) ? <img src={dic[reply.user_info.level]} alt="level"/>: null}
                                                </span>
                                                    <span className="position">
                                                {reply.user_info.job_title}
                                                 </span>
                                                </div>
                                                <div className="content">
                                                    {reply.reply_info.reply_content}
                                                </div>
                                                <div className="reply-state">
                                <span className="time">{new Date(parseInt(reply.reply_info.ctime) * 1000).toLocaleDateString()
                                }</span>
                                                </div>
                                            </div>
                                        </li>
                                )}
                            </ul> : null
                        }

                    </div>
                </li>
            )
    }

    return (
        <ul className="comment-list-box">
            {content}
        </ul>
    )
}

export default CommentsList;