import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import dotenv from 'dotenv';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import tailwindcss from 'tailwindcss';

// Load environment variables
dotenv.config();

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: process.env.NODE_ENV !== 'production', // Disable in production
      inlineDynamicImports: true,
      banner: "var global = globalThis || window || self;", // Polyfill global
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: process.env.NODE_ENV !== 'production', // Disable in production
      inlineDynamicImports: true,
      banner: "var global = globalThis || window || self;", // Polyfill global
    },
  ],
  plugins: [
    // Automatically externalize peer dependencies
    peerDepsExternal(),
    // Add the Node.js polyfills plugin
    // Handle node polyfills first
    nodePolyfills({
      include: [
        'node_modules/axios/**/*.js',
      ],
    }),
    // Handles JSON imports
    json(),
    // Resolve node modules
    resolve({
      preferBuiltins: true, 
      browser: true, // Ensures it works in a browser environment
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    // Convert CommonJS modules to ES6
    commonjs(),
    // Process TypeScript files
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    }),
    // Process CSS/SCSS
    postcss({
      modules: false, // Disable CSS Modules
      use: ["sass"],
      inject: true, // Inject CSS into the JavaScript bundle
      extract: false, // Don’t extract CSS into a separate file
      minimize: true,
      sourceMap: process.env.NODE_ENV !== 'production', // Disable in production
      extensions: [".css", ".scss"],
      plugins: [
        tailwindcss({
          config: './tailwind.config.js', // Ensure you have this config file
        }),
      ],
    }),
    // Process images
    image(),
    // Transpile with Babel
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    }),
    // Minify the output in production
    process.env.NODE_ENV === 'production' && terser({
      compress: {
        dead_code: true,
        drop_console: true, // Optional: remove console logs
        pure_funcs: ['console.log'], // Optional: remove specific functions
      },
    }),
  ],
  // Mark all dependencies as external
  external: [
    'react', 
    'react-dom',
    'axios',
    'jquery',
  ],
});