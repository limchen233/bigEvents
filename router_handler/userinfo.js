// 导入数据库操作模块
const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

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
	// 根据id查询用户信息
	const sql = 'select * from ev_users where id = ?'

	// 执行sql
	db.query(sql, req.user.id, (err, result) => {
		// 执行sql语句失败
		if (err) return res.cc(err)

		// 判断结果是否存在
		if (result.length !== 1) return res.cc('用户不存在！')

		// 判断输入的旧密码是否正确
		const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
		if (!compareResult) return res.cc('旧密码错误！')

		/* 更新数据库中的密码 */
		// 定义更新密码的sql
		const sql = 'update ev_users set password=? where id=?'

		// 对新密码进行加密处理
		const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

		// 执行sql
		db.query(sql, [newPwd, req.user.id], (err, result) => {
			// 执行sql语句失败
			if (err) return res.cc(err)

			// 判断影响行数是否为1
			if (result.affectedRows !== 1) return res.cc('更新密码失败！')

			// 成功
			res.cc('更新密码成功！', 0)
		})
	})
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
	// 定义更新头像的sql
	const sql = 'update ev_users set user_pic=? where id = ?'

	// 执行sql
	db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
		// 执行sql语句失败
		if (err) return res.cc(err)

		// 判断结果是否存在
		if (result.affectedRows !== 1) return res.cc('更新头像失败！')

		// 成功
		res.cc('更新头像成功！', 0)
	})
}
