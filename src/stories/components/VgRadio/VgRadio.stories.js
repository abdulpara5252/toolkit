import VgRadio from '../../../components/VgRadio/VgRadio';

const meta = {
  title: 'Radio',
  component: VgRadio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'VgRadio component allows users to select one option from a set of options.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Variants: {
      control: 'radio',
      options: ['Normal', 'SquareBlock'],
      description: 'The Variant property allows users to change alignment like Vertical and Horizontal.',
      defaultValue: 'SquareBlock', // Set default value to SquareBlock
      table: { disable: true }
    },
   RowData: {
    description: `The RowData property allows users to define custom names for each tab through a JSON array, where each array entry corresponds to a specific Rowdata. This setup enables flexible naming and easy updates to Rowdata labels.

Usage Format: Each RowData object supports the following properties:
- id
- title  
- description
- icon
- htmlRender`
},
    RadioVariant: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The RadioVariant property allows users to choose between horizontal and vertical alignment for the radio buttons. This flexibility enhances the layout and usability of the component.',
    },
    RadioTickMark: {
      control: 'radio',
      options: ['tickMark', 'dot'],
      description: 'The RadioTickMark property allows users to select the style of the tick mark displayed in the radio button. This customization enhances the visual appearance of the component.',
    },
    OnChange: {
      action: 'changed',
      description: 'The "OnChange" property allows users to attach an event handler that triggers whenever the value of the control changes. This event is useful for dynamically responding to user input or modifying other elements in real-time based on the change.',
      table: {
        category: 'Events',
      },
    },
    Title: {
      control: 'text',
      description: 'The Title property allows users to enter a custom heading or label, which appears prominently in the interface. This enhances clarity, helping users understand the purpose or context of the displayed content',
    },
    RadioId: {
      control: 'text',
      type: { name: 'string' },
      table: { disable: true }
    },
    selectedIndex: {
      control: "number",
      table: { disable: true },
    },
  },
  Required: {
    control: "boolean",
    type: { name: "boolean" },
    table: { category: "Required/Validation" },
    description: `The "Required" property for a Input is a boolean that determines if the field must be filled by the user. When set to true, the Input becomes mandatory, and the form cannot be submitted without a value.`,
  },
  CustomErrorMessage: {
    control: "text",
    type: { name: "string" },
    description: `The "CustomErrorMessage" property allows users to define a personalized error message that will appear when input validation fails. This message helps guide users by providing clear feedback on what went wrong and how to correct it.`,


    table: {
      category: "Required/Validation"
    }
  },
};
export default meta;

export const SquareBlock = {
  args: {
    Variants: 'SquareBlock',
    Title: 'Select an option:',
    RadioVariant: 'horizontal',
    RadioTickMark: "tickMark",
    RowData: [
      {
        id: 1,
        title: 'Retail Product',
        description: 'A product you can sell online or in-house like shampoo, oils, lotion, yoga mats, t-shirts, etc.',
        icon: "inventory",
      },
      {
        id: 2,
        title: 'Partial-Use Product',
        description: 'A service-use product, like Botox or hair color, that is sold per unit.',
        icon: "PartialUse",
      },
    ],
    OnChange: (index, data) => console.log(`SquareBlock: Selected index: ${index}`, "data:", data),
    RadioId: '1', // Unique ID for SquareBlock
    selectedIndex: 0,
    Required: true,
    CustomErrorMessage: 'Please select an option',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use to give additional information on the toggle action.',
      },
    },
  },
};

export const Normal = {
  args: {
    Variants: 'Normal',
    Title: 'Select an option:',
    RadioVariant: 'horizontal',
    RadioTickMark: "tickMark",
    RowData: [
      {
        id: 1,
        title: 'Retail Product',
        description: 'A product you can sell online or in-house like shampoo, oils, lotion, yoga mats, t-shirts, etc.',
        icon: "inventory",
      },
      {
        id: 2,
        title: 'Partial-Use Product',
        description: 'A service-use product, like Botox or hair color, that is sold per unit.',
        icon: "PartialUse",
      },
    ],
    OnChange: (index, data) => console.log(`Normal: Selected index: ${index}`, "data: ", data),
    RadioId: '2', // Unique ID for Normal
    selectedIndex: 0,
    Required: true,
    CustomErrorMessage: 'Please select an option',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use when simply on/off required',
      },
    },
  },
};
