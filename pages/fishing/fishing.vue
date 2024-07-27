<template>
	<view class="friends-content">
		<view class="btn-ct">
			<view class="btn base-btn" @click="toNewFishing">撒一个狗粮</view>
		</view>
		<fishing-items-vue class="friend-item" v-for="(fri, index) in fishingList" :key="index" :item="fri"
			:user="minUserInfo">
		</fishing-items-vue>
		<view class="base-last-tip">暂无更多数据</view>
	</view>
</template>

<script>
	import fishingItemsVue from '../../components/fishing-items.vue';
	import request from '../../common/request';
	export default {
		data() {
			return {
				fishingList: [],
				minUserInfo: {},
				loading: false,
			}
		},
		components: {
			fishingItemsVue
		},
		onShow() {
			this.reFreshFishing();
		},
		methods: {
			reFreshFishing() {
				if (this.loading) {
					return ;
				}
				this.loading = true;
				request.cloudCallFunction("fishing_get_list", {}, (status, res) => {
					if (status == 1) {
						this.fishingList = res.list;
						this.minUserInfo = res.user;
					}
					this.loading = false;
				});
			},
			toNewFishing() {
				if (this.$store.state.isLogin) {
					uni.navigateTo({
						url: '/pages/fishing/edit/edit',
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

<style lang="scss" scoped>
	.friends-content {
		width: 100%;
		height: auto;
		padding: 24rpx;
		box-sizing: border-box;

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