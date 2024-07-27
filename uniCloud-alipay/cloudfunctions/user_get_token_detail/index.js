'use strict';
exports.main = async (reData, context) => {
	const userSql = uniCloud.database().collection("base_user_info");
	if (reData.token) {
		let results = await userSql.where({
			token: reData.token
		}).get();
		if (results && results.data && results.data.length > 0) {
			const user = results.data[0];
			return {
				status: 1,
				data: {
					user: {
						...user,
						data: {
							...user.data,
							pass: '',
						}
					},
				}
			};
		} else {
			return {
				status: 0,
				msg: '账号不存在'
			};
		}
	} else {
		return {
			status: 0,
			msg: "参数错误",
		};
	}
}