const express = require('express');
const app = express();

// リクエストごとにログを出力するミドルウェア
app.use(function(req, res, next) {
  console.log('Request received:', req.method, req.url);
  next(); // 次のミドルウェア関数に処理を渡す
});

// ルートハンドラ
app.get('/', function(req, res) {
  res.send('Hello World!');
});

// サーバーをポート3000で起動
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});