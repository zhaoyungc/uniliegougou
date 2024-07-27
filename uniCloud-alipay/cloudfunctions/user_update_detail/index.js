'use strict';
const {
	getNewUserToken
} = require('utils');

exports.main = async (reData, context) => {
	const userSql = uniCloud.database().collection("base_user_info");
	if (reData.token) {
		let results = await userSql.where({
			token: reData.token
		}).get();
		if (results && results.data && results.data.length > 0) {
			const user = results.data[0];
			const newUserData = {
				name: reData.name || user.name,
				sex: reData.sex || user.sex,
				weight: reData.weight || user.weight,
				height: reData.height || user.height,
				age: reData.age || user.age,
				tel: reData.tel || user.tel,
				email: reData.email || user.email,
				address: reData.address || user.address,
			};
			let addRes = await userSql.where({
				_id: user._id
			}).update(newUserData);

			if (addRes.updated > 0) {
				return {
					status: 1,
					data: {}
				};
			} else {
				return {
					status: 0,
					msg: '更新失败'
				};
			}
		} else {
			return {
				status: 0,
				msg: "账号不存在",
			};
		}
	} else {
		return {
			status: 0,
			msg: "参数错误",
		};
	}
}