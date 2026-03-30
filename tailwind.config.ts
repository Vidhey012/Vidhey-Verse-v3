import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          void: 'var(--color-bg-void)',
          deep: 'var(--color-bg-deep)',
          surface: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          grid: 'var(--color-bg-grid-cell)',
        },
        grid: {
          line: 'var(--color-grid-line)',
          bright: 'var(--color-grid-bright)',
          horizon: 'var(--color-grid-horizon)',
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          hot: 'var(--color-accent-hot)',
          warm: 'var(--color-accent-warm)',
          dim: 'var(--color-accent-dim)',
        },
        trail: {
          core: 'var(--color-trail-core)',
          mid: 'var(--color-trail-mid)',
          fade: 'var(--color-trail-fade)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          accent: 'var(--color-text-accent)',
        },
        status: {
          success: 'var(--color-success)',
          error: 'var(--color-error)',
          warning: 'var(--color-warning)',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Orbitron', 'sans-serif'],
        body: ['var(--font-body)', 'Rajdhani', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        stat: ['var(--font-stat)', 'Share Tech Mono', 'monospace'],
      },
      boxShadow: {
        'glow-xs': 'var(--glow-xs)',
        'glow-sm': 'var(--glow-sm)',
        'glow-md': 'var(--glow-md)',
        'glow-lg': 'var(--glow-lg)',
        'glow-text': 'var(--glow-text)',
      },
      letterSpacing: {
        tron: 'var(--tracking-tron)',
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
      },
      transitionTimingFunction: {
        tron: 'var(--ease-tron)',
        out: 'var(--ease-out)',
        in: 'var(--ease-in)',
        inout: 'var(--ease-inout)',
        spring: 'var(--ease-spring)',
      }
    },
  },
  plugins: [],
};

export default config;
