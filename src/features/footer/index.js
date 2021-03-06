import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/index';
import './style.css';

// footer ่ๅๅ่กจ
const FooterNavbar = () => {
    const {categories} = useSelector(
        (state) => state.categories
    );

    return (
        <footer className="footer">
            <div className="footer-navbar">
                <Navbar type="footer" categories={categories}/>
            </div>
        </footer>
    );
}

export default FooterNavbar;