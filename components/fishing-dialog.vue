<template>
	<view class="fishing-dialog-ct base-dialog" @click="closeDialog">
		<view class="fishing-dialog-content">
			<icon-close class="close" @click.native="closeDialog"></icon-close>
			<view class="content-ct" @click.stop="">
				<view class="avatar-ct">
					<view class="avatar">
						<image v-if="user.sex=='1'" class="icon base-img" :src="userPotho1"></image>
						<image v-else-if="user.sex=='2'" class="icon base-img" :src="userPotho2"></image>
						<image v-else class="icon base-img" :src="userPotho0"></image>
					</view>
					<view class="info">
						<view class="name-ct">
							<view class="name">{{user.name}}</view>
							<view class="time">
								{{getTimesString(item.ctime)}}
							</view>
						</view>
						<view class="address over-hidden">{{item.now_address}}</view>
					</view>
				</view>
				<view class="msg-ct">
					<view class="msg">{{item.msg}}</view>
				</view>
				<view class="btn-ct">
					<view class="btn base-btn" @click="closeDialog">关闭</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import IconClose from './base/icon-close.vue';
	import {
		getTimesString
	} from '../common/TimeSwitch';

	export default {
		name: "fishing-dialog",
		props: ['item', 'user'],
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
			getTimesString,
			closeDialog() {
				this.$emit("close");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fishing-dialog-content {
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
		}

		.avatar-ct {
			width: 100%;
			height: 100rpx;
			border-bottom: 1rpx solid #f1f1f1;
			position: relative;

			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 40rpx;
				overflow: hidden;
				flex: none;
				position: absolute;
				left: 0;
				top: 0;
			}

			.info {
				width: 100%;
				padding-left: 100rpx;
				box-sizing: border-box;

				.name-ct {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 36rpx;

					.name {
						font-size: 36rpx;
						line-height: 36rpx;
						font-weight: bolder;
					}

					.time {
						font-size: 28rpx;
						line-height: 28rpx;
					}
				}


				.address {
					width: 100%;
					height: auto;
					padding-top: 12rpx;
					font-size: 28rpx;
					line-height: 28rpx;
				}
			}
		}

		.msg-ct {
			width: 100%;
			height: auto;
			padding: 24rpx 0;
			font-size: 32rpx;
			line-height: 36rpx;
			min-height: 200rpx;
		}

		.btn-ct {
			width: 100%;
			height: auto;
			text-align: center;

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