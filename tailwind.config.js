/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hasta: {
          // 1. Haldi Yellow & Sunlit Warmth
          haldi: {
            50: '#FFFAF0',
            100: '#FFF4D6',
            200: '#FEE5A3',
            300: '#FDD269',
            400: '#FCC03B',
            500: '#F4B323', // Primary Haldi Yellow
            600: '#D99812',
            700: '#B07507',
            800: '#8A5609',
            900: '#633B0B',
          },
          // 2. Pure Handcrafted Ivory Canvas
          ivory: {
            50: '#FFFEFA',
            100: '#FFFDF6',
            200: '#FFF7E8', // Primary Brand Ivory
            300: '#FBF0D9',
            400: '#F5E4C4',
            500: '#EBD2A7',
          },
          // 3. Earth Brown (Deep Editorial Ink & Clay Grounding)
          earth: {
            50: '#FAF7F5',
            100: '#F3ECE7',
            200: '#E4D5CB',
            300: '#CEB6A6',
            400: '#B2917E',
            500: '#8C6B58',
            600: '#6D4F3E',
            700: '#523A2D',
            800: '#35251B', // Primary Earth Brown
            900: '#231811',
            950: '#140D09',
          },
          // 4. Jodhpur Indigo & Cobalt (Pure Copper & Cobalt Oxide Fired at 800°C)
          cobalt: {
            50: '#F0F6FC',
            100: '#E1EDF8',
            200: '#C2DBF2',
            300: '#93BEE6',
            400: '#5A9AD4',
            500: '#2D75B8',
            600: '#1E5A8A',
            700: '#163A5F', // Primary Jodhpur Cobalt & Indigo
            800: '#0F2E50',
            900: '#0B2038',
            950: '#061323',
          },
          // 5. Madder & Hingula Red / Sindoor (Wild Madder Roots & Cinnabar Stone)
          hingula: {
            50: '#FDF4F2',
            100: '#FBE6E2',
            200: '#F7CDC5',
            300: '#F0A89A',
            400: '#E57965',
            500: '#D94F30', // Primary Sindoor / Hingula Red
            600: '#C03A1D',
            700: '#9E2C13',
            800: '#7E2512',
            900: '#5A1A0C',
          },
          // 6. Peacock Teal (Heritage Copper Glaze)
          peacock: {
            50: '#EFF8F7',
            100: '#D7EFEA',
            200: '#AFDDD4',
            300: '#7EC3B6',
            400: '#4CA294',
            500: '#2A8374',
            600: '#1E695D',
            700: '#155E59', // Primary Peacock Teal
            800: '#114441',
            900: '#0D3432',
          },
          // 7. Gulmohar Pink (Blossom Pop)
          gulmohar: {
            50: '#FDF2F6',
            100: '#FCE4EE',
            200: '#F8C7DC',
            300: '#F29CC2',
            400: '#E8649F',
            500: '#D8387F',
            600: '#C92F66', // Primary Gulmohar Pink
            700: '#A31F4F',
            800: '#7D1A3E',
            900: '#56142C',
          },
          // 8. Cilantro & Mint Green (Chutney / Fresh Herbs / Trust Mark)
          cilantro: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#22C55E',
            600: '#16A34A', // Fresh Coriander
            700: '#15803D',
            800: '#166534',
            900: '#14532D',
          },
          // Aliases for backward compatibility
          marigold: {
            400: '#FCC03B',
            500: '#F4B323',
            600: '#D99812',
            700: '#B07507',
          },
          terracotta: {
            50: '#FDF4F2',
            100: '#FBE6E2',
            200: '#F7CDC5',
            500: '#D94F30',
            600: '#C03A1D',
            700: '#9E2C13',
            900: '#5A1A0C',
          },
          cream: {
            50: '#FFFEFA',
            100: '#FFF7E8',
            200: '#FAF5EB',
            300: '#F4ECE0',
          },
          charcoal: {
            500: '#6D4F3E',
            700: '#523A2D',
            800: '#35251B',
            900: '#231811',
            950: '#140D09',
          },
          border: {
            DEFAULT: '#E6D8C5',
            warm: '#E6D8C5',
          }
        }
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
      },
      fontFamily: {
        serif: ['Fraunces', '"DM Serif Display"', 'Georgia', 'serif'],
        display: ['Fraunces', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        interface: ['Manrope', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
