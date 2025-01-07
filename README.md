# 生徒情報フォーム　プロジェクト
Node.js、Express、MySQLを使用して構築されたシンプルな学生情報管理システムです。このプロジェクトでは、フォームを通じてデータを送信し、ログファイルやデータベースから情報を閲覧することができます。

## 機能
- フォームを通じて学生情報を送信
- ログファイル（`formData.txt`）に送信されたデータを記録・表示
- MySQLデータベースから学生の成績を表示
- 「提出」「ログ」「成績」ボタンによる簡単なナビゲーション

## 前提条件
- [Node.js](https://nodejs.org/) をインストール済みであること
- MySQLサーバーが動作していること
  - データベース名 `student_data` を作成し、スキーマを [スキーマセクション](#スキーマ) に従って設定してください。
- ターミナル／コマンドラインの基本的な操作ができること

## インストール手順
1. このリポジトリをクローン
  ```bash
   git clone https://github.com/yourusername/student-info-system.git
  ```
2. プロジェクトディレクトリに移動
  ```bash
  cd studnet-info-system
  ```
3. 必要なモジュールをインストール
  ```bash 
  npm install
  ```
## 使用方法
1.サーバーを起動 
  ```bash
  sudo node server.js
')
2.ブラウザで以下のURLにアクセス。
https://192.168.0.15:443

## スキーマ
CREATE TABLE students (
  id INT PRIMARY KEY,
  student_id INT,
  grade INT,
  class VARCHAR(10),
  gender INT,
  subject VARCHAR(50),
  score INT
);

## 注意事項
node_modulesフォルダはリポジトリに含まれていません。
依存関係を復元するには以下のコマンドを使用してください。
```bash
npm install
```
##ライセンス
依存関係は'package.json'と'package-lock.json'に記録されています。
このプロジェクトは [MIT License](./LICENSE) の下で公開されています。
### システムバージョン
  "dependencies": {
    "body-parser": "^1.20.3",
    "cors": "^2.8.5",
    "ejs": "^3.1.10",
    "express": "^4.21.2",
    "mysql2": "^3.12.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.2"
  }

## 開発環境と使用言語
- OS: Ubuntu 20.04
- 開発ツール: Node.js 18.0, MySQL 8.0
- フロントエンド: HTML5, CSS3, Bootstrap 5.0
- バックエンド: Node.js (Express.js)
- 使用言語: JavaScript (ES6+), 
