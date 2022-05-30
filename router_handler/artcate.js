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
	// 定义查重的sql语句
	const sql = 'select * from ev_article_cate where name=? or alias=?'

	// 执行sql语句
	db.query(sql, [req.body.name, req.body.alias], (err, result) => {
		if (err) return res.cc(err)

		// 执行成功，判断数据的length(4种情况)
		if (result.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试')

		if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias)
			return res.cc('分类名称与分类别名被占用，请更换后重试')

		if (result.length === 1 && result[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试')

		if (result.length === 1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试')

		// TODO：分类名称和分类别名都可用
		// 定义插入文章分类的sql
		const sql = 'insert into ev_article_cate set ?'
		db.query(sql, req.body, (err, result) => {
			if (err) return res.cc(err)

			if (result.affectedRows !== 1) return res.cc('新增文章分类失败')

			res.cc('新增文章分类成功！', 0)
		})
	})
}

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
	res.send('删除成功')
}
