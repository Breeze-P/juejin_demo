import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/index';

// header 菜单组件
const HeaderNavbar = () => {
    const { categories } = useSelector(
        (state) => state.categories
    );

    const navbarList = [
        <Navbar type="header-A" categories={categories} key="header-A"/>,
        <Navbar type="header-B" categories={categories} key="header-B"/>
    ];

    return (
        <header className="header">
            <div className="header-navbar">
                {navbarList}
            </div>
        </header>
    );
}

export default HeaderNavbar;