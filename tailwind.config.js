module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      content: {
        slash: '/',
      },
      colors: {
        'accent-cream': '#FFF6DF',
        'accent-green': '#47C9BA',
        'accent-indigo': '#614CE3',
        'accent-purple': '#C5B5F1',
      },
      fontFamily: {
        display: ['Coconat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
