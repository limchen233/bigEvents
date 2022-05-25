// 导入数据库操作模块
const db = require('../db/index')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
	// 定义查询用户信息的sql语句(不包括密码)
	const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'

	// 执行sql语句
	db.query(sql, req.user.id, (err, result) => {
		// sql执行失败
		if (err) return res.cc(err)

		// sql执行成功，但查询结果为空
		if (result.length !== 1) return res.cc('获取用户信息失败！')

		// 获取用户信息成功
		res.send({
			status: 0,
			message: '获取用户信息成功',
			data: result[0]
		})
	})
}

// 更新用户信息的处理函数
exports.updateUserInfo = (req, res) => {
	// 定义sql语句
	const sql = 'update ev_users set ? where id=?'

	// 执行sql
	db.query(sql, [req.body, req.body.id], (err, result) => {
		// 执行sql语句失败
		if (err) return res.cc(err)

		// sql执行成功，但影响行数不等于1
		if (result.affectedRows !== 1) return res.cc('更新用户信息失败！')

		// 成功
		res.cc('更新用户信息成功', 0)
	})
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
	res.send('ok')
}
