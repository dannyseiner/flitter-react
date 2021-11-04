import React, { useState } from 'react'
import axios from 'axios'
const passwordHash = require("password-hash")

const Login = () => {
    // CONTROL HOOKS
    const [login, setLogin] = useState({ display: "none" })
    const [register, setRegister] = useState({ display: "none" })
    // STATUS HOOKS
    const [statusLogin, setStatusLogin] = useState({ status: false, content: "", display: "none" });
    const [statusRegister, setstatusRegister] = useState({ status: false, content: "", display: "none" });
    // LOGIN HOOKS
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // REGISTER HOOKS
    const [reg_email, setReg_email] = useState("");
    const [reg_name, setReg_name] = useState("");
    const [reg_password, setReg_password] = useState("");



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
                    setLogin({ status: false, content: "Incorrect email or password!", display: "block" })

                } else {
                    setLogin({ status: true, content: "Succesfuly logged in!", display: "block" })
                    sessionStorage.setItem('user', JSON.stringify(response.data[0]))
                    console.log(JSON.parse(sessionStorage.getItem('user')))
                    window.location.replace("/")
                }
            })
    }

    const api_reigster = () => {
        axios.post("http://localhost:3001/register", {
            email: reg_email,
            username: reg_name,
            password: passwordHash.generate(reg_password)
        })
            .then((response) => {
                console.log(response)
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
                <input className="input" onChange={e => setReg_email(e.target.value)} id="reg_email" type="email" />

                <label className="label" htmlFor="reg_name">Name</label>
                <input className="input" onChange={e => setReg_name(e.target.value)} id="reg_name" type="text" />

                <label className="label" htmlFor="reg_password">Password</label>
                <input className="input" onChange={e => setReg_password(e.target.value)} id="reg_password" type="password" />

                <div className="center">
                    <button className="loginButton" onClick={() => api_reigster()}>Register</button>
                </div>
            </div>
            <div className="status" style={{ display: statusLogin.display }}>
                <p className="status-content">asd</p>
            </div>
        </div >
    )
}

export default Login
