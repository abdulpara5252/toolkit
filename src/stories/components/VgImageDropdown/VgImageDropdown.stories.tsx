import { Meta, StoryObj } from "@storybook/react";
import VgImageDropdown from "../../../components/VgImageDropdown/VgImageDropdown";

// Sample data with images
const sampleData = [
  {
    label: "L'Oréal Paris Excellence Creme Hair Color",
    value: "loreal-1",
    imageUrl: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    category: "Wella",
    source: "Loreal",
  },
  {
    label: "Schwarzkopf Keratin Color Hair Dye",
    value: "schwarzkopf-2",
    imageUrl: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
    category: "Garnier",
    source: "Schwarzkopf",
  },
  {
    label: "Garnier Nutrisse Nourishing Hair Color",
    value: "garnier-3",
    imageUrl: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    category: "Clairol",
    source: "Garnier",
  },
  {
    label: "Clairol Nice'n Easy Permanent Hair Dye",
    value: "clairol-4",
    imageUrl: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
    category: "Revlon",
    source: "Clairol",
  },
];

const meta: Meta<typeof VgImageDropdown> = {
  title: "ImageDropdown",
  component: VgImageDropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The `VgImageDropdown` component provides a dropdown menu that displays options with associated images. It's useful for enhancing UX when users need to choose between visually distinguishable options (e.g., product images, avatars, brand logos). This is ideal when option names alone are not descriptive enough.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Placeholder: {
      control: "text",
      type: { name: "string" },
      description:
        "Text displayed in the dropdown field when no option is selected. Acts as a visual prompt for the user.",
      table: {
        category: "Title/PlaceHolder",
      },
    },
    DropdownTitle: {
      control: "text",
      type: { name: "string" },
      description:
        "Title text displayed above the dropdown. Helps users understand what the dropdown is for.",
      table: { disable: true },
    },
    DropdownInnerTitle: {
      control: "text",
      type: { name: "string" },
      description:
        "A subtitle or secondary label displayed inside the dropdown to give additional context.",
      table: {
        category: "Title/PlaceHolder",
      },
    },
    Searchable: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "Enables search functionality inside the dropdown. When true, users can type to filter options.",
      // table: { disable: true },
    },
    Multi: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "Enables multi-select functionality. When true, users can select multiple options from the dropdown.",
      table: { disable: true },
    },
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "Makes the dropdown a required field. When true, validation will show an error if no option is selected.",
      table: {
        category: "Validation",
      },
    },
    RawData: {
      control: "object",
      type: {
        name: "array",
        value: {
          name: "object",
          value: {
            label: { name: "string" },
            value: { name: "string" },
            imageUrl: { name: "string" },
          },
        },
      },
      description:
      "Array of dropdown options, each with a `label`, `value`, and `imageUrl` for display with images.\n" +
      "Example: [{ label: 'Item', value: 'item-1', imageUrl: 'https://...' }]"},
    OnChange: {
      action: "onChange",
      table: { category: "Events" },
      description:
        "Callback function triggered when the user selects or deselects an option. Useful for handling selection changes.",
    },
    OnSearch: {
      action: "onSearch",
      table: { category: "Events" },
      description:
        "Callback function triggered when the user types in the search input. Useful for handling search term changes.",
    },
    OnScroll: {
      action: "onScroll",
      table: { category: "Events" },
      description:
        "Callback function triggered when the user scrolls through the dropdown options. Called with (page: number) parameter. Useful for implementing infinite scroll functionality.",
    },
    Icon: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The name of the SVG icon to display in the dropdown control (e.g., 'barcode', 'chevron-down'). If not provided, no icon will be shown.",
    },
    OnFocus: {
      action: 'OnFocus',
      table: { category: 'Events' },
      description: 'Callback fired when the input receives focus.'
    },
    OnBlur: {
      action: 'OnBlur',
      table: { category: 'Events' },
      description: 'Callback fired when the input loses focus.'
    },
    OnKeyDown: {
      action: 'OnKeyDown',
      table: { category: 'Events' },
      description: 'Callback fired on key down in the input.'
    },
    OnPaste: {
      action: 'OnPaste',
      table: { category: 'Events' },
      description: 'Callback fired when something is pasted into the input.'
    },
    AutoComplete: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Enable or disable browser autoComplete true/false.',
    },
    AutoCorrect: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Enable or disable browser autoCorrect true/false.',
    },
    MaxLength: {
      control: 'number',
      type: { name: 'number' },
      description: 'Maximum length of input value.',
    },
    inputId: {
      control: 'number',
      type: { name: 'number' },
      description: 'Maximum length of input value.',
      table: { disable: true },
    },
    DefaultBorderShow: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Show the Border By Default',
    },
    ActiveState: {
      control: 'boolean',
      type: { name: 'boolean' },
      description: 'Show input background color Default if ActiveState is true otherwise show background color white and text color black',
    },
  },
};

export default meta;

type Story = StoryObj<typeof VgImageDropdown>;

export const Default: Story = {
  args: {
    RawData: sampleData,
    DropdownTitle: "Products",
    Searchable: true,
    Multi: false,
    Icon: true,
    Required : false,
    Placeholder: "Select & Search product",
    DropdownInnerTitle: "Products",
    inputId: 'vg-image-dropdown-input',
    AutoComplete: false,
    AutoCorrect: false,
    MaxLength: 50,
    DefaultBorderShow: false,
    ActiveState: true
  },
};

// export const WithBarcodeIcon: Story = {
//     args: {
//       RawData: sampleData,
//       DropdownTitle: "Products",
//       searchable: true,
//       multi: false,
//       placeholder: "Select a product",
//       searchPlaceholder: "Search products...",
//       icon: true,
//     },
//   };
// You can uncomment and use these for testing additional configurations:

// export const MultiSelect: Story = {
//   args: {
//     options: sampleData,
//     dropdownTitle: "Products",
//     searchable: true,
//     multi: true,
//     placeholder: "Select & Search product",
//     searchPlaceholder: "Search products...",
//     dropdowninnerTitle: "Products",
//   },
// };

// export const WithoutSearch: Story = {
//   args: {
//     options: sampleData,
//     dropdownTitle: "Products",
//     searchable: false,
//     multi: false,
//     placeholder: "Select a product",
//     dropdowninnerTitle: "Products",
//   },
// };
