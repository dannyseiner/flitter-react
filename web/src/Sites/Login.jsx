import React, { useState } from 'react'
import axios from 'axios'
import url from '../config'
const passwordHash = require("password-hash")

const Login = () => {
    // CONTROL HOOKS
    const [login, setLogin] = useState({ display: "none" })
    const [register, setRegister] = useState({ display: "none" })
    // STATUS HOOKS
    const [statusLogin, setStatusLogin] = useState({ display: "none", failed: 0, disabled: false });
    const [statusRegister, setstatusRegister] = useState({ display: "none", message: "" });
    // LOGIN HOOKS
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // REGISTER HOOKS
    const [reg_email, setReg_email] = useState("");
    const [reg_name, setReg_name] = useState("");
    const [reg_password, setReg_password] = useState("");
    const [reg_password_C, setReg_password_C] = useState("");



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
        axios.post(url + '/login', {
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response.data.status)
                if (statusLogin.failed === 5) {
                    setStatusLogin({ display: "block", failed: statusLogin.failed, message: "You must wait before trying again!", disabled: true })
                    setTimeout(() => {
                        setStatusLogin({ display: "block", failed: 0, message: "You must wait before trying again!", disabled: false })
                    }, 10000)
                    return
                }
                if (response.data.status === false) {
                    setStatusLogin({ display: "block", failed: statusLogin.failed + 1, message: "Incorrect email or password!" })
                    console.log("login failed")
                    return

                } else {
                    setLogin({ status: true, content: "Succesfuly logged in!", display: "block" })
                    sessionStorage.setItem('user', JSON.stringify(response.data[0]))
                    console.log(JSON.parse(sessionStorage.getItem('user')))
                    window.location.replace("/")
                }
            })
    }
    const api_login_scripted = (isAdmin) => {
        axios.post(url + "/login", isAdmin ? { email: "admin@admin.com", password: "admin" } : { email: "dannyseiner@gmail.com", password: "admin" })
            .then(response => {
                sessionStorage.setItem('user', JSON.stringify(response.data[0]))
                console.log(JSON.parse(sessionStorage.getItem('user')))
                window.location.replace("/")
            })
    }
    const api_reigster = () => {
        if (reg_password !== reg_password_C) {
            setstatusRegister({ display: "block", message: "Passwords must match!" })
            return
        }
        axios.post(url + "/register", {
            email: reg_email,
            username: reg_name,
            password: passwordHash.generate(reg_password)
        })
            .then((response) => {
                if (response.data.status === false) {
                    setstatusRegister({ display: "block", message: "Registration failed!" })
                    return
                } else {
                    setstatusRegister({ display: "block", message: "Account was succesfully created! Log in :)" })
                }
                console.log(response)
            })
    }


    return (
        <div>
            <div className="form">
                <div className="form-toggle"></div>
                <div className="form-panel one">
                    <div className="form-header">
                        <h1>Account Login</h1>
                    </div>
                    <div className="form-content">
                        <form>
                            <div className="status-aut-log" style={statusLogin}>{statusLogin.message}</div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required="required" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required="required" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-remember">
                                    <input type="checkbox" />Remember Me
                                </label><a className="form-recovery" href="#">Forgot Password?</a>
                            </div>
                            <div className="form-group">
                                <button type="button" disabled={statusLogin.disabled} onClick={() => api_login()} >Log In</button>
                                <button type="button" style={{ marginTop: "10px" }} onClick={() => api_login_scripted(true)} >Admin</button>
                                <button type="button" style={{ marginTop: "10px" }} onClick={() => api_login_scripted(false)} >Standard</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="form-panel two">
                    <div className="form-header">
                        <h1>Register Account</h1>
                    </div>
                    <div className="form-content" style={{ paddingBottom: "20px" }}>
                        <form>
                            <div className="status-aut-reg" style={{ display: statusRegister.display }}>{statusRegister.message}</div>
                            <div className="form-group">
                                <label htmlFor="reg-username">Username</label>
                                <input type="text" id="reg-username" name="reg-username" required="required" onChange={e => setReg_name(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-password">Password</label>
                                <input type="password" id="reg-password" name="reg-password" required="required" onChange={e => setReg_password(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-cpassword">Confirm Password</label>
                                <input type="password" id="reg-cpassword" name="reg-cpassword" required="required" onChange={e => setReg_password_C(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reg-email">Email Address</label>
                                <input type="email" id="reg-email" name="reg-email" required="required" onChange={e => setReg_email(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={() => api_reigster()}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
