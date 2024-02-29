import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-black": "#121212",
      "secondary-black": "#1e1e1e",
      "text-primary": "#e0e0e0",
      "text-secondary": "#909090",
      "blue-primary": "#1d97d9",
      "blue-secondary": "#4D9BC6",
      "red-error": "#CC1F00",
    },
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
