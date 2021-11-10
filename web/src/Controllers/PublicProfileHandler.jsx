import axios from 'axios'
import url from '../config'
const get_user_data = (id, setProfile) => {
    axios.get(url + "/user/" + id)
        .then((response => {
            if (response.data.status === false) {
                window.location.replace("/notfound")
                return
            }
            setProfile(response)
        }))
}



const exporter = {
    get_user_data
}

export default exporter