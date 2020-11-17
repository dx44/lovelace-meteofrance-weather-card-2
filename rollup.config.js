/*  eslint-env node */
//import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
//import babel from '@rollup/plugin-babel';
//import image from '@rollup/plugin-image';
//import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/meteofrance-weather-card.js',
    output: {
        dir: 'dist',
        format: 'es',
        //        sourcemap: "inline",
    },
    plugins: [
        nodeResolve(),
        //      commonjs(),
        json(),
        //      babel({
        //          exclude: 'node_modules/**',
        //      }),
        //      image(),
        //      terser(),
    ],
};
