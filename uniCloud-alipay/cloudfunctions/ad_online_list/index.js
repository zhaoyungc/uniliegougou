'use strict';
exports.main = async (reData, context) => {
	const userSql = uniCloud.database().collection("base_ad");
	let results = await userSql.where({
		online: 1
	}).get();
	if (results && results.data && results.data.length > 0) {
		return {
			status: 1,
			data: {
				list: results.data || [],
			}
		};
	} else {
		return {
			status: 1,
			data: {
				list: [],
			}
		};
	}
}