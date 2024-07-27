<template>
	<view class="mine-ct">
		<view class="top-ct">
			<view class="avatar">
				<image v-if="loginUserInfo.sex == '1'" class="base-img" :src="userPotho1"></image>
				<image v-else-if="loginUserInfo.sex == '2'"class="base-img" :src="userPotho2"></image>
				<image v-else class="base-img" :src="userPotho0"></image>
			</view>
			<view class="name-ct">
				<view class="name">{{loginUserInfo.name || "--"}}</view>
				<view class="sex" v-if="loginUserInfo.sex == '1'">男</view>
				<view class="sex" v-else-if="loginUserInfo.sex == '2'">女</view>
				<view class="sex" v-else>-</view>
			</view>
		</view>
		<template v-if="isLogin">
			<view class="other-ct">
				<view class="title">其他信息</view>
				<view class="edit-btn base-btn" @click="toEditInfo">编辑</view>
			</view>
			<view class="item-ct">
				<view class="label">身高：</view>
				<view class="value">{{loginUserInfo.height || 0}} cm</view>
			</view>
			<view class="item-ct">
				<view class="label">体重：</view>
				<view class="value">{{loginUserInfo.weight || 0}} kg</view>
			</view>
			<view class="item-ct">
				<view class="label">年龄：</view>
				<view class="value">{{loginUserInfo.age || 0}}</view>
			</view>
			<view class="item-ct">
				<view class="label">电话：</view>
				<view class="value">{{loginUserInfo.tel || '-'}}</view>
			</view>
			<view class="item-ct">
				<view class="label">邮箱：</view>
				<view class="value">{{loginUserInfo.email || '-'}}</view>
			</view>
			<view class="item-ct">
				<view class="label">常出没地址：</view>
				<view class="value">{{loginUserInfo.address || "-"}}</view>
			</view>
		</template>
		<view v-else class="login-ct">
			<view class="login base-btn" @click="toLogin">点击登录</view>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request';
	import ls from '../../common/ls';
	import {
		mapActions
	} from 'vuex';

	export default {
		data() {
			return {
				userPothoList: 'http://www.metwo.cn/resource/wx/list.webp',
				userPotho0: 'http://www.metwo.cn/resource/wx/0.webp',
				userPotho1: 'http://www.metwo.cn/resource/wx/1.webp',
				userPotho2: 'http://www.metwo.cn/resource/wx/2.webp',
			};
		},
		computed: {
			isLogin() {
				return this.$store.state.isLogin;
			},
			loginUserInfo() {
				return this.$store.state.loginUserInfo;
			},
		},
		methods: {
			...mapActions(['setLoginUser', 'setLoginStatus']),
			toEditInfo(cha) {
				uni.navigateTo({
					url: '/pages/mine/edit/edit' // 跳转到对应路径的页面
				});
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/mine/login/login' // 跳转到对应路径的页面
				});

				// uni.login({
				// 	"provider": "weixin",
				// 	"onlyAuthorize": true, // 微信登录仅请求授权认证
				// 	success: (event) => {
				// 		const code = event.code;
				// 		console.log("登录成功", code);
				// 		request.post("/user/wx/login", {
				// 			code,
				// 		}, (status, res) => {
				// 			if (status == 1) {
				// 				const newUser = res.data.user;
				// 				ls.setToken(newUser.token);
				// 				this.setLoginStatus();
				// 				this.setLoginUser(newUser);
				// 				uni.showToast({
				// 					title: '登录成功',
				// 					duration: 2000
				// 				});
				// 			} else {
				// 				uni.showToast({
				// 					title: '登录失败',
				// 					duration: 2000
				// 				});
				// 			}
				// 			console.log(status, res);
				// 		});
				// 	},
				// 	fail: (err) => {
				// 		// 登录授权失败
				// 		// err.code是错误码
				// 		console.log("登录失败", err);
				// 	}
				// })

			}
		},
	}
</script>

<style lang="scss" scoped>
	.mine-ct {
		width: 100%;
		height: auto;
		padding: 120rpx 24rpx 100rpx 24rpx;
		box-sizing: border-box;

		.top-ct {
			width: 100%;
			height: 120rpx;
			display: flex;
			padding-bottom: 24rpx;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.33);

			.avatar {
				flex: none;
				width: 120rpx;
				height: 120rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}

			.name-ct {
				width: 100%;
				height: 120rpx;
				padding-left: 20rpx;

				.name {
					width: 100%;
					height: 40rpx;
					font-size: 40rpx;
					line-height: 40rpx;
					font-weight: bolder;
					padding: 16rpx 0 24rpx 0;
				}

				.sex {
					width: 100%;
					height: 30rpx;
					font-size: 30rpx;
					line-height: 30rpx;

				}
			}
		}

		.other-ct {
			width: 100%;
			height: auto;
			padding-top: 32rpx;
			position: relative;

			.title {
				font-size: 36rpx;
				line-height: 36rpx;
				font-weight: bolder;
			}

			.edit-btn {
				position: absolute;
				top: 32rpx;
				right: 0;
				font-size: 28rpx;
				line-height: 28rpx;
				padding: 4rpx 10rpx;
				border-radius: 18rpx;
			}
		}

		.item-ct {
			width: 100%;
			height: auto;
			padding-top: 30rpx;
			font-size: 32rpx;
			line-height: 32rpx;

			.label {
				display: inline-block;
				font-weight: bolder;
			}

			.value {
				display: inline-block;
			}
		}

		.login-ct {
			width: 100%;
			height: auto;
			padding-top: 50rpx;
			text-align: center;

			.login {
				display: inline-block;
				font-size: 36rpx;
				line-height: 36rpx;
				padding: 22rpx 30rpx;
				border-radius: 40rpx;
			}
		}
	}
</style>