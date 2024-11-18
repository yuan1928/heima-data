import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

const plugins = [
    createStyleImportPlugin({
        libs: [
            {
                libraryName: '@ks/kwai-ui',
                resolveStyle: name => {
                    if (!['locale'].includes(name)) {
                        return `@ks/kwai-ui/lib/theme-new-era/${name}.css`;
                    }
                    return '';
                },
            }
        ],
    }),
    vue(),
];

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@ks/kwai-ui': path.resolve(__dirname, './node_modules/@ks/kwai-ui'),
            },
        },
        // 服务
        server: {
          origin: 'http://localhost:5995',
          host: '0.0.0.0',
          open: true,
          port: 5995,
          // 代理配置
          proxy: {},
          cors: true,
          watch: {},
      },
    }
});

