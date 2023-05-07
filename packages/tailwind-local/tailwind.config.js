/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./presets')],
  content: ['src/**/*.{js,ts,jsx,tsx}', '../../packages/**/*.{js,ts,jsx,tsx}'],
}
