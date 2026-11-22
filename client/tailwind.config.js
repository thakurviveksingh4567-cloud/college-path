/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B192C',
          800: '#112239',
          700: '#1E3E62',
          600: '#2B578A',
        },
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 25, 44, 0.06), 0 2px 6px -1px rgba(11, 25, 44, 0.04)',
        'soft-xl': '0 20px 25px -5px rgba(11, 25, 44, 0.08), 0 8px 10px -6px rgba(11, 25, 44, 0.04)',
        'card': '0 2px 12px 0 rgba(11, 25, 44, 0.05)',
      }
    },
  },
  plugins: [],
}
