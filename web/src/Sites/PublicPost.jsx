import React, { useState, useEffect } from 'react'
import PostHandler from '../Controllers/PostHandler'
import Config from '../config'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
const Post = ({ match }) => {
    const [post_id] = useState(match.params.id)
    const [post, setPost] = useState({})
    const [postStats, setPostStats] = useState({
        likes: 150,
        comments: 120
    })
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState({
        data: []
    });

    useEffect(() => {
        PostHandler.get_post(post_id, setPost, setComments)
    }, [comment])

    // GET POST STATS
    useEffect(() => {
        getPostStats()
    }, [])

    const getPostStats = () => {
        axios.get(`${Config.restapi}/postStats/${match.params.id}`)
            .then(response => setPostStats({
                likes: response.data.likes[0].count === 0 ? "" : response.data.likes[0].count,
                comments: response.data.comments[0].count === 0 ? "" : response.data.comments[0].count
            }))
    }

    const check_for_covid_info = () => {
        if (Object.keys(post).length === 0) return
        let title = check_for_covid_in_textt(post.post_title)
        let content = check_for_covid_in_textt(post.post_content)
        if (title || content) {
            return <div className="covid-alert">
                <i className="fas fa-exclamation-triangle"></i>
                <p>
                    This post includes covid-19 informations. To verify them, visit <Link to='/covid'>global sources</Link>. Incase of disinformation, please report this post.
                </p>
            </div>
        }
    }

    const check_for_covid_in_textt = (txt) => {
        let tmp = txt.replace(/[^a-zA-Z ]/g, "")
        tmp = tmp.toLowerCase()
        tmp = tmp.replace(/[0-9]/g, "")
        tmp = tmp.replace(/\s/g, "")
        return tmp.includes("covid")
    }


    const render_comments = comments.data.map(comm => (
        <div key={comm.comment_id} className='comment-container'>
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


    const delete_post = () => {
        axios.post(`${config.restapi}/deletePost`, {
            postId: match.params.id
        })
            .then(response => window.location.replace('/'))
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <div className="post-container" >
                <div className="post-author">
                    <img src={post.profile_image_encoded} className="post-author-image" />
                    <Link to={`/profile/${post.post_author_id}`} className="post-author-name">{post.account_name}</Link>
                </div>
                <div className="post-content">
                    <Link to={`/post/${post.post_id}`} className="post-title">{post.post_title}</Link>
                    <p className="post-content">{post.post_content}</p>
                    {check_for_covid_info()}
                </div>
                <div className="post-footer">
                    <p className="post-created">{new Date(post.post_created).toLocaleDateString("en-US", Config.format_options)}</p>
                    <div className="post-button-menu">
                        <button className="post-button comment" style={postStats.comments === "" ? { display: "none" } : { display: "inline" }}>
                            <span className="post-button-count">{postStats.comments}</span>
                            <i className="fas fa-comment"></i>
                        </button>
                        <button className="post-button like">
                            <span className="post-button-count">{postStats.likes}</span>
                            <i className={"fa fa-heart"}></i>
                        </button>
                    </div>
                </div>
            </div>
            {render_comments}
        </div>
    )
}

export default Post
