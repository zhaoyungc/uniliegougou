<template>
	<view class="chat-ct">
		<view class="chat-item" v-for="(cha, index) in Object.keys(newChatData)" :key="cha"
			@click="toOpenChatDetail(cha)">
			<view class="avatar">
				<image v-if="cha=='list'" class="base-img" :src="userPothoList"></image>
				<image v-else-if="newChatData[cha].sex == '1'" class="base-img" :src="userPotho1"></image>
				<image v-else-if="newChatData[cha].sex == '2'"class="base-img" :src="userPotho2"></image>
				<image v-else class="base-img" :src="userPotho0"></image>
			</view>
			<!-- // 这里只显示最近24小时的数据 -->
			<view class="content">
				<view class="name over-hidden">
					{{newChatData[cha].name}}
				</view>
				<view class="msg over-hidden">
					{{
						newChatData[cha].value.length > 0 ?
						newChatData[cha].value[newChatData[cha].value.length-1].msg.message : ""
					}}
				</view>
				<view class="time">
					{{getTimesString(newChatData[cha].time)}}
				</view>
			</view>
		</view>
		<view class="base-last-tip">暂无更多数据</view>
	</view>
</template>

<script>
	import {
		getTimesString
	} from '../../common/TimeSwitch.js';
	export default {
		data() {
			return {
				userPothoList: 'http://www.metwo.cn/resource/wx/list.webp',
				userPotho0: 'http://www.metwo.cn/resource/wx/0.webp',
				userPotho1: 'http://www.metwo.cn/resource/wx/1.webp',
				userPotho2: 'http://www.metwo.cn/resource/wx/2.webp',
				newChatData: {}
			};
		},
		onShow() {
			this.newChatData = this.$store.state.chatData;
		},
		onLoad() {

		},
		methods: {
			getTimesString,
			toOpenChatDetail(cha) {
				if (this.$store.state.isLogin) {
					uni.navigateTo({
						url: '/pages/chat/detail/detail?key=' + cha, // 跳转到对应路径的页面
					});
				} else {
					uni.switchTab({
						url: '/pages/mine/mine'
					});
				}


			}
		}
	}
</script>

<style lang="scss">
	.chat-ct {
		width: 100%;
		height: auto;
		padding: 24rpx 24rpx 100rpx 24rpx;
		box-sizing: border-box;
	}

	.chat-item {
		width: 100%;
		height: 120rpx;
		padding: 10rpx 0;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		display: flex;
		position: relative;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 8rpx;
			overflow: hidden;
			flex: none;
		}

		.content {
			width: 600rpx;
			height: 120rpx;
			padding-left: 10rpx;

			.name {
				width: 100%;
				font-size: 32rpx;
				line-height: 32rpx;
				padding-top: 20rpx;
				font-weight: bolder;
			}

			.msg {
				width: 100%;
				font-size: 28rpx;
				line-height: 28rpx;
				padding-top: 20rpx;
			}

			.time {
				height: auto;
				font-size: 24rpx;
				line-height: 24rpx;
				display: inline-block;
				position: absolute;
				top: 24rpx;
				right: 10rpx;
				color: #d1d1d1;
			}
		}
	}
</style>