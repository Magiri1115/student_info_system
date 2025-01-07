const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const fs = require('fs');
const checkDuplicate = require('./checkDuplicate');
const https = require('https');
const app = express();
const port = 443;
const currentDate = new Date();
const formattedDate = currentDate.toLocaleString("ja-JP",{ timeZone: 'Asia/Tokyo' });//日本形式で日時を表示

//証明書と秘密鍵を読み込む
const privateKey = fs.readFileSync(path.join(__dirname, 'ssl', 'private-key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem'), 'utf8');
const credentials = {key: privateKey, cert: certificate };

//証明書ファイルのパスを指定
const options = {
  key: fs.readFileSync('./ssl/private-key.pem'),  //プライベートキーのパス
  cert: fs.readFileSync('./ssl/certificate.pem') //証明書のパス
};
//index.htmlを返すルートを設定
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'public','index.html'));
});

//HTTPSサーバーを作成
https.createServer(options, app).listen(443,'192.168.0.15', function() {
  console.log('HTTPサーバーが https://192.168.0.15 で実行中です');
});

//ミドルウェアの設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


//MySQL接続設定
const db = mysql.createConnection({
  host: 'localhost',  //サーバーのホスト名
  user: 'magiri',  //MySQLのユーザー名
  password: 'MasaNo15',  //MySQLのパスワード
  database: 'student_data',  //使用するデータベース名
});
//接続確認
db.connect(function (err){
  if (err) {
    console.error('MySQL接続エラー：' + err.stack);
    return;
  }
  console.log('MySQLに接続しました');
});
//フォーム送信後にデータベースに保存するルート
app.post('/submit', function (req,res){
  const { student_id, name, grade, class: studentClass, gender, subject, score } = req.body;
  //データをデータベースに挿入
  const query = 'INSERT INTO students (student_id, grade, class, gender, subject, score) VALUES (?,?,?,?,?,?)';
  db.query(query, [student_id, grade, studentClass, gender, subject, score], function (err,result){
    if (err) {
      console.error('データベースへの挿入エラー：' + err.stack);
      return res.status(500).send('データベースへの挿入に失敗しました');
    }
    console.log('データが挿入されました：', result);
    //res.redirect('/submit.html');
  });
  //フォーム送信を受け取るルート
  const formData = req.body;
  const formDataString = JSON.stringify(formData);

  //重複チェック
  checkDuplicate(formDataString, function (err, duplicate) {
    if (err) {
      console.error('エラーが発生しました：', err);
      return res.status(500).send('サーバーエラー');
    }
    if (duplicate) {
      //重複データがあった場合エラーページにリダイレクト
      console.log('データは存在しています');
      return res.redirect('/error.html');
    }

    //書き込み日時をコンソールに出力
    const formData = `Time: ${formattedDate}, student_id: ${student_id}, name: ${name}, grade: ${grade}, class: ${studentClass}, gender: ${gender}, subject: ${subject}, score: ${score}\n`;
    //重複がなかった場合、新しいデータをファイルに追加
    fs.appendFile(path.join(__dirname,'formData.txt'), formDataString + '\n', function (err) {
      if (err) {
        console.error('formData.txtへの書き込みに失敗しました：', err);
	return res.status(500).send('ファイルへの書き込みに失敗しました');
      }
      console.log('新しいデータがformData.txtに保存されました');
      res.sendFile(path.join(__dirname,'public','submit.html'));
    });
  });
});
