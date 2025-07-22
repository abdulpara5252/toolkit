// .storybook/manager.js

import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'Vagaro React Toolkit',  // Set your custom title here
    brandUrl: '',          // Optional: Set a URL for the title
    brandImage: 'https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/vg-reacttookit.png', // Optional: Add a brand image logo
  },
  toolbar: {
    // To remove the "Run tests" button or other toolbar buttons, set them to false
    'storybook/jest': false, // Disable Jest addon toolbar button (example)
  },
});
