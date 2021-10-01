module.exports = {
  mode: "jit",
  purge: {
    content: ["./src/**/*.{tsx,js,jsx,ts}", "./public/**/*.html"],
  },
  theme: {
    extend: {
      colors: {
        //light theme
        "primary-light": "#fcfcfc",
        "accent-light": "crimson",
        "text-light": "#050546",
        //dark theme
        "primary-dark": "#161414",
        "accent-dark": "purple",
        "text-dark": "#c9a0e7",
        //neon theme
        "primary-neon": "#0B0640",
        "accent-neon": "cyan",
        "text-neon": "#ffffff",
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
