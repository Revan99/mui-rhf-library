import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
    {
        input: 'src/index.ts',
        output: { file: 'dist/esm/index.js', format: 'esm', sourcemap: true },
        plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({
            tsconfig: './tsconfig.json',
            compilerOptions: {
                outDir: 'dist/esm',
                declaration: true,
                emitDeclarationOnly: false
            }
        }), terser()],
        onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                return;
            }
            warn(warning);
        }
    },
    {
        input: 'src/index.ts',
        output: { file: 'dist/cjs/index.js', format: 'cjs', sourcemap: true },
        plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({
            tsconfig: './tsconfig.json',
            compilerOptions: {
                outDir: 'dist/cjs',
                declaration: false,
                emitDeclarationOnly: false
            }
        }), terser()],
        onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                return;
            }
            warn(warning);
        }
    },
    {
        input: 'dist/esm/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()]
    }
];
