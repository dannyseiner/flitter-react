import React, { useState, useEffect } from 'react'
import PostHandler from '../Controllers/PostHandler'
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
        <li key={comm.comment_id}>
            <div className="comment-main-level">
                <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
                <div className="comment-box">
                    <div className="comment-head">
                        {comm.account_id === post.post_author_id ? <h6 className="comment-name by-author"><Link to={`/profile/${comm.account_id}`}>{comm.account_name}</Link></h6> : <h6 className="comment-name"><Link to={`/profile/${comm.account_id}`}>{comm.account_name}</Link></h6>}
                        <span>{comm.comment_created}</span>
                        <i className="fa fa-reply"></i>
                        <i className="fa fa-heart"></i>
                    </div>
                    <div className="comment-content">
                        {comm.comment_content}
                    </div>
                </div>
            </div>
        </li>
    ))

    return (
        <div className="post-container box-shadow">
            <div className="comment-main-level">
                <div className="comment-box">
                    <div className="comment-head">
                        <h6 className="comment-name by-author"><Link to={`/profile/${post.post_author_id}`}>{post.account_name}</Link></h6>
                        <span>{post.post_created}</span>
                        {/* <button><i className="fa fa-reply"></i></button> */}
                        {/* <button onClick={() => PostHandler.like_comment(post_id, user.account_id, setLikedPost)}><i className={likedPost}></i></button> */}

                    </div>
                    <h4 style={{ fontSize: "30px", marginLeft: "30px" }}>{post.post_title}</h4>
                    <div className="comment-content">
                        {post.post_content}
                    </div>

                </div>
            </div>
            <div>


                <div className="placement" style={{ display: "inline" }}>
                    <div onClick={() => PostHandler.like_comment(post_id, user.account_id, setLikedPost)} className={likedPost}></div>
                </div>
                <div className="add-comment">
                    <input type="text" onChange={e => setComment(e.target.value)} />
                    <button type="button" onClick={() => add_comment_recall()}>Send</button>
                </div>
            </div>
            <div className="comments-container">
                <ul id="comments-list" className="comments-list">
                    {render_comments}
                </ul>
            </div>
        </div>
    )
}

export default Post
