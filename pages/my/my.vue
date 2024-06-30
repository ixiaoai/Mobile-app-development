<template>
  <view class="template-about tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <!-- <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar> -->
    
    
    <view class="top-backgroup">
      <image src='https://resource.tuniaokj.com/images/swiper/summer.jpg' mode='widthFix' class='backgroud-image'></image>
    </view>
    
    <view class="tnwave waveAnimation">
      <view class="waveWrapperInner bgTop">
        <view class="wave waveTop" style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-2.png')"></view>
      </view>
      <view class="waveWrapperInner bgMiddle">
        <view class="wave waveMiddle" style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-2.png')"></view>
      </view>
      <view class="waveWrapperInner bgBottom" >
        <view class="wave waveBottom" style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-1.png')"></view>
      </view>
    </view>
    
    <view class="about__wrap">
      <!-- 头像用户信息 -->
      <view class="user-info__container tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center" @tap="onLogin">
        <view class="user-info__avatar tn-bg-grey--light tn-flex tn-flex-col-center tn-flex-row-center">
          <view class="tn-shadow-blur" :style="[{'background-image':`url(${flag?user.avatarUrl:wImage})`},{'width': 170+'rpx'},{'height': 170+'rpx'},{'background-size': 'cover'}]">
          </view>
          <!-- <view class="tn-icon-logo-tuniao" style="font-size: 140rpx;color: #01BEFF;"></view> -->
        </view>
        <view class="user-info__nick-name"  >{{user ? user.nickname:'点击登录'}}</view>
      </view>
      

      
      <view class="tn-shadow-warp" style="margin-top: 125rpx; background-color: rgba(255,255,255,1);">
      </view> 
      
      
      <!-- 更多信息-->
      <view class="about-shadow tn-margin-top-xl tn-padding-top-sm tn-padding-bottom-sm tn-margin-left tn-margin-right">
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30"  @tap="goToInfo">
          <view class="tn-flex tn-flex-col-center">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-3 tn-color-white" > 
              <view class="tn-icon-edit"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">编辑资料</view>
            <view class="tn-margin-left-sm tn-color-cyan tn-icon-right"></view>
          </view>
        </tn-list-cell>
		<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30"  @tap="onRelease">
          <view class="tn-flex tn-flex-col-center">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-5 tn-color-white" > 
              <view class="tn-icon-share"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">发布记账</view>
            <view class="tn-margin-left-sm tn-color-cyan tn-icon-right"></view>
          </view>
        </tn-list-cell>
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @tap="onZdList">
          <view class="tn-flex tn-flex-col-center">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-6 tn-color-white"> 
              <view class="tn-icon-order"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">账单列表</view>
			<view class="tn-margin-left-sm tn-color-cyan tn-icon-right"></view>
          </view>
        </tn-list-cell>
		<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30"  @tap="onTz">
		  <view class="tn-flex tn-flex-col-center">
		    <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-7 tn-color-white" > 
		      <view class="tn-icon-statistics"></view>
		    </view>
		    <view class="tn-margin-left-sm tn-flex-1">统计账单</view>
		    <view class="tn-margin-left-sm tn-color-cyan tn-icon-right"></view>
		  </view>
		</tn-list-cell>
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30"  v-if="flag">
          <view class="tn-flex tn-flex-col-center">
            <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-15 tn-color-white"> 
              <view class="tn-icon-logout"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1" @tap="loginOut" >退出登录</view>
			<view class="tn-margin-left-sm tn-color-cyan tn-icon-right"></view>
          </view>
        </tn-list-cell>
      </view>
    
      
    </view>
    <view class="tn-padding-xl"></view>
     
    
    <!-- 回到首页悬浮按钮-->
    <nav-index-button></nav-index-button>
    
  </view>
</template>

<script>
  import template_page_mixin, { onLoad } from '@/libs/mixin/template_page_mixin.js'
  import NavIndexButton from '@/libs/components/nav-index-button.vue'
  export default {
    name: 'about-demo-1',
    mixins: [template_page_mixin],
    components: { NavIndexButton },
    data(){
      return {
		  //判断是否已登录
		  flag:false,
		  wImage:'https://gd-hbimg.huaban.com/3d08684c78c6bef02339f8be1ba7e1d64f6dcfd828ba-nTzqqR_fw658',
		  user:''
      }
    },
    methods: {
		//前往发布
		onRelease(){
			if(!this.flag){
				uni.navigateTo({
					url:'../login/login'
				})
			}else{
				uni.switchTab({
					url: '../fb/fb'
				});
			}
		},
		//前往个人信息
		goToInfo(){
			if(!this.flag){
				uni.navigateTo({
					url:'../login/login'
				})
				return false;
			}
			uni.navigateTo({
				url:'/pages/my/info/info'
			})
		},
		//前往统计页面
		onTz(){
			if(!this.flag){
				uni.navigateTo({
					url:'../login/login'
				})
				return false;
			}
			uni.navigateTo({
				url:'/pages/my/statistics/statistics'
			})
		},
		//前往账单列表
		onZdList(){
			if(!this.flag){
				uni.navigateTo({
					url:'../login/login'
				})
			}else{
				uni.navigateTo({
					url: '../zdList/zdList'
				});
			}
		},
		//登录
		onLogin(){
			if(!this.flag){
				uni.navigateTo({
					url:'../login/login'
				})
			}
			
		},
		//退出登录
		loginOut(){
			uni.removeStorageSync('loginUser');
			uni.showToast({
				title: '退出成功',
				icon:'success',
				duration: 1000
			});
			this.user='';
			this.flag=false;
		}
    },
	onShow(){
		var user = uni.getStorageSync('loginUser');
		if(user){
			this.flag=true;
			this.user=JSON.parse(user);
		}else{
			this.flag=false;
			this.user='';
		}
	}
  }
</script>

<style lang="scss" scoped>
  @import '@/static/css/templatePage/custom_nav_bar.scss';
  .template-about{
  }
  /* 顶部背景图 start */
  .top-backgroup {
    height: 450rpx;
    z-index: -1;
  
    .backgroud-image {
      width: 100%;
      height: 450rpx;
      // z-index: -1;
    }
  }
  /* 顶部背景图 end */
  
  /* 波浪*/
  @keyframes move_wave {
      0% {
          transform: translateX(0) translateZ(0) scaleY(1)
      }
      50% {
          transform: translateX(-25%) translateZ(0) scaleY(1)
      }
      100% {
          transform: translateX(-50%) translateZ(0) scaleY(1)
      }
  }
  .tnwave {
      overflow: hidden;
      position: absolute;
      z-index: 9999;
      height: 200rpx;
      left: 0;
      right: 0;
      top: 290rpx;
      bottom: auto;
  }
  .waveWrapperInner {
      position: absolute;
      width: 100%;
      overflow: hidden;
      height: 100%;
  }
  .wave {
      position: absolute;
      left: 0;
      width: 200%;
      height: 100%;
      background-repeat: repeat no-repeat;
      background-position: 0 bottom;
      transform-origin: center bottom;
  }
  
  .bgTop {
      opacity: 0.4;
  }
  .waveTop {
      background-size: 50% 45px;
  }
  .waveAnimation .waveTop {
    animation: move_wave 4s linear infinite;
  }
  
  .bgMiddle {
      opacity: 0.6;
  }
  .waveMiddle {
      background-size: 50% 40px;
  }
  .waveAnimation .waveMiddle {
      animation: move_wave 3.5s linear infinite;
  }
  
  .bgBottom {
      opacity: 0.95;
  }
  .waveBottom {
      background-size: 50% 35px;
  }
  .waveAnimation .waveBottom {
      animation: move_wave 2s linear infinite;
  }
  /* 波浪*/
  
  /* 页面 start*/
  .about-shadow{
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  .about {
    
    &__wrap {
      position: relative;
      z-index: 1;
      // margin: 20rpx 30rpx;
      margin-top: -330rpx;
    }
  }
  /* 页面 end*/
  
  /* 用户信息 start */
  .user-info {
    &__container {
      
    }
    
    &__avatar {
      width: 170rpx;
      height: 170rpx;
      border: 8rpx solid rgba(255,255,255,0.05);
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    }
    
    &__nick-name {
      margin-top: 26rpx;
      font-size: 36rpx;
      font-weight: 600;
      text-align: center;
    }
  }
  /* 用户信息 end */
  /* 图标容器1 start */
  .icon1 {
    &__item {
      // width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
      
      &--icon {
        width: 40rpx;
        height: 40rpx;
        font-size: 28rpx;
        border-radius: 50%;
        position: relative;
        z-index: 1;
        
        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
        }
      }
    }
  }
    /* 图标容器1 end */
    
    /* 底部tabbar start*/
    .footerfixed{
     position: fixed;
     width: 100%;
     bottom: 0;
     z-index: 999;
     background-color: #FFFFFF;
     box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    }
    
    .tabbar {
      display: flex;
      align-items: center;
      min-height: 110rpx;
      justify-content: space-between;
    	padding: 0;
    	height: calc(110rpx + env(safe-area-inset-bottom) / 2);
    	padding-bottom: calc(env(safe-area-inset-bottom) / 2);
    }
    
    .tabbar .action {
    	font-size: 22rpx;
    	position: relative;
    	flex: 1;
    	text-align: center;
    	padding: 0;
    	display: block;
    	height: auto;
    	line-height: 1;
    	margin: 0;
    	overflow: initial;
    }
    
    .tabbar .action .bar-icon {
    	width: 100rpx;
    	position: relative;
    	display: block;
    	height: auto;
    	margin: 0 auto 10rpx;
    	text-align: center;
    	font-size: 42rpx;
    }
    
    .tabbar .action .bar-icon image {
    	width: 50rpx;
    	height: 50rpx;
    	display: inline-block;
    }
</style>
