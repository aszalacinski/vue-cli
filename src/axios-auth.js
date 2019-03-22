import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://vue-update-73f39.firebaseio.com/'
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance