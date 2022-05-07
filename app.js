// 引入express
const express = require('express')

// 导入定义验证规则的包
// const joi = require('@hapi/joi') // 此包已弃用
const joi = require('joi')

// 创建express实例
const app = express()

// 引入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件(此中间件只能解析'application/x-www-form-urlencoded'格式的表单)
app.use(express.urlencoded({ extended: false }))

// 封装响应数据的中间件(路由模块之前配置)
app.use(function (req, res, next) {
	// status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
	res.cc = function (err, status = 1) {
		res.send({
			// 状态
			status,
			// 状态描述，判断 err 是 错误对象 还是 字符串
			message: err instanceof Error ? err.message : err
		})
	}
	next()
})

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
	// 验证失败导致的错误
	if (err instanceof joi.ValidationError) return res.cc(err)
	// 其它类型的错误
	res.cc(err)
})

// 启动服务器
app.listen(3007, () => {
	console.log('server running at http://127.0.0.1:3007')
})
