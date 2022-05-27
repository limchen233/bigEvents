// 文章路由模块
const express = require('express')
const router = express.Router()

// 获取文章分类列表数据和路由
router.get('/cates', (req, res) => {
	res.send('ok')
})

module.exports = router
