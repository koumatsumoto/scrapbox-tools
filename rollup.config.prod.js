import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    name: 'bundle',
    file: 'dist/bundle.min.js',
    // cannot use `iife` bundled code as scrapbox custom script
    format: 'esm',
  },
  plugins: [typescript(), terser()],
};
