import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    include: ['src/__test__/**/*.test.tsx'],
    environment: 'happy-dom',
  },
});
