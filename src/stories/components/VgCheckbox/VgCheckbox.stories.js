import VgCheckbox from '../../../components/VgCheckbox/VgCheckbox';

const RowDataWithImage = [
      {
        title: "Briogeo",
        imgSource:
          "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg",
      }, 
      { title: "Clairol", imgSource: '' },
      { title: "Clairol Professional", imgSource: ''  },
      {
        title: "good hair day",
        imgSource: "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg",
      }, 
      { title: "Karlius Professional", imgSource: '' }, 
      {
        title: "Kadus",
        imgSource: "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg",
      }, 
    ]


export default {
    title: 'CheckBox',
    component: VgCheckbox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Checkboxes communicate a list of options that can be multi-selected. They can be used to enable an option or to agree to terms.'
            }
        }
    },
    tags: ['autodocs'],
    args: {
    RawDataWithImage: RowDataWithImage,
    IsCheck: true,
    },
    argTypes: {
        CheckboxLabel: {
            control: 'text',
            description: `The "Checkbox Label" allows users to assign a custom text label next to the checkbox, providing context or description for what the checkbox represents. This label helps users understand the purpose of the selection.`,
        },
        OnChange: {
            action: 'changed',
            table: { category: "Events" },  
            description: `The "onChange" listener for a checkbox detects when the user changes the checkbox's state, either checking or unchecking it. This property triggers a function or event, allowing the application to respond to the user's interaction in real-time.`,
        },
        OnHover: {
            action: 'hover',
            table: { category: "Events" },  
            description: `The "onHover" listener for a checkbox detects when the user changes the checkbox's state, either checking or unchecking it. This property triggers a function or event, allowing the application to respond to the user's interaction in real-time.`,
        },
        LableDescription: {
            control: 'text',
            description: `The "Label Description" allows users to input a brief description or additional information about a field or section. It helps provide context or clarify the purpose of the label for the user.`,
            if: { arg: 'CheckboxVariation', eq: 'Checkbox-w-Header' },
        },
        Disable: {
            control: 'boolean',
            description: `The "Disabled" property for a checkbox is a boolean that controls whether the checkbox is interactive. When set to true, the checkbox becomes disabled, preventing users from selecting or deselecting it; when false, it remains clickable.`,
        }, 
        CheckboxId: {
            control: "text",
            description: `The "CheckBoxId property for a checkbox is a boolean that controls whether the checkbox is interactive. When set to true, the checkbox becomes disabled, preventing users from selecting or deselecting it; when false, it remains clickable.`,
            table: { disable: true },
        },
        Required: {
            control: 'boolean',
            table: {
                disable: false,
            },
            description:`The "Required" property for a CheckBox is a boolean that determines if the field must be filled by the user. When set to true, the CheckBox becomes mandatory, and the form cannot be submitted without a value.`
        },
        SetValue: {
            control: 'boolean',
            description: `The SetValue property controls the state of a checkbox, allowing users to set it as checked (true) or unchecked (false). This boolean value helps manage selections and preferences within forms or settings.`,
            if: { arg: 'CheckboxVariation', matches: ['Checkbox-Simple', 'Checkbox-w-Header'] },
        }, 
        PartialChecked: {
            control: 'boolean',
            description: `The isChecked property controls the state of a checkbox, allowing users to set it as checked (true) or unchecked (false). This boolean value helps manage selections and preferences within forms or settings.`,
        }, 
        CheckboxVariation: {
            control: { type: 'radio' },
            options: ['Checkbox-Simple', 'Checkbox-w-Header', 'Checkbox-w-Image'],
            description: `Checkbox Variation refers to different styles or types of Checkbox used in user interfaces to convey specific statuses or messages.\n           
- The "Checkbox Simple" is a standard checkbox that allows users to select or deselect an option with a basic interface.\n
- The "Checkbox with Header" includes a label or header above the checkbox, providing additional context or grouping for the checkbox selection.`,
        },
        Name:{
            control: "text",
            type: { name: "string" },
            table: {
              disable: true, // Hide from docs
            },
            description: "The Name property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging."
          },
          RawDataWithImage: {
            control: "array",
            type: { name: "array" },
            description: "The RowData property allows users to input an array of data for each row in a table or list. This is useful for displaying multiple values or attributes for each item.",
            if: { arg: 'CheckboxVariation', eq: 'Checkbox-w-Image' },
          },
        IsCheck: {
            control: 'boolean',
            description: `The "IsCheck" property controls whether the checkbox should use the internal state management (true) or rely on external state management (false). When true, the component manages its own checked state; when false, it relies on external props for state control.`,
        }
    },
};

export const Checkbox_Simple = {
    args: {
        CheckboxLabel: 'Checkbox',
        LableDescription: 'Checkbox description goes here.',
        CheckboxVariation: 'Checkbox-Simple',
        CheckBoxId:'',
        SetValue:false,
        PartialChecked: false,
        Name: '',
        IsCheck: true,
        OnChange: ( (value, e) => {console.log("value", value)})

    },
    parameters: {
        docs: {
            description: {
                story: 'A Default Checkbox with Checked and Unchecked Property',
            },
        },
    },
    argTypes: {
        CheckBoxId: { table: { disable: true } }, // Hide BadgeSize manually in this specific story
      },
};

export const Checkbox_w_Header = {
    args: {
        CheckboxLabel: 'Check',
        LableDescription: 'Checkbox Description goes here',
        CheckboxVariation: 'Checkbox-w-Header',
        CheckBoxId:'',
        SetValue:false,
        PartialChecked: false,
        Name: '',
        IsCheck: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkbox with Header property. It give Header and Description to avail more information.',
            },
        },
    },
    argTypes: {
        CheckBoxId: { table: { disable: true } }, // Hide BadgeSize manually in this specific story
      },
};

export const Checkbox_w_Image = {
  args: {
    CheckboxLabel: "Check",
    LableDescription: "Checkbox Description goes here",
    CheckboxVariation: "Checkbox-w-Image",
    CheckBoxId: "",
    SetValue: false,
    PartialChecked: false,
    Name: "",
    IsCheck: true,
    RawDataWithImage: [
      {
        title: "Briogeo",
        imgSource:
          "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg",
      }, 
      { title: "Clairol", imgSource: '' },
      { title: "Clairol Professional", imgSource: ''  },
      {
        title: "good hair day",
        imgSource: "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg",
      }, 
      { title: "Karlius Professional", imgSource: '' }, 
      {
        title: "Kadus",
        imgSource: "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg",
      }, 
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox with Header property. It give Header and Description to avail more information.",
      },
    },
  },
  argTypes: {
    CheckBoxId: { table: { disable: true } }, // Hide BadgeSize manually in this specific story
  },
};
