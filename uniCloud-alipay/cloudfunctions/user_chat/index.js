'use strict';

const all_user = {}; // 所有用户的历史消息
const connect_list = {}; // 当前连接上的所有人. key为标识
const userSql = uniCloud.database().collection("base_user_info");
const ws = uniCloud.webSocketServer();

const sendMsg = async (connectionId, msg_data) => {
	const msgStr = JSON.stringify({
		...msg_data,
		time: new Date().getTime(),
	});
	await ws.send(connectionId, sendData);
}

exports.main = async (event, context) => {
	return {};
};

exports.onWebsocketConnection = async function(event, context) {
	console.log("onWebsocketConnection", event, context);
	const my_id = event.query.my_id;
	if (my_id) {
		let checkUsers = await userSql.where({
			_id: my_id,
		}).get();
		if (checkUsers.data && checkUsers.data.length > 0) {
			const user = checkUsers.data[0];
			connect_list['user_' + user._id] = {
				user: {
					id: user._id,
					_id: user._id,
					name: user.name,
				},
				connectionId: event.connectionId,
			};
			await ws.send(event.connectionId, {
				type: '1',
				connect_list
			});
			// 以下发送历史消息
			if (all_user['user_' + user._id]) {
				const list = all_user['user_' + user._id].list || [];
				if (list.length > 0) {
					await ws.send(event.connectionId, {
						type: '9',
						list: list,
					});
					all_user['user_' + user._id].list = [];
				}
			} else {
				all_user['user_' + user._id] = {
					user: {
						id: user._id,
						_id: user._id,
						name: user.name,
					},
					list: []
				};
			}
		} else {
			await ws.send(event.connectionId, {
				type: '0',
				msg: '用户错误'
			});
		}
	} else {
		await ws.send(event.connectionId, {
			type: '0',
			msg: '用户数据缺失'
		});
	}
}

exports.onWebsocketMessage = async function(event, context) {
	const msgData = JSON.parse(event.payload);
	if (msgData.type == "10") {
		if (msgData.to_user_id) {
			if (connect_list['user_' + msgData.send_user_id]) {
				await ws.send((connect_list['user_' + msgData.send_user_id] || {}).connectionId, {
					type: '10',
					msg: msgData.msg,
					send_user: all_user['user_' + msgData.send_user_id].user,
					to_user: all_user['user_' + msgData.to_user_id].user,
				});
			}
			if (connect_list['user_' + msgData.to_user_id]) {
				await ws.send((connect_list['user_' + msgData.to_user_id] || {}).connectionId, {
					type: '10',
					msg: msgData.msg,
					send_user: all_user['user_' + msgData.send_user_id].user,
					to_user: all_user['user_' + msgData.to_user_id].user,
				});
			} else {
				await ws.send(event.connectionId, {
					type: '0',
					message: '对方不在线'
				});
				if (all_user['user_' + msgData.to_user_id]) {
					all_user['user_' + msgData.to_user_id].list.push({
						type: '10',
						msg: msgData.msg,
						send_user: all_user['user_' + msgData.send_user_id].user,
						to_user: all_user['user_' + msgData.to_user_id].user,
					});
				}

			}
		} else {
			const id_list = [];
			for (const key in connect_list) {
				if (Object.hasOwnProperty.call(connect_list, key)) {
					const element = connect_list[key] || {};
					id_list.push(element.connectionId);
				}
			}
			if (id_list.length > 0) {
				await ws.send(id_list, {
					type: '10',
					msg: msgData.msg,
					send_user: all_user['user_' + msgData.send_user_id].user,
				});
			}
		}
	}

}

exports.onWebsocketDisConnection = function(event, context) {
	console.log("onWebsocketDisConnection", event, context);
	// if (catchUserId && connect_list['user_' + catchUserId]) {
	// 	delete connect_list['user_' + catchUserId];
	// }
}

exports.onWebsocketError = function(event, context) {
	console.log("onWebsocketError", event, context);
	// return {
	// 	type: '0',
	// 	message: '连接出错出现异常'
	// };
}