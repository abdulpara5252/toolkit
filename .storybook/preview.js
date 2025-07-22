import { useEffect } from "react";
import "./styles.css";
import { withA11y } from '@storybook/addon-a11y';
import "../src/common/vg-theme-token.css";
import "../src/common/vg-typography-token.css";
import $ from "jquery";

// Attach jQuery to the global scope
window.jQuery = $;
window.$ = $;

// Import Select2 after jQuery is globally available
import "../src/utils/select2_4.0.js"; // This runs after window.jQuery is set

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FFFFFF" },
        { name: "dark", value: "#252628" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Button",
          "Badge",
          "TextBox",
          "Textarea",
          "CheckBox",
          "Tooltip",
          "Avatar",
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { globals } = context;
      const theme = globals.backgrounds?.value === "#252628" ? "dark" : "light";

      useEffect(() => {
        applyTheme(theme);
      }, [globals.backgrounds?.value]);

      return <Story {...context} />;
    },
    (Story) => {
      useEffect(() => {
        const loadScript = (id, src, onLoad) => {
          if (!document.getElementById(id)) {
            const script = document.createElement("script");
            script.id = id;
            script.src = src;
            script.async = true;
            script.onload = onLoad;
            document.head.appendChild(script);
          }
        };
      
        loadScript("typekit-script", "https://use.typekit.net/kjo7nmc.js", () => {
          try {
            window.Typekit.load({ async: true });
          } catch (e) {
            console.error("Error loading Typekit", e);
          }
        });
      
        loadScript("fontawesome-script", "https://kit.fontawesome.com/8ff7c24b64.js", () => {
          console.log("FontAwesome loaded");
        });

      }, []);

      return <Story />;
    },
  ],
};

const applyTheme = (theme) => {
  const htmlElement = document.documentElement;
  htmlElement.setAttribute("data-theme", theme);
};
export const decorators = [withA11y];
export default preview;
