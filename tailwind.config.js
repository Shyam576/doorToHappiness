module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // ─── Design System: Door to Happiness Holiday ───────────────────────
            // Industry: Cultural/Adventure Travel — Style: Photography-Forward + Editorial Minimalism
            // Generated via UI UX Pro Max skill
            fontFamily: {
                heading: ['Fraunces', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                // DTH design system — warm ivory, deep forest, charcoal, muted sand, soft gold.
                brand: {
                    ivory:   '#F7F5EF',
                    forest:  '#183C32',
                    charcoal:'#202522',
                    sand:    '#D8C8AE',
                    gold:    '#B99A64',
                    // legacy keys kept so existing classes keep resolving
                    amber:        '#8A6E3F',
                    'amber-dark': '#6E562F',
                    'amber-light': '#F2E9D6',
                    'forest-mid': '#20453A',
                    'forest-light': '#DDEAE3',
                    cream:        '#F7F5EF',
                    'cream-deep': '#EFECE3',
                    ink:          '#202522',
                },
                // Gold — remapped over Tailwind's amber so every existing amber-* utility
                // picks up the brand gold. 600+ keep >= 4.5:1 against white.
                amber: {
                    50:  '#FAF7F0',
                    100: '#F2E9D6',
                    200: '#E6D6B5',
                    300: '#D8C8AE',
                    400: '#C9AE7E',
                    500: '#B99A64',
                    600: '#8A6E3F',
                    700: '#6E562F',
                    800: '#54421F',
                    900: '#3A2E16',
                },
                // Forest — replaces the old emerald accent.
                emerald: {
                    50:  '#F1F6F3',
                    100: '#DDEAE3',
                    200: '#BBD3C6',
                    300: '#8DB4A1',
                    400: '#5C8D75',
                    500: '#3A6B56',
                    600: '#2B5442',
                    700: '#20453A',
                    800: '#1C4338',
                    900: '#183C32',
                    950: '#0F2720',
                },
                // Warm charcoal / ivory neutrals.
                stone: {
                    50:  '#F7F5EF',
                    100: '#EFECE3',
                    200: '#E2DDD0',
                    300: '#CBC5B5',
                    400: '#9C9788',
                    500: '#6F6B60',
                    600: '#54524A',
                    700: '#3B3E39',
                    800: '#2A2E2A',
                    900: '#202522',
                    950: '#151816',
                },
            },
            boxShadow: {
                'warm-sm':  '0 1px 3px rgba(23, 21, 18, 0.08), 0 1px 2px rgba(23,21,18,0.05)',
                'warm':     '0 4px 14px rgba(23, 21, 18, 0.09), 0 2px 4px rgba(23,21,18,0.05)',
                'warm-lg':  '0 12px 32px rgba(23, 21, 18, 0.12), 0 4px 8px rgba(23,21,18,0.06)',
                'warm-xl':  '0 24px 56px rgba(23, 21, 18, 0.16), 0 8px 16px rgba(23,21,18,0.08)',
                'card':     '0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                'card-hover': '0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
            },
            screens: {
                'xs': '475px',
                '3xl': '1600px',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'bounce-gentle': 'bounceGentle 2s infinite',
                marquee: 'marquee 40s linear infinite',
                'ken-burns': 'kenBurns 24s ease-out forwards',
                'scroll-cue': 'scrollCue 2.4s ease-in-out infinite',
                'page-in': 'pageIn 0.55s cubic-bezier(.2,.7,.2,1) both',
                'rise': 'rise 1.1s cubic-bezier(.2,.7,.2,1) both',
                'img-settle': 'imgSettle 2.2s cubic-bezier(.2,.7,.2,1) both',
                'img-fade': 'imgFade 1.8s ease-out both',
            },
            keyframes: {
                pageIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                rise: {
                    '0%': { opacity: '0', transform: 'translateY(26px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                imgFade: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                imgSettle: {
                    '0%': { opacity: '0.25', transform: 'scale(1.1)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                kenBurns: {
                    '0%': { transform: 'scale(1.12)' },
                    '100%': { transform: 'scale(1.0)' },
                },
                scrollCue: {
                    '0%': { transform: 'translateY(-100%)' },
                    '60%, 100%': { transform: 'translateY(100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                // Track is rendered as two identical copies of the content placed
                // side by side, so translating by exactly half its width loops
                // seamlessly back to the start.
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '2rem',
                xl: '2.5rem',
                '2xl': '3rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
        }
    },
    variants: {
        extend: {
            scale: ['active', 'group-hover'],
            transform: ['active', 'group-hover'],
            transitionProperty: ['hover', 'focus'],
        },
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography'),
        function({ addUtilities }) {
            const newUtilities = {
                '.text-shadow': {
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
                '.text-shadow-lg': {
                    textShadow: '0 4px 8px rgba(0,0,0,0.12)',
                },
                '.backdrop-blur-xs': {
                    backdropFilter: 'blur(2px)',
                },
                '.scrollbar-hide': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            }
            addUtilities(newUtilities)
        },
    ],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        themes: [
            "light", "dark", "emerald", "synthwave", "retro", "halloween", "forest", "winter"
        ]
    }
}