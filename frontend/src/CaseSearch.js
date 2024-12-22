import React, { useState } from 'react';
import axios from 'axios';
import './CaseSearch.css';

function CaseSearch() {
    // 상태 관리
    const [selectedCategory, setSelectedCategory] = useState(null); // 선택한 카테고리
    const [userStory, setUserStory] = useState(''); // 사용자 사연 입력
    const [searchResults, setSearchResults] = useState([]); // 검색 결과
    const [isSearching, setIsSearching] = useState(false); // 검색 중 상태
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지

    // 카테고리와 임베딩 파일 매핑
    const categoryToFileMap = {
        "고용": "1_embeddings.npz",
        "근로": "2_embeddings.npz",
        "교통사고": "3_embeddings.npz",
        "손해배상": "4_embeddings.npz",
        "채무": "5_embeddings.npz",
        "부동산": "6_embeddings.npz",
    };

    // 카테고리 선택 핸들러
    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // 선택한 카테고리 저장
    };

    // 검색 핸들러
    const handleSearch = async () => {
        // 입력값 검증
        if (!selectedCategory || !userStory.trim()) {
            alert("카테고리와 사연을 모두 입력하세요.");
            return;
        }

        setIsSearching(true); // 검색 상태 활성화
        setErrorMessage('');
        setSearchResults([]);

        try {
            // 백엔드 API 호출
            const response = await axios.post(
                'http://localhost:5000/api/similarity', // Flask 서버 주소
                { fileName: categoryToFileMap[selectedCategory] }, // 선택된 카테고리 파일명 전달
                { headers: { 'Content-Type': 'application/json' } }
            );

            // 결과 저장
            setSearchResults(response.data.results);
        } catch (error) {
            setErrorMessage("검색 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setIsSearching(false); // 검색 상태 종료
        }
    };

    return (
        <div className="case-search-container">
            <h2>판례 검색</h2>

            {/* 카테고리 버튼 */}
            <div className="category-buttons">
                {Object.keys(categoryToFileMap).map((category) => (
                    <button
                        key={category}
                        className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 사연 입력 */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="사연을 입력하세요. (최대 500자)"
                    value={userStory}
                    onChange={(e) => setUserStory(e.target.value)}
                />
                <button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? "검색 중..." : "검색"}
                </button>
            </div>

            {/* 오류 메시지 */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* 검색 결과 출력 */}
            <div className="search-results">
                {searchResults.length === 0 && !errorMessage ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    searchResults.map((result, index) => (
                        <div key={index} className="result-card">
                            <h3>{result.case_name}</h3> {/* 사건명 */}
                            <p>{result.summary}</p> {/* 판시사항 요약 (2줄) */}
                            <p>선고일자: {result.date}</p> {/* 선고일자 */}
                            {/* 유사도율을 백분율(%)로 표시 */}
                            <p>유사도율: {(result.similarity * 100).toFixed(2)}%</p>
                            <a
                                href={result.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                판례 보기
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CaseSearch;
