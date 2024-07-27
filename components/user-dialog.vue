<template>
	<view class="user-dialog-ct base-dialog" @click="closeDialog">
		<view class="user-dialog-content">
			<icon-close class="close" @click.native="closeDialog"></icon-close>
			<view class="content-ct" @click.stop="">
				<view class="top-ct">
					<view class="avatar">
						<image v-if="user.sex=='1'" class="icon base-img" :src="userPotho1"></image>
						<image v-else-if="user.sex=='2'" class="icon base-img" :src="userPotho2"></image>
						<image v-else class="icon base-img" :src="userPotho0"></image>
					</view>
					<view class="name-ct">
						<view class="name">{{user.name || '-'}}</view>
						<view class="sex">{{user.sex == 1 ? '男' : '女'}}</view>
					</view>
				</view>
				<view class="other-ct">
					<view class="title">其他信息</view>

					<view class="item-ct">
						<view class="label">身高：</view>
						<view class="value">{{user.height || '-'}} cm</view>
					</view>
					<view class="item-ct">
						<view class="label">体重：</view>
						<view class="value">{{user.weight || '-'}} kg</view>
					</view>
					<view class="item-ct">
						<view class="label">年龄：</view>
						<view class="value">{{user.sex || '-'}}</view>
					</view>
					<view class="item-ct">
						<view class="label">电话：</view>
						<view class="value">{{user.tel || '-'}}</view>
					</view>
					<view class="item-ct">
						<view class="label">邮箱：</view>
						<view class="value">{{user.email || '-'}}</view>
					</view>
					<view class="item-ct">
						<view class="label">常出没地址：</view>
						<view class="value">{{user.address || '-'}}</view>
					</view>
				</view>

				<view class="btn-ct" v-if="$store.state.loginUserInfo._id != user._id">
					<view class="btn base-btn" @click="addToChat">+私聊</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import IconClose from './base/icon-close.vue';
	import {
		mapActions
	} from 'vuex';
	export default {
		name: "user-dialog",
		props: ['user'],
		data() {
			return {
				userPothoList: 'http://www.metwo.cn/resource/wx/list.webp',
				userPotho0: 'http://www.metwo.cn/resource/wx/0.webp',
				userPotho1: 'http://www.metwo.cn/resource/wx/1.webp',
				userPotho2: 'http://www.metwo.cn/resource/wx/2.webp',
			};
		},
		components: {
			IconClose,
		},
		methods: {
			...mapActions(['setMiChat']),
			addToChat() {
				this.setMiChat(this.user);
				this.$emit("close");
				window.alert("添加至私聊成功");
			},
			closeDialog() {
				this.$emit("close");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-dialog-content {
		width: 620rpx;
		height: auto;
		position: absolute;
		top: 50%;
		left: 75rpx;
		transform: translate(0, -50%);
		background: #ffffff;
		border-radius: 10rpx;
		padding: 36rpx 24rpx;
		box-sizing: border-box;

		.close {
			position: absolute;
			top: -100rpx;
			right: 0;
			z-index: 10;
		}

		.content-ct {
			width: 100%;
			height: auto;

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

					.icon {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}
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
				padding: 32rpx 0;
				position: relative;

				.title {
					font-size: 32rpx;
					line-height: 32rpx;
					font-weight: bolder;
				}

				.item-ct {
					width: 100%;
					height: auto;
					padding-top: 20rpx;
					font-size: 28rpx;
					line-height: 28rpx;

					.label {
						display: inline-block;
						font-weight: bolder;
					}

					.value {
						display: inline-block;
					}
				}
			}
		}

		.btn-ct {
			width: 100%;
			height: auto;
			text-align: center;
			padding-top: 30rpx;
			border-top: 1rpx solid rgba(0, 0, 0, 0.33);

			.btn {
				width: 100%;
				height: auto;
				font-size: 36rpx;
				line-height: 36rpx;
				padding: 12rpx 0;
				border-radius: 30rpx;
			}
		}
	}
</style>