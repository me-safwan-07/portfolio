module.exports = {
  darkMode: "class",
  content: [
    // app content
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "color-mix(in oklab, var(--color-foreground) 90%, transparent)",

            "--tw-prose-body": "color-mix(in oklab, var(--color-foreground) 90%, transparent)",
            "--tw-prose-headings": "var(--color-foreground)",
            "--tw-prose-lead": "var(--color-foreground)",
            "--tw-prose-links": "var(--color-foreground)",
            "--tw-prose-bold": "var(--color-foreground)",
            "--tw-prose-counters": "var(--color-muted-foreground)",
            "--tw-prose-bullets": "var(--color-muted-foreground)",
            "--tw-prose-hr": "var(--color-border)",
            "--tw-prose-quotes": "var(--color-foreground)",
            "--tw-prose-quote-borders": "var(--color-border)",
            "--tw-prose-captions": "var(--color-foreground)",
            "--tw-prose-th-borders": "var(--color-border)",
            "--tw-prose-td-borders": "var(--color-border)",
            "--tw-prose-code": "var(--color-foreground)",

            // 🖼 Images
            "img": {
              margin: "0 auto",
            },

            // 💻 Inline code
            "code": {
              padding: "2px 4px",
              fontSize: "13px",
              borderRadius: "6px",
              background:
                "color-mix(in oklab, var(--color-secondary) 50%, transparent)",
              border: "1px solid hsl(var(--border))",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },

            // 🗨️ Blockquotes
            "blockquote": {
              fontStyle: "normal",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },

            // 🎥 Videos
            "video": {
              marginTop: "16px",
              marginBottom: "16px",
            },

            // 🔠 Headings, tables, etc.
            "h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, th a": {
              textDecoration: "none",
              fontWeight: "inherit",
              color: "inherit",
            },
            "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
              fontSize: "inherit",
            },
          },
        },
      }),
      background: {
        "nav-link-indicator": "var(--nav-link-indicator)",
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
