# Canis Den

## 本機開發

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

網站預設開啟於 [http://localhost:7342](http://localhost:7342)。

## 環境變數

`.env.local` 僅供本機開發使用，不應提交至版本控制。正式環境請在部署平台或執行服務的環境變數設定中提供：

- `RESEND_API_KEY`：Resend API 金鑰。未設定時，聯絡表單 API 會回傳 `503`。
- `CONTACT_FROM_EMAIL`：已在 Resend 驗證的寄件者。
- `CONTACT_TO_EMAIL`：聯絡表單收件者。
- `NEXT_PUBLIC_SITE_URL`：正式網站公開網址，用於 canonical、Sitemap 與結構化資料。

正式伺服器不需要 `.env.local`。在伺服器的專案目錄建立不進 Git 的 `.env.production`：

```bash
cp .env.example .env.production
```

填入正式值後再執行建置。`NEXT_PUBLIC_SITE_URL` 會在建置時寫入前端產物，因此必須在 `npm run build` 之前設定。

## 正式部署

```bash
npm install
npm run build
pm2 start npm --name link_canis_world -- run start
pm2 save
```

網站會依 `package.json` 的 `start` 指令監聽 `7342` 連接埠。

後續更新程式時：

```bash
git pull
npm install
npm run build
pm2 restart link_canis_world
```

修改 `.env.production` 後也需要重新建置並重新啟動。若改用 Shell 或 PM2 注入環境變數，重新啟動時請加上 `--update-env`。

變數範例請參考 [.env.example](./.env.example)，不要把正式金鑰寫入該檔案。

## 驗證

```bash
npm run lint
npx tsc --noEmit
npm run build
```
