/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //Sky
        // bronzeBg: "#0D141F",
        // bronzeComponent: "#112840",
        // bronzeBorder: "#197CAE",
        // bronzeButtons: "#86EAD4",
        // bronzeSecondaryText: "#75C7F0",
        // bronzePrimaryText: "#C2F3FF",

        // Bronze-Dark
        bronzeBg: "#111111",
        bronzeComponent: "#222222",
        bronzeBorder: "#3A3A3A",
        bronzeButtons: "#6E6E6E",
        bronzeSecondaryText: "#B4B4B4",
        bronzePrimaryText: "#EEEEEE",

        // Cian-Dark
        // bronzeBorder: "#11809C",
        // bronzeButtons: "#23AFD0",
        // bronzeSecondaryText: "#D4B3A5",
        // bronzePrimaryText: "#B6ECF7",

        //Bronze/Cian-Light
        // bronzeBg: "#FDF7F5",
        // bronzeComponent: "#E7D9D3",
        // bronzeBorder: "#ABBDF9",
        // bronzeButtons: "#8EC8F6",
        // bronzeSecondaryText: "#7D5E54",
        // bronzePrimaryText: "#1F2D5C",
      },
    },
  },
  plugins: [],
};
