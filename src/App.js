import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Card from './Card';
import Navbar from './Navbar';
import CaseSearch from './CaseSearch';
import Login from './Login';
import Community from './Community'; // 커뮤니티 페이지 추가
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="card-container">
                            <Card title="법령검색" description="법령 정보를 빠르게 찾아보세요" linkText="이동하기" linkUrl="/law-search" />
                            <Card title="판례검색" description="내 사연과 유사한 실제 판례를 알아보세요" linkText="이동하기" linkUrl="/case-search" />
                            <Card title="게시판" description="다른 사람들과 고민을 나누고 법률 상담을 받아보세요" linkText="이동하기" linkUrl="/community" />
                        </div>
                    }
                />
                <Route path="/case-search" element={<CaseSearch />} />
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
