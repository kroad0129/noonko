import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="left-section">
                <span className="menu-text">메뉴</span>
                <Link to="/" className="home-button">홈</Link>
            </div>
            <div className="center-section">
                <Link
                    to="/law-search"
                    className={`nav-link ${location.pathname === '/law-search' ? 'active' : ''}`}
                >
                    법령검색
                </Link>
                <Link
                    to="/case-search"
                    className={`nav-link ${location.pathname === '/case-search' ? 'active' : ''}`}
                >
                    판례검색
                </Link>
                <Link
                    to="/community"
                    className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`}
                >
                    게시판
                </Link>
            </div>
            <button onClick={handleLoginClick} className="login-button">로그인</button>
        </nav>
    );
}

export default Navbar;
