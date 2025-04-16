import React, { useState } from 'react';
import axios from 'axios';
import './CaseSearch.css';

function CaseSearch() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [userStory, setUserStory] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCategoryClick = (category) => {
        console.log(`선택된 키워드: ${category}`);
        setSelectedCategory(category);
    };

    const handleSearch = async () => {
        if (!selectedCategory?.trim() || !userStory?.trim()) {
            alert("카테고리와 사연을 모두 입력하세요.");
            return;
        }

        setIsSearching(true);
        setErrorMessage('');
        setSearchResults([]);

        try {
            console.log("전송 데이터:", {
                user_story: userStory,
                query: selectedCategory,
            });

            const response = await axios.post(
                'http://localhost:8000/search_cases',
                { user_story: userStory, query: selectedCategory },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("응답 데이터:", response.data);
            setSearchResults([response.data]);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            setErrorMessage(error.response?.data?.error || "검색 중 오류가 발생했습니다.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="case-search-container">
            <h2 className="category-title">키워드를 선택하세요</h2>
            <div className="category-buttons">
                {['환불', '중고사기', '아르바이트', '채무', '부동산'].map((category) => (
                    <button
                        key={category}
                        className={`category-button ${selectedCategory === category ? 'active' : 'inactive'}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="사연을 입력하세요. (최대 500자)"
                    className="search-input"
                    value={userStory}
                    onChange={(e) => setUserStory(e.target.value)}
                />
                <button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? "검색 중..." : "검색"}
                </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="search-results">
                {searchResults.length === 0 && !errorMessage ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    searchResults.map((result, index) => (
                        <div key={index} className="result-card">
                            <h3>{result.사건명}</h3>
                            <p>사건번호: {result.사건번호}</p>
                            <p>법원명: {result.법원명}</p>
                            <p>판례내용: {result.판례내용}</p>
                            <p>유사도: {result.유사도.toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CaseSearch;
