'use strict';
const {
	getNowCtime
} = require('utils');

exports.main = async (reData, context) => {
	const fishingSql = uniCloud.database().collection("base_user_fishing");
	const userSql = uniCloud.database().collection("base_user_info");
	if (reData.msg && reData.token) {
		let results = await userSql.where({
			token: reData.token
		}).get();
		if (results && results.data && results.data.length > 0) {
			const user = results.data[0];
			const addRes = await fishingSql.add({
				msg: reData.msg,
				now_address: reData.address,
				user_id: user._id,
				ctime: getNowCtime(),
			});
			if (addRes && addRes.id) {
				return {
					status: 1,
					data: {},
					msg: "成功"
				};
			} else {
				return {
					status: 0,
					msg: "失败或无权限",
				};
			}
		} else {
			return {
				status: 0,
				msg: "暂无权限",
			};
		}
	} else {
		return {
			status: 0,
			msg: "参数错误",
		};
	}
}