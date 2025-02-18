/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'text-green-500', 
    'bg-green-500', 
    'text-blue-500', 
    'bg-blue-500',
    'text-red-500',
    'bg-red-500',
    'bg-progress',    // 추가
    'text-progress',   // 추가
    'text-customBlue',
    'bg-customBlue',
  ],
  theme: {
    extend: {
      colors:{
        customBlue: '#BCE6FF',
        progress: '#59BCFD',
        // pointColor: '#59BCFD'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out'
      }
    },
  },
  plugins: [],
}