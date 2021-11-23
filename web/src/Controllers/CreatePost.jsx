import config from '../config'
import axios from 'axios'
import User from '../Model/User'


const InsertPost = (title, text, setStatus) => {
    console.log("button clicked")
    axios.post(`${config.restapi}/createpost`, {
        author: User.getUserId(),
        title: title,
        text: text
    })
        .then(response => setStatus(response.data))
}

const exporter = {
    InsertPost
}

export default exporter