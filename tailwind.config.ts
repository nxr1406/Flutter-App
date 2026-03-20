import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        rose: {
          blush: '#FFE4EE',
          petal: '#FFB8D1',
          mist: '#FFF0F5',
          deep: '#E8789A',
        },
        cream: '#FFFAF9',
        charcoal: '#2D2D35',
        muted: '#9B8EA0',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 50%, #FFF0F5 100%)',
        'hero-gradient': 'linear-gradient(160deg, #FFF5F9 0%, #FCE7F3 40%, #FDF2F8 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 0%, rgba(236,72,153,0.08) 100%)',
      },
      boxShadow: {
        'pink-sm': '0 2px 8px rgba(236, 72, 153, 0.12)',
        'pink-md': '0 4px 20px rgba(236, 72, 153, 0.18)',
        'pink-lg': '0 8px 40px rgba(236, 72, 153, 0.22)',
        'soft': '0 4px 24px rgba(45, 45, 53, 0.06)',
        'card': '0 2px 16px rgba(45, 45, 53, 0.08)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
