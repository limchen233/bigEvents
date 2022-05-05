// 引入express
const express = require('express')

// 创建express实例
const app = express()

// 引入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件(此中间件只能解析'application/x-www-form-urlencoded'格式的表单)
app.use(express.urlencoded({ extended: false }))

// 启动服务器
app.listen(3007, () => {
	console.log('server running at http://127.0.0.1:3007')
})
