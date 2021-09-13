import Mock from 'mockjs'

Mock.mock('http://localhost:3000/admin', 'get', {
    'name': '这是后端的数据'
})