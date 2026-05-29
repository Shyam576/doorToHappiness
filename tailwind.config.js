module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // ─── Design System: Door to Happiness Holiday ───────────────────────
            // Industry: Cultural/Adventure Travel — Style: Photography-Forward + Editorial Minimalism
            // Generated via UI UX Pro Max skill
            fontFamily: {
                heading: ['Cormorant Garamond', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                brand: {
                    amber:       '#D97706',  // CTA — warm gold, Buddhist culture
                    'amber-dark': '#B45309', // Primary — refined deep amber
                    'amber-light': '#FEF3C7', // Light tint for backgrounds
                    forest:      '#064E3B',  // Earthy accent — Bhutan nature
                    'forest-mid': '#065F46',
                    'forest-light': '#D1FAE5',
                    cream:       '#FFFBEB',  // Warm page background
                    'cream-deep': '#FEF3C7',
                },
                stone: {
                    50:  '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                },
            },
            boxShadow: {
                'warm-sm':  '0 1px 3px rgba(180, 83, 9, 0.08), 0 1px 2px rgba(0,0,0,0.06)',
                'warm':     '0 4px 12px rgba(180, 83, 9, 0.10), 0 2px 4px rgba(0,0,0,0.06)',
                'warm-lg':  '0 10px 30px rgba(180, 83, 9, 0.12), 0 4px 8px rgba(0,0,0,0.08)',
                'warm-xl':  '0 20px 50px rgba(180, 83, 9, 0.15), 0 8px 16px rgba(0,0,0,0.10)',
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
            },
            keyframes: {
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