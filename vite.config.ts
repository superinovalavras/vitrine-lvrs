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
        // So o react vai em chunk nomeado, porque ele e mesmo carga inicial.
        //
        // Recharts NAO entra aqui de proposito. Nomear um manualChunk faz o
        // Vite trata-lo como parte do grafo inicial e escrever um
        // <link rel="modulepreload"> no index.html — o que baixava a biblioteca
        // no load e anulava o lazy do painel de dados. Sem a entrada, o Rollup
        // separa sozinho a partir do import dinamico, e ai o chunk so e buscado
        // quando a secao entra em cena.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
}));
