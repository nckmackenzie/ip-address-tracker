/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'primary-400': 'hsl(0, 0%, 17%)',
        'primary-600': 'hsl(0, 0%, 59%)',
      },
      backgroundImage: {
        pattern: 'url("/pattern-bg.png")',
      },
    },
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
    },
  },
  plugins: [],
};
