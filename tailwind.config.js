/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: '#A855F7',      // Vibrant purple
        secondary: '#EC4899',    // Magenta pink
        accent: '#06B6D4',       // Cyan accent
        dark: {
          DEFAULT: '#000000',    // Pure black
          card: '#1A1A1A',       // Card background
          input: '#0F172A',      // Form input background
        },
      },
    },
  },
  plugins: [],
}

