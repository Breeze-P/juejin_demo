import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from "../../states/categoriesSlice";
import MainContent from "../../features/main";
import "./style.css";

// 主容器、获取目录
const ViewContainer = () => {
    const dispatch = useDispatch();
    const {status, error} = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <div className="loader">Loading...</div>; // 做一个酷一点的动画、好像用不着做了
        // content = null;
    } else if (status === 'succeeded') {
        content = <MainContent />;
    } else if (status === 'error') {
        content = <div className="error">{error}</div>;
    }

    return (
        <div className="view-container">
            {content}
        </div>
    );
}

export default ViewContainer