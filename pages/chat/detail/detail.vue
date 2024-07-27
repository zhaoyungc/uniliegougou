<template>
	<view class="chat-detail-ct">
		<view class="list-ct">
			<view class="list-content">
				<view class="list-item" v-for="(item, index) in chatItem.value" :key="index" @click="toMiChat(item)"
					:class="mineInfo._id == item.send_user.id ? 'mine' : ''">
					<view class="item-avatar">
						<image v-if="item.send_user.sex == '1'" class="base-img" :src="userPotho1"></image>
						<image v-else-if="item.send_user.sex == '2'"class="base-img" :src="userPotho2"></image>
						<image v-else class="base-img" :src="userPotho0"></image>
					</view>
					<view class="msg-content">
						<view class="item-name mine" v-if="mineInfo._id == item.send_user.id">
							<view class="time">{{ getTimesString(item.time) }}</view>
							<view class="name">{{ item.send_user.name }}</view>
						</view>
						<view class="item-name" v-else>
							<view class="name">{{ item.send_user.name }}</view>
							<view class="time">{{ getTimesString(item.time) }}</view>
						</view>
						<view class="item-msg" :class="mineInfo._id == item.send_user.id ? 'mine' : ''">
							<view class="msg" :style="{ background: item.msg.color }">{{ item.msg.message }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="input-ct">
			<view class="handle-ct">
				<view class="color-ct">
					<view class="status-color" v-for="(col, index) in colorList" :key="index"
						:class="selectColorIndex == index ? 'select' : ''" :style="{
		                    background: col,
		                }" @click="selectColorIndex = index;"></view>
				</view>
			</view>
			<view class="msg-ct">
				<input type="text" class="msg-input" v-model="inputMsg" placeholder="请输入内容" />
				<view class="btn" @click="sendMsg">发送</view>
			</view>
		</view>
		<user-dialog-vue v-if="showUserDialog" :user="showUserInfo" @close="closeUserDialog"></user-dialog-vue>
	</view>
</template>

<script>
	import userDialogVue from '../../../components/user-dialog.vue';
	import {
		getTimesString
	} from '../../../common/TimeSwitch';
	import webSocket from '../../../common/uniSocket';
	import request from '../../../common/request.js';
	export default {
		data: () => {
			return {
				chatKey: '',
				inputMsg: "",
				colorList: ['#ebebeb', '#409eff', '#67c23a', '#e6a23c', '#f56c6c'],
				selectColorIndex: 0,
				mineInfo: {},
				showUserInfo: {},
				showUserDialog: false,
				userPothoList: 'http://www.metwo.cn/resource/wx/list.webp',
				userPotho0: 'http://www.metwo.cn/resource/wx/0.webp',
				userPotho1: 'http://www.metwo.cn/resource/wx/1.webp',
				userPotho2: 'http://www.metwo.cn/resource/wx/2.webp',
			};
		},
		components: {
			userDialogVue,
		},
		computed: {
			chatItem() {
				if (this.chatKey) {
					return this.$store.state.chatData[this.chatKey];
				} else {
					return {};
				}
			}
		},
		methods: {
			getTimesString: getTimesString,
			closeUserDialog() {
				this.showUserDialog = false;
			},
			sendMsg() {
				const msg = this.inputMsg;
				const color = this.colorList[this.selectColorIndex];
				if (msg && color) {
					if (this.chatKey != 'list') {
						webSocket.sendMsg(msg, color, this.chatKey);
					} else {
						webSocket.sendMsg(msg, color);
					}
					this.inputMsg = '';
				}
			},
			toMiChat(item) {
				request.cloudCallFunction('user_get_id_detail', {
					id: item.send_user.id,
				}, (status, res) => {
					if (status == 1) {
						this.showUserInfo = res.user;
						this.showUserDialog = true;
					}
				});
			}
		},
		onShow() {

		},
		onLoad: function(option) {
			this.chatKey = option.key || 'list';
			this.mineInfo = this.$store.state.loginUserInfo;
			uni.setNavigationBarTitle({
				title: this.chatItem.name
			});
		}
	}
</script>

<style lang="scss" scoped>
	.chat-detail-ct {
		width: 100%;
		box-sizing: border-box;

		.list-ct {
			width: 100%;
			height: 100%;
			padding: 60rpx 24rpx 145rpx 24rpx;
			box-sizing: border-box;

			.list-content {
				width: 100%;
				height: 100%;
				overflow-y: scroll;

				&::-webkit-scrollbar {
					width: 0;
					opacity: 0;
				}

				.list-item {
					width: 100%;
					height: auto;
					text-align: left;
					padding: 4rpx 0;
					box-sizing: border-box;
					cursor: pointer;
					position: relative;

					.item-avatar {
						width: 60rpx;
						height: 60rpx;
						border-radius: 10rpx;
						overflow: hidden;
						position: absolute;
						top: 4rpx;
					}

					.msg-content {
						width: 100%;
						height: auto;
						padding-left: 70rpx;
						box-sizing: border-box;

						.item-name {
							width: 100%;
							height: 40rpx;
							display: flex;
							justify-content: flex-start;
							align-items: center;

							.time {
								font-size: 24rpx;
								line-height: 24rpx;
								color: #888888;
								font-weight: normal;
							}

							.name {
								font-size: 36rpx;
								line-height: 36rpx;
								color: #000000;
								font-weight: bolder;
							}

							&.mine {
								text-align: right;
							}
						}

						.item-msg {
							width: 100%;
							padding: 20rpx 0;
							box-sizing: border-box;
							pointer-events: none;
							text-align: left;

							&.mine {
								text-align: right;
							}

							.msg {
								display: inline-flex;
								max-width: 80%;
								padding: 10rpx;
								box-sizing: border-box;
								word-break: break-all;
								border-radius: 6rpx;
								background: #ebebeb;
								text-align: left;
							}
						}
					}

					&.mine {
						.item-avatar {
							right: 0;
						}

						.msg-content {
							padding-right: 70rpx;

							.item-name {
								justify-content: flex-end;
							}
						}
					}
				}
			}
		}

		.input-ct {
			width: 100%;
			height: 200rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1rpx solid rgba(0, 0, 0, 0.33);
			padding: 10rpx 10rpx 80rpx 10rpx;
			box-sizing: border-box;

			.handle-ct {
				width: 100%;
				height: 40rpx;

				.color-ct {
					width: 100%;
					height: 100%;
					display: flex;
					flex-wrap: nowrap;

					.status-color {
						width: 40rpx;
						height: 40rpx;
						box-sizing: border-box;
						border-radius: 40rpx;
						cursor: pointer;
						margin-right: 40rpx;

						&.select {
							border: 2rpx solid #ff0000;
						}
					}
				}
			}

			.msg-ct {
				width: 100%;
				height: 60rpx;
				padding-top: 10rpx;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;

				.msg-input {
					width: 600rpx;
					height: 60rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
					border-radius: 30rpx;
					border: none;
					outline: 0;
					resize: none;
					font-size: 28rpx;
					line-height: 28rpx;
					background: #f5f5f5;
					display: flex;
					justify-content: center;
					align-items: center;
					line-height: 1;
				}

				.btn {
					width: 120rpx;
					height: 60rpx;
					background: #409eff;
					color: #ffffff;
					border-radius: 4rpx;
					font-size: 36rpx;
					line-height: 36rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>