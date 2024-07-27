<template>
	<view class="logo-content">
		<image class="logo" src="http://www.metwo.cn/resource/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "title-logo",
		data() {
			return {
				title: '一个胡乱聊听的app'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.logo-content {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 186rpx;
		padding: 100rpx 24rpx 10rpx 24rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		background-color: #f2f2f2;
		color: rgb(0, 0, 0);
	}

	.logo {
		flex: none;
		width: 130rpx;
		height: 76rpx;
	}

	.text-area {
		width: 100%;
		display: flex;
		align-items: flex-end;
		padding-bottom: 10rpx;
		margin-left: 10rpx;
	}

	.title {
		font-size: 12px;
		line-height: 12px;
		color: #8f8f94;
	}
</style>