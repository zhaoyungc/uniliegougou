'use strict';
exports.main = async (reData, context) => {
	const fishingSql = uniCloud.database().collection("base_user_fishing");
	const userSql = uniCloud.database().collection("base_user_info");
	if (reData.token) {
		let userRes = await userSql.where({
			token: reData.token
		}).get();
		if (userRes && userRes.data && userRes.data.length > 0) {
			const user = userRes.data[0];
			let results = await fishingSql.where({
				user_id: user._id,
			}).get();
			if (results && results.data && results.data.length > 0) {
				results.data.reverse();
			}
			return {
				status: 1,
				data: {
					list: results.data || [],
					user: {
						...user,
						pass: '',
						token: ''
					},
				}
			};
		} else {
			return {
				status: 0,
				msg: "用户信息错误",
			};
		}
	} else {
		return {
			status: 0,
			msg: "参数错误",
		};
	}
}