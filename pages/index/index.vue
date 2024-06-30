<template>
  <view class="indexBox">
    <view class="indexBoxLb">
      <tn-swiper :list="carousels" :height="350" :circular="true"></tn-swiper>
    </view>
    <view class="indexList">
      <view class="indexListTitle">
        <text>我的账本</text>
      </view>
      <view class="indexListItem" v-for="item in list" :key="item._id" @tap="onTz" :data-obj="item">
		<view class="box1">
		  	<view class="Left">
		  	  <text class="zf">{{item.typp}}</text>
		  	  <text>{{item.desc}}</text>
		  	</view>
		  	<view class="Right">
		  	  <text style="font-size: 28rpx;">
		  	    记账金额:
		  	    <text style="color: #ff2000; font-weight: bold; font-size: 34rpx;">
		  	      <text style="padding-right: 8rpx; padding-left: 5rpx;">¥</text>{{item.money}}
		  	    </text>
		  	  </text>
		  	  <text class="itemDate">{{item.dateTime}}</text>
		  	</view>
		</view>
		<view class="box2">
			<button @tap.stop="editItem(item)">修改</button> <!-- 修改按钮 -->
			<button @tap.stop="deleteItem(item._id)">删除</button> <!-- 删除按钮 -->
		</view>
      </view>
	  
      <view style="display: flex; height: 100rpx; align-items: center; justify-content: center; width: 95%; color: #aaaaaa;">
        <text>{{flag ? (list.length > 0 ? '没有更多~' : '暂无数据') : '请先登录~' }}</text>
      </view>
    </view>

    <tn-popup v-model="showEditModal" mode="bottom" safeAreaInsetBottom class="edit-modal">
      <view class="modal-content">
        <text>修改信息</text>
		<view class="mx">
			明细：
			<tn-input v-model="editingItem.desc" :border="true" placeholder="明细"></tn-input>
		</view>
		<view class="je">
			金额：
			<tn-input v-model="editingItem.money" :border="true" placeholder="金额" type="number"></tn-input>
		</view>
        <view class="button-group">
              <tn-button :plain="true" backgroundColor="#01BEFF" fontColor="#080808" @tap="confirmEdit">确认</tn-button>
              <tn-button :plain="true" backgroundColor="#01BEFF" fontColor="#080808" @tap="cancelEdit">取消</tn-button>
		</view>
      </view>
    </tn-popup>
  </view>
</template>

<script>
	export default {
	  data() {
		return {
		  carousels: [],
		  flag: false,
		  user: {},
		  list: [],
		  showEditModal: false,
		  editingItem: {},
		};
	  },
	  methods: {
		//获取轮播图
		getLb() {
		  uniCloud.callFunction({
			name: 'getCarousel',
		  }).then((res) => {
			this.carousels = res.result.data;
		  });
		},
		onTz(e) {
		  var obj = e.currentTarget.dataset.obj;
		  uni.navigateTo({
			url: '../xq/xq?obj=' + JSON.stringify(obj),
		  });
		},
		//获取指定用户订单
		getUserZd(uid) {
		  uniCloud.callFunction({
			name: 'getUserZd',
			data: {
			  uid,
			},
		  }).then((res) => {
			this.list = res.result.data;
		  }).catch(() => {
			uni.showToast({
			  title: '服务器出错',
			  icon: 'error',
			});
		  });
		},

		// 编辑项目
		editItem(item) {
		  console.log('editItem called'); // 调试信息
		  this.editingItem = { ...item }; // 深拷贝当前项目并赋值给 editingItem
		  this.showEditModal = true; // 显示弹窗
		  console.log(this.showEditModal); // 调试信息
		},
		// 确认编辑
		confirmEdit() {
		  uniCloud.callFunction({
			name: 'updateItem',
			data: this.editingItem, // 使用 editingItem 而不是 editItem
		  }).then((res) => {
			if (res.result.updated) {
			  const index = this.list.findIndex((i) => i._id === this.editingItem._id);
			  if (index !== -1) {
				this.list.splice(index, 1, this.editingItem); // 更新列表
			  }
			  uni.showToast({
				title: '修改成功',
				icon: 'success',
			  });
			}
			this.showEditModal = false; // 关闭弹窗
		  }).catch(() => {
			uni.showToast({
			  title: '修改失败',
			  icon: 'error',
			});
			this.showEditModal = false; // 关闭弹窗
		  });
		},
		// 取消编辑
		cancelEdit() {
		  this.showEditModal = false; // 关闭弹窗
		  this.editingItem = {}; // 清空编辑项
		},
		// 删除项目
		deleteItem(id) {
		  uniCloud.callFunction({
			name: 'deleteItem', // 云函数名称
			data: { docId: id },
		  }).then((res) => {
			if (res.result.deleted) {
			  this.list = this.list.filter((item) => item._id !== id); // 从列表中删除
			  uni.showToast({
				title: '删除成功',
				icon: 'success',
			  });
			}
		  }).catch(() => {
			uni.showToast({
			  title: '删除失败',
			  icon: 'error',
			});
		  });
		},
	  },
	  onLoad() {
		this.getLb();
	  },
	  onShow() {
		var user = wx.getStorageSync('loginUser');
		if (user) {
		  this.flag = true;
		  this.user = JSON.parse(user);
		  this.getUserZd(this.user._id);
		} else {
		  this.flag = false;
		  this.user = {};
		  this.list = [];
		}
	  },
	};
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

	.indexListTitle {
	  padding-top: 35rpx;
	  padding-bottom: 50rpx;
	  font-size: 45rpx;
	  font-weight: bold;
	}

	.indexBox .indexList {
	  padding: 30rpx 0;
	  width: 90%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}

	.indexBox .indexList .indexListItem {
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 230rpx;
		background-color: #fff;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		width: 100%;
		border-radius: 15rpx;
	}
	
	.indexBox .indexList .box1{
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		height: 200rpx;
		background-color: #fff;
		width: 100%;
		border-radius: 15rpx;
	}

	.indexBox .indexList .box1 .Left {
	  padding-left: 5%;
	  width: 50%;
	  height: 90%;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	}

	.indexBox .indexList .box1 .Right {
	  padding-right: 5%;
	  width: 50%;
	  height: 90%;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	  align-items: flex-end;
	}
	.indexBox .indexList .box2 {
		display: flex;
		justify-content: space-between; 
		align-items: center;
		width: 100%; 
	    padding: 10px; 
	}
	
	.indexBox .indexList .box2 button {
	  width: 48%; 
	  height: 30px; 
	  background-color: #4CAF50; 
	  color: white; 
	  border: none; 
	  border-radius: 5px; 
	  font-size: 10px; 
	  text-align: center; 
	}
	
	.indexBox .indexList .box2 button:first-child {
	  margin-right: 4%; 
	}

	.indexBox .indexList .indexListItem .indexListItemRight .itemDate {
	  font-size: 26rpx;
	  color: #bdbdbd;
	}
	
	.indexBox .edit-modal .modal-content {
	  background-color: #fff;
	  padding: 20px;
	  border-radius: 10px;
	  width: 100%;
	  max-width: 400px;
	  /* 使内容垂直居中 */
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	}
	
	.indexBox .edit-modal .modal-content text {
	  text-align: center;
	  margin-bottom: 10px; 
	}
	
	.indexBox .edit-modal .mx,
	.indexBox .edit-modal .je {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  width: 100%; 
	  margin-bottom: 10px; 
	}
	
	.indexBox .edit-modal .mx tn-input,
	.indexBox .edit-modal .je tn-input {
	  flex: none; 
	}
	
	.indexBox .edit-modal .modal-content .button-group {
	  display: flex;
	  justify-content: space-around; 
	  width: 100%;
	  margin-top: 100px; 
	}
	
	.indexBox .edit-modal .modal-content .button-group tn-button {
	  flex: 1; 
	}

	.zf {
	  color: $uni-color-warning;
	}

	.sr {
	  color: $uni-color-success;
	}
</style>
