import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Separa as bibliotecas pesadas do codigo do site. Recharts so e baixado
        // por quem chega no painel de dados; o resto da pagina nao espera por ele.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          graficos: ["recharts"],
        },
      },
    },
  },
}));
