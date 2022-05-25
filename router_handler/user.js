const db = require('../db')

const bcrypt = require('bcryptjs')

// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入全局配置
const config = require('../config')

// 注册新用户的处理函数
exports.register = (req, res) => {
	// 获取客户端提交到服务器的用户信息
	const userinfo = req.body

	// 对表单中的数据进行验证
	if (!userinfo.username || !userinfo.password) {
		// return res.send({ status: 1, msg: '用户名或密码不能为空！' })
		return res.cc('用户名或密码不能为空！')
	}

	// 定义sql语句，查询用户名
	const sqlStr = 'select * from ev_users where username = ?'
	db.query(sqlStr, userinfo.username, (err, result) => {
		// 执行sql语句失败
		if (err) {
			// return res.send({ status: 1, msg: err.message })

			return res.cc(err)
		}
		// 判断用户名是否被占用
		if (result.length > 0) {
			// return res.send({ status: 1, msg: '用户名被占用，请更换其它用户名！' })
			return res.cc('用户名被占用，请更换其它用户名！')
		}

		// 对密码进行加密
		userinfo.password = bcrypt.hashSync(userinfo.password, 10)
		// console.log(userinfo)

		// 定义插入用户的 SQL 语句
		const sql = 'insert into ev_users set ?'

		// 执行sql语句
		db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, result) => {
			// 判断sql是否执行成功
			// if (err) return res.send({ status: 1, msg: err.message })
			if (err) return res.cc(err)

			// 判断影响行数是否为1
			// if (result.affectedRows !== 1) return res.send({ status: 1, msg: '注册用户失败！' })
			if (result.affectedRows !== 1) return res.cc('注册用户失败！')

			// 注册用户成功
			// res.send({ status: 0, msg: '注册成功！' })
			res.cc('注册成功！', 0)
		})
	})
}

// 登录的处理函数
exports.login = (req, res) => {
	// 接收表单数据
	const userinfo = req.body

	// 定义sql语句
	const sql = 'select * from ev_users where username = ?'

	// 执行sql语句
	db.query(sql, userinfo.username, (err, result) => {
		// 执行sql语句失败
		if (err) return res.cc(err)

		// 执行成功，但获取到的数据条数不等于1
		if (result.length !== 1) return res.cc('用户名不正确，登录失败！')

		// 判断密码是否正确
		const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)
		if (!compareResult) return res.cc('密码不正确，登录失败！')

		/* 服务器生成token */
		// 先处理需要生成token的对象(生成token时，去除密码和用户头像)
		const user = { ...result[0], password: '', user_pic: '' }
		// 对用户信息进行加密，生成token
		const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

		// 调用res.send()将Token响应到客户端
		res.send({
			status: 0,
			message: '登录成功',
			// 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
			token: 'Bearer ' + tokenStr
		})
	})
}
