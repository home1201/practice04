import { basename } from 'node:path';
import { defineConfig } from 'vite';
import imagemin from 'unplugin-imagemin/vite';

export default defineConfig({
  server: {
    https: false, // HTTPS 비활성화
    host: true, // 요청 수신 IP 설정
    hmr: { host: 'localhost', protocol: 'ws' }, // HMR 엔더포인트 및 프로토콜 설정
    proxy: {
      "/api": {
        target: "https://stdict.korean.go.kr/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  base: `/${basename(__dirname)}/`,
  plugins: [imagemin({
    conversion: [
      { from: 'jpeg', to: 'webp' },
      { from: 'png', to: 'webp' },
      { from: 'JPG', to: 'jpeg' },
    ],
  })],
});
