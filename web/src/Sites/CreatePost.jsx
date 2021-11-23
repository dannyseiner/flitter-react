import React, { useState } from 'react'

const CreatePost = () => {
    const [postTitle, setPostTitle] = useState("")
    const [postText, setPostText] = useState("")
    return (
        <div className='home-container box-shadow'>
            <p>create post</p>
            <form>
                <input type="text" onChange={e => setPostTitle(e.target.value)} />
                <input type="text" onChange={e => setPostText(e.target.value)} />
                <button>Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost
