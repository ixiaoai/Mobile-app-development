'use strict';
const db=uniCloud.database();
exports.main = async (event, context) => {
	let res= await db.collection('users').where({
		username:event.username,
		password:event.password
	}).get();
	//返回数据给客户端
	return res
};
