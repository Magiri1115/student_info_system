const fs = require('fs');
const path = require('path');
//formData.txtにデータが存在するかを確認
const checkDuplicate = (newData, callback) => {
  const filePath = path.join(__dirname, 'formData.txt');
//formData.txtを読み込む
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code != 'ENOENT') {
      return callback(err);
    }
//ファイルにデータがある場合、各業に分割
    const existingData = data ? data.split('\n') : [];
//新しいデータが既存のデータにあるかチェック
    const duplicate = existingData.some((line) => line === newData);
//コールバックで結果を返す
    callback(null, duplicate);
  });
};
module.exports = checkDuplicate;
