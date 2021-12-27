import React from 'react'
import { Link } from 'react-router-dom'
import Config from '../config.js'
const Post = ({ post, postStyle, profileImage }) => {
    const userJson = sessionStorage.getItem('user')
    const user = JSON.parse(userJson)
    return (
        <div className="post-container" style={postStyle}>
            <div className="post-author">
                <img src={profileImage ? profileImage : post.profile_image_encoded} className="post-author-image" />
                <Link to={`/profile/${post.post_author_id}`} className="post-author-name">
                    {post.account_name}
                    {post.post_author_id === user.account_id ? <span className="badge">Me</span> : ""}
                </Link>
            </div>
            <div className="post-content">
                <Link to={`/post/${post.post_id}`} className="post-title">{post.post_title}</Link>
                <p className="post-content">{post.post_content}</p>
            </div>
            <div className="post-footer">
                <p className="post-created">{new Date(post.post_created).toLocaleDateString("en-US", Config.format_options)}</p>
                <div className="post-button-menu">
                    <button className="post-button comment"><i className="fas fa-comment"></i></button>
                    <button className="post-button like"><i className="fas fa-heart"></i></button>
                </div>
            </div>
        </div>
    )
}
export default Post
