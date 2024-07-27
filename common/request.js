import ls from './ls';

function get(url, params, callback) {
	uni.request({
		// url: 'https://express-owv5-115649-5-1302667370.sh.run.tcloudbase.com' + url,
		url,
		method: "GET",
		data: {
			...params,
			token: ls.getToken(),
		},
		success(res) {
			const resData = res.data || {};
			callback(resData.status, resData.data || {});
		},
		fail() {
			callback(0, {
				msg: '错误'
			});
		}
	});
}

function post(url, params, callback) {
	uni.request({
		// url: 'https://express-owv5-115649-5-1302667370.sh.run.tcloudbase.com' + url,
		url,
		method: "POST",
		data: {
			...params,
			token: ls.getToken(),
		},
		success(res) {
			const resData = res.data || {};
			callback(resData.status, resData.data);
		},
		fail() {
			callback(0, {
				msg: '错误'
			});
		}
	});
}

function cloudCallFunction(url, params, callback) {
	uniCloud.callFunction({
		name: url || '',
		data: {
			...params,
			token: ls.getToken(),
		}
	}).then(data => {
		const res = data.result;
		if (res.status == 1) {
			callback(res.status, res.data || {});
		} else {
			callback(res.status, res);
		}
	}).catch(err => {
		callback(0, {
			msg: '错误',
			err: JSON.stringify(err)
		});
	});
}
export default {
	get,
	post,
	cloudCallFunction,
}