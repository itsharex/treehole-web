import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from "unplugin-vue-components/resolvers";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        AutoImport({
            imports: [
                'vue',
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar'
                    ]
                }
            ]
        }),
        Components({
            resolvers: [NaiveUiResolver()]
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['logo.svg', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
            manifest: {
                name: "TreeHole",
                short_name: 'TreeHole',
                start_url: ".",
                display: "standalone",
                theme_color: "#ffffff",
                description: "A anonymous community for college students.",
                icons: [
                    {
                        "src": "/pwa-64x64.png",
                        "sizes": "64x64",
                        "type": "image/png"
                    },
                    {
                        "src": "/pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "/pwa-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ]
            },
            devOptions: {
                enabled: true,
            }
        })],
    server: {
        proxy: {
            '/v1': {
                target: 'http://localhost:8088',
                changeOrigin: true,
            }
        },
        host: true,
        port: 3000,
        https: false,
    },
    resolve: {
        alias: {
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        }
    }
})
