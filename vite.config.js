import { defineConfig,loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
import { fileURLToPath, URL } from "node:url";

const productionBaseURL = "/compare/quotes/payroll-services/";
const developmentBaseURL = "/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const base = env.NODE_ENV === "production" ? productionBaseURL : developmentBaseURL;

  return {
    envPrefix: "REACT_APP_",
    // This changes the out put dir from dist to build
    // comment this out if that isn't relevant for your project

    base,
    build: {
      outDir: "build",
      sourcemap: false,
      minify: true,
      cssMinify: true,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[hash].js`,
          chunkFileNames: `assets/[hash].js`,
          assetFileNames: `assets/[hash].[ext]`,
        },
      },
    },
    server: {
      open: true,
    },
    plugins: [
      react(),
      envCompatible(),
      svgrPlugin({
        svgrOptions: {
          exportType: "default",
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: "**/*.svg",
        // ...svgr options (https://react-svgr.com/docs/options/)
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
