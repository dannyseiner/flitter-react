import React from 'react'
import { Link } from 'react-router-dom'
const Post = ({ post }) => {

    const format_options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    console.log(post)
    return (
        <li className="timeline-event" key={post.post_id}>
            <label className="timeline-event-icon"></label>
            <div className="timeline-event-copy">
                <p className="timeline-event-thumbnail">{new Date(post.post_created).toLocaleDateString("en-US", format_options)}</p>
                <Link to={`post/${post.post_id}`}><h3>{post.post_title}</h3></Link>
                <h4>{post.account_name}</h4>
                <p>{post.post_content}</p>
                <div className='post-comments'>
                    <input className="post-comment" type='text' placeholder='Comment' />
                    <button className="post-icon" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}><i className="fas fa-paper-plane"></i></button>
                    <div style={{ display: "inline-block", float: "right" }}>
                        <button className="post-icon"><i className="far fa-thumbs-up"></i></button>
                        <button className="post-icon"><i className="fas fa-share"></i></button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Post
