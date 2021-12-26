import React, { useState, useEffect } from 'react'
import PostHandler from '../Controllers/PostHandler'
import Config from '../config'
import { Link } from 'react-router-dom'

const Post = ({ match }) => {
    const [post_id] = useState(match.params.id)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [likedPost, setLikedPost] = useState("fa fa-heart");
    const [post, setPost] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState({
        data: []
    });

    useEffect(() => {
        PostHandler.get_post(post_id, setPost, setComments)
        PostHandler.is_post_liked(user.account_id, post_id, setLikedPost)
    }, [])

    const add_comment_recall = () => {
        PostHandler.add_comment(post_id, user.account_id, comment, setComment)
        PostHandler.get_post(post_id, setPost, setComments)
    }



    const render_comments = comments.data.map(comm => (
        <div key={comm.comment_id} class='comment-container'>
            <div className="comment-main-level">
                <div className="comment-avatar">
                    <img src={comm.decoded_image} alt="" className="comment-author-image" />
                    <Link to={`/profile/${comm.account_id}`} className='comment-author-name'>{comm.account_name} {post.post_author_id === comm.account_id ? <span className="badge">Author</span> : ""} </Link>
                </div>
                <div className="comment-box">
                    <div className="comment-content">
                        {comm.comment_content}
                    </div>
                    <div className="comment-footer">
                        <span>{new Date(comm.comment_created).toLocaleDateString("en-US", Config.format_options)}</span>
                        <i className="fa fa-reply"></i>
                        <i className="fa fa-heart"></i>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div>
            <div className="post-container" style={{ marginTop: "100px" }}>
                <div className="post-author">
                    <img src={post.profile_image_encoded} className="post-author-image" />
                    <Link to={`/profile/${post.post_author_id}`} className="post-author-name">{post.account_name}</Link>
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
            <div className="comment-form post-container">
                <textarea className="comment-form-textarea" onChange={e => setComment(e.target.value)} placeholder="Comment content"></textarea>
                <div className="comment-form-submit-container">
                    <button className="comment-form-submit" onClick={() => PostHandler.add_comment(post_id, user.account_id, comment, setComment)}><i class="fas fa-plus"></i></button>
                </div>

            </div>
            {render_comments}
        </div>
    )
}

export default Post
