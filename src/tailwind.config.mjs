/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.05em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.05em", fontWeight: "500" }],
                xl: ["1.25rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
                "2xl": ["1.5rem", { lineHeight: "1.3", letterSpacing: "0.05em", fontWeight: "700" }],
                "3xl": ["1.875rem", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "700" }],
                "4xl": ["2.25rem", { lineHeight: "1.1", letterSpacing: "0.05em", fontWeight: "800" }],
                "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "0.05em", fontWeight: "900" }],
                "6xl": ["3.75rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
                "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
                "8xl": ["6rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
                "9xl": ["8rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
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
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
