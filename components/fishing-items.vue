<template>
	<view class="fishing-items-ct">
		<view class="avatar" @click="showUserDetail">
			<image v-if="user.sex=='1'" class="icon base-img" :src="userPotho1"></image>
			<image v-else-if="user.sex=='2'" class="icon base-img" :src="userPotho2"></image>
			<image v-else class="icon base-img" :src="userPotho0"></image>
		</view>
		<view class="content" @click="showFishingDetail">
			<view class="name-ct">
				<view class="name">{{user.name || '-'}}</view>
				<view v-if="user.sex==1" class="sex boy">[男]</view>
				<view v-else class="sex girl">[女]</view>
			</view>
			<view class="msg">{{item.msg}}</view>
			<view class="address">{{item.now_address}}</view>
			<view class="time">
				{{getTimesString(item.ctime)}}
			</view>
		</view>
		<fishing-dialog-vue v-if="showFishingDialog" :item="item" :user="user"
			@close="closeFishingDialog"></fishing-dialog-vue>
		<user-dialog-vue v-if="showUserDialog" :user="user" @close="closeUserDialog"></user-dialog-vue>
	</view>
</template>

<script>
	import fishingDialogVue from './fishing-dialog.vue';
	import userDialogVue from './user-dialog.vue';
	import {
		getTimesString
	} from '../common/TimeSwitch';
	export default {
		name: "fishing-items",
		props: ['item', "user"],
		data() {
			return {
				imgUrl: 'http://www.metwo.cn/resource/huli.jpeg',
				showUserDialog: false,
				showFishingDialog: false,
				userPothoList: 'http://www.metwo.cn/resource/wx/list.webp',
				userPotho0: 'http://www.metwo.cn/resource/wx/0.webp',
				userPotho1: 'http://www.metwo.cn/resource/wx/1.webp',
				userPotho2: 'http://www.metwo.cn/resource/wx/2.webp',
			}
		},
		components: {
			fishingDialogVue,
			userDialogVue
		},
		methods: {
			getTimesString,
			showUserDetail() {
				this.showUserDialog = true;
			},
			showFishingDetail() {
				this.showFishingDialog = true;
			},
			closeUserDialog() {
				this.showUserDialog = false;
			},
			closeFishingDialog() {
				this.showFishingDialog = false;
			}
		},
		onLoad() {
			console.log(this.item);
		},
	}
</script>

<style lang="scss" scoped>
	.fishing-items-ct {
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

			.icon {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		.content {
			width: 100%;
			height: auto;
			margin-left: 10rpx;

			.name-ct {
				width: 100%;
				font-size: 32rpx;
				line-height: 36rpx;
				font-weight: bolder;
				display: flex;
				
				.name {
					margin-right: 20rpx;
				}
				
				.sex {
					font-size: 20rpx;
					&.boy{
						color: #0055ff;
					}
					
					&.girl{
						color: #ff00ff;
					}
				}
			}

			.msg {
				width: 100%;
				font-size: 32rpx;
				line-height: 36rpx;
				padding-top: 20rpx;
			}

			.address {
				height: auto;
				font-size: 24rpx;
				line-height: 28rpx;
				padding-top: 20rpx;
				color: rgba(0, 0, 0, 0.7);
			}

			.time {
				height: auto;
				font-size: 24rpx;
				line-height: 28rpx;
				padding-top: 12rpx;
				color: rgba(0, 0, 0, 0.7);
			}
		}
	}
</style>