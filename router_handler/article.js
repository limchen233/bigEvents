// 发布文章处理模块
exports.addArticle = (req, res) => {
	// 手动判断是否上传了文章封面
	if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
}
