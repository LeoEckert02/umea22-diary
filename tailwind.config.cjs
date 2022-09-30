/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        standard: ['Roboto Mono', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
      },
      height: {
        'image': '20rem',
      }, 
      width: {
        'image': '21rem',
      }
    },
  },
  plugins: [require("daisyui")],
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
   },
   daisyui: {
    themes: [
      {
        dracula: {
          ...require("daisyui/src/colors/themes")["[data-theme=dracula]"],
          "secondary-content": "black",
          "secondary-focus": "#d6e4ff",
          "base-100": "#1c2433",
          "primary": "#6fa3fc",
          "--rounded-btn": "0.1rem",
          "neutral": "white",
        },
        
        corporate: {
          ...require("daisyui/src/colors/themes")["[data-theme=corporate]"],
          "secondary-content": "white",
          "secondary-focus": "#1e293b",
          "neutral": "black",
        },
      },
    ],
  },
}