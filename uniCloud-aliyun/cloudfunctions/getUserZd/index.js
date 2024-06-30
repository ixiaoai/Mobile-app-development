'use strict';
const db=uniCloud.database();
exports.main = async (event, context) => {
	let res= await db.collection('ledgers').where({
		uid:event.uid
	}).orderBy('dateTime','desc').get();
	
	//返回数据给客户端
	return res;
};
