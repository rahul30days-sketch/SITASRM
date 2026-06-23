import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a3c6e',
          light: '#2d5aa0',
          dark: '#122a4e',
          50: '#f0f4fa',
          100: '#d9e3f3',
          200: '#b3c7e7',
          300: '#8dabdb',
          400: '#678fcf',
          500: '#2d5aa0',
          600: '#1a3c6e',
          700: '#122a4e',
          800: '#0d1f3a',
          900: '#081426',
        },
        secondary: {
          DEFAULT: '#c8a951',
          light: '#d4be7a',
          dark: '#a88b35',
          50: '#fdf9ef',
          100: '#f9f0d4',
          200: '#f2e0a9',
          300: '#e8cc75',
          400: '#d4be7a',
          500: '#c8a951',
          600: '#a88b35',
          700: '#876e28',
          800: '#65521e',
          900: '#443714',
        },
        accent: {
          DEFAULT: '#e84040',
          light: '#ed6b6b',
          dark: '#c52d2d',
          50: '#fef2f2',
          100: '#fde3e3',
          200: '#fbc7c7',
          300: '#f7a0a0',
          400: '#ed6b6b',
          500: '#e84040',
          600: '#c52d2d',
          700: '#a52323',
          800: '#881f1f',
          900: '#711f1f',
        },
        navy: {
          DEFAULT: '#16315c',
          deep: '#0f2547',
          light: '#26508a',
        },
        gold: {
          DEFAULT: '#c8a951',
          light: '#e8d080',
        },
        surface: '#f8f9fc',
        text: {
          DEFAULT: '#1a1a2e',
          muted: '#6b7280',
        },
        border: '#e5e7eb',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.08)',
        elevated: '0 8px 40px rgba(0, 0, 0, 0.12)',
        'glow-gold': '0 0 0 1px rgba(200, 169, 81, 0.45), 0 12px 40px rgba(200, 169, 81, 0.18)',
        'glow-soft': '0 0 60px rgba(200, 169, 81, 0.25)',
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite',
        marquee: 'marquee 28s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
