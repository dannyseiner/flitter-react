import React, { useState } from 'react'
import Handler from '../Controllers/CreatePost'

const CreatePost = () => {
    const [postTitle, setPostTitle] = useState("")
    const [postText, setPostText] = useState("")
    const [status, setStatus] = useState({ status: false })
    return (
        <div className='home-container'>
            <form className='insert-post box-shadow'>
                <h3>Create Post</h3>
                <div className="insert-port-form">
                    <input type="text" placeholder='Title' className="insert-post-input" onChange={e => setPostTitle(e.target.value)} />
                    <textarea placeholder='Text' className="insert-post-textarea" onChange={e => setPostText(e.target.value)} ></textarea>

                    {/* <div className="insert-from-submit-div">
                        <button type="button" className="insert-post-button" onClick={() => Handler.InsertPost(postTitle, postText, setStatus)}>Create Post</button>
                    </div>  */}

                    <div className="insert-custom-button">
                        <a class="white" href="#" onClick={() => Handler.InsertPost(postTitle, postText, setStatus)}>
                            <p><span class="bg"></span><span class="base"></span><span class="text">Post</span></p>
                        </a>

                    </div>
                    <div className="insert-status" style={status.status ? { display: "block" } : { display: "none" }}>
                        status
                    </div>
                </div>

            </form>
        </div>
    )
}

export default CreatePost
