/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vDarkBlue: '#426271',
        vMediumBlue: '#17829b',
        vDarkPink: '#bb787b',
        vMediumPink: '#d89ea6',
      },
    },
  },
  plugins: [],
};
