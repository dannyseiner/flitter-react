import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Apitest = () => {

    useEffect(() => {
        text_api_get("accounts", setTable)
        text_api_post()
    }, [])

    const [table, setTable] = useState({
        data: [],
        config: {}
    })
    const [post, setPost] = useState({
        data: {}
    })

    const text_api_get = (table, func) => {
        axios.get(`http://localhost:3001/table/${table}`)
            .then(function (response) {
                console.log(response)
                func(response)
            })
    }

    const text_api_post = () => {
        axios.post("http://localhost:3001/postTest", {
            title: " Testing post",
            status: "SEDING"
        })
            .then(function (response) {
                setPost(response)
            })
    }

    const render_table = table.data.map((item, i) => (
        <p key={i}>{JSON.stringify(item, null, 2)}</p>
    ))
    const spaceleft = (size) => {
        return { marginLeft: `${(size + 1) * 10}px` }
    }

    return (
        <div>
            <h3>Api Tests:</h3>
            <p style={spaceleft(1)}>API POST: {post.statusText} - {table.status}</p>
            <p style={spaceleft(2)}>POST[TITLE] - {post.data.title}</p>
            <p style={spaceleft(2)}>POST[STATUS] - {post.data.status}</p>
            <p style={spaceleft(2)}>POST[RESULT] - {post.data.result}</p>
            <h3>Database Test:</h3>
            <p style={spaceleft(2)}>API ({table.config.method}) : {table.statusText} - {table.status}</p>
            <p style={spaceleft(2)}>API DATABASE: {table.statusText} - {table.status}</p>
            <p style={spaceleft(2)}>API SERVER: {table.config.url}</p>
            <div style={spaceleft(3)}>{render_table}</div>
        </div >
    )
}

export default Apitest
