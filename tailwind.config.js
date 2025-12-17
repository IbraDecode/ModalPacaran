/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0f172a',
        glass: 'rgba(255,255,255,0.08)',
        accent: '#8b5cf6',
        accent2: '#22d3ee',
      },
      backdropBlur: {
        lg: '16px',
      },
      boxShadow: {
        glass: '0 10px 50px rgba(0,0,0,0.35)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 0.4 },
        },
      },
    },
  },
  plugins: [],
};
