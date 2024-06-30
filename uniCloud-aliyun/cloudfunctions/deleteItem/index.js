'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
    const collection = db.collection('ledgers');
    const docId = event.docId;

    // 删除文档
    let res = await collection.doc(docId).remove();
    return res;
};
