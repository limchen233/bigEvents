// 文章路由模块
const express = require('express')
const router = express.Router()

// 引入文章列表处理函数
const artcate_handler = require('../router_handler/artcate')

// 获取文章分类列表数据和路由
/* router.get('/cates', (req, res) => {
	res.send('ok')
}) */

router.get('/cates', artcate_handler.getArtCate)

module.exports = router
