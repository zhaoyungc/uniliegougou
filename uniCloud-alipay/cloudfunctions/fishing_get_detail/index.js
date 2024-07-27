'use strict';
exports.main = async (reData, context) => {
	const fishingSql = uniCloud.database().collection("base_user_fishing");
	if (reData.id) {
		let results = await fishingSql.where({
			id: reData.id
		}).get();
		if (results && results.data && results.data.length > 0) {
			const fishing = results.data[0];
			return {
				status: 1,
				data: {
					detail: fishing
				}
			};
		} else {
			return {
				status: 0,
				msg: '数据错误'
			};
		}
	} else {
		return {
			status: 0,
			msg: "参数错误",
		};
	}
}