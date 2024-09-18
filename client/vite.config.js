import path from "path";
import { fileURLToPath } from "url";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), commonjs()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
