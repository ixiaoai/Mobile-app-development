<template>
	<view class="tn-flex tn-flex-row-center">
		<view class="tn-flex-basic-xl tn-flex tn-flex-row-center tn-flex-direction-column tn-padding-top-xl">
			<tn-form :model="obj" ref="form">
				<tn-form-item label="金 额" prop="money" :borderBottom="false" :required="true">
					<tn-input type="number" v-model="obj.money" :border="true" placeholder="请输入金额"  />
				</tn-form-item>
				<tn-form-item label="明 细" prop="desc" :borderBottom="false" :required="true">
					<tn-input v-model="obj.desc" :border="true" placeholder="请输入明细" />
				</tn-form-item>
				<tn-form-item label="时 间" prop="dateTime" :borderBottom="false" :required="true">
					<uni-datetime-picker type="datetime" v-model="obj.dateTime" />
				</tn-form-item>
				<tn-form-item label="类 型" prop="status" :borderBottom="false" :required="true">
					<tn-radio-group v-model="obj.status">
						<tn-radio v-for="(item, index) in list" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{item.name}}
						</tn-radio>
					</tn-radio-group>
				</tn-form-item>

			</tn-form>
			<tn-button backgroundColor="#01BEFF" fontColor="#fff" @click="submit" style="margin-top: 60rpx;">提
				交</tn-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rules: {
					money: [{
						type:'number',
						required: true,
						message: '请输入金额',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change'],
					}],
					desc: [{
						required: true,
						message: '请输入明细',
						trigger: 'change'
					}],
					dateTime: [{
						required: true,
						message: '请选择日期时间',
						trigger: 'change'
					}],
					status:[{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}]
				},
				obj: {
					money: '',
					desc: '',
					dateTime: '',
					status: ''
				},
				list: [{
						name: '支出',
						disabled: false
					},
					{
						name: '收入',
						disabled: false
					}
				]
			}
		},
		methods: {
			submit() {
				this.$refs.form.validate(valid => {
					if (valid) {
						var user=uni.getStorageSync('loginUser');
						if(user){
							user=JSON.parse(user);
							this.obj.uid=user._id;
							uniCloud.callFunction({
								name:'userFbZd',
								data:this.obj
							}).then((res)=>{
									if(res.result.id){
										uni.showToast({
											title:'发布成功'
										})
										this.obj={
											money: '',
											desc: '',
											dateTime: '',
											status: ''
										}
									}else{
										uni.showToast({
											title:'发布失败,请稍后重试',
											icon:'none'
										})
									}
							}).catch((err)=>{
								uni.showToast({
									title:'服务器错误',
									icon:'error'
								})
							})
						}else{
							wx.showToast({
								title:'请先登录',
								icon:'none'
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:'../login/login'
								})
							},450)
						}
						
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
		      this.$refs.form.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>

</style>