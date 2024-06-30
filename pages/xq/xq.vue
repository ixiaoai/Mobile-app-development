<template>
	<view class="tn-flex  tn-flex-direction-column tn-flex-col-center tn-margin-top-xl" style="line-height: 65rpx;">
			<view style="font-weight: bold;font-size: 34rpx;">
				<text>{{obj.desc}}</text>
			</view>
			<view>
				<text>{{obj.typp}}</text>
			</view>
			<view style="color: #ff2000;font-weight: bold;font-size: 35rpx;">
				<text>¥{{obj.money}}</text>
			</view>
			<view style="color: #bdbdbd;">
				<text>{{obj.dateTime}}</text>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{}
			}
		},
		methods: {
			
		},
		onLoad(option){
			this.obj=JSON.parse(option.obj);
		}
	}
</script>

<style>

</style>
