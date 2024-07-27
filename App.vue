<script>
	import login from './common/login';
	import {
		mapActions
	} from 'vuex';

	export default {
		globalData: {
			isConnection: false, // 是否连接上长连接
		},
		methods: {
			...mapActions(['setLoginUser']),
		},
		onLaunch: function() {
			console.log('App Launch');
			// 自动登录
			login.autoLogin((status, res) => {
				if (status == 1) {
					console.log("自动登录成功", res);
					this.setLoginUser(res.user);
				} else {
					console.log("自动失败", res);
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';

	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f9f9f9;
		font-size: 28rpx;
		line-height: 32rpx;
	}

	/* #endif */

	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	.over-hidden {
		overflow: hidden;
		/* 隐藏超出部分的内容 */
		white-space: nowrap;
		/* 禁止文本换行 */
		text-overflow: ellipsis;
		/* 在文本末尾添加省略号 */
	}

	.base-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	
	.base-disable {
		opacity: 0.6;
		pointer-events: none;
	}
	
	

	.base-dialog {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.6);
	}

	.base-btn {
		background: #409eff;
		color: #ffffff;
		text-align: center;
		font-weight: bolder;
	}

	.base-last-tip {
		padding-top: 20rpx;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #d1d1d1;
	}
</style>