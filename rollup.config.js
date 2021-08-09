import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    preserveModules: true,
    external: ['rxjs', 'rxjs/operators'],
    output: {
      dir: 'dist/commonjs',
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
        declaration: true,
        rootDir: 'src',
        declarationDir: 'dist/commonjs',
      }),
    ],
  },
  {
    input: 'src/index.ts',
    preserveModules: true,
    external: ['rxjs', 'rxjs/operators'],
    output: {
      dir: 'dist/es',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      typescript({
        declaration: true,
        rootDir: 'src',
        declarationDir: 'dist/es',
      }),
    ],
  },
  // cli
  {
    input: 'src/cli/bin.ts',
    preserveModules: false,
    external: ['rxjs', 'rxjs/operators', 'minimist', 'fs'],
    output: {
      dir: 'dist/cli',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      typescript({
        declaration: false,
        rootDir: 'src',
      }),
    ],
  },
];
