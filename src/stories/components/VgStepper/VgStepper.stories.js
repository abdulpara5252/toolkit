import VgStepper from "../../../components/VgStepper/VgStepper";

export default {
  title: "Stepper",
  component: VgStepper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Stepper",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    SetValue: {
      control: {
        type: "number",
        min: 1,
      },
      description: "",
      type: { name: "number" },
      transform: (value) => {
        if (value < 1) {
          return 1;
        }
        return value;
      },
      description: `The SetValue property allows users to input and edit a custom value for the textbox. This field is intended for users to input and update the content of the textbox.`,
    },
    SetInterval: {
      control: {
        type: "number",
        min: 1,
      },
      description: "The SetInterval property allows users to input and edit a custom value for the stepper. This field is intended for users to input and update the content of the stepper.",
      type: { name: "number" },
      transform: (value) => {
        if (value < 1) {
          return 1;
        }
        return value;
      },
    },
    CustomIntervalText: {
      control: "text",
      type: { name: "string" },
      description: "This property set custom place holder for Stepper. Eg: added ('hrs', 'min')",  
  },
    OnBlur: {
      action: "onBlur",
      description: `The onBlur event for a stepper is triggered when the stepper loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the stepper`,
      table: {
        category: "Events",
      },
    },
    MinimumValue: {
      control: {
        type: "number",
        min: 0,
      },
      type: { name: "number" },
      description: `The "MinimumValue" property allows users to set a numeric value that defines the minimum number of value required in a stepper. This ensures that the user must enter at least the specified number of value before the input is considered valid.`,
      transform: (value) => {
        if (value < 1) {
          return 0;
        }
        return value;
      },
    },
    MaximumValue: {
      control: {
        type: "number",
        min: 1,
      },
      type: { name: "number" },
      description: `The "MaximumValue" property for a stepper allows users to set a numeric limit on the number of characters that can be entered. This ensures that the text input does not exceed the specified value count, helping control data length.`,
      defaultValue: 1,

      transform: (value) => {
        if (value < 1) {
          return 1;
        }
        return value;
      },
      onKeyDown: (e) => {
        if (e.key === "-" || e.key === "e" || e.key === "+") {
          e.preventDefault();
        }
      },
    },
    OnChange: {
      action: "onChange",
      table: {
        category: "Events",
      },
      description: `The "OnChange" listener for a stepper detects changes whenever the user modifies the text. This event allows developers to trigger specific actions or functions dynamically as the user types or updates the steper content.`,
    },
    OnIncrement: {
      action: "OnIncrement",
      table: {
        category: "Events",
      },
      description: `The "OnIncrement" listener for the stepper triggers when the user clicks the increment button. This event allows developers to execute specific actions or update values dynamically as the stepper value increases`,
    },
    OnDecrement: {
      action: "OnDecrement",
      table: {
        category: "Events",
      },
      description: `The "OnDecrement" listener for the stepper triggers when the user clicks the decrement button. This event enables developers to perform necessary actions or update values dynamically as the stepper value decreases.`,
    },
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The "Required" property for a Stepper is a boolean that determines if the field must be filled by the user. When set to true, the Input becomes mandatory, and the form cannot be submitted without a value.`,
      table: { category: "Required/Validation" },
    },
    CustomErrorMessage: {
      control: "text",
      type: { name: "string" },
      description: `The "CustomErrorMessage" property allows users to define a personalized error message that will appear when input validation fails. This message helps guide users by providing clear feedback on what went wrong and how to correct it.`,
      table: { category: "Required/Validation" },
    },
    Disabled: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The "Input Disable" property is a boolean that determines whether the textbox is active or not. When set to true, the textbox becomes disabled, preventing user input; when false, the textbox remains editable.`,
    },
    LabelText: {
      control: "text",
      type: { name: "string" },
      description: `The "Input Title" allows users to input and edit a custom title for their content. This field is intended for users to clearly label or identify the subject of their text or project.`,
      table: { category: "Title/PlaceHolder" },
    },
  }
};

export const Default = {
  args: {
    SetInterval: 5,
    CustomIntervalText: 'min',
    SetValue: null,
    Required: false,
    CustomErrorMessage: 'Error reason',
    Disabled: false,
    LabelText: "Title:"
  },
}
