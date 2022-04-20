import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
