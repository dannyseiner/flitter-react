import React, { useState, useEffect } from 'react'
import PostHandler from '../Controllers/PostHandler'
import { Link } from 'react-router-dom'

import axios from 'axios'
import url from '../config'
const Post = ({ match }) => {
    const [post_id] = useState(match.params.id)
    const [subComment, setSubComment] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [post, setPost] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState({
        data: []
    });

    useEffect(() => {
        PostHandler.get_post(post_id, setPost, setComments)
        setSubComment([])
    }, [])

    const add_comment_recall = () => {
        PostHandler.add_comment(post_id, user.account_id, comment, setComment)
        PostHandler.get_post(post_id, setPost, setComments)
    }


    const render_sub_comments = id => {
        console.log(id)
        axios.get(`${url}/post/${post_id}/comments/${id}`)
            .then(response => {
                if (response.data.length === 0) return
                // setSubComment(response.data)
                console.log(response)
            })


        // return (
        //     <li>
        //         <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
        //         <div className="comment-box">
        //             <div className="comment-head">
        //                 <h6 className="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
        //                 <span>hace 10 minutos</span>
        //                 <i className="fa fa-reply"></i>
        //                 <i className="fa fa-heart"></i>
        //             </div>
        //             <div className="comment-content">
        //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
        //             </div>
        //         </div>
        //     </li>
        // )

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
            {/* N TO M */}
            <ul className="comments-list reply-list">
                {render_sub_comments(comm.comment_id)}
                {subComment.map(comm => (
                    <h1>aa</h1>
                ))}

            </ul>
        </li>
    ))

    return (
        <div className="post-container box-shadow">
            <div className="comment-main-level">
                <div className="comment-box">
                    <div className="comment-head">
                        <h6 className="comment-name by-author"><Link to={`/profile/${post.post_author_id}`}>{post.account_name}</Link></h6>
                        <span>{post.post_created}</span>
                        <i className="fa fa-reply"></i>
                        <i className="fa fa-heart"></i>
                    </div>
                    <div className="comment-content">
                        {post.post_content}
                    </div>
                </div>
            </div>
            <div>
                <input type="text" onChange={e => setComment(e.target.value)} />
                <button type="button" onClick={() => add_comment_recall()}>Send</button>
            </div>
            {/* Comments */}
            <div className="comments-container">
                <ul id="comments-list" className="comments-list">
                    {render_comments}
                </ul>
            </div>
        </div>
    )
}

export default Post
