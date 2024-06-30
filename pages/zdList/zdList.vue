<template>
	<view class="indexBox">
		<view class="indexList">
				<view class="indexListItem" v-for="item in list" :key="item._id"  @tap="onTz" :data-obj="item">
					 <view class="indexListItemLeft">
						<text class="zf">{{item.typp}}</text>
						<text>{{item.desc}}</text>
					 </view>
					 <view class="indexListItemRight">
							<text style="font-size: 28rpx;"> 
								记账金额:
								<text style="color: #ff2000;font-weight: bold;font-size: 34rpx;"> <text style="padding-right: 8rpx;padding-left: 5rpx;">¥</text>{{item.money}}</text>
							</text>
							<text class="itemDate">{{item.dateTime}}</text>
					 </view>
				</view>
				<view style="display: flex;height: 100rpx;align-items: center;justify-content: center;width: 95%;color: #AAAAAA;">
					<text>{{flag? (list.length>0?'没有更多~':'暂无数据'):'请先登录~' }}</text>
				</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:false,
				list:[]
			}
		},
		methods: {
			onTz(e){
				var obj=e.currentTarget.dataset.obj;
				uni.navigateTo({
					url:'../xq/xq?obj='+JSON.stringify(obj)
				})
			},
			//获取指定用户订单
			getUserZd(uid){
				uniCloud.callFunction({
					name:'getUserZd',
					data:{
						uid
					}
				}).then((res)=>{
					this.list=res.result.data;
				}).catch(()=>{
					uni.showToast({
						title:'服务器出错',
						icon:'error'
					})
				})
			}
			
		},
		onLoad(){
			var user=wx.getStorageSync('loginUser');
			if(user){
				user=JSON.parse(user);
				this.flag=true;
				this.getUserZd(user._id);
			}
		},
		onShow() {
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.indexBox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.indexBox .indexBoxLb {
		width: 90%;
		margin-top: 20rpx;
	}
	
	.indexListTitle{
		padding-top: 35rpx;
		padding-bottom: 50rpx;
		font-size: 45rpx;
		font-weight: bold;
	}
	.indexBox .indexList{
		padding: 30rpx 0;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	
	.indexBox .indexList .indexListItem{
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		height: 200rpx;
		background-color: #fff;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		width: 100%;
		border-radius: 15rpx;
	}
	
	.indexBox .indexList .indexListItem .indexListItemLeft{
		padding-left: 5%;
		width: 50%;
		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.indexBox .indexList .indexListItem .indexListItemRight{
		padding-right: 5%;
		width: 50%;
		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-end;
	}
	
	.indexBox .indexList .indexListItem .indexListItemRight .itemDate{
		font-size: 26rpx;
		color: #bdbdbd;
	}
	
	.zf{
		color: $uni-color-warning;
	}
	
	.sr{
		color: $uni-color-success;
	}
	
</style>