/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-serif': ['"DM Serif Display"', 'serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        green: {
          900: '#0D3D22',
          800: '#1A6B3C',
          700: '#2E8B57',
          600: '#3DAA6A',
          100: '#D4EDDA',
          50: '#EAF4EE',
        },
        gold: {
          800: '#8A6200',
          700: '#B5892A',
          400: '#E8B84B',
          100: '#F7EDD5',
          50: '#FDF8EE',
        },
      },
    },
  },
  plugins: [],
}
