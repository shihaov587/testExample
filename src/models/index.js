import http from '../request/http'

export default {
    get (data) {
        return http({
            url: '/admin',
            method: 'get',
            params: data
        })
    }
}