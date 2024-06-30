'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
    const collection = db.collection('ledgers');
    const docId = event._id;
    const updateData = {
        money: event.money,
        desc: event.desc
    };

    // 更新文档
    let res = await collection.doc(docId).update(updateData);
    return res;
};
