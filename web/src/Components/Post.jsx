import React from 'react'
import { Link } from 'react-router-dom'
const Post = ({ post }) => {

    const format_options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <li className="timeline-event" key={post.post_id}>
            <label className="timeline-event-icon"></label>
            <div className="timeline-event-copy">
                <p className="timeline-event-thumbnail">{new Date(post.post_created).toLocaleDateString("en-US", format_options)}</p>
                <Link to={`post/${post.post_id}`}><h3>{post.post_title}</h3></Link>
                <Link to={`profile/${post.post_author_id}`}><h4>{post.account_name}</h4></Link>
                <p>{post.post_content}</p>
                <div className='post-comments'>
                    {/* <div style={{ display: "inline-block", float: "right" }}>
                        <button className="post-icon"><i className="far fa-heart"></i></button>
                        <button className="post-icon"><i className="fas fa-share"></i></button>
                    </div> */}
                </div>
            </div>
        </li>
    )
}

export default Post
