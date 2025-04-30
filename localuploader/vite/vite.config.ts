import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// multi page な場合どうする？ → スクリプトでビルド結果をディレクトリに分けて配置する
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../src/main/resources/static",
  },
});
