// 文章路由模块
const express = require('express')
const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema } = require('../schema/article')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处路径的核心模块
const path = require('path')

// 创建multer实例对象,通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 发布文章的路由
/* router.post('/add', (req, res) => {
	res.send('ok')
}) */

// 导入路由处理模块
const article_handler = require('../router_handler/article')

// router.post('/add', article_handler.addArticle)

/* 发布新文章的路由
  upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
  将文件类型的数据，解析并挂载到 req.file 属性中
  将文本类型的数据，解析并挂载到 req.body 属性中 
*/
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

module.exports = router
