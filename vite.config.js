import fs from "fs";
import path from "path";

import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import solidPlugin from 'vite-plugin-solid';
import virtualHtml from 'vite-plugin-virtual-html';
import vuePlugin from '@vitejs/plugin-vue';
//import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
//import reactJsxPlugin from '@vitejs/plugin-react';
//import {username, semester, telemetryUserInfo} from "./test/telemetryConfig.js";

// if solved-X.js (or .jsx or .vue or .css) exists, then solved-X.js is tested, otherwise  X.js
const prefix=  fs.existsSync("./src/solved-utilities.js")?"solved-":"";

// we map every tw/tw*.jsx file to a virtual HTML available at http://localhost:PORT/tw*.html

const pages= {
/*    "index": {     // only works with the solid plugin!
        entry: 'src/index.jsx',
        body: '<div id="root"></div>' ,
    },*/
    // map /vue.html
    // map /react.html
    "react":{
        entry: '/src/reactjs/'+prefix+'index.jsx',
        title:"DinnerPlanner React", 
        body: '<div id="root"></div>'
    }
};

pages.index= pages.react;

export default defineConfig(function(params){
    const {vue, react}=pages;
    const pg= params.command=="build"?{ vue, react}:pages;
    return {
    plugins: [
        //solidPlugin(),
        vuePlugin(),   // for .vue files
        //vueJsxPlugin(),
        //reactJsxPlugin(),
        nodePolyfills({ protocolImports: true,}),   // needed by mocha
        virtualHtml({pages:pg})      // HTML mappings
    ],
    server: {
        host: "0.0.0.0",
        port: 8080,
    },
    define: {
        TEST_PREFIX: JSON.stringify(prefix),
        __VUE_OPTIONS_API__:JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__:JSON.stringify(true),
    },
    build: {
        target: 'esnext',   // javascript version to target: latest
        chunkSizeWarningLimit: 600,
	minify: false,
	sourcemap:true,
    },
}
					    });
