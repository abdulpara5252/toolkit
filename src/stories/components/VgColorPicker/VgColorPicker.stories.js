import VgColorPicker from "../../../components/VgColorPicker/VgColorPicker";

export default {
  title: "Color Picker",
  component: VgColorPicker,
  parameters: {
    layout: "default",
    docs: {
      description: {
        component:
          "The Color Picker component offers two color variation options: Custom, where users can input a specific color code, and Choose from Color Picker, allowing users to select a color from a predefined palette. This provides flexibility in color selection for personalized or preset choices.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    OnChange: {
      action: "changed",
      description: `The
OnChange
event in a color picker triggers whenever the user selects or changes a color, allowing the application to capture the updated color value. This event is commonly used to update UI elements or store the selected color in real-time, often in formats like Hex, RGB, or HSL.`,
      table: {
        category: "Events",
      },
    },
    VagaroToolkit : {
      control: "Number",
      type: { name: "Number" },
      table: { disable: true },
      description:
        "The VagaroToolkit property, when set to a Number value",
    },
    ColorPickerId: {
      control: "text",
      table: { disable: true },
    },
    Title: {
      action: "text",
      table: { disable: true },
    },
    CloseBackTitle: {
      action: "text",
      table: { disable: true },
    },
    NativeActionVal: {
      control: "number",
      table: { disable: true },
    },
    Footer: {
      control: "number",
      table: { disable: true },
    },
    TimerCount: {
      control: "number",
      table: { disable: true },
    },
    IsFullLength: {
      control: "boolean",
      table: { disable: true },
    },
  },
};

export const Default = {
  args: {
    OnChange: () => {},
    Title: "Color Picker",
    NativeActionVal: 13,
    Footer: 2,
    TimerCount: 0,
    IsFullLength: false,
    CloseBackTitle: "",
    ColorPickerId: "",
    VagaroToolkit: 1,
  },
};
