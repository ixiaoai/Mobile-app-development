'use strict';

const db=uniCloud.database();
exports.main = async (event, context) => {
	let res= await db.collection('users').add({
		nickname:event.nickname,
		username:event.username,
		password:event.password,
		avatarUrl:event.avatarUrl,
		phone:''
	})
	//返回数据给客户端
	return res
};
