// 1.导入验证规则的模块
const joi = require('joi')

// 2.定义验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required() // 只接受字母和数字

// id的校验规则（删除时不能为空）
const id = joi.number().integer().min(1).required()

// 3.向外共享验证对象
exports.add_cate_schema = {
	body: {
		name,
		alias
	}
}

// 验证规则对象--删除分类
exports.delete_cate_schema = {
	params: {
		id
	}
}

// 验证规则对象--查询分类详情
exports.get_cate_schema = {
	params: {
		id
	}
}

// 验证规则对象--更新分类
exports.update_cate_schema = {
	body: {
		id,
		name,
		alias
	}
}
