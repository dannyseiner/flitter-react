import axios from 'axios'
import config from '../config'
const passwordHash = require("password-hash")
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const api_login = (email, password, setStatusLogin, statusLogin) => {
    axios.post(config.restapi + '/login', {
        email: email,
        password: password
    })
        .then((response) => {
            if (statusLogin.failed === 5) {
                setStatusLogin({ display: "block", failed: statusLogin.failed, message: "You must wait before trying again!", disabled: true })
                setTimeout(() => {
                    setStatusLogin({ display: "block", failed: 0, message: "You must wait before trying again!", disabled: false })
                }, 10000)
                return
            }
            if (response.data.status === false) {
                setStatusLogin({ display: "block", failed: statusLogin.failed + 1, message: "Incorrect email or password!" })
                return

            } else {
                sessionStorage.setItem('user', JSON.stringify(response.data[0]))
                window.location.replace("/")
            }
        })
}
function hasNumber(myString) {
    return /\d/.test(myString);
}

const api_register = (reg_email, reg_name, reg_password, reg_password_C, setstatusRegister) => {
    if (reg_password !== reg_password_C) {
        setstatusRegister({ display: "block", message: "Passwords must match!" })
        return
    }
    if (reg_password.length < 6) {
        setstatusRegister({ display: "block", message: "Passwords must have atleast 6 characters!" })
        return
    }
    if (!hasNumber(reg_password)) {
        setstatusRegister({ display: "block", message: "Passwords must have atleast 1 number!" })
        return
    }
    axios.post(config.restapi + "/register", {
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
        })
}



const api_login_scripted = (isAdmin) => {
    axios.post(config.restapi + "/login", isAdmin ? { email: "admin@admin.com", password: "admin" } : { email: "dannyseiner@gmail.com", password: "admin" })
        .then(response => {
            sessionStorage.setItem('user', JSON.stringify(response.data[0]))
            window.location.replace("/")
        })
}

const fast_access = (appLogin, setAppLogin) => {
    axios.post(`${config.restapi}/fastaccess`, {
        id: appLogin.id,
        status: 0,
        ipaddress: appLogin.ipaddress
    })
    let authChecker = setInterval(() => {
        axios.post(`${config.restapi}/fastaccess`, {
            id: appLogin.id,
            status: 2,
            ipaddress: appLogin.ipaddress
        }).then(response => {
            // console.log(response, "ass")
            if (response.data.length != 0) {
                axios.post(`${config.restapi}/fastaccess`, {
                    id: appLogin.id,
                    status: 3,
                    account_id: response.data[0].account_id
                }).then(resp => {
                    sessionStorage.setItem("user", JSON.stringify(resp.data[0]))
                    window.location.replace("/")
                })
            }
        })
    }, 3000)
}

const functions = {
    api_login,
    api_register,
    api_login_scripted,
    fast_access,
}



export default functions