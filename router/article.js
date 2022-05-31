// 文章路由模块
const express = require('express')
const router = express.Router()

// 发布文章的路由
router.post('/add', (req, res) => {
	res.send('ok')
})

module.exports = router
