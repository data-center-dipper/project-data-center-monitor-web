import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command, mode }) => {
    // 加载环境变量
    const env = loadEnv(mode, process.cwd());
    console.log('按需加载环境信息 command:', command,' mode:',mode,' env:',env);

    // 根据不同环境设置API前缀和目标地址
    const apiPrefix = env.VITE_APP_API_URL_PREFIX || '/api';
    const targetUrl = env.VITE_APP_API_URL || '';

    return {
        plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'iconpark-icon',
        },
      },
    }),
    vueJsx(),
            viteMockServe({
                localEnabled: command === 'serve',
                mockPath: 'mock/',
                watchFiles: true,
                injectFile: true,
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src') // 确保路径别名指向 src 目录
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/styles/variables" as *;`,
                    // 如果使用的是最新版 Vite，请尝试改为 prependData
                    // prependData: `@use "@/styles/variables" as *;`
                }
            }
        },
        server: {
            proxy: {
                [apiPrefix]: {
                    target: targetUrl,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp(`^${apiPrefix}`), ''),
                },
            },
        },
    };
});
