<template>
	<view class="login-ct">
		<view class="other-ct">
			<view class="title">登录信息</view>
		</view>
		<view class="item-ct">
			<view class="label">姓名：</view>
			<view class="value">
				<uni-easyinput trim="all" v-model="userName" placeholder="姓名" type="text"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="label">密码：</view>
			<view class="value">
				<uni-easyinput trim="all" v-model="userPass" placeholder="密码" type="text"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="btn base-btn" @click="toSign">注册</view>
			<view class="btn base-btn" @click="toLogin">登录</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../common/request.js';
	import {
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				imgUrl: 'http://www.metwo.cn/resource/huli.jpeg',
				userName: "",
				userPass: ""
			};
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			...mapActions(['setLoginUser', 'setLoginStatus']),
			toSign() {
				request.cloudCallFunction('user_add_detail', {
					user_name: this.userName,
					user_pass: this.userPass
				}, (status, res) => {
					if (status == 1) {
						this.setLoginUser(res.user);
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: res.msg || '注册失败',
							duration: 2000
						});
					}
				});
			},
			toLogin() {
				request.cloudCallFunction('user_get_name_detail', {
					user_name: this.userName,
					user_pass: this.userPass
				}, (status, res) => {
					console.log(res, "===");
					if (status == 1) {
						this.setLoginUser(res.user);
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: res.msg || '登录失败',
							duration: 2000
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login-ct {
		width: 100%;
		height: auto;
		padding: 10rpx 24rpx 100rpx 24rpx;
		box-sizing: border-box;

		.other-ct {
			width: 100%;
			height: auto;
			padding-top: 32rpx;
			position: relative;

			.title {
				font-size: 32rpx;
				line-height: 32rpx;
				font-weight: bolder;
			}
		}

		.item-ct {
			width: 100%;
			height: auto;
			padding-top: 20rpx;
			font-size: 24rpx;
			line-height: 24rpx;
			display: flex;
			align-items: center;

			.label {
				display: inline-block;
				font-weight: bolder;
				flex: none;
			}

			.value {
				width: 100%;

				.radio {
					padding-left: 20rpx;
				}
			}

			.btn {
				display: inline-block;
				width: 200rpx;
				font-size: 36rpx;
				line-height: 36rpx;
				padding: 12rpx 0;
				border-radius: 6rpx;
				text-align: center;
				margin: 0 auto;
			}
		}
	}
</style>