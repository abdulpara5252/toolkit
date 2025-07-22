import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
// export default {
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    ".storybook/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: 'var(--typographyfont-familyfont-family)',
        proximanova: 'var(--font_family_proximanova)',
      },
      fontSize: {
        custom: 'var(--typographyfont-sizefont-size-18)',
        'xs-custom': '12px',
      },
      lineHeight: {
        custom: 'var(--typographyfont-heightfont-height-24)',
      },
      letterSpacing: {
        custom: 'var(--typographyfont-letter-spacingfont-letter-spacing-default)',
      },
      colors: {
        'text-blue': 'var(--text_blue_default)',
        'text_blue_strong': 'var(--text_blue_strong)',
        'bkg_neutral_default':'var(--bkg_neutral_default)',
        'bg-dark':'#1e1f21',
        'bkg_neutral_secondary': 'var(--bkg_neutral_secondary)',
        'bkg_components_button_neutral_default': 'var(--bkg_components_button_neutral_default)',
        'bkg_green_default': 'var(--bkg_green_default)',
        'bkg_neutral_tiertiary':'var(--bkg_neutral_tiertiary)',
        'border-default':'var(--border_neutral_default)',
        'border_alert_default': 'var(--border_alert_default)',
        'border_warning_default': 'var(--bkg_warning_default)',
        'border_success_default': 'var(--border_green_default)',
        'text-week':'var(--text_neutral_weak)',
        'text-secondary': 'var(--text_neutral_secondary)',
        'text_neutral_default': 'var(--text_neutral_default)',
        'text_neutral_ondark':'var(--text_neutral_ondark)',
        'text_green_default':'var(--text_green_default)',
        'text_alert_default':'var(--text_alert_default)',
        'icon-default': 'var(--icon_neutral_default)',
        'icon_neutral_ondark':'var(--icon_neutral_ondark)',
        'icon_neutral_weak': 'var(--icon_neutral_weak)',
        'icon_neutral_secondary': 'var(--icon_neutral_secondary)',
        'border_blue_default': 'var(--border_blue_default)',
      },
      width: {
        graphsmall: '368px',
        graphmedium: '752px',
        graphlarge: '1136px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
    function ({ addComponents }) {
      addComponents({
        '.apexcharts-canvas': {
          '.apexcharts-tooltip': {
            boxShadow: '0 2px 12px 2px rgba(0, 0, 0, 0.1), 0 2px 12px -2px rgba(0, 0, 0, 0.1)',           
          }
        },
      });
    }
  ]
  
};
