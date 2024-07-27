<template>
	<view class="base-tips-ct base-dialog" @click="closeDialog">
		<view class="base-tips-content">
			<icon-close class="close" @click.native="closeDialog"></icon-close>
			<view class="content-ct" @click.stop="">
				<view class="msg-ct">
					<view class="msg">{{msg}}</view>
				</view>
				<view class="btn-ct">
					<view class="btn base-btn" @click="closeDialog">{{btn}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import IconClose from './base/icon-close.vue';

	export default {
		name: "base-tips",
		props: ['msg', 'btn'],
		data() {
			return {};
		},
		components: {
			IconClose,
		},
		methods: {
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