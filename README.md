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

- `NEXT_PUBLIC_SITE_URL`：正式網站公開網址，用於 canonical、Sitemap 與結構化資料。
- `NEXT_PUBLIC_API_BASE_URL`：瀏覽器端 API 基底，正式環境使用 `/`，由同源 Next.js rewrite 代理。
- `INTERNAL_API_BASE_URL`：Next.js container 連 backend 的內部位址，Docker 預設為 `http://host.docker.internal:7344`。

聯絡通知由 backend 呼叫 Resend Email API；`RESEND_API_KEY`、`CONTACT_FROM_EMAIL`、`CONTACT_TO_EMAIL` 應設定在 backend，不需要放進 canis-den 的正式環境。

正式伺服器不需要 `.env.local`。在伺服器的專案目錄建立不進 Git 的 `.env.production`：

```bash
cp .env.example .env.production
```

填入正式值後再執行建置。`NEXT_PUBLIC_SITE_URL` 與 `NEXT_PUBLIC_API_BASE_URL` 會在建置時寫入前端產物，因此必須在 `npm run build` 之前設定。

## 正式部署

若 server 有 Docker Compose：

```bash
docker compose --env-file .env.production up -d --build
```

若 server 只有 Docker CLI：

```bash
sh scripts/deploy-docker.sh
```

`scripts/deploy-docker.sh` 預設使用 host network，適合舊版 Docker 或 bridge network 不穩的主機。若要改回一般 port mapping，可執行：

```bash
APP_NETWORK_MODE=bridge sh scripts/deploy-docker.sh
```

網站會由 `link_canis_world` container 監聽 `7342` 連接埠。瀏覽器呼叫同源 `/api/*`，再由 Next.js container 代理到 backend 的 `7344` API。

後續更新程式時：

```bash
git pull
sh scripts/deploy-docker.sh
```

修改 `.env.production` 後也需要重新建置並重新啟動。`NEXT_PUBLIC_SITE_URL` 與 `NEXT_PUBLIC_API_BASE_URL` 會透過 build arg 寫入前端產物。

若 server 上仍有舊的 PM2 服務，切換前請先停止：

```bash
pm2 stop link_canis_world
pm2 delete link_canis_world
pm2 save
```

變數範例請參考 [.env.example](./.env.example)，不要把正式金鑰寫入該檔案。

## 驗證

```bash
npm run lint
npx tsc --noEmit
npm run build
```
