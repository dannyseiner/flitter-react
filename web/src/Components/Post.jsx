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
                    <input type='text' placeholder='Comment' />
                    <button><i className="fas fa-paper-plane"></i></button>
                    <button><i className="far fa-thumbs-up"></i></button>
                    <button><i className="fas fa-share"></i></button>
                </div>
            </div>

        </li>
    )
}

export default Post
