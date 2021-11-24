import React, { useState } from 'react'
import Authentification from '../Controllers/Authentification'
import { Link } from 'react-router-dom'
const Login = () => {
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
                                <label htmlFor="email">Email or Username</label>
                                <input type="email" id="email" name="email" required="required" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required="required" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-remember">
                                    <input type="checkbox" />Remember Me
                                </label><Link to='/login' className="form-recovery">Forgot Password?</Link>
                            </div>
                            <p className="form-group">
                                <button onClick={() => Authentification.generate_qr_code}>Log In with app</button>
                            </p>

                            <div className="form-group">
                                <button type="button" disabled={statusLogin.disabled} onClick={() => Authentification.api_login(email, password, setStatusLogin, statusLogin)} >Log In</button>
                                {/* <button type="button" style={{ marginTop: "10px" }} onClick={() => Authentification.api_login_scripted(true)} >Admin</button>
                                <button type="button" style={{ marginTop: "10px" }} onClick={() => Authentification.api_login_scripted(false)} >Standard</button> */}
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
                                <button type="button" onClick={() => Authentification.api_register(reg_email, reg_name, reg_password, reg_password_C, setstatusRegister)}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
