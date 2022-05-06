const { send } = require('express/lib/response')
const db = require('../db')

// 注册新用户的处理函数
exports.register = (req, res) => {
	// 获取客户端提交到服务器的用户信息
	const userinfo = req.body

	// 对表单中的数据进行验证
	if (!userinfo.username || !userinfo.password) {
		return res.send({ status: 1, msg: '用户名或密码不能为空！' })
	}

	// 定义sql语句，查询用户名是否被占用
	const sqlStr = 'select * from ev_users where username = ?'
	db.query(sqlStr, userinfo.username, (err, result) => {
		// 执行sql语句失败
		if (err) {
			return res.send({ status: 1, msg: err.message })
		}
		// 判断用户名是否被占用
		if (result.length > 0) {
			return res.send({ status: 1, msg: '用户名被占用，请更换其它用户名！' })
		}

		return res.send('register successfully!')
	})

	// res.send('register ok')
}

// 登录的处理函数
exports.login = (req, res) => {
	res.send('login ok')
}
