/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/flowbite/**/*.js', // add this
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc', // Define your primary color here
      },
    },
  },
  plugins: [],
}

