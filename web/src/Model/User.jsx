const getter = sessionStorage.getItem("user")
const user = JSON.parse(getter)

const getUser = () => {
    return user
}

const getUserId = () => {
    return user.account_id
}
const exporter = {
    getUser,
    getUserId
}

export default exporter