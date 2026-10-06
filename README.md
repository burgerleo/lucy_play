# Lucy Play

給 3 歲左右小孩玩的平板小遊戲合集（PWA，可安裝、可離線）。純 HTML/CSS/JS，不需要 build。

## 目前的遊戲
| 遊戲 | 說明 |
|---|---|
| 🐵 餵小動物 | 4 種玩法可複選：找食物／數數看／認顏色／分給兩隻 |
| 🐷 幫動物洗澡 | 搓泥巴 → 戳泡泡 → 沖水 → 甩乾 |
| 🐧 送動物回家 | 把動物拖回牠住的地方（農場／森林／水邊／雪地／草原） |
| 🦊 配對翻牌 | 4／6／10 對 |
| 📒 貼紙簿 | 完成遊戲抽卡，把貼紙貼到對應剪影 |

大人設定：主畫面左上角齒輪「按住 2 秒」。

遊玩紀錄（在大人設定裡）：
- 總覽：總遊玩時間、今天玩多久、開始／完成遊戲次數、打開 App 次數、貼紙數、餵食與送回家答對率、最近 7 天每天玩幾分鐘
- 每個遊戲：玩幾次、完成幾次、玩多久、今天玩幾次、上次玩的日期
  - 餵小動物：4 種玩法各答了幾題
  - 送動物回家：送對／送錯幾次
  - 配對翻牌：4／6／10 對各完成幾次、最少翻幾次就完成
  - 貼紙簿：打開幾次
- 每隻動物：被餵、洗、送回家、配對成功各幾次

## 專案結構
```
index.html            畫面骨架
css/style.css         所有樣式
js/art.js             32 隻 Q 版動物（SVG 產生器，含表情）
js/scenes.js          8 種背景場景
js/app.js             資料、音效、語音、存檔與所有遊戲邏輯
sw.js                 Service worker（離線快取）
manifest.webmanifest  PWA 設定
icons/                App 圖示
.github/workflows/    推到 main 自動部署 GitHub Pages
```

## 本機執行
Service worker 需要 http(s)，不能直接雙擊開檔：
```bash
python3 -m http.server 8000
# 打開 http://localhost:8000
```
平板測試：同一個 Wi-Fi 下用電腦 IP 開啟，例如 http://192.168.1.10:8000

## 部署（GitHub Pages）
1. 推到 GitHub 的 `main` 分支
2. Repo → Settings → Pages → Source 選 **GitHub Actions**
3. 之後每次 push 都會自動部署，`sw.js` 版本號和主畫面右下角的版本會自動換成 commit hash（本機開啟顯示 `dev`）

> 私人 repo 要使用 GitHub Pages 需要 GitHub Pro/Team 方案；
> 免費帳號可改用 Cloudflare Pages、Netlify，或自己的主機（任何靜態主機都行，必須 HTTPS 才能安裝 PWA）。

## 安裝到裝置
- iPad / iPhone：Safari → 分享 → 加入主畫面
- Android：Chrome → 選單 → 安裝應用程式
- 電腦：Chrome / Edge 網址列右側的安裝圖示

## 常改的地方
- 加動物：`js/art.js` 加一個 `S.xxx` 畫法，再到 `js/app.js` 的 `ANIMALS` 加資料（`k` 對應畫法名稱、`h` 是住的地方、3 種食物）
- 加場景：`js/scenes.js` 的 `S`
- 每輪次數：`js/app.js` 的 `FEED_ROUNDS`、`BATH_ROUNDS`、`SORT_ROUNDS`
- 存檔在瀏覽器 localStorage（key 前綴 `feed-animals:`），清除網站資料會一起清掉

## 之後的規劃
- `js/app.js` 再拆成 `js/core.js` + `js/games/*.js`，新增遊戲時只需要加一個檔案
