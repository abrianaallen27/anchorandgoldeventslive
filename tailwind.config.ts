import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F0E2E5',
        plum: '#43254A',
        'rose-gold': '#C48A8A',
        'soft-mauve': '#C9A4B0',
        'mauve-pink': '#D8A7B1',
        'mauve-plum': '#B79AB3',
      },
      fontFamily: {
        allura: ['"Allura"', 'cursive'],
        'cinzel-dec': ['"Cinzel Decorative"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        jost: ['"Jost"', 'sans-serif'],
        'amsterdam': ['"Amsterdam Four"', 'serif'],
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg, #B87A7A 0%, #C48A8A 40%, #D4A882 100%)',
      },
      letterSpacing: {
        cinzel: '0.15em',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
} satisfies Config
