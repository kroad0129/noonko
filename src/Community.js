import React, { useState } from 'react';
import './Community.css';

function Community() {
    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newImage, setNewImage] = useState('');

    const handleAddPost = () => {
        const newPost = {
            id: posts.length + 1,
            title: newTitle,
            content: newContent,
            author: newAuthor,
            views: 0,
            likes: 0,
            comments: 0,
            image: newImage,
        };
        setPosts([newPost, ...posts]);
        setNewTitle('');
        setNewContent('');
        setNewAuthor('');
        setNewImage('');
    };

    return (
        <div className="community-container">
            <h1>커뮤니티</h1>
            <div className="new-post">
                <h2>게시물 작성</h2>
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="작성자를 입력하세요"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                />
                <textarea
                    placeholder="내용을 입력하세요"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="이미지를 입력하세요 (선택)"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                />
                <button onClick={handleAddPost}>게시물 작성</button>
            </div>
            <div className="post-list">
                {posts.length === 0 ? (
                    <p>작성된 게시물이 없습니다.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="post-card">
                            {post.image && (
                                <img src={post.image} alt="게시물 이미지" className="post-image" />
                            )}
                            <div className="post-content">
                                <h2 className="post-title">{post.title}</h2>
                                <p className="post-author">작성자: {post.author}</p>
                                <p className="post-text">{post.content}</p>
                                <div className="post-stats">
                                    <span>조회수: {post.views}</span>
                                    <span>좋아요: {post.likes}</span>
                                    <span>댓글수: {post.comments}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Community;
