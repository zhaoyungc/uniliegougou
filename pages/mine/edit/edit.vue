<template>
	<view class="mine-edit-ct">
		<view class="other-ct">
			<view class="title">编辑信息</view>
		</view>
		<view class="item-ct">
			<view class="label">姓名：</view>
			<view class="value">
				<uni-easyinput disabled trim="all" v-model="infoData.name" placeholder="身高" type="text"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="label">性别：</view>
			<view class="value">
				<radio-group @change="radioChange">
					<label class="radio">
						<radio value="2" :checked="infoData.sex == '2'" />女
					</label>
					<label class="radio">
						<radio value="1" :checked="infoData.sex == '1'" />男
					</label>
				</radio-group>

			</view>
		</view>
		<view class="item-ct">
			<view class="label">身高：</view>
			<view class="value">
				<uni-easyinput trim="all" v-model="infoData.height" placeholder="身高" type="number"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="label">体重：</view>
			<view class="value">
				<uni-easyinput trim="all" v-model="infoData.weight" placeholder="体重" type="number"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="label">年龄：</view>
			<view class="value">
				<uni-data-select v-model="infoData.age" :localdata="ageRange"></uni-data-select>
			</view>
		</view>
		<view class="item-ct">
			<view class="label">电话：</view>
			<view class="value">
				<uni-easyinput trim="all" v-model="infoData.tel" placeholder="电话" type="number"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="label">邮箱：</view>
			<view class="value">
				<uni-easyinput trim="all" v-model="infoData.email" placeholder="邮箱"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="label">常出没地址：</view>
			<view class="value">
				<uni-easyinput type="textarea" autoHeight v-model="infoData.address" placeholder="住址"></uni-easyinput>
			</view>
		</view>
		<view class="item-ct">
			<view class="btn base-btn" @click="toSave">保存</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../common/request.js';
	import { mapActions } from 'vuex';
	export default {
		data() {
			return {
				imgUrl: 'http://www.metwo.cn/resource/huli.jpeg',
				sexRange: [{
						value: "2",
						text: "女"
					},
					{
						value: "1",
						text: "男"
					}
				],
				ageRange: [{
					value: 18,
					text: "18"
				}],
				infoData: {},
				loading: false,
			};
		},
		onShow() {
			this.infoData = {
				_id: '',
				name: '',
				weight: '',
				height: '',
				sex: '0',
				age: 0,
				tel: '',
				email: '',
				address: '',
				...this.$store.state.loginUserInfo
			};
		},
		onLoad() {
			const list = [];
			for (let i = 18; i < 100; i++) {
				list.push({
					value: i,
					text: i + ""
				});
			}
			this.ageRange = list;
		},
		methods: {
			...mapActions(['setLoginUser']),
			toSave() {
				if (this.loading) {
					return;
				}
				this.loading = true;
				request.cloudCallFunction('user_update_detail', {
				    ...this.infoData,
					weight: this.infoData.weight || '0',
					height: this.infoData.height || '0',
					tel: this.infoData.tel || '0',
					age: this.infoData.age || '1',
					sex: this.infoData.sex || '0',
				}, (status, res)=> {
					if (status == 1) {
						this.setLoginUser(this.infoData);
						uni.navigateBack({
							delta: 1
						});
					}
					this.loading = false;
				});
			},
			radioChange(evt) {
				this.infoData.sex = evt.detail.value;
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
				font-size: 32rpx;
				line-height: 32rpx;
				font-weight: bolder;
			}
		}

		.item-ct {
			width: 100%;
			height: auto;
			padding-top: 20rpx;
			font-size: 24rpx;
			line-height: 24rpx;
			display: flex;
			align-items: center;

			.label {
				display: inline-block;
				font-weight: bolder;
				flex: none;
			}

			.value {
				width: 100%;
				
				.radio {
					padding-left: 20rpx;
				}
			}

			.btn {
				display: inline-block;
				width: 200rpx;
				font-size: 36rpx;
				line-height: 36rpx;
				padding: 12rpx 0;
				border-radius: 6rpx;
				text-align: center;
				margin: 0 auto;
			}
		}
	}
</style>