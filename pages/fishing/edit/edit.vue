<template>
	<view class="mine-edit-ct">
		<view class="other-ct">
			<view class="title">狗粮信息</view>
		</view>
		<view class="item-ct">
			<view class="input-ct">
				<uni-easyinput type="textarea" autoHeight v-model="fishingMsg" placeholder="输入内容"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="address">名称：{{ locationData.name || '-'}}</view>
			<view class="address">地址：{{ locationData.address || '-'}}</view>
		</view>
		<view class="item-ct">
			<view class="base-btn location-btn" @click="toChooseLoaction">选择我的位置</view>
		</view>
		<view class="item-ct center">
			<view class="base-btn btn" :class="fishingMsg? '' : 'base-disable'"
				@click="toSave">扔出去</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../common/request.js';
	export default {
		data() {
			return {
				fishingMsg: '',
				locationData: {
					x: 0,
					y: 0,
					name: '',
					address: ''
				},
				loading: false,
			};
		},
		onLoad() {

		},
		methods: {
			toSave() {
				if (this.loading) {
					return ;
				}
				this.loading = true;
				request.cloudCallFunction('fishing_add_detail', {
					msg: this.fishingMsg,
					address: this.locationData.address || '-'
				}, (status, res) => {
					if (status == 1) {
						uni.navigateBack({
							delta: 1
						});
					} else {
						window.alert(res.msg);
					}
					this.loading = false;
				});
			},
			toChooseLoaction() {
				uni.chooseLocation({
					success: (res) => {
						this.locationData = {
							x: res.latitude,
							y: res.longitude,
							name: res.name,
							address: res.address,
						};
					},
					fail: (err) => {
						window.alert("获取位置失败");
					},
					complete: (res) => {
						console.error('完成:', res);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-edit-ct {
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
				font-size: 36rpx;
				line-height: 36rpx;
				font-weight: bolder;
			}
		}

		.item-ct {
			width: 100%;
			height: auto;
			padding-top: 24rpx;

			&.center {
				display: flex;
				align-items: center;
			}

			.input-ct {
				font-size: 0.28rpx;
				line-height: 0.32rpx;
			}

			.btn {
				display: inline-block;
				width: 200rpx;
				font-size: 42rpx;
				line-height: 42rpx;
				padding: 12rpx 0;
				border-radius: 8rpx;
				text-align: center;
				margin: 0 auto;
			}

			.address {
				width: 100%;
				color: #919191;
			}

			.location-btn {
				display: inline-block;
				font-size: 24rpx;
				line-height: 24rpx;
				padding: 6rpx;
				border-radius: 6rpx;
				text-align: center;
				margin: 0 auto;
			}
		}
	}
</style>