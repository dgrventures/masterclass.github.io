import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Two build modes:
//   npm run build          -> dist/        (multi-file, for Azure Static Web Apps + auth)
//   npm run build:single   -> dist-single/ (one self-contained index.html for portable handoff)
//
// Single-file mode inlines JS, CSS, fonts and images as base64 so the result is
// a single double-clickable file. Note: Easy Auth (/.auth/*) only works when
// hosted on SWA, so the single-file build is for the non-gated, portable case.
const single = process.env.BUILD_TARGET === 'single';

export default defineConfig({
  plugins: single ? [viteSingleFile()] : [],
  build: {
    outDir: single ? 'dist-single' : 'dist',
    emptyOutDir: true,
    assetsInlineLimit: single ? 100_000_000 : 4096,
    cssCodeSplit: !single,
    target: 'es2020',
  },
});
