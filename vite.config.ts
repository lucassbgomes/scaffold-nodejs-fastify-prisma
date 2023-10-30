import { defineConfig, configDefaults } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/test/http/**', 'prisma']],
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        'prisma/*',
        'src/app.ts',
        'src/@types',
        'src/types',
        'src/env',
        'src/errors',
        'src/lib/prisma.ts',
        'src/utils/test/*',
        'src/http/middlewares/*',
        'src/**/routes/**',
        'src/use-cases/**/factories/**',
      ],
    },
  },
});
