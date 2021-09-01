import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import ArticlesList from "./components/articlesList";
import Article from "../article/index";
import "./style.css";
import HeaderNavbar from "../header";
import FooterNavbar from "../footer";
import History from "./components/history";

// 主容器之子、装路由
const MainContent = () => {
    const {categories, footer_choice, header_a_choice, header_b_choice} = useSelector(
        (state) => state.categories
    );

    const id = (header_b_choice) ? header_b_choice : header_a_choice;
    const ho = footer_choice;
    const linTop = (header_a_choice) ? '100px' : '62px';                // 依照有无nav-B来挂在文章列表组件

    let dic = {};                                                       // 用于文章种类id和name的转换
    categories.map((item) => {
        dic[item.category_id] = item.category_name;
        if (item.category_id) {
            item.children.map((item) => {
                dic[item.category_id] = item.category_name;
                return null;
            })
        }
        return null;
    });

    let pathList = [];
    let routeList;
    for (let i = 0; i < categories.length; ++i) {
        if(i === 0) {
            pathList.push({path: '/hot/推荐', id: 0, ho: 'hot'});
            pathList.push({path: '/new/推荐', id: 0, ho: 'new'});
        } else {
            pathList.push({path: '/hot/' + categories[i].category_name, id: categories[i].category_id, ho: 'hot'});
            pathList.push({path: '/new/' + categories[i].category_name, id: categories[i].category_id, ho: 'new'});                            // test
            for (let j = 0; j < categories[i].children.length; ++j) {
                pathList.push({path: '/hot/' + categories[i].category_name + '/' +categories[i].children[j].category_name,
                    id: categories[i].children[j].category_id, ho: 'hot'});
                pathList.push({path: '/new/' + categories[i].category_name + '/' +categories[i].children[j].category_name,
                    id: categories[i].children[j].category_id, ho: 'new'});
            }
        }
    }

    routeList = pathList.map((item) =>
        <Route exact path={item.path} key={item.path}>
            <HeaderNavbar />
            <ArticlesList id={id} ho={ho} dic={dic}/>
            <FooterNavbar />
        </Route>
    );

    // 非文章页刷新返回home、挂载文章列表路由
    return (
        <div className="main-content" style={{marginTop: linTop}}>
            <Switch>
                {(header_a_choice || footer_choice !== 'hot')?
                    routeList:
                    <Route exact path='/hot/推荐' key='home'>
                        <HeaderNavbar />
                        <ArticlesList id={0} ho='hot' dic={dic}/>
                        <FooterNavbar />
                    </Route>
                    }
                <Route exact path="/article/:id" key="article">
                    <Article dicName={dic} />
                </Route>
                <Route exact path="/history" key="history">
                    <History dic={dic}/>
                    <FooterNavbar/>
                </Route>
                <Redirect from="/*" to="/hot/推荐"/>
            </Switch>
        </div>
    )
}

export default MainContent;