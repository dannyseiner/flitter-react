import axios from 'axios'
import url from '../config'
const passwordHash = require("password-hash")
const api_login = (email, password, setStatusLogin, statusLogin) => {
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
                sessionStorage.setItem('user', JSON.stringify(response.data[0]))
                console.log(JSON.parse(sessionStorage.getItem('user')))
                window.location.replace("/")
            }
        })
}


const api_register = (reg_email, reg_name, reg_password, reg_password_C, setstatusRegister) => {
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



const api_login_scripted = (isAdmin) => {
    axios.post(url + "/login", isAdmin ? { email: "admin@admin.com", password: "admin" } : { email: "dannyseiner@gmail.com", password: "admin" })
        .then(response => {
            sessionStorage.setItem('user', JSON.stringify(response.data[0]))
            console.log(JSON.parse(sessionStorage.getItem('user')))
            window.location.replace("/")
        })
}


const generate_qr_code = () => {
    console.log("generate qr - code")
}


const functions = {
    api_login,
    api_register,
    api_login_scripted,
    generate_qr_code
}



export default functions