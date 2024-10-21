import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://botbuzz.us.to/api", // Public HTTPS backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: true, // If your backend has a self-signed certificate, otherwise omit
      },
    },
  },
});
