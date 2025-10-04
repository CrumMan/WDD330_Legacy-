import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    target: 'esnext',
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        legacy_team: resolve(__dirname, "src/legacy_team/index.html"),
        team: resolve(__dirname, "src/nfl_team/index.html"),
        nfl_player: resolve(__dirname,"src/nfl_player/index.html",
        ),
      },
    },
  },
});
