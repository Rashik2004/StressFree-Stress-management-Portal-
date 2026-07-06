import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_BACKEND_URL || "http://localhost:5000";

  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    // --- ADDED: Build configuration to fix the 500kb chunk warning ---
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // This pulls all third-party libraries out of your main bundle
            // and puts them into a separate 'vendor' file.
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    // -----------------------------------------------------------------
  });
};
