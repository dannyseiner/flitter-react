import React, { useState } from 'react'
import axios from 'axios'


const Login = () => {

    const [login, setLogin] = useState({ display: "none" })
    const [register, setRegister] = useState({ display: "none" })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")


    const menu_control = (name) => {
        if (name == "login") {
            setRegister({ display: "none" })
            setLogin(login.display === "none" ? { display: "block" } : { display: "none" })
        }
        else {
            setLogin({ display: "none" })
            setRegister(register.display === "none" ? { display: "block" } : { display: "none" })
        }
    }

    const api_login = () => {
        axios.post('http://localhost:3001/login', {
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response)
                if (response.data.status) {
                    setStatus("false")
                } else {
                    setStatus("true")
                    sessionStorage.setItem('user', JSON.stringify(response.data[0]))
                    console.log(JSON.parse(sessionStorage.getItem('user')))
                }
            })
    }

    return (
        <div className="form">
            <div className="form-menu center">
                <button onClick={() => menu_control("login")}>Login</button>
                <button onClick={() => menu_control("register")}>Register</button>
            </div>

            {/* LOGIN */}
            <div style={login} className="form-box">
                <h3 style={{ textAlign: "center" }}>Login</h3>
                <label className="label" htmlFor="email">Email</label>
                <input className="input" id="email" type="email" onChange={e => setEmail(e.target.value)} />
                <label className="label" htmlFor="password">Password</label>
                <input className="input" id="password" type="password" onChange={e => setPassword(e.target.value)} />
                <div className="center">
                    <button className="loginButton" onClick={() => api_login()}>Login</button>
                </div>
            </div>



            {/* REGISTER */}
            <div style={register} className="form-box">
                <h3 style={{ textAlign: "center" }}>Register</h3>
                <label className="label" htmlFor="reg_email">Email</label>
                <input className="input" id="reg_email" type="email" />
                <label className="label" htmlFor="reg_password">Password</label>
                <input className="input" id="reg_password" type="password" />
                <div className="center">
                    <button className="loginButton" onClick={() => api_login()}>Login</button>
                </div>
            </div>
        </div >
    )
}

export default Login
