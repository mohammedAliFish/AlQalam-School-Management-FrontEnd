/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {fontFamily: {
      almarai: ['"Almarai"', 'sans-serif'],
    },},
  },
  plugins: [   forms],
}
