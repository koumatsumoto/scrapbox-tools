import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    name: 'bundle',
    file: 'dist/bundle.js',
    format: 'esm',
  },
  watch: {
    chokidar: true,
    exclude: ['node_modules/**'],
  },
  plugins: [typescript()],
};
