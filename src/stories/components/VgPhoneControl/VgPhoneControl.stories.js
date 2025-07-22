import VgPhoneControl from "../../../components/VgPhoneControl/VgPhoneControl";

const countryOptions = {
  "United States of America": 1,
  "United Kingdom": 2,
  Canada: 3,
  Australia: 4,
};

export default {
  title: "Phone Number",
  component: VgPhoneControl,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Phone Number control allows users to select their country from a dropdown, automatically setting the country code, and validates the phone number input based on the selected country's format. This ensures the input is correctly formatted according to the specific region's dialing rules.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Title: {
      control: "text",
      type: { name: "string" },
      description: `The "Title" for the phone number allows users to input a custom heading or label to identify the phone number field. This helps provide clarity and context, ensuring users know the purpose of the input field.`,
    },
    PlaceHolder: {
      control: "text",
      description: `The "Placeholder" is a temporary text shown inside an input field, guiding users on what type of value to enter. It disappears when the user starts typing their own content.`,
    },
    CurrentCountry: {
      control: "select",
      options: Object.keys(countryOptions),
      description: `The "CurrentCountry" allows users to select their country from a dropdown menu. This selection helps to accurately associate the user's location of their country.`,
      mapping: countryOptions,
    },
    SearchCountry: {
      control: "boolean", 
      type: { name: "boolean" },
      description: `The "SearchCountry" property enables a search functionality within the country dropdown, allowing users to quickly find and select their country by typing its name. When set to true, a search input appears above the list of countries, enhancing usability.`,
    },
    AllCountry: {
      control: "boolean",
      type: { name: "boolean" },
    },
    Validation: {
      options: ["Default", "Passive", "None"],
      control: { type: "radio" },
      description: `The "Validation" property allows users to choose how input data is validated, with three options:
- Default: Applies standard validation rules automatically.
- Passive: Required while Passive alert need to show.
- None: No validation is applied, allowing any input.`,
      table: { category: "Required/Validation" },
    },
    FocusBorder: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
      description: `The "FocusBorder" property is a boolean that controls whether a border appears around the input field when it gains focus. If set to true, the border is highlighted when the user clicks or navigates into the field; if false, no border change occurs on focus.`,
    },
    Disable: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
      description: `The "Disable" property is a boolean that controls whether an input field or component is active. When set to true, the field is disabled, preventing user interaction; when false, the field remains fully interactive.`,
    },
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      table: { category: "Required/Validation" },
      description: `The "Required" property is a boolean that specifies whether a field must be filled out before form submission. When set to true, the field is mandatory; when set to false, it is optional for the user to complete.`,
    },
    ShowRequiredFieldMark: {
      control: "boolean",
      type: { summary: 'Boolean' },
      table: { category: "Required/Validation" },
      description: `The ShowRequiredFieldMark property lets users toggle a red star indicator for required fields by setting it to true or false. When true, the red mark is displayed, visually signaling mandatory fields in the component.`,
    },
    CustomErrorMessage: {
      control: "text",
      type: { name: "string" },
      description: `The "CustomErrorMessage" property allows users to define a personalized error message that will appear when input validation fails. This message helps guide users by providing clear feedback on what went wrong and how to correct it.`,
      table: { category: "Required/Validation" },
    },
    OnChange: {
      action: "changed",
      description: `The "OnChange" property allows users to attach an event handler that triggers whenever the value of the control changes. This event is useful for dynamically responding to user input or modifying other elements in real-time based on the change.`,
      table: {
        category: "Events",
      },
    },
    OnKeyUp: {
      action: "key pressed",
      description: `The "OnKeyUp" property allows users to attach an event handler that triggers whenever a key is released after being pressed. 
      This event is useful for detecting when a user finishes typing, triggering real-time validation, or handling shortcuts.`,
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
    OnClick: {
      action: "clicked",
      description: `onClick is an event handler that triggers a specific action when a user clicks on the Phonenumber control. This feature allows badges to be interactive, enabling functionalities such as navigation, updates, or other custom behaviors upon user interaction.`,
      table: {
        category: "Events",
      },
    },
    OnBlur: {
      action: 'onBlur',
      description: `The onBlur event for a Phone Control is triggered when the Phone Control loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the Phone Control`,
      table: {
        category: 'Events',
      },
    },
    PhoneControlId: {
      control: "text",
      table:{disable:true}
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
    FullLength: {
      control: "boolean",
      table: { disable: true },
    },
    MaximumLength: {
      control: {
        type: "number",
        min: 1,
      },
      type: { name: "number" },
      description: `The "MaximumLength" property allows users to set a numeric value that defines the minimum number of characters required in a textarea. This ensures that the user must enter at least the specified number of characters before the input is considered valid.`,
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
    SetValue: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
      description: `The SetValue property allows users to input and edit a custom value for the textbox. This field is intended for users to input and update the content of the textbox.`,
    },
    CountryDropdown: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The CountryDropdown property allows users to toggle the visibility of a country dropdown menu by selecting a boolean value. Setting it to true displays the dropdown, enabling country selection, while false hides it.`,
    },
    Name:{
      control: "text",
      type: { name: "string" },
      table: {
        disable: true, // Hide from docs
      },
      description: "The Name property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging."
    },
    CheckPhoneControl: {
      control: "text",
      type: { name: "string" },
      description: "The CheckPhoneControl property allows users to specify the CheckPhoneControl of the phone number input, providing additional context or metadata.",
      table: { category: "Required/Validation" },
    },
    OnValidation: {
      action: 'onValidationChange',
      description: 'This event is triggered when the validation status of the input changes.',
      // type: { name: 'Function', returns: 'void' },
      table: {
        type: { summary: '(isValid: boolean, errorMessage?: string) => void' },
        category: "Events"
      },
    },
    OnCountryChange: {
       action: "onCountryChange",
        description: "Callback function triggered when the selected country changes. Receives the new country ID.",
        table: { category: "Events" },
    },
    AutoFocus: { 
      control: "boolean",
      type: { name: "boolean" },
      description: `When true, automatically focuses the Address Line 1 input field when the component mounts (if not disabled).`,

    },
  },
};

export const Default = {
  args: {
    Title: "Phone Number:",
    PlaceHolder: "Enter Phone Number",
    AutoFocus: false, 
    SearchCountry: true,
    CurrentCountry: 1,
    Validation: "Default",
    Disable: false,
    Required: false,
    FocusBorder: false,
    NativeActionVal: 13,
    Footer: 2,
    TimerCount: 1000,
    FullLength: false,
    CloseBackTitle: "",
    PhoneControlId: "",
    VagaroToolkit: 1,
    CountryDropdown: false,
    OnClick: () => {},
    SetValue: '',
    Name: "",
    AllCountry: false,
    OnValidation: () => {},
    OnCountryChange: () => {},
    
  },
  parameters: {
    docs: {
      description: {
        story:
          "It's Default Phone Number control allows users to select their country from a dropdown.",
      },
    },
  },
};

export const Disabled = {
  args: {
    Title: "Phone Number:",
    PlaceHolder: "Enter Phone Number",
    CurrentCountry: 1,
    Validation: "None",
    Disable: true,
    VagaroToolkit: 1,
    NativeActionVal: 13,
    Footer: 2,
    TimerCount: 1000,
    PhoneControlId: "",
    OnChange: () => {},
    OnClick: () => {},
     SetValue: '',
     Name: ""
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabling a field prevents users from interacting with or modifying its content while keeping it visible.",
      },
    },
  },
};

export const ErrorValidation = {
  args: {
    Title: "Phone Number:",
    PlaceHolder: "Enter Phone Number",
    CurrentCountry: 1,
    VagaroToolkit: 1,
    Required: true,
    NativeActionVal: 13,
    Footer: 2,
    TimerCount: 1000,
    PhoneControlId: "",
    OnChange: () => {},
    OnClick: () => {},
     SetValue: '',
     Name: ""
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error validation for phone number ensures that user input meets required conditions, like required fields, or specific formats",
      },
    },
  },
};

export const FocusBorder = {
  args: {
    Title: "Phone Number:",
    PlaceHolder: "Enter Phone Number",
    FocusBorder: true,
    PhoneControlId: "",
    VagaroToolkit: 1,
    NativeActionVal: 13,
    Footer: 2,
    TimerCount: 1000,
    OnChange: () => {},
    OnClick: () => {},
     SetValue: 7875487848,
     Name: ""
  },
  parameters: {
    docs: {
      description: {
        story: "Use when prompting user for focus border.",
      },
    },
  },
};