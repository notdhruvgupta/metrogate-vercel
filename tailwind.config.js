/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['"Kanopi Brazil"'],
      'mark-pro': ['"Mark Pro"'],
      'kanopi': ['"kanopi"'],
      newBarlow: ['Outfit', "sans-serif"],
      realBarlow: ['Barlow', "sans-serif"],
      oswald: ['Oswald', "sans-serif"],
      robotoCond: ['Roboto Condensed', "sans-serif"],
      manrope: ['Manrope', "sans-serif"]
    },
    height: {
      ht: '300px',
    },
    boxShadow: {
      '3xl': '0px 5px 7px 1px rgba(0, 0, 0, 0.32)',
      'input': '0px 0px 9px -2px rgba(0, 0, 0, 0.25)',
      'inputCard': '0px 0px 5px -2px rgba(0, 0, 0, 0.5)',
      'changeIcon': "0px 0px 4px rgba(0, 0, 0, 0.25)",
      'quickBtns': "0px 0px 5px -1px rgba(0, 0, 0, 0.25)",
      'landCard': "0px 0px 2px 0px rgba(0, 0, 0, 0.35);",
      'menuCard': "0px 21px 23px -1px rgba(0, 0, 0, 0.35);",
      'smallShadow': "0px 0px 3px rgba(0, 0, 0, 0.15)",
      'redShadow': "0px 0px 6px 0px rgba(255, 0, 0, 0.50)",
      'darkShadow': "0px 0px 3px 0px #000"
    },
    dropShadow: {
      '4xl': '2px 5px 8px rgba(0, 0, 0, 0.25)',
      'btn-shadow': '1px 1px 5px rgba(0, 0, 0, 0.25)',
      'dialogShadow': '0px 0px 5px rgba(0, 0, 0, 0.4)'
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      'md': '0.35rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../src/Images/underground subway metro train v2 1.png')",
        'navbar-gradient': "linear-gradient(2.26deg, #FFFFFF -43.33%, #969090 91.64%)",
        'navbar-gradient-2': "linear-gradient(0deg, rgba(0, 0, 0, 0.47) 0%, rgba(255, 255, 255, 0) 100%);",
        'navbar-gradient-3': "linear-gradient(180deg, #C0F0FB 0%, #90E0EF 100%);",
        'navbar-gradient-4': "linear-gradient(0deg, #C0F0FB 2.95%, #90E0EF 90.73%);",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      screens: {
        'tablet': '950px',
      },
      colors: {
        "primary-muted": "oklch(var(--primary-muted) / <alpha-value>)",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "--primary-muted": "348 100% 70%",
        },
      },
    ],
  },

}