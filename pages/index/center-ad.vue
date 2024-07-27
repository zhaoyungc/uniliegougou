<template>
	<view class="ad-content">
		<swiper class="swiper" indicator-dots="true" :autoplay="true"
			:interval="2000" :duration="500">
			<swiper-item v-for="(ad, index) in adList" :key="index" @click="toShowAd(ad)">
				<view class="swiper-item">
					<image class="base-img" :src="ad.img"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "center-ad",
		props: ['adList'],
		data() {
			return {
			}
		},
		components: {
		},
		onLoad() {

		},
		methods: {
			toShowAd(ad) {
				window.open(ad.page_url);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ad-content {
		width: 100%;
		height: 280rpx;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}
</style>