<template>
	<view class="content">
		<title-logo></title-logo>
		<center-ad :adList="adList"></center-ad>
		<down-friends></down-friends>
	</view>
</template>

<script>
	import TitleLogo from './title-logo.vue';
	import CenterAd from './center-ad.vue';
	import DownFriends from './down-friends.vue';
	import request from '../../common/request';
	
	export default {
		data() {
			return {
				title: 'Hello',
				adList: [],
			}
		},
		components: {
			TitleLogo,
			CenterAd,
			DownFriends
		},
		onShow() {
			request.cloudCallFunction("ad_online_list", {}, (status, res) => {
				console.log(res, "===");
				this.adList = res.list || [];
			});
		},
		onLoad() {
			if (!this.$store.state.isLogin) {
			// 	uni.switchTab({
			// 		url: '/pages/mine/mine',
			// 	});
			}
		},
	}
</script>

<style scoped>
.content {
	padding-top: 190rpx;
	padding-bottom: 100rpx;
}
</style>
