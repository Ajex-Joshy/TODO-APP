import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/app/", // <-- important: makes all assets load under /app/
  plugins: [react(), tailwindcss()],
});
