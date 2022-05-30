// 路由处理函数模块
// 导入数据库操作模块
const db = require('../db/index')

// 获取文章分类列表的处理函数
exports.getArtCate = (req, res) => {
	// 定义查询文章分类列表的sql
	const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'

	// 执行sql语句
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)

		res.send({
			status: 0,
			message: '获取文章分类数据成功!',
			data: result
		})
	})
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
	res.send('新增ok')
}
