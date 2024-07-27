// 全局的页面字段
import Vue from 'vue';
import Vuex from 'vuex';
import webSocket from '../common/uniSocket.js';
import request from '../common/request';
import ls from '../common/ls.js';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isLogin: false, // 是否登录
		isConnection: false, // 是否连接上长连接
		isLoading: false, // 接口请求中，单一页面适用
		loginUserInfo: {},
		chatData: {
			list: {
				name: "所有人",
				value: []
			},
		},
	},
	mutations: {
		// 更改登陆状态
		setLoginUser(state, user) {
			state.isLogin = true;
			state.loginUserInfo = user;
		},
		setConnection(state) {
			state.isConnection = true;
		},
		setChatMsg(state, chat_msg) {
			const newChatData = {
				...state.chatData,
			};
			const mineInfo = state.loginUserInfo;
			if (chat_msg.to_user && chat_msg.to_user._id) {
				if (chat_msg.to_user._id == mineInfo._id) { // 发给我的
					if (newChatData[chat_msg.send_user._id]) {
						newChatData[chat_msg.send_user._id].value.push(chat_msg);
					} else {
						newChatData[chat_msg.send_user._id] = {
							name: chat_msg.send_user.name,
							value: [chat_msg]
						};
					}
				} else if (chat_msg.send_user._id == mineInfo._id) { // 我发的
					if (newChatData[chat_msg.to_user._id]) {
						newChatData[chat_msg.to_user._id].value.push(chat_msg);
					} else {
						newChatData[chat_msg.to_user._id] = {
							name: chat_msg.send_user.name,
							value: [chat_msg]
						};
					}
				}
			} else {
				newChatData.list.value.push(chat_msg);
			}
			state.chatData = newChatData;
			console.log("newChatData:", newChatData);
		},
		setMiChat(state, user) {
			const newChatData = {
				...state.chatData,
			};
			if (user._id) {
				if (!newChatData[user._id]) {
					newChatData[user._id] = {
						name: user.name,
						value: []
					};
				}
			}
			state.chatData = newChatData;
		},
	},
	actions: {
		setLoginStatus(context) {
			context.commit('setLoginStatus');
		},
		setLoginUser(context, user) {
			context.commit('setLoginUser', user);
			ls.setToken(user.token || '');
			
			webSocket.init((status, msgData) => {
				if (status == 'success') {
					context.commit('setConnection');
				} else if (status == 'msg') {
					context.commit('setChatMsg', msgData);
				}
			}, (log) => {
				console.log("系统消息", log);
			}, user._id);
		},
		setChatMsg(context, chatMsg) {
			context.commit('setChatMsg', chatMsg);
		},
		setMiChat(context, user) {
			context.commit('setMiChat', user);
		},
	},
	getters: {

	}
});

export default store;