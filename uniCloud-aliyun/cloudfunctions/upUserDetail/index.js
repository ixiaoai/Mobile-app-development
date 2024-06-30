'use strict';
const db=uniCloud.database();
exports.main = async (event, context) => {
	let res=await db.collection('users').doc(event.id).update({
		[`${event.field}`]:event.data
	})
	//返回数据给客户端
	return res
};
