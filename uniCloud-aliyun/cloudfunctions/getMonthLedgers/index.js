'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let res = await db.collection('ledgers').where({
		uid: event.uid,
		dateTime: {
			//columnName表示欲模糊查询数据所在列的名
			$regex: event.date + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
			$options: 'm' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
		},
	}).get();
	let list = res.data;
	let count = list.length;
	let zcCount = 0;
	let srScore = 0;
	if (count > 0) {
		list.forEach((item) => {
			if (item.typp == '支出') {
				zcCount = Math.floor((parseFloat(item.money) + zcCount) * 100) / 100;
			} else {
				srScore = Math.floor((parseFloat(item.money) + srScore) * 100) / 100;
			}
		})
	}

	return {
		zcCount,
		srScore
	}
};