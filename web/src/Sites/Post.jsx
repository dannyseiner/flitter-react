import React, { useState, useEffect } from 'react'
import PostHandler from '../Controllers/PostHandler'


const Post = ({ match }) => {
    const [post_id] = useState(match.params.id)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [post, setPost] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState({
        data: []
    });

    useEffect(() => {
        PostHandler.get_post(post_id, setPost, setComments)
    }, [])

    const add_comment_recall = () => {
        PostHandler.add_comment(post_id, user.account_id, comment, setComment)
        PostHandler.get_post(post_id, setPost, setComments)
    }

    const render_comments = comments.data.map(comm => (
        <div key={comm.comment_id}>
            <p>{JSON.stringify(comm)}</p>
        </div>
    ))

    return (
        <div>
            <p>{post.post_title}</p>
            <p>{post.account_name}</p>
            <h2>comments</h2>
            <div>
                <input type="text" onChange={e => setComment(e.target.value)} />
                <button type="button" onClick={() => add_comment_recall()}>Send</button>
            </div>
            {render_comments}

        </div>
    )
}

export default Post
