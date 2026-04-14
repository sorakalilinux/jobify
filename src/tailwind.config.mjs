/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                // Modern 1.250 scale for typography hierarchy
                xs: ["0.64rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "400" }],
                sm: ["0.8rem", { lineHeight: "1.5", letterSpacing: "0.06em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.6", letterSpacing: "0.03em", fontWeight: "400" }],
                lg: ["1.25rem", { lineHeight: "1.6", letterSpacing: "0.02em", fontWeight: "500" }],
                xl: ["1.563rem", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "600" }],
                "2xl": ["1.953rem", { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "700" }],
                "3xl": ["2.441rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
                "4xl": ["3.052rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "800" }],
                "5xl": ["3.815rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "900" }],
                "6xl": ["4.768rem", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "900" }],
                "7xl": ["5.96rem", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "900" }],
                "8xl": ["7.451rem", { lineHeight: "1", letterSpacing: "-0.06em", fontWeight: "900" }],
                "9xl": ["9.313rem", { lineHeight: "1", letterSpacing: "-0.07em", fontWeight: "900" }],
            },
            fontFamily: {
                heading: ["Open Sans"],
                paragraph: ["roboto", "sans-serif"]
            },
            colors: {
                destructive: "#DF3131",
                destructiveforeground: "#FFFFFF",
                foreground: "#FFFFFF",
                surface: "#E0E0E0",
                marqueetext: "#FFFFFF",
                background: "#0A0E27",
                secondary: "#1A1F3A",
                "secondary-foreground": "#00D9FF",
                "primary-foreground": "#FFFFFF",
                primary: "#7C3AED",
                "electric-blue": "#00D9FF",
                "cyber-purple": "#7C3AED",
                "dark-charcoal": "#1A1F3A",
                "neon-glow": "#00D9FF",
            },
            spacing: {
                // Consistent spacing scale
                "xs": "0.5rem",
                "sm": "1rem",
                "md": "1.5rem",
                "lg": "2rem",
                "xl": "3rem",
                "2xl": "4rem",
                "3xl": "6rem",
            },
            borderRadius: {
                // Modern border radius scale
                "xs": "4px",
                "sm": "6px",
                "md": "8px",
                "lg": "12px",
                "xl": "16px",
                "2xl": "20px",
                "3xl": "24px",
            },
            boxShadow: {
                // Subtle drop shadows for depth
                "soft": "0 2px 8px rgba(0, 0, 0, 0.12)",
                "medium": "0 4px 16px rgba(0, 0, 0, 0.15)",
                "lg": "0 8px 24px rgba(0, 0, 0, 0.18)",
                "glow-sm": "0 0 12px rgba(0, 217, 255, 0.2)",
                "glow-md": "0 0 20px rgba(0, 217, 255, 0.3)",
                "glow-lg": "0 0 32px rgba(0, 217, 255, 0.4)",
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
