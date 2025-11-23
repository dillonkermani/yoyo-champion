import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // YoYoChampion Brand Colors (legacy)
        "brand-white": "#ffffff",
        "brand-black": "#151515",
        "brand-blue": "#9bedff",
        "brand-teal": "#91afa2",
        "brand-green": "#e3f2e6",
        brand: {
          white: "#ffffff",
          black: "#151515",
          blue: "#9bedff",
          teal: "#91afa2",
          green: "#e3f2e6",
        },

        // Duolingo-inspired Vibrant Colors
        // Primary - Vibrant Success Green
        "fun-primary": {
          DEFAULT: "#58CC02",
          light: "#7ED321",
          dark: "#46A302",
        },
        // Secondary - Fun Purple
        "fun-secondary": {
          DEFAULT: "#CE82FF",
          light: "#E5B8FF",
          dark: "#A855F7",
        },
        // Accent - Bright Orange for energy
        "fun-accent": {
          DEFAULT: "#FF9600",
          light: "#FFB84D",
          dark: "#E68600",
        },
        // XP Gold
        xp: {
          DEFAULT: "#FFC800",
          light: "#FFD700",
          dark: "#E6B400",
          glow: "#FFDF4D",
        },
        // Streak Fire
        streak: {
          DEFAULT: "#FF4B4B",
          light: "#FF6B6B",
          dark: "#E63939",
          glow: "#FF8080",
        },
        // Hearts/Lives Red
        hearts: {
          DEFAULT: "#FF4B4B",
          light: "#FF6B6B",
          dark: "#E63939",
        },
        // Fun palette for backgrounds and accents
        fun: {
          blue: "#1CB0F6",
          "blue-light": "#4DC4F9",
          "blue-dark": "#0095DB",
          green: "#58CC02",
          "green-light": "#7ED321",
          "green-dark": "#46A302",
          purple: "#CE82FF",
          "purple-light": "#E5B8FF",
          "purple-dark": "#A855F7",
          pink: "#FF86D0",
          "pink-light": "#FFAAE0",
          "pink-dark": "#E664B8",
          yellow: "#FFC800",
          "yellow-light": "#FFD700",
          "yellow-dark": "#E6B400",
          orange: "#FF9600",
          "orange-light": "#FFB84D",
          "orange-dark": "#E68600",
          red: "#FF4B4B",
          "red-light": "#FF6B6B",
          "red-dark": "#E63939",
          cyan: "#00D9FF",
          "cyan-light": "#4DE4FF",
          "cyan-dark": "#00B8DB",
        },

        // Surface colors - Light theme
        surface: {
          primary: "#ffffff",
          secondary: "#f7f7f7",
          tertiary: "#eeeeee",
        },
        // Dark mode surface colors
        "surface-dark": {
          primary: "#151515",
          secondary: "#1e1e1e",
          tertiary: "#2a2a2a",
        },
        // Semantic colors
        border: {
          DEFAULT: "hsl(var(--border))",
          muted: "hsl(var(--border-muted))",
        },
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "50px",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "Jost", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        fun: ["var(--font-jost)", "Nunito", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Fun animations
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "wiggle-more": {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        jiggle: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "75%": { transform: "scale(0.95)" },
        },
        pop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px currentColor, 0 0 10px currentColor" },
          "50%": { boxShadow: "0 0 20px currentColor, 0 0 30px currentColor" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.2)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        "celebrate-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        "level-up": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(1.2) rotate(-5deg)" },
          "50%": { transform: "scale(1.3) rotate(5deg)" },
          "75%": { transform: "scale(1.2) rotate(-5deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
        "streak-fire": {
          "0%, 100%": { transform: "scaleY(1) translateY(0)", opacity: "1" },
          "25%": { transform: "scaleY(1.1) translateY(-2px)" },
          "50%": { transform: "scaleY(0.95) translateY(1px)", opacity: "0.8" },
          "75%": { transform: "scaleY(1.05) translateY(-1px)" },
        },
        "xp-gain": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "50%": { transform: "translateY(-20px) scale(1.2)", opacity: "1" },
          "100%": { transform: "translateY(-40px) scale(1)", opacity: "0" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.1)" },
        },
        "progress-shine": {
          "0%": { left: "-100%", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        spin: "spin 1s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        shimmer: "shimmer 2s linear infinite",
        // Fun animations
        wiggle: "wiggle 0.3s ease-in-out",
        "wiggle-more": "wiggle-more 0.3s ease-in-out",
        "wiggle-infinite": "wiggle 0.5s ease-in-out infinite",
        jiggle: "jiggle 0.3s ease-in-out",
        pop: "pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "pop-in": "pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "bounce-in": "bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        confetti: "confetti 3s ease-out forwards",
        "celebrate-shake": "celebrate-shake 0.5s ease-in-out",
        "level-up": "level-up 0.6s ease-in-out",
        "streak-fire": "streak-fire 0.5s ease-in-out infinite",
        "xp-gain": "xp-gain 1s ease-out forwards",
        "heart-beat": "heart-beat 0.6s ease-in-out",
        "progress-shine": "progress-shine 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        // Fun gradients
        "gradient-fun-primary":
          "linear-gradient(135deg, #58CC02 0%, #7ED321 100%)",
        "gradient-fun-secondary":
          "linear-gradient(135deg, #CE82FF 0%, #A855F7 100%)",
        "gradient-fun-accent":
          "linear-gradient(135deg, #FF9600 0%, #FFB84D 100%)",
        "gradient-xp": "linear-gradient(135deg, #FFC800 0%, #FFD700 100%)",
        "gradient-streak": "linear-gradient(135deg, #FF4B4B 0%, #FF6B6B 100%)",
        "gradient-blue": "linear-gradient(135deg, #1CB0F6 0%, #4DC4F9 100%)",
        "gradient-purple": "linear-gradient(135deg, #CE82FF 0%, #E5B8FF 100%)",
        "gradient-rainbow":
          "linear-gradient(90deg, #FF4B4B, #FF9600, #FFC800, #58CC02, #1CB0F6, #CE82FF)",
        "gradient-celebration":
          "linear-gradient(135deg, #FF4B4B 0%, #FF9600 25%, #FFC800 50%, #58CC02 75%, #1CB0F6 100%)",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.08)",
        card: "0 2px 8px rgba(0, 0, 0, 0.06)",
        elevated: "0 4px 16px rgba(0, 0, 0, 0.1)",
        // Colored shadows for fun effects
        "fun-green": "0 4px 14px rgba(88, 204, 2, 0.4)",
        "fun-green-lg": "0 8px 25px rgba(88, 204, 2, 0.35)",
        "fun-blue": "0 4px 14px rgba(28, 176, 246, 0.4)",
        "fun-blue-lg": "0 8px 25px rgba(28, 176, 246, 0.35)",
        "fun-purple": "0 4px 14px rgba(206, 130, 255, 0.4)",
        "fun-purple-lg": "0 8px 25px rgba(206, 130, 255, 0.35)",
        "fun-orange": "0 4px 14px rgba(255, 150, 0, 0.4)",
        "fun-orange-lg": "0 8px 25px rgba(255, 150, 0, 0.35)",
        "fun-yellow": "0 4px 14px rgba(255, 200, 0, 0.4)",
        "fun-yellow-lg": "0 8px 25px rgba(255, 200, 0, 0.35)",
        "fun-red": "0 4px 14px rgba(255, 75, 75, 0.4)",
        "fun-red-lg": "0 8px 25px rgba(255, 75, 75, 0.35)",
        "fun-pink": "0 4px 14px rgba(255, 134, 208, 0.4)",
        "fun-pink-lg": "0 8px 25px rgba(255, 134, 208, 0.35)",
        // Glow shadows
        "glow-green": "0 0 20px rgba(88, 204, 2, 0.5), 0 0 40px rgba(88, 204, 2, 0.3)",
        "glow-blue": "0 0 20px rgba(28, 176, 246, 0.5), 0 0 40px rgba(28, 176, 246, 0.3)",
        "glow-purple": "0 0 20px rgba(206, 130, 255, 0.5), 0 0 40px rgba(206, 130, 255, 0.3)",
        "glow-yellow": "0 0 20px rgba(255, 200, 0, 0.5), 0 0 40px rgba(255, 200, 0, 0.3)",
        "glow-red": "0 0 20px rgba(255, 75, 75, 0.5), 0 0 40px rgba(255, 75, 75, 0.3)",
        // Button press shadow
        "button-pressed": "inset 0 3px 5px rgba(0, 0, 0, 0.2)",
      },
      dropShadow: {
        "fun-green": "0 4px 8px rgba(88, 204, 2, 0.4)",
        "fun-blue": "0 4px 8px rgba(28, 176, 246, 0.4)",
        "fun-purple": "0 4px 8px rgba(206, 130, 255, 0.4)",
        "fun-yellow": "0 4px 8px rgba(255, 200, 0, 0.5)",
        "fun-red": "0 4px 8px rgba(255, 75, 75, 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
