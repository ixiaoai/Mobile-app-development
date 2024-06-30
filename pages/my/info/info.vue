<template>
	<!--pages/mine/info/info.wxml-->
	<view class="infoBox">
		<view class="infoCon">
			<view class="infoConItem" style="border-bottom: 2rpx #efefef solid;">
				<text style="font-size: 29rpx;color: #999;">头像</text>
				<view class="infoConItemRight">
					<image :src="user.avatarUrl" mode="widthFix" @click="onChooseAvatar" />
					<text class="tn-icon-right" style="padding-left: 10upx;"></text>
				</view>
			</view>
			<view class="infoConItem" style="border-bottom: 2rpx #efefef solid;" @click="onShowNickname">
				<text style="font-size: 29rpx;color: #999;">昵称</text>
				<view class="infoConItemRight">
					<text>{{user.nickname}}</text>
					<text class="tn-icon-right" style="padding-left: 10upx;"></text>
				</view>
			</view>
			<view class="infoConItem" style="border-bottom: 2rpx #efefef solid;" @click="onShowPhone">
				<text style="font-size: 29rpx;color: #999;">手机号</text>
				<view class="infoConItemRight">
					<text>{{user.phone?user.phone:'无'}}</text>
					<text class="tn-icon-right" style="padding-left: 10upx;"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			};
		},
		methods: {
			//选择头像进行修改
			onChooseAvatar() {
				const _this = this;
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数，默认9
					sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					sizeType: ['original'], //original 原图，compressed 压缩图，默认二者都有
					success(res) {
						uni.showLoading({
							title:'修改中...'
						})
						let filePath = res.tempFilePaths[0]
						// callback方式 ，进行上传操作
						uniCloud.uploadFile({
							filePath: filePath, //要上传的文件对象
							cloudPath: Date.now() + '.jpg', //保存在云端的文件名，这里以时间戳命名
							success(res) {
								let imageUrl = res.fileID //云端返回的图片地址
								uniCloud.callFunction({
									name: 'upUserDetail',
									data: {
										id: _this.user._id,
										field: 'avatarUrl',
										data: imageUrl
									}
								}).then((res) => {
									_this.user.avatarUrl = imageUrl;
									uni.showToast({
										title: '修改成功'
									})
									uni.setStorageSync('loginUser', JSON.stringify(_this.user))
								}).catch(() => {
									uni.showToast({
										title: '修改失败',
										icon: 'error',
										duration: 1000
									});
								})
							},
							fail(err) {
								console.log(err)
							},
							complete() {
								uni.hideLoading()
							}
						});
					},
					fail() {
						console.log('失败', err);
					},
					complete() {
						console.log('结束');
					},
				})
			},
			//修改昵称
			onShowNickname() {
				let that = this;
				uni.showModal({
					title: '修改昵称',
					editable: true, //显示输入框
					placeholderText: '输入昵称', //显示输入框提示信息
					success: res => {
						if (res.confirm) { //点击了确认
							let content = res.content;
							uniCloud.callFunction({
								name: 'upUserDetail',
								data: {
									id: this.user._id,
									field: 'nickname',
									data: content
								}
							}).then((res) => {
								this.user.nickname = content;
								uni.showToast({
									title: '修改成功'
								})
								uni.setStorageSync('loginUser', JSON.stringify(this.user))
							}).catch(() => {
								uni.showToast({
									title: '修改失败',
									icon: 'error',
									duration: 1000
								});
							})
						} else {
							console.log('用户点击了取消')
						}
					}
				})
			},
			//修改手机号
			onShowPhone() {
				let that = this;
				uni.showModal({
					title: '修改手机号',
					editable: true, //显示输入框
					placeholderText: '输入手机号', //显示输入框提示信息
					success: res => {
						if (res.confirm) { //点击了确认
							let content = res.content;
							uniCloud.callFunction({
								name: 'upUserDetail',
								data: {
									id: this.user._id,
									field: 'phone',
									data: content
								}
							}).then((res) => {
								this.user.phone = content;
								uni.showToast({
									title: '修改成功'
								})
								uni.setStorageSync('loginUser', JSON.stringify(this.user))
							}).catch(() => {
								uni.showToast({
									title: '注册失败',
									icon: 'error',
									duration: 1000
								});
							})
						} else {
							console.log('用户点击了取消')
						}
					}
				})
			}
		},
		onLoad() {
			var user = uni.getStorageSync('loginUser');
			if (user) {
				this.user = JSON.parse(user);
			} else {
				this.user = {}
			}
		}
	}
</script>

<style lang="scss">
	.infoBox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.infoCon {
		width: 95%;
		margin-top: 30rpx;
		background-color: #fff;
		border-radius: 15rpx;
	}

	.infoConItem {
		height: 80rpx;
		margin: 20rpx 20rpx 0 20rpx;
		padding-bottom: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.infoConItemRight {
		color: #999;
		display: flex;
		align-items: center;
	}

	.infoConItemRight image {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;
	}

	.infoConItemRight text:first-child {
		font-size: 28rpx;
	}

	.infoConItemRight text:last-child {
		padding-left: 15rpx;
		font-size: 38rpx;
	}

	.infoBot {
		margin-top: 100rpx;
	}
</style>