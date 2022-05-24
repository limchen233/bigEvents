const express = require('express')
const router = express.Router()

// 挂载路由
// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
const { route } = require('./user')

// 获取用户信息的基本路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', userinfo_handler.updateUserInfo)

module.exports = router
