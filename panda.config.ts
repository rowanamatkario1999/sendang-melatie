import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: "#4b1e1e" },
          accent: { value: "#e6b8a2" },
          darkOverlay: { value: "rgba(0,0,0,0.6)" },
        },
      },
    },
  },
});