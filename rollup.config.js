import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import shebang from 'rollup-plugin-add-shebang';

export default [
  {
    input: 'src/libs/index.ts',
    preserveModules: true,
    external: ['rxjs', 'rxjs/operators'],
    output: {
      dir: 'dist/commonjs/libs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      babel({
        extensions: ['.ts', '.js'],
        babelHelpers: 'bundled',
      }),
      typescript({
        include: ['src/libs/**/*.ts'],
        outDir: 'dist/commonjs/libs',
        declaration: true,
      }),
    ],
  },
  {
    input: 'src/libs/index.ts',
    preserveModules: true,
    external: ['rxjs', 'rxjs/operators'],
    output: {
      dir: 'dist/es/libs',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      typescript({
        include: ['src/libs/**/*.ts'],
        outDir: 'dist/es/libs',
        declaration: true,
      }),
    ],
  },
  // cli
  {
    input: 'src/cli/bin.ts',
    preserveModules: false,
    external: ['rxjs', 'rxjs/operators', 'fs', 'path', 'commander', 'inquirer'],
    output: {
      dir: 'dist/cli',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      shebang({
        include: 'dist/cli/bin.js',
      }),
      typescript({
        declaration: false,
        rootDir: 'src',
      }),
    ],
  },
];
