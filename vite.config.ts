import { defineConfig, configDefaults } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [['test/infra/http/**', 'prisma']],
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        'src/**/prisma/**',
        'src/**/types/**',
        'src/**/env/**',
        'src/infra/http/fastify/app.ts',
        'src/**/errors/**',
        'src/**/middlewares/**',
        'src/**/routes/**',
        'src/**/factories/**',
      ],
    },
    exclude: [...configDefaults.exclude, 'test/*'],
  },
});
