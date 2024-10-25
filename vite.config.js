import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'./' // dung de deploy, sever de hieu duong dan hon, co the them o package.json
})
