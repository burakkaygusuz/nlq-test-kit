import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-950': '#0a0a0a',
        'gray-925': '#111111'
      }
    }
  },
  plugins: [heroui()]
};

export default config;
