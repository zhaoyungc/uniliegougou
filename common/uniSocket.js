let exampleWebSocket = null;
let my_id = '';

async function connect(suc_cb, fail_cb) {
	console.log("开始建立连接");
	exampleWebSocket = await uniCloud.connectWebSocket({
		name: "user_chat",
		query: {
			source: "wx",
			my_id,
		}
	});
	exampleWebSocket.onOpen(event => {

	});
	// 收到数据时触发
	exampleWebSocket.onMessage(event => {
		const chatData = JSON.parse(event.data);
		console.log("收到消息"+chatData.type, chatData);
		
		if (chatData.type == '0') { // 系统消息
			fail_cb(chatData.msg);
		} else if (chatData.type == '1') { // 连接成功
			suc_cb('success');
		} else if (chatData.type == '9') { // 历史消息
			const list = chatData.list || [];
			list.forEach(item => {
				suc_cb('msg', item);
			});
		} else if (chatData.type == '10') { //消息
			suc_cb('msg', chatData);
		}
	})
	
	// 连接被关闭时触发
	exampleWebSocket.onClose(event => {
		console.log("WebSocket:close", event);
		// exampleWebSocket = null;
	})
	
	// 连接因错误而关闭时触发
	exampleWebSocket.onError(event => {
		console.log("WebSocket:error", event);
		// exampleWebSocket = null;
	});
}

// 长连接方法， 参数：成功回调方法， 失败回调方法
function init(suc_cb, fail_cb, id) {
	my_id = id;
	connect(suc_cb, fail_cb, id);
	setInterval(() => {
		// if (!socket || (socket && socket.readyState == 3)) { // 已关闭
		// 	connect(suc_cb, fail_cb);
		// }
		console.log(exampleWebSocket.readyState);
	}, 3000);
}

function sendMsg(msg, color, mi_id) {
	if (exampleWebSocket.readyState == 1) {
		const chats = {
			msg: {
				type: '', // 文字类型
				message: msg,
				color,
			},
			type: "10",
			send_user_id: my_id,
		};
		if (mi_id) {
			chats.to_user_id = mi_id;
		}
		exampleWebSocket.send({data: JSON.stringify(chats)});
	} else {
		console.log("连接出问题了", exampleWebSocket.readyState);
	}
}

export default {
	init,
	sendMsg,
}