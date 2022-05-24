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
