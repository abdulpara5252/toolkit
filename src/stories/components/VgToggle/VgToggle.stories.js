import VgToggle from "../../../components/VgToggle/VgToggle";

const meta = {
    title: 'Toggle',
    component: VgToggle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Toggles are used to communicate activation, or to distinguish between “on” and “off” states'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        ToggleVariation: {
            control: 'radio',
            options: ['Default', 'WithDescription', 'Expanded', 'InputToggle'],
            description: `ToggleVariation allows users to choose between different switch styles, such as default, with a description, expanded (for more detailed options), or input toggle (combining text input and toggle functionality). This provides customizable switching behavior in forms or settings.
        
- **Default**: Standard switch toggle without additional elements.
- **W/ Description**: Switch toggle accompanied by a descriptive label or text.
- **Expanded**: Switch with additional detailed options or settings.
- **Input Toggle**: Combines a switch with a text input field for more interactive control.`,
        },
        ExpandedText: {
            control: 'text',
            description: `The **ExpandedText** option allows users to add descriptive text that provides more context or details about the functionality of the switch. This text appears alongside the switch to help users understand its purpose.`,
            if: { arg: 'ToggleVariation', eq: 'Expanded' },
        },
        Disable: {
            control: 'boolean',
            description: `The "Disable" property is a boolean that controls whether an input field or component is active. When set to true, the field is disabled, preventing user interaction; when false, the field remains fully interactive.`,
            if: { arg: 'ToggleVariation', matches: ['WithDescription', 'Expanded', 'Default', 'InputToggle'] },
        },
        OnChange: {
            action: 'changed',
            description: `The "OnChange" property allows users to attach an event handler that triggers whenever the value of the control changes. This event is useful for dynamically responding to user input or modifying other elements in real-time based on the change.`,
            table: {
                category: 'Events',
            },
            if: { arg: 'ToggleVariation', matches: ['WithDescription', 'Expanded', 'Default', 'InputToggle'] },
        },
        Title: {
            control: 'text',
            description: `The Title field allows users to input a custom label or heading for a Switch control. This title helps clarify the purpose or functionality of the switch for the user.`,
            if: { arg: 'ToggleVariation', matches: ['WithDescription', 'Expanded'] },
        },
        Description: {
            control: 'text',
            description: `The **Description** field lets users input additional text to clarify the switch’s function or purpose. This description appears near the switch, providing helpful guidance for users.`,
            if: { arg: 'ToggleVariation', matches: ['WithDescription', 'Expanded'] },
        },
        ToogleRight: {
            control: 'boolean',
            description: `The **ToogleRight** property, when set to a boolean value, allows users to change the position of the toggle switch to the right side of the label. If true, the switch appears on the right side of the label.`,
            if: { arg: 'ToggleVariation', matches: ['WithDescription', 'Expanded'] },
        },
        CopyHorizontal: {
            control: 'boolean',
            description: `The **CopyHorizontal** property, when set to a boolean value, allows data to be copied horizontally across all components. If true, it replicates the values across components arranged in a horizontal layout.`,
            if: { arg: 'ToggleVariation', eq: 'InputToggle' },
        },
        CopyVertical: {
            control: 'boolean',
            description: `The **CopyVertical** property, when set to true, allows data to be copied vertically across all controls. This feature ensures that the value replicates down through components arranged in a vertical layout.`,
            if: { arg: 'ToggleVariation', eq: 'InputToggle' },
        },
        CustomButtonText: {
            control: 'text',
            description: `The **CustomButtonText** property allows users to define a custom label (e.g., button text) displayed within the InputToggle variation. This can be used to trigger a specific action or highlight an interactive element for the user.`,
        },
        CustomButtonTextOnClick: {
            action: 'CustomButtonText clicked',
            description: `The "CustomButtonTextOnClick" property is an event handler that triggers a specific action when a user clicks on the CustomButtonText button in InputToggle.`,
            if: {
                arg: "ToggleVariation",
                eq: "InputToggle",
            },
            table: {
                category: 'Events',
            }, 
        },
        OnClick: {
            action: 'clicked',
            description: `The "OnClick" property is an event handler that triggers a specific action when a user clicks on the control.`,
            if: {
                arg: "ToggleVariation",
                eq: "InputToggle",
            },
            table: {
                category: 'Events',
            },
        },
        HorizontalOnClick: {
            action: 'Horizontal clicked',
            description: `The "HorizontalOnClick" property is an event handler that triggers a specific action when a user clicks on the Horizontal button in InputToggle.`,
            if: {
                arg: "ToggleVariation",
                eq: "InputToggle",
            },
            table: {
                category: 'Events',
            },
        },
        VerticalOnClick: {
            action: 'Vertical clicked',
            description: `The "VerticalOnClick" property is an event handler that triggers a specific action when a user clicks on the Vertical button in InputToggle.`,
            if: {
                arg: "ToggleVariation",
                eq: "InputToggle",
            },
            table: {
                category: 'Events',
            },
        },
        OnBlur: {
            action: 'blurred',
            description: `The "OnBlur" event handler is triggered when the input loses focus. It receives the current value of the input as a parameter.`,
            table: {
                category: 'Events',
            },
            if: { arg: 'ToggleVariation', eq: 'InputToggle' },
        },
        ToggleId: {
            control: 'text',
            type: { name: 'string' },
            table: { disable: true }
        },
        ToggleOn: {
            control: "boolean",
            description: `The ToggleOn property allows users to toggle a feature on or off by setting it to true or false. This simple control enables easy activation or deactivation of specific functionality within the application.`,
            if: { arg: 'ToggleVariation', matches: ['Default', 'WithDescription', 'Expanded'] },
        },
        SetValue: {
            control: "text",
            type: { name: "string" },
            // table: { disable: true },
            description: `The SetValue property allows users to input and edit a custom value for the textbox. This field is intended for users to input and update the content of the textbox.`,
        },
        SetToggleOption: {
            control: 'radio',
            options: ['%', '$'],
            description: `The **SetToggleOption** property allows users to toggle between percentage (%) and dollar ($) values. This is useful for scenarios where users need to switch between different units of representation for values.`,
            defaultValue: '%',
            if: { arg: 'ToggleVariation', eq: 'InputToggle' },
        },
        Name: {
            control: "text",
            type: { name: "string" },
            table: {
                disable: true, // Hide from docs
            },
            description: "The Name property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging."
        },
        BeakPosition: {
            control: 'select',
            options: ['Left', 'Middle', 'Right'],
            description: '',
            if: {
              arg: "InfoTooltipMessage",
              truthy: true 
            },
          },
          InfoTooltipMessage: {
            control: "text",
            type: { name: "string" },
            description: `The Tooltip Message property allows users to input a custom message for each tab, which will display in the tooltip when hovered or tapped. This enables personalized guidance or descriptions to assist users in understanding each tab’s purpose.`
          },
    },

};

export default meta;


export const Default = {
    args:{
        ToggleVariation:'Default',
        Title:'Toggle Name Here',
        Description:'This is an additional description for the switch',
        Disable:false,
        ToggleId:'1',
        SetToggleOption:"$",
        OnChange:(checked) => {},
        ToggleOn:false,
        Name:"",
        BeakPosition:'Left',
        SetValue:"",
        InfoTooltipMessage:"wqw"
    },
    parameters:{
        docs:{
            description:{
                story:'Use when simply on/off required',
            },
        },
    },
};

export const withDescription = {
    args: {
        ToggleVariation: 'WithDescription',
        Title: 'Toggle Name Here',
        Description: 'This is an additional description for the switch',
        Disable: false,
        ToggleId: '2',
        ToogleRight: false,
        SetToggleOption: "$",
        OnChange: (checked) => {},
        ToggleOn: false,
        Name: "",
        BeakPosition: 'Left',
    },
    parameters: {
        docs: {
            description: {
                story: 'Use to give additional information on the toggle action.',
            },
        },
    },
};

export const Expanded = {
    args: {
        ToggleVariation: 'Expanded',
        Title: 'Toggle Name Here',
        Description: 'This is an additional description for the switch',
        ExpandedText: 'Replace your content here',
        Disable: false,
        ToggleId: '3',
        SetToggleOption: "$",
        OnChange: (checked) => {},
        ToggleOn: false,
        Name: "",
    },

    parameters: {
        docs: {
            description: {
                story: 'Use when activating the toggle asks for more information.',
            },
        },
    },
};

export const InputToggle = {
    args:{
        ToggleVariation:'InputToggle',
        CopyHorizontal:true,
        CopyVertical:true,
        Disable:true,
        SetValue:"3",
        SetToggleOption:'%',
        CustomButtonText:"Apply to All",
        CustomButtonTextOnClick:() => {},
        OnChange:(checked) => {},
        OnBlur:(value) => {},
        OnClick:(e) => {},
        HorizontalOnClick:(e) => {},
        VerticalOnClick:(e) => {},
        Name:"",
    },
    parameters:{
        docs:{
            description:{
                story:'Toggle with $ or % option and Horizontal and Vertical copy option',
            },
        },
    },
};
