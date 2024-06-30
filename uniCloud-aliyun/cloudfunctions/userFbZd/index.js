'use strict';
const db=uniCloud.database();
exports.main = async (event, context) => {
	let res=await db.collection('ledgers').add({
		money:event.money,
		desc:event.desc,
		dateTime:event.dateTime,
		typp:event.status,
		uid:event.uid
	})
	
	//返回数据给客户端
	return res;
};
