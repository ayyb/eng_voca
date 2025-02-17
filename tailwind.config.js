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
    'bg-red-500'
  ],
  theme: {
    extend: {
      colors:{
        customBlue: '#BCE6FF',
        progress: '#59BCFD',
        // pointColor: '#59BCFD'
      }
    },
  },
  plugins: [],
}