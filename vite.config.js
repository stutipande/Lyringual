import fs from "fs";
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
    nodePolyfills({ protocolImports: true }), 
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  define: {
    TEST_PREFIX: JSON.stringify(prefix),
  },

  root: './',
  publicDir: 'public', 
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: 'index.html',
    },
  },
});
