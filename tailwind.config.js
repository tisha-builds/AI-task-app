/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0faf5',
          100: '#d6f2e4',
          200: '#aee5ca',
          300: '#76d0a8',
          400: '#3eb580',
          500: '#1d9962',
          600: '#117a4c',
          700: '#0d5e3a',  // primary
          800: '#0a4a2e',
          900: '#07331f',
          950: '#041a10',
        },
        sage: {
          100: '#e8ede9',
          200: '#c8d5cb',
          300: '#a4b8a9',
        },
        surface: {
          50:  '#fafafa',
          100: '#f4f4f4',
          200: '#e8e8e8',
          900: '#111111',
          950: '#080808',
        }
      },
      fontFamily: {
        heading: ['"Cabinet Grotesk"', '"DM Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(13, 94, 58, 0.25)',
        'glow-sm': '0 0 20px rgba(13, 94, 58, 0.15)',
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
