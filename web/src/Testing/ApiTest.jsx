import React, { useState, useEffect } from 'react'
import axios from 'axios'

// var passwordHash = require('password-hash');

const Apitest = () => {
    const api_url = "http://localhost:3001"
    useEffect(() => {
        text_api_get("accounts", setTable)
        text_api_get("posts", setTalbePosts)
        text_api_post()
    }, [])

    const [table, setTable] = useState({
        data: [],
        config: {}
    })
    const [post, setPost] = useState({
        data: {}
    })
    // TEST LOGIN HOOKS
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [status, setStatus] = useState("none")
    const [pingResult, setPingResult] = useState({
        data: []
    })
    const [pingDB, setPingDB] = useState("accounts")
    const [talbePosts, setTalbePosts] = useState({
        data: []
    })

    const text_api_get = (table, func) => {
        axios.get(`${api_url}/table/${table}`)
            .then(function (response) {
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

    const ping_db = () => {
        axios.get(`http://localhost:3001/table/${pingDB}`)
            .then((res) => {
                setPingResult(res)
            })
    }

    const test_login = () => {

        axios.post('http://localhost:3001/login', {
            email: email,
            password: pass
        })
            .then((response) => {
                console.log(response)
                if (response.data.status) {
                    setStatus("false")
                } else {
                    setStatus("true")
                }
            })
    }

    const render_request = (data) => data.map((item, i) => (
        <p key={i}>{JSON.stringify(item, null, 2)}</p>
    ))
    const spaceleft = (size) => {
        return { marginLeft: `${(size * 3) * 10}px` }
    }

    return (
        <div>
            <div>
                <h3>Login test</h3>
                <input type='text' onChange={e => setEmail(e.target.value)} />
                <input type="password" onChange={e => setPass(e.target.value)} />
                <button onClick={() => test_login()}>test login</button>
                <p>Login status: {status}</p>
            </div>
            <div>
                <h3>Database ping</h3>
                <select onChange={e => setPingDB(e.target.value)}>
                    <option value="accounts">accounts</option>
                    <option value="account_info">accounts_info</option>
                    <option value="posts">posts</option>
                    <option value="notifications">notifications</option>
                </select>
                <button onClick={() => ping_db()}>Ping</button>
                <br />
                <p style={spaceleft(2)}>{JSON.stringify(pingResult.data, null, 2)}</p>
            </div>

            <h3>API </h3>
            <p style={spaceleft(1)}>API POST: {post.statusText} - {table.status}</p>
            <p style={spaceleft(2)}>POST[TITLE] - {post.data.title}</p>
            <p style={spaceleft(2)}>POST[STATUS] - {post.data.status}</p>
            <p style={spaceleft(2)}>POST[RESULT] - {post.data.result}</p>
            <h3>Database Test:</h3>
            <p style={spaceleft(2)}>API ({table.config.method}) : {table.statusText} - {table.status}</p>
            <p style={spaceleft(2)}>API DATABASE: {table.statusText} - {table.status}</p>
            <p style={spaceleft(2)}>API SERVER: {table.config.url}</p>
            <div style={spaceleft(3)}>{render_request(table.data)}</div>
            <p style={spaceleft(2)}>Notifss</p>
            <div style={spaceleft(3)}>{render_request(talbePosts.data)}</div>
        </div >
    )
}

export default Apitest
