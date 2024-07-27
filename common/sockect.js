let socket = null;
import ls from './ls';

function connect(suc_cb, fail_cb) {
    fail_cb("创建聊天连接");
    socket = new WebSocket('ws://www.metwo.cn:8877/ws');
	console.log("123");
    // socket = new WebSocket('ws://192.168.0.198:8877/ws');
    socket.onopen = () => {
        fail_cb("自动登录中");
        const lsKey = ls.getToken();
        const msgStr = JSON.stringify({
            type: 0,
            token_id: lsKey,
        });
        socket.send(msgStr);
    };
 
    socket.onerror = (error) => {
        console.log(error);
        fail_cb("连接出错，开始重新建立连接");
    };
 
    socket.onmessage = (msg) => {
        const chatData = JSON.parse(msg.data);
        if (chatData.type == '0') { // 系统消息
            fail_cb(chatData.msg);
        } else if(chatData.type == '1') {// 连接成功
            suc_cb('success');
        } else if(chatData.type == '9') {// 历史消息
            const list = chatData.list || [];
            list.forEach(item => {
                suc_cb('msg', item);
            });
        } else if (chatData.type == '10') { //消息
            suc_cb('msg', chatData);
        }
        console.log('收到消息:', chatData);
    };
 
    socket.onclose = () => {
        fail_cb("连接已断开");
        socket = null;
    };
}

// 长连接方法， 参数：成功回调方法， 失败回调方法
function init(suc_cb, fail_cb) {
    connect(suc_cb, fail_cb);
    setInterval(() => {
        if (!socket || (socket && socket.readyState == 3)){ // 已关闭
            connect(suc_cb, fail_cb);
        }
    }, 3000);
}

function sendMsg(msg, color, mi_id) {
    if (socket.readyState == 1) {
        const chats = {
            msg: {
                type: '', // 文字类型
                message: msg,
                color,
            },
            type: 10,
        };
        if (mi_id) {
            chats.to_user_id = mi_id;
        }
        const msgStr = JSON.stringify(chats);
        socket.send(msgStr);
    } else {
        console.log("连接出问题了", socket.readyState);
    }
}

function toLogin(u, p) {
    if (socket.readyState == 1) {
        const msgStr = JSON.stringify({
            type: 1,
            user_name: u,
            pass_word: p
        });
        socket.send(msgStr);
    } else {
        console.log("连接出问题了", socket.readyState);
    }
}

export default {
    init,
    toLogin,
    sendMsg,
}