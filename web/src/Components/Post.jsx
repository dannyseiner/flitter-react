import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Config from '../config.js'
import axios from 'axios'
const Post = ({ post, postStyle, profileImage }) => {
    const userJson = sessionStorage.getItem('user')
    const user = JSON.parse(userJson)
    const [likeButtonClass, setLikeButtonClass] = useState("far fa-heart")
    const [postStats, setPostStats] = useState({
        likes: 150,
        comments: 120
    })

    // GET POST STATS
    useEffect(() => {
        getPostStats()
    }, [likeButtonClass])

    const getPostStats = () => {
        axios.get(`${Config.restapi}/postStats/${post.post_id}`)
            .then(response => setPostStats({
                likes: response.data.likes[0].count === 0 ? "" : response.data.likes[0].count,
                comments: response.data.comments[0].count === 0 ? "" : response.data.comments[0].count
            }))
    }

    // IS THE POST LIKED ??? 
    useEffect(() => {
        isPostLiked()
    }, [])


    const isPostLiked = () => {
        axios.post(`${Config.restapi}/isliked`, {
            postId: post.post_id,
            accId: user.account_id
        }).then(response => {
            if (response.data.isliked) setLikeButtonClass("fas fa-heart like")
        })
    }

    const likePost = () => {
        axios.post(`${Config.restapi}/likePost`, {
            postId: post.post_id,
            accId: user.account_id
        }).then(response => {
            if (likeButtonClass === "far fa-heart") setLikeButtonClass("fas fa-heart like")
            else setLikeButtonClass("far fa-heart")
        })
    }

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
                    <button className="post-button comment" style={postStats.comments === "" ? { display: "none" } : { display: "inline" }}>
                        <span className="post-button-count">{postStats.comments}</span>
                        <i className="fas fa-comment"></i>
                    </button>
                    <button className="post-button" onClick={() => likePost()}>
                        <span className="post-button-count">{postStats.likes}</span>
                        <i className={likeButtonClass}></i>
                    </button>
                </div>
            </div>
        </div >
    )
}
export default Post
