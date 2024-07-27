<template>
	<view class="icon-close-ct">
		<view class="before"></view>
		<view class="after"></view>
	</view>
</template>

<script>
	export default {
		name: "icon-close",
		data() {
			return {

			};
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.icon-close-ct {
	width: 60rpx;
	height: 60rpx;
	box-sizing: border-box;
	border: 4rpx solid #ffffff;
	border-radius: 30rpx;
	position: relative;
	
	.before {
		width: 40rpx;
		height: 4rpx;
		border-radius: 2rpx;
		transform: rotate(45deg);
		position: absolute;
		top: 27rpx;
		left: 9rpx;
		background: #ffffff;
	}
	.after {
		width: 40rpx;
		height: 4rpx;
		border-radius: 4rpx;
		transform: rotate(-45deg);
		position: absolute;
		top: 27rpx;
		left: 9rpx;
		background: #ffffff;
	}
}
</style>