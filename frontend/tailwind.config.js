/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '33': 'calc(3rem + 33vw)',
        '8n': 'calc(3rem + 8vw)'
      },
      keyframes: {
        slideFromRight: {
          '0%': { right: '-33vw' },
          '100%': { right: 0 },
        },
        popUp: {
          '0%': { transform: 'scale(50%)', opacity: 0 },
          '100%': { transform: 'scale(100%)', opacity: 1 },
        },
        collapse: {
          '0%': { width: '33vw' },
          '100%': { width: '8vw' },
        },
        slideUp: {
          '0%': { transform: 'scale(50%), translate(-50%)', left: '50%', opacity: 0, bottom:"-30px" },
          '100%': { transform: 'scale(100%), translate(-50%)', opacity: 1, bottom:"5rem", left:"50%" },
        },
        slideDown: {
          '0%': { transform: 'scale(100%), translate(-50%)', opacity: 1, bottom:"5rem", left:"50%" },
          '100%': { transform: 'scale(50%), translate(-50%)', left: '50%', opacity: 0, bottom:"-30px" },
          
        },
      },
      animation: {
        'slide': 'slideFromRight 0.2s linear',
        'pop-up': 'popUp 0.2s ease',
        'collapse': 'collapse 1s linear forwards',
        'alert': 'slideUp 0.2s linear forwards',
        'alert-out': 'slideDown 0.2s linear forwards'
      },
      gridTemplateColumns: {
        '2fr-1fr': '2fr 1fr',
        '9fr-1fr': '12fr 1fr',
      },
      colors:{
        "primary": "#FFF8C7",
        "primary2": "#FFFAD9",
        "primary3": "#FFFDED",
        "secondary": "#0D1B2A",
        "secondary2": "#182C42",
        "secondary3": "#1D3753",
        "secondary4": "#304E6E",
        "success": "#0E6C3F",
        "success-secondary": "#CEFFE7",
        "error": "#6D1111",
        "error-secondary": "#FFCECE",
      }
    },
  },
  plugins: [],
}