'use strict';
exports.main = async (reData, context) => {
	const fishingSql = uniCloud.database().collection("base_user_fishing");
	const userSql = uniCloud.database().collection("base_user_info");	
	if (reData.token) {
		let results = await fishingSql.aggregate().sample({
			size: 1
		}).end();
		if (results && results.data && results.data.length > 0) {
			const fishing = results.data[0];
			const userRes = await userSql.where({
				_id: fishing.user_id,
			}).get();
			return {
				status: 1,
				data: {
					detail: fishing,
					user: userRes.data[0],
				}
			};
		} else {
			return {
				status: 0,
				msg: '暂无数据'
			};
		}
	} else {
		return {
			status: 0,
			msg: "无登录",
		};
	}
}