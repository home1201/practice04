import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    https: false, // HTTPS 비활성화
    host: true, // 요청 수신 IP 설정
    hmr: { host: 'localhost', protocol: 'ws' }, // HMR 엔더포인트 및 프로토콜 설정
  },
  base: "./"
});
