import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.toml" },
      },
    },
    reporters: ['default','html'],
    outputFile: {
        html: './public/static/test-results/index.html'
    }
  },
});