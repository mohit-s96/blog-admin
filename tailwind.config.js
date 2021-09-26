module.exports = {
  mode: "jit",
  purge: {
    content: ["./src/**/*.{tsx,js,jsx,ts}", "./public/**/*.html"],
  },
  theme: {
    extend: {
      colors: {
        //light theme
        "primary-light": "#FFFFFF",
        "primary-text-light": "#000000",
        "secondary-text-light": "#6A6666",
        "primary-accent-light": "#6A279F",
        "primary-bg-light": "#EBECF1",
        //dark theme
        "primary-dark": "#0B0640",
        "dark-2": "rgb(13 11 40)",
        "primary-text-dark": "#FFFFFF",
        "secondary-text-dark": "#FFFFFF",
        "primary-accent-dark": "#6A279F",
        "primary-bg-dark": "#0B0707",
        cyan: "cyan",
      },
      borderRadius: {
        "brc-md": "20px",
        "brc-sm": "15px",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },

      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        xsm: "0.65rem",
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      width: {
        "btn-md": "8rem",
        "btn-sm": "5.5rem",
        "avat-img-sm": "1.5rem",
        "avat-img-md": "3.0rem",
        "avat-img-lg": "4.5rem",
        "card-lg-vert": "29%",
        "card-lg-horiz": "71%",
      },
      minWidth: {
        "btn-sm": "60px",
        "btn-md": "80px",
      },
      height: {
        "btn-sm": "30px",
        "btn-md": "40px",
      },
      inset: {
        sm: "-30px",
        md: "-40px",
        neg: "-1rem",
      },
      padding: {
        one: "1px",
      },
      borderWidth: {
        sm: "30px",
        "sm-2": "15px",
        md: "40px",
        "md-2": "20px",
      },
      borderColor: (theme) => ({
        ...theme("colors"),
      }),
    },
  },
};
