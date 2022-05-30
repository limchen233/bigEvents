// 文章路由模块
const express = require('express')
const router = express.Router()

// 引入文章列表处理函数
const artcate_handler = require('../router_handler/artcate')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { add_cate_schema } = require('../schema/artcate')

// 获取文章分类列表数据和路由
/* router.get('/cates', (req, res) => {
	res.send('ok')
}) */

router.get('/cates', artcate_handler.getArtCate)

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

module.exports = router