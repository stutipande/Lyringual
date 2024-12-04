import fs from "fs";
import path from "path";
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vuePlugin from '@vitejs/plugin-vue';

const prefix = fs.existsSync("./src/solved-utilities.js") ? "solved-" : "";


const pages = {
  "react": {
    entry: '/src/reactjs/index.jsx', 
    title: "Lyringual", 
    body: '<div id="root"></div>',
  },
};

pages.index = pages.react;

export default defineConfig({
  plugins: [
    vuePlugin(), 
    nodePolyfills({ protocolImports: true }), 
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  define: {
    TEST_PREFIX: JSON.stringify(prefix),
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
  },
  build: {
    target: 'esnext', 
    chunkSizeWarningLimit: 600,
    minify: false,
    sourcemap: true,
  },

  root: './',
  publicDir: 'public', 
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});
