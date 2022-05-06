const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const user_handler = require('../router_handler/user')
// 注册新用户
router.post('/register', user_handler.register)

// 登录
router.post('/login', user_handler.login)

// 将路由对象共享出去
module.exports = router
