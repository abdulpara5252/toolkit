
import VgTimePicker from "../../../components/VgTimePicker/VgTimePicker";

export default {
  title: "Time Picker",
  component: VgTimePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Time pickers allow users to select a specific time ",
      },
    },
  },
  tags: ["autodocs"],

  argTypes: {
    Title: {
      control: "text",
      description: `The Title property allows users to input a custom heading or label that appears at the top of the component. This title helps identify or describe the content or purpose of the element.`,
    },
    Disable: {
      control: "boolean",
      table: {
        disable: false,
      },
      description: `The Disable property, when set to a boolean value, controls whether the time picker is active or inactive. If true, the time picker is disabled, preventing users from selecting or adjusting the time.`,
    },
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true,
      },
      description: `The Required property, when set to a boolean value, specifies whether a field, such as a time picker or input, is mandatory. If true, the user must select or input a value before proceeding.`,
    },
    ShowRequiredFieldMark: {
      control: "boolean",
      table: {
        disable: true,
        type: { summary: 'Boolean' },
      },
      description: "The ShowRequiredFieldMark property lets users toggle a red star indicator for required fields by setting it to true or false. When true, the red mark is displayed, visually signaling mandatory fields in the component.",
    },
    Focus: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true,
      },
      description: `The Focus property, when set to a boolean value, determines whether an element, like a time picker or input field, automatically gains focus. If true, the element becomes active and ready for user interaction.`,
    },
    TimePickerId: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
    },
    CustomErrorMessage: {
      control: "text",
      type: { name: "string" },
      description: `The "CustomErrorMessage" property allows users to define a personalized error message that will appear when input validation fails. This message helps guide users by providing clear feedback on what went wrong and how to correct it.`,
    },
    OnSelect: {
      action: "select",
      description: `The "onSelect" property is an event handler that triggers when user choose a Time Slot.`,
      table: {
        category: "Events",
      },
    },
    OnBlur: {
      action: "onBlur",
      description: `The onBlur event for a time picker is triggered when the time picker loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the time picker`,
      table: {
        category: "Events",
      },
    },
    OnChange: {
      action: "onChange",
      description: `The onChange event for a textbox is triggered whenever the content of the textbox is modified by the user. This event is useful for real-time validation, updating state as the user types, or triggering other interactive behaviors.`,
      table: {
        category: "Events",
      },
    },
    OnIconClick: {
      action: "OnIconClick",
      description: `The OnIconClick event for a timepicker is triggered whenever the icon within the timepicker is clicked. This event is useful for toggling the timepicker dropdown.`,
      table: {
        category: "Events",
      },
    },
    DropdownPosition: {
      control: { type: "select" },
      options: ["Left", "Right"],
      description:"The DropdownPosition in the Timepicker component allows customers to customize the dropdown's placement, enabling them to select either the left or right position for better usability"
    },
    Placeholder: {
      control: "text",
      type: { name: "string" },
      description:
        "The Placeholder property allows users to input a default text value that appears in a dropdown before any selection is made. It provides a hint or prompt about what the dropdown is for or what options are available.",
    },
    SetValue: {
      control: "text",
      description: "A string value to set or update the input field content. Useful for controlled components or to reset the field dynamically.",
      type: { name: "string" },
    },
    Name: {
      control: "text",
      type: { name: "string" },
      table: {
        disable: true, 
      },
      description: "The Name property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging."
    },
    TimePickerOpen: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The TimePickerOpen property, when set to a boolean value, controls the visibility of the time picker dropdown. If true, the dropdown is displayed, allowing users to select a time.`,
    },
  },
};

export const Default = {
  args:{
    Title:"Time Picker:",
    TimePickerId:"TimePickerId1",
    OnBlur:() => {},
    OnSelect:() => {},
    OnChange:() => {},
    CustomErrorMessage:"",
    Placeholder:"Select Time",
    SetValue:"",
    Name: "",
    DropdownPosition:"Left",
    TimePickerOpen: false,
  },
  parameters:{
    docs:{
      description:{
        story:"Time pickers allow users to select a specific time ",
      },
    },
  },
};

export const ErrorValidation = {
  args: {
    Title: "Time Picker",
    Required: true,
    TimePickerId: "",
    OnSelect: (e) => {},
    SetValue:"",
    Name: "",
    TimePickerOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: `The Error Validation for a time picker highlights the input field with a red border when an invalid or missing value is detected. A reason for the error is also provided, guiding the user to correct the input.`,
      },
    },
  },
};

export const Disabled = {
  args: {
    Disable: true,
    TimePickerId: "",
    Title: "Time Picker",
    SetValue:"",
    Name: "",
    TimePickerOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: `The Disable property for a time picker prevents user interaction, making the time picker inactive. When set to true, the time picker is grayed out and cannot be used for time selection.`,
      },
    },
  },
};

export const Focus = {
  args: {
    Focus: true,
    Title: "Time Picker",
    TimePickerId: "",
    OnSelect: (e) => {},
    SetValue:"",
    Name: "",
    TimePickerOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: `The Disable property for a time picker prevents user interaction, making the time picker inactive. When set to true, the time picker is grayed out and cannot be used for time selection.`,
      },
    },
  },
};
