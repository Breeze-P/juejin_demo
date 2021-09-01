// import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderAChoice, changeHeaderBChoice, changeFooterChoice } from '../../states/categoriesSlice';
import React from "react";

// 菜单组件，基于传入的type渲染不同的菜单
const Navbar = (props) => {
    const dispatch = useDispatch();

    const { type, categories } = props;
    const { footer_choice, header_a_choice, header_b_choice } = useSelector(
        (state) => state.categories
    );

    const handleClick = (e) => {
        switch (type) {
            case 'header-A':
                if (header_a_choice !== 0) {
                    window.scrollTo(0,0);
                }
                dispatch(changeHeaderAChoice(parseInt(e.target.value)));
                dispatch(changeHeaderBChoice(0));
                break;
            case 'header-B':
                window.scrollTo(0,0);
                dispatch(changeHeaderBChoice(parseInt(e.target.value)));
                break;
            case 'footer':
                window.scrollTo(0,0);
                dispatch(changeFooterChoice(e.target.value));
                dispatch(changeHeaderAChoice(0));
                dispatch(changeHeaderBChoice(0));
                break;
            default:
                break;
        }
    }

    let linkList = null;

    const dic = {
        0: "推荐",
        1: "后端",
        2: "前端",
        3: "Android",
        4: "iOS"
    }

    switch (type) {
        case 'header-A':
            linkList = categories.map(
                (item) =>
                    <Link to={('/' + footer_choice + '/' + item.category_name)} key={item.category_name}>
                        <button className={(item.category_id === header_a_choice) ? 'tag active' : 'tag'}
                                value={item.category_id} onClick={handleClick}>
                            {item.category_name}
                        </button>
                    </Link>
            );
            linkList.unshift(
                // eslint-disable-next-line
                <a key="logo">
                    <img className="logo" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6bdafd801c878b10edb5fed5d00969e9.svg" alt="掘金"/>
                </a>
            );
            break;
        case 'header-B':
            if (header_a_choice) {
                linkList = categories[header_a_choice].children.map(
                    (item) =>
                        <Link to={('/' + footer_choice + '/' + dic[header_a_choice]
                            + ((header_a_choice === 0 || item.category_name === 0) ? '': ('/' + item.category_name)))}  // you have to transform it to string
                              key={item.category_name}>
                            <button className={(item.category_id === header_b_choice) ? 'tag active' : 'tag'}
                                    value={item.category_id} onClick={handleClick}>
                                {item.category_name}
                            </button>
                        </Link>
                )
                linkList.unshift(
                    <Link to={('/' + footer_choice + '/' + dic[header_a_choice])}  // you have to transform it to string
                          key={'全部'}>
                        <button className={(0 === header_b_choice) ? 'tag active' : 'tag'}
                                value='0' onClick={handleClick}>
                            全部
                        </button>
                    </Link>
                )
            }
            break;
        case 'footer':
            const footerList = ['hot', 'new', 'history']
            const nameDic = {
                'hot': ['热门', '☄'],
                'new': ['最新', '⌚'],
                'history': ['历史', '⌛']
            }
            linkList = footerList.map((item) =>
                <Link to={!(item === 'history') ? ('/' + item + '/推荐') : ('/history')}  key={item}>
                    <div className="footer-hoho" >
                        <button className={(item === footer_choice) ? 'footer-tag active' : 'footer-tag'}
                                value={item} onClick={handleClick}>
                            <i className="footer-iconfont">
                                {nameDic[item][1]}
                            </i>
                            {nameDic[item][0]}
                        </button>
                    </div>
                </Link>
            )   // 记得加图标
            break;
        default:
            break;
    }

    return (
        <nav className={('nav-' + type)}>
            {linkList}
        </nav>
    );
}

export default Navbar;