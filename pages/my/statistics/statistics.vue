<template>
	<view>
		<view class="stTop" @click="onShowDate">
			<text>{{date}}</text>
			<text class="tn-icon-down-triangle tn-color-blue"></text>
		</view>
		<view class="stCon">
			<view class="stItem">
				<text>本月收入</text>
				<text>{{srScore}}</text>
			</view>
			<view class="stItem">
				<text>本月支出</text>
				<text>{{zcCount}}</text>
			</view>
		</view>

		<tn-picker mode="time" v-model="show" :params="params" @confirm="onConfirmDate"></tn-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				srScore: 0,
				zcCount: 0,
				date: '',
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				show: false
			};
		},
		methods: {
			onConfirmDate(e){
				uni.showLoading({
					title:'加载中...'
				})
				let {year,month}=e;
				this.getData(year+'-'+month);
			},
			onShowDate(){
				this.show=true;
			},
			getNowFormatDate() {
				let date = new Date(),
					year = date.getFullYear(), //获取完整的年份(4位)
					month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
				if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
				return `${year}-${month}`
			},
			getData(date) {
				let uid = this.uid;
				this.date=date;
				uniCloud.callFunction({
					name: 'getMonthLedgers',
					data: {
						date,
						uid
					}
				}).then((res) => {
					let data = res.result;
					this.srScore = data.srScore;
					this.zcCount = data.zcCount;
					uni.hideLoading()
				}).catch(() => {
					uni.showToast({
						title: '获取失败',
						icon: 'error',
						duration: 1000
					});
				})
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...'
			})
			let date = this.getNowFormatDate();
			this.uid = JSON.parse(uni.getStorageSync('loginUser'))._id;
			this.getData(date)
		}

	}
</script>

<style lang="scss">
	
	.stTop{
		display: flex;
		height: 100upx;
		align-items: center;
		padding-left: 20upx;
		font-size: 35rpx;
		font-weight: 500;
	}
	
	.stCon{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 500upx;
		font-size: 33rpx;
		.stItem{
			display: flex;
			flex-direction: column;
			align-items: center;
			
			text:last-child{
				color: #ff2000;
			}
		}
	}
</style>