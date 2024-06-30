<template>
	<view class="template-login">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha customBack>
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left'></text>
				<text class='icon tn-icon-home-capsule-fill'></text>
			</view>
		</tn-nav-bar>

		<view class="login">
			<!-- 顶部背景图片-->
			<view class="login__bg login__bg--top">
				<image class="bg" src="https://resource.tuniaokj.com/images/login/2/login-top2.png" mode="widthFix">
				</image>
			</view>

			<view class="login__wrapper">
				<view class="tn-margin-left tn-margin-right tn-text-bold" style="font-size: 60rpx;">
					欢迎回来
				</view>
				<view class="tn-margin tn-color-gray--disabled tn-text-lg">
					Welcome Back
				</view>

				<!-- 输入框内容-->
				<view class="login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
					<!-- 登录 -->
					<block v-if="currentModeIndex === 0">
						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-my"></view>
							</view>
							<view class="login__info__item__input__content">
								<input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入用户名"
									v-model="user.username" />
							</view>
						</view>

						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-lock"></view>
							</view>
							<view class="login__info__item__input__content">
								<input :password="!showPassword" placeholder-class="input-placeholder"
									placeholder="请输入登录密码" v-model="user.password" />
							</view>
							
							<view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
								<view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
							</view>
						</view>
						
						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-safe"></view>
							</view>
							<view class="login__info__item__input__content" style="display: flex;justify-content: space-between;align-items: center;">
								<input type="text"	placeholder="请输入验证码" v-model="code" />
								<image src="/static/img/yzm.jpg" mode="widthFix" style="width: 120upx;"></image>
							</view>
						</view>
						

					</block>
					<!-- 注册 -->
					<block v-if="currentModeIndex === 1">
						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-write"></view>
							</view>
							<view class="login__info__item__input__content">
								<input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入用户昵称"
									v-model="user.nickname" />
							</view>
						</view>
						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-my"></view>
							</view>
							<view class="login__info__item__input__content">
								<input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入注册用户名"
									v-model="user.username" />
							</view>
						</view>

						<view
							class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
							<view class="login__info__item__input__left-icon">
								<view class="tn-icon-lock"></view>
							</view>
							<view class="login__info__item__input__content">
								<input :password="!showPassword" placeholder-class="input-placeholder"
									placeholder="请输入登录密码" v-model="user.password" />
							</view>
							<view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
								<view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
							</view>
						</view>
					</block>

					<view class="login__info__item__button tn-bg-blue tn-color-white" hover-class="tn-hover"
						:hover-stay-time="150" @tap="onSubmit">{{ currentModeIndex === 0 ? '登录' : '注册'}}</view>


					<view v-if="currentModeIndex === 1" :class="[{'login__info__item__tips': currentModeIndex === 0}]">
						<view class="tn-flex tn-flex-row-between tn-padding">
							<view class="" @tap.stop="modeSwitch(0)">前往登录</view>
						</view>
					</view>
					<view v-if="currentModeIndex === 0" :class="[{'login__info__item__tips': currentModeIndex === 1}]">
						<view class="tn-flex tn-flex-row-between tn-padding">
							<view class="tn-padding-right" @tap.stop="modeSwitch(1)">账号注册</view>
						</view>
					</view>

				</view>

			</view>

			<!-- 底部背景图片-->
			<view class="login__bg login__bg--bottom">
				<image src="https://resource.tuniaokj.com/images/login/2/login-bottom2.png" mode="widthFix"></image>
			</view>

		</view>
		<tn-toast ref="toast"></tn-toast>
	</view>


</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	import CryptoJS from 'crypto-js'

	export default {
		name: 'login-demo-4',
		mixins: [template_page_mixin],
		data() {
			return {
				// 当前选中的模式
				currentModeIndex: 0,
				// 模式选中滑块
				modeSliderStyle: {
					left: 0
				},
				code:'',
				// 是否显示密码
				showPassword: false,
				user: {
					username: '',
					password: '',
					nickname: '',
					avatarUrl:'https://www.keaitupian.cn/cjpic/frombd/1/253/1634845979/3215883440.jpg'
				}
			}
		},
		watch: {
			currentModeIndex(value) {
				const sliderWidth = uni.upx2px(476 / 2)
				this.modeSliderStyle.left = `${sliderWidth * value}px`
			}
		},
		methods: {
			// 切换模式
			modeSwitch(index) {
				this.currentModeIndex = index
				this.showPassword = false;
				this.user.username = '';
				this.user.password = '';
				this.code='';
			},
			register(obj) {
			    obj.password = CryptoJS.MD5(obj.password).toString();
			    uniCloud.callFunction({
			        name: 'userRegister',
			        data: obj
			    }).then((res) => {
			        if (res.result.id) {
			            this.$refs.toast.show({
			                content: '注册成功',
			                icon: 'success',
			                duration: 1000
			            });
			            this.currentModeIndex = 0;
						this.user.password = ''; // 清空密码
			        }
			    }).catch(() => {
			        uni.showToast({
			            title: '注册失败',
			            icon: 'error',
			            duration: 1000
			        });
			    });
			},
			login(obj) {
			    obj.password = CryptoJS.MD5(obj.password).toString();
			    uniCloud.callFunction({
			        name: 'login',
			        data: obj
			    }).then((res) => {
			        if (res.result.data.length > 0) {
			            this.$refs.toast.show({
			                content: '登录成功',
			                icon: 'success',
			                duration: 1000
			            });
			            uni.setStorageSync('loginUser', JSON.stringify(res.result.data[0]));
			            setTimeout(function() {
			                uni.switchTab({
			                    url: '../my/my'
			                });
			            }, 500);
			        } else {
			            this.$refs.toast.show({
			                content: '账号或密码错误',
			                icon: 'none',
			                duration: 1000
			            });
			        }
			    });
			},
			//登录注册
			onSubmit() {
				let {
					username,
					password,
					nickname
				} = this.user;
				let code=this.code;
				let index=this.currentModeIndex;
				if(index==1){
					if(!nickname){
						this.$refs.toast.show({
							content: '用户昵称不能为空',
							icon: 'none',
							duration:1000
						})
						return false;
					}
				}
				if (!username) {
					this.$refs.toast.show({
						content: '用户名不能为空',
						icon: 'none',
						duration:1000
					})
					return false;
				}
				if (!password) {
					this.$refs.toast.show({
						content: '密码不能为空',
						icon: 'none',
						duration:1000
					})
					return false;
				}
				
				if(index==0){
					if (!code||code!='b41o2') {
						this.$refs.toast.show({
							content: '验证码为空或不正确',
							icon: 'none',
							duration:1000
						})
						return false;
					}
					this.login(this.user);
				}else{
					this.register(this.user)
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/templatePage/custom_nav_bar.scss';
	/* 悬浮 */
	/* .login-sussuspension{
    animation: suspension 3s ease-in-out infinite;
  }
  
  @keyframes suspension {
    0%, 100% {
      transform: translate(0 , 0);
    }
    50% {
      transform: translate(0rem , 1rem);
    }
  } */

	.login {
		position: relative;
		height: 100%;
		z-index: 1;

		/* 背景图片 start */
		&__bg {
			z-index: -1;
			position: fixed;

			&--top {
				top: 0;
				left: 0;
				right: 0;
				width: 100%;

				.bg {
					width: 750rpx;
					will-change: transform;
				}
			}

			&--bottom {
				bottom: -10rpx;
				left: 0;
				right: 0;
				width: 100%;
				// height: 144px;
				margin-bottom: env(safe-area-inset-bottom);

				image {
					width: 750rpx;
					will-change: transform;
				}
			}
		}

		/* 背景图片 end */

		/* 内容 start */
		&__wrapper {
			margin-top: 300rpx;
			width: 100%;
		}

		/* 切换 start */
		&__mode {
			position: relative;
			margin: 0 auto;
			width: 476rpx;
			height: 77rpx;
			margin-top: 100rpx;
			background-color: rgba(255, 255, 255, 0.6);
			box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
			border-radius: 39rpx;

			&__item {
				height: 77rpx;
				width: 100%;
				line-height: 77rpx;
				text-align: center;
				font-size: 31rpx;
				color: #080808;
				letter-spacing: 1em;
				text-indent: 1em;
				z-index: 2;
				transition: all 0.4s;

				&--active {
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			&__slider {
				position: absolute;
				height: inherit;
				width: calc(476rpx / 2);
				border-radius: inherit;
				box-shadow: 0rpx 18rpx 72rpx 18rpx rgba(0, 195, 255, 0.1);
				z-index: 1;
				transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			}
		}

		/* 切换 end */

		/* 登录注册信息 start */
		&__info {
			margin: 80rpx 30rpx 10rpx 30rpx;
			padding-bottom: 0;
			border-radius: 20rpx;

			&__item {

				&__input {
					margin-top: 59rpx;
					width: 100%;
					height: 77rpx;
					border: 1rpx solid #E6E6E6;
					border-radius: 39rpx;

					&__left-icon {
						width: 10%;
						font-size: 44rpx;
						margin-left: 20rpx;
						color: #838383;
					}

					&__content {
						width: 80%;
						padding-left: 10rpx;

						&--verify-code {
							width: 56%;
						}

						input {
							font-size: 24rpx;
							// letter-spacing: 0.1em;
						}
					}

					&__right-icon {
						width: 10%;
						font-size: 44rpx;
						margin-right: 20rpx;
						color: #838383;
					}

					&__right-verify-code {
						width: 34%;
						margin-right: 20rpx;
					}
				}

				&__button {
					margin-top: 75rpx;
					margin-bottom: 39rpx;
					width: 100%;
					height: 77rpx;
					text-align: center;
					font-size: 31rpx;
					font-weight: bold;
					line-height: 77rpx;
					letter-spacing: 1em;
					text-indent: 1em;
					border-radius: 39rpx;
					box-shadow: 1rpx 10rpx 24rpx 0rpx rgba(60, 129, 254, 0.35);
				}

				&__tips {
					margin: 30rpx 0;
					color: #AAAAAA;
				}
			}
		}

		/* 登录注册信息 end */

		/* 登录方式切换 start */
		&__way {
			margin: 0 auto;
			margin-top: 110rpx;

			&__item {
				&--icon {
					width: 85rpx;
					height: 85rpx;
					font-size: 80rpx;
					// border-radius: 100rpx;
					margin-bottom: 18rpx;
					position: relative;
					z-index: 1;

					// &::after {
					//   content: " ";
					//   position: absolute;
					//   z-index: -1;
					//   width: 100%;
					//   height: 100%;
					//   left: 0;
					//   bottom: 0;
					//   border-radius: inherit;
					//   opacity: 1;
					//   transform: scale(1, 1);
					//   background-size: 100% 100%;
					//   background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
					// }
				}
			}
		}

		/* 登录方式切换 end */
		/* 内容 end */

	}

	/deep/.input-placeholder {
		font-size: 24rpx;
		color: #838383;
	}
</style>