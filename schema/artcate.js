// 1.导入验证规则的模块
const joi = require('joi')

// 2.定义验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required() // 只接受字母和数字

// 3.向外共享验证对象
exports.add_cate_schema = {
	body: {
		name,
		alias
	}
}
