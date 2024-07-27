'use strict';
exports.main = async (reData, context) => {
	const userSql = uniCloud.database().collection("base_user_info");
	if (reData.id) {
		let results = await userSql.where({
			_id: reData.id
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
							token: '',
						}
					},
				}
			};
		} else {
			return {
				status: 0,
				msg: 'id错误，未找到用户'
			};
		}
	} else {
		return {
			status: 0,
			msg: "参数错误",
		};
	}
}