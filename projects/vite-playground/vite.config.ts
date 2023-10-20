import path from 'path'
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import UnoCSS from 'unocss/vite'
import svgLoader from 'vite-svg-loader'
import viteImagemin from 'vite-plugin-imagemin'

const scssVariablePath = normalizePath(path.resolve('./src/style/_variable.scss'))

const isProduction = process.env.NODE_ENV === 'production'

const CDN_URL = 'xxxxxx.com'

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : '/',
  plugins: [
    vue(),
    UnoCSS(),
    svgLoader(),
    viteImagemin({
      // 无损压缩配置
      optipng: {
        optimizationLevel: 7,
      },
      // 有损压缩配置
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'vue',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${scssVariablePath}";`,
      },
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31'],
        }),
      ],
    },
  },
})
