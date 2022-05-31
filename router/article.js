// 文章路由模块
const express = require('express')
const router = express.Router()

// 发布文章的路由
/* router.post('/add', (req, res) => {
	res.send('ok')
}) */

// 导入路由处理模块
const article_handler = require('../router_handler/article')

router.post('/add', article_handler.addArticle)

module.exports = router
