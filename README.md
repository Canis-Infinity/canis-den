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

Vercel 可在專案的 Settings、Environment Variables 中分別設定 Production、Preview 與 Development。自行部署時，請透過容器、程序管理器或主機服務注入；不需要在伺服器建立 `.env.local`。

變數範例請參考 [.env.example](./.env.example)，不要把正式金鑰寫入該檔案。

## 驗證

```bash
npm run lint
npx tsc --noEmit
npm run build
```
