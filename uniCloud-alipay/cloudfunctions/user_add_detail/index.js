'use strict';
const {
	getNewUserToken,
	getNowCtime
} = require('utils');

exports.main = async (reData, context) => {
	const userSql = uniCloud.database().collection("base_user_info");
	if (reData.user_name && reData.user_pass) {
		let results = await userSql.where({
			name: reData.user_name
		}).get();
		if (results && results.data && results.data.length > 0) {
			return {
				status: 0,
				msg: "用户名已存在",
			};
		} else {
			const newToken = getNewUserToken();
			const newUser = {
				"name": reData.user_name,
				"pass": reData.user_pass,
				"token": newToken,
				"ctime": getNowCtime(),
			};
			let addRes = await userSql.add(newUser);
			if (addRes && addRes.id) {
				return {
					status: 1,
					data: {
						user: {
							id: addRes.id,
							_id: addRes.id,
							name: reData.user_name,
							token: newToken
						},
					}
				};
			} else {
				return {
					status: 0,
					msg: "注册失败",
				};
			}
		}
	} else {
		return {
			status: 0,
			msg: "参数错误",
		};
	}
}