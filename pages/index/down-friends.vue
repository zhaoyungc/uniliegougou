<template>
	<view class="friends-content">
		<view class="btn-ct">
			<view class="btn base-btn" @click="toLoadFish">打捞一个最新消息</view>
		</view>

		<fishing-items-vue class="friend-item" v-for="(fri, index) in friendsList" :key="index" :item="fri.detail"
			:user="fri.user">
		</fishing-items-vue>
	</view>
</template>

<script>
	import fishingItemsVue from '../../components/fishing-items.vue';
	import request from '../../common/request';
	export default {
		name: "down-friends",
		data() {
			return {
				friendsList: [],
				loading: false,
			}
		},
		components: {
			fishingItemsVue
		},
		onLoad() {

		},
		methods: {
			async toLoadFish() {
				if (this.$store.state.isLogin) {
					if (this.loading) {
						return ;
					}
					this.loading = true;
					request.cloudCallFunction("fishing_to_scoop", {}, (status, res) => {
						if (status == 1) {
							this.friendsList.unshift(res);
						}
						this.loading = false;
					});
				} else {
					// 跳转至登录
					uni.switchTab({
						url: '/pages/mine/mine'
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.friends-content {
		width: 100%;
		height: auto;
		padding: 24rpx;
		box-sizing: border-box;

		.friend-item {
			width: 100%;
			height: auto;
			padding: 10rpx 0;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.33);
			display: flex;

			.avatar {
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				overflow: hidden;
				flex: none;
			}

			.content {
				width: 100%;
				height: auto;
				margin-left: 10rpx;

				.name {
					width: 100%;
					font-size: 16px;
					font-weight: bolder;
				}

				.msg {
					width: 100%;
					font-size: 14px;
					padding-top: 8rpx;
				}

				.others {
					width: 100%;
					height: auto;
					display: flex;
					justify-content: space-between;
					padding-top: 8rpx;

					.address {
						height: auto;
						font-size: 12px;
					}

					.time {
						height: auto;
						font-size: 12px;
					}
				}
			}
		}

		.btn-ct {
			width: 100%;
			height: auto;
			padding: 20rpx;
			box-sizing: border-box;

			.btn {
				width: 100%;
				font-size: 36rpx;
				line-height: 36rpx;
				padding: 12rpx 0;
				border-radius: 30rpx;
				font-weight: bolder;
			}
		}
	}
</style>