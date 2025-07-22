import VgLoginInput from "../../../components/VgLoginInput/VgLoginInput";

export default {
  title: "Login Input",
  component: VgLoginInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input Fields let users input specific information. This can be text, numbers, addresses, etc. If prompting users for text that requires multiple sentences, use Text Area instead. Input fields are most commonly used to input personal information, entering security.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    PlaceHolder: {
      control: "text",
      type: { name: "string" },
      description: `The "Placeholder" is a temporary text shown inside an input field, guiding users on what type of value to enter. It disappears when the user starts typing their own content.`,
    },
    InputTitle: {
      control: "text",
      type: { name: "string" },
      description: `The "Input Title" allows users to input and edit a custom title for their content. This field is intended for users to clearly label or identify the subject of their text or project.`,
    },
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      table: { category: "Required/Validation" },
      description: `The "Required" property for a Input is a boolean that determines if the field must be filled by the user. When set to true, the Input becomes mandatory, and the form cannot be submitted without a value.`,
    },
    ShowRequiredFieldMark: {
      control: "boolean",
      table: {
        category: "Required/Validation",
        type: { summary: "Boolean" },
      },
      description: `The ShowRequiredFieldMark property lets users toggle a red star indicator for required fields by setting it to true or false. When true, the red mark is displayed, visually signaling mandatory fields in the component.
 `,
    },
    FocusBorder: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true,
      },
      description: `The "Focus Border" property is a boolean that controls whether the Input displays a border when focused. If set to true, the border becomes visible when the user clicks or navigates into the Input; otherwise, it remains hidden.`,
    },
    MaximumLength: {
      control: {
        type: "number",
        min: 1,
      },
      type: { name: "number" },
      description: `The "MaximumLength" property allows users to specify a numeric value that sets the upper limit on the number of characters allowed in an input field. This helps control the length of user-entered data, ensuring it does not exceed the defined limit.`,
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
    // no usecase of valiadtion in that component after discussing with Parth
    // Validation: { 
    //   control: { type: "radio" },
    //   options: ["none", "numeric", "email", "phone", "regex"],
    //   description: `The "Validation" property specifies the type of input that is allowed in a textbox, ensuring data is entered in the correct format. It can be set to None (no validation), Numeric (only numbers), Email, Phone, or Regex for custom pattern matching.`,
    //   table: { category: "Validation" },
    // },
    CustomErrorMessage: {
      control: "text",
      type: { name: "string" },
      description: `The "CustomErrorMessage" property allows users to define a personalized error message that will appear when input validation fails. This message helps guide users by providing clear feedback on what went wrong and how to correct it.`,
      if: {arg: "Validation", neq: "regex"},
      
      table: {
        disable: (context) => context.args.Validation === "none",
        category: "Validation"
      }
    },
    InputDisable: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: false,
      },
      description: `The "Input Disable" property is a boolean that determines whether the textbox is active or not. When set to true, the textbox becomes disabled, preventing user input; when false, the textbox remains editable.`,
    },
    RegexPattern: {
      control: "text",
      type: { name: "string" },
      description:
        "The regex pattern for custom validation. Here pass any regex without slashes ( / ). E.g., ^[1-9][0-9]{9}$ ",
      if: { arg: "Validation", eq: "regex" },
      table: { category: "Validation" },
    },
    RegexErrorMessage: {
      control: "text",
      type: { name: "string" },
      description:
        "Custom error message to display when regex validation fails.",
      if: { arg: "Validation", eq: "regex" },
      table: { category: "Validation" },
    },
    OnBlur: {
      action: "onBlur",
      description: `The onBlur event for a textbox is triggered when the textbox loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the textbox`,
      table: {
        category: "Events",
      },
    },
    OnChange: {
      action: "onChange",
      table: {
        category: "Events",
      },
      description: `The "OnChange" listener for a textbox detects changes whenever the user modifies the text. This event allows developers to trigger specific actions or functions dynamically as the user types or updates the textbox content.`,
    },
    OnKeyUp: {
      action: "onKeyUp",
      table: {
        category: "Events",
      },
      description: `The "OnKeyUp" listener for a textbox detects when a user releases a key while interacting with the input field. This event is triggered after the key is released, providing an opportunity to perform actions such as real-time validation, dynamic search, or updating the UI as the user types. It is commonly used for tracking user input as it happens, allowing for a more interactive experience.`,
    },
    OnFocus: {
      action: "onFocus",
      description: `The "OnFocus" event for a textbox is triggered when the textbox gains focus, typically when a user clicks or tabs into the field. This event can be used to highlight the field, fetch additional data, or provide user assistance.`,
      table: {
        category: "Events",
      },
    },
    OnClick: {
      action: "onClick",
      table: {
        category: "Events",
      },
      description: `The "OnClick" event for a textbox is triggered when the textbox is clicked by the user. This event can be used to handle actions such as focusing the input, triggering tooltips, or logging user interaction.`,
    },
    InputId: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
    },
    customClassName: {
      table: {
        disable: true,
      },
    },
    SetValue: {
      control: "text",
      type: { name: "string" },
      description:
        "The SetValue property allows users to input and edit a custom value for the textbox. This field is intended for users to input and update the content of the textbox.",
      table: {
        disable: true,
      },
    },
    Name: {
      control: "text",
      type: { name: "string" },
      table: {
        disable: true, // Hide from docs
      },
      description:
        "The Name property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging.",
    },
    InputText: {
      control: "text",
      type: { name: "string" },
      description:
        "The InputText property allows users to set a default value of Text Box. This property only work if InputDrop is true .",
      if: { arg: "InputDrop" },
    },
    AutoFocus: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The "AutoFocus" property is a boolean that controls whether an input field automatically receives focus when the page loads.`,
    },
    Type: {
      control: "text",
      type: { name: "string" },
      description: "The Type property specifies the type of input field, such as 'text', 'password', 'email', etc.",
    },
    OnKeyDown: {
      action: "onKeyDown",
      table: {
        category: "Events",
      },
      description: "The OnKeyDown event is triggered when a key is pressed down while the input field is focused.",
    },
    OnKeyUp: {
      action: "onKeyUp",
      table: {
        category: "Events",
      },
      description: "The OnKeyUp event is triggered when a key is released while the input field is focused.",
    },
    OnPaste: {
      action: "onPaste",
      table: {
        category: "Events",
      },
      description: "The OnPaste event is triggered when content is pasted into the input field.",
    },
    AllCountry: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The "AllCountry" property is a boolean that controls whether the input field should display all countries in the dropdown.`,
  },
  CountryDropdown: {
    control: "boolean",
    type: { name: "boolean" },
    description: `The "CountryDropdown" property is a boolean that controls whether the input field should display a dropdown for selecting countries.`,

  },
  AutoFocus: {
    control: "boolean",
    type: { name: "boolean" },
    description: `The "AutoFocus" property is a boolean that controls whether an input field automatically receives focus when the page loads.`,
  },
  OnPhoneControlChange: {
    action: "onPhoneControlChange",
    table: {
      category: "Events",
    },
    description: `The "OnPhoneControlChange" event for a textbox is triggered when the textbox value changes, typically when a user types or selects a new value. This event is often used for validation or updating state after the user finishes interacting with the textbox.`,
},
  OnInputChange: {
    action: "onInputChange",
    table: {
      category: "Events",
    },
    description: `The "OnInputChange" event for a textbox is triggered when the textbox value changes, typically when a user types or selects a new value. This event is often used for validation or updating state after the user finishes interacting with the textbox.`,
  },
  ShowRequiredFieldMark: {
    control: "boolean",
    type: { name: "boolean" },
    description: `The "ShowRequiredFieldMark" property is a boolean that controls whether the input field should display a required field mark.`,
    table : {category : "Required/Validation"}
  }
}
};

export const Default = {
  args:{
    InputTitle:"Log In or Sign Up:",
    PlaceHolder:"Email or Phone Number",
    InputId:"",
    Required:true,
    SetValue:'',
    Name:'',
    AutoFocus:false,
    OnClick: (e) => {},
    Type: "text",
    OnKeyDown: (e) => {},
    OnPaste: (e) => {},
    OnPhoneControlChange: (e) => {},
    OnInputChange: (e) => {},
    CustomErrorMessage: "Invalid email format",
    AllCountry: true,
    AutoFocus: true,
    CountryDropdown: true,
    ShowRequiredFieldMark: true,
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