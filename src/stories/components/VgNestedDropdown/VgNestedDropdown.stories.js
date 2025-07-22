import VgNestedDropdown from "../../../components/VgNestedDropdown/VgNestedDropdown";

export default {
  title: "Nested DropDown",
  component: VgNestedDropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Nested Dropdowns provide hierarchical selection options with multiple levels of choices. They allow users to navigate through categories and subcategories to make specific selections. This component is ideal for complex option structures, providing a clean interface for hierarchical data while saving screen space.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    VariantType: {
      description: "The variant type of the dropdown",
      control: "select",
      options: ["Default", "NestedDropdown", "NestedButton"],
      table: { disable: true }
    },
    ButtonText: {
      description: "Text to display on the button when using NestedButton variant",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Select Option" },
      },
      if: { arg: "VariantType", eq: "NestedButton" },
    },
    ButtonVariant: {
      description: "Variant of the button when using NestedButton variant",
      control: "select",
      options: ["primary", "secondary", "theme"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
      if: { arg: "VariantType", eq: "NestedButton" },
    },
    Width: {
      description: "Sets the width of the dropdown. Accepts CSS width values like 'auto' for automatic sizing, specific pixel values like '120px', percentages like '100%', or any valid CSS width value.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "auto" },
      },
    },
    DefaultValue: {
      description: "The default selected value for the dropdown",
      control: "object",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Allow at this Location" },
      },
    },
    RowData: {
      description: "An array of objects representing the dropdown options. Can include nested submenus using the `children` property.",
      control: "object",
      table: {
        type: { summary: "MenuItem[]" },
        defaultValue: {
          summary: "Default static options like Allow, Require Acceptance, Block",
        },
      },
    },
    SubmenuOptionPosition: {
      description: "Position of the submenu options relative to the main dropdown options. Options are 'left' or 'right'. Defaults to 'right'.",
      control: "select",
      options: ["Right", "Left"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Right" },
      },
      if: { arg: "VariantType", eq: "NestedDropdown" },
    },
    OnChange: {
      description: "Callback function triggered when selection changes",
      control: false,
      table: { 
        category: "Events",
        type: { summary: "(value: SelectedValueType) => void" },
      },
    },
    OnClick: {
      description: "Callback function triggered when an option is clicked. Receives two parameters: the click event and the selected value object. Example: onClick(event, { label: 'Allow', value: '1', subOption: 'At this Location' })",
      control: false,
      table: { 
        category: "Events",
        type: { summary: "(event: React.MouseEvent, value: SelectedValueType) => void" },
        defaultValue: { 
          summary: `(event, value) => console.log(value)`,
          detail: `
// Example of usage:
onClick={(event, value) => {
  console.log("Event:", event);
  console.log("Selected value:", value);
  // value format: { label: "Allow", value: "1", subOption: "At this Location" }
}}
          `
        },
      },
    },
    OnClickOutside: {
      description: "Callback function triggered when clicking outside the dropdown",
      control: false,
      table: { 
        category: "Events",
        type: { summary: "() => void" },
      },
    },
  }
};

const sampleRowDataWithSubmenu = [
  {
    label: "Allow",
    value: "1",
    children: [
      { label: "At this Location", value: "location-1" },
      { label: "At all Locations", value: "location-2" }
    ]
  },
  {
    label: "Require Acceptance",
    value: "2",
    children: [
      { label: "At this Location", value: "confirm-1" },
      { label: "At all Locations", value: "confirm-2" }
    ]
  },
  {
    label: "Block",
    value: "3",
    children: [
      { label: "At this Location", value: "confirm-1" },
      { label: "At all Locations", value: "confirm-2" }
    ]
  }
]

const sampleRowData = [
  {
    label: "Allow",
    value: "1",
  },
  {
    label: "Require Acceptance",
    value: "2",
  },
  {
    label: "Block",
    value: "3"
  }
];

export const Default = {
  args:{
    VariantType: "Default",
    DefaultValue: [{ label: "Allow", value: "1" }],
    OnChange: (value) => console.log("Value changed:", value),
    OnClick: (event, value) => console.log("Clicked:", value),
    OnClickOutside: () => console.log("Clicked outside"),
    RowData : sampleRowData,
    SubmenuOptionPosition: "Right",
  },
  parameters:{
    docs:{
      description:{
        story:
          "Use when prompting user for non-specific text information. If prompting for specific information, look at other variants.",
      },
    },
  },
};

export const NestedDropdown = {
  args:{
    VariantType:"NestedDropdown",
    DefaultValue:[{ label: "Allow", value: "1" }],
    RowData : sampleRowDataWithSubmenu,
    OnChange:(value) => console.log("Value changed:", value),
    OnClick:(event, value) => console.log("Clicked with location:", value),
    OnClickOutside:() => console.log("Clicked outside"),
    SubmenuOptionPosition:"Right",
  },
  parameters:{
    docs:{
      description:{
        story:
          `Use when locations need to be selected. Shows location options in a popup when hovering over dropdown options.
          Use the \`Width\` prop to control the dropdown menu's width. It accepts CSS width values like:
- \`"auto"\`
- \`"120px"\`
- \`"100%"\`
          `,
      },
    },
  },
};

export const NestedButton = {
  args:{
    VariantType: "NestedButton",
    ButtonText: "Print Receipt",
    ButtonVariant: "primary",
    DefaultValue: [{ label: "Allow", value: "1" }],
    RowData : sampleRowDataWithSubmenu,
    OnChange: (value) => console.log("Value changed:", value),
    OnClick: (event, value) => console.log("Clicked with location:", value),
    OnClickOutside: () => console.log("Clicked outside"),
    SubmenuOptionPosition: "Right",
  },
  parameters:{
    docs:{
      description:{
        story:
          "Use when locations need to be selected. Shows location options in a popup when hovering over dropdown options.",
      },
    },
  },
};