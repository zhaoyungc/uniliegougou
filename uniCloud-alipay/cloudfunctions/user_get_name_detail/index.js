'use strict';
exports.main = async (reData, context) => {
	const userSql = uniCloud.database().collection("base_user_info");
	if (reData.user_name && reData.user_pass) {
		const user_name = reData.user_name;
		const user_pass = reData.user_pass;
		let results = await userSql.where({
			name: user_name,
			pass: user_pass,
		}).get();
		if (results && results.data && results.data.length > 0) {
			const user = results.data[0];
			return {
				status: 1,
				data: {
					user: {
						...user,
						pass: '',
					},
				}
			};
		} else {
			return {
				status: 0,
				msg: '账号或密码错误'
			};
		}
	} else {
		return {
			status: 0,
			msg: "参数错误",
		};
	}
}