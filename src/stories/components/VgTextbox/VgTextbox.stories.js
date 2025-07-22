import VgInput from "../../../components/VgTextbox/VgTextbox";

export default {
  title: "Input",
  component: VgInput,
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
      table: { category: "Title/PlaceHolder" },
    },
    PrefixIcon: {
      control: { type: 'select' },
      options: ['none', 'email', 'password', 'gap', "SearchInputControl" , '$', 'CustomMsgPrefix', 'isIconBody'],
      description: `The PrefixIcon property allows users to add predefined icons at the start of the input field. Options include:
  - none: No icon is displayed
  - email: Displays an email icon, indicating the field is for email input
  - password: Shows a lock icon, signifying a password field

  - gap: Displays a gap icon, signifying a gap field
  - SearchInputControl: Displays a search icon, signifying a search field
  - $: Displays a dollar icon, signifying a dollar field
  - CustomMsgPrefix: Displays a custom message prefix icon, signifying a custom message prefix field,
  - isIconBody: Displays a custom icon, signifying a custom icon field`,
  table: { category: "PrefixSupport" },
    },
    SuffixIcon: {
      control: { type: 'select' },
      options: ['none', 'hrs' , 'ClearSearch', 'CustomMsgSuffix', 'isIconBody'],
      description: `The SuffixIcon property allows users to add predefined icons at the end of the input field. Options include:
  - none: No icon is displayed
  - hrs: Displays an hourglass icon, signifying a loading state
  - ClearSearch: Displays a clear search icon, signifying a clear search field
  - CustomMsgSuffix: Displays a custom message suffix icon, signifying a custom message suffix field
  - isIconBody: Displays a custom icon, signifying a custom icon field`,


  table: { category: "SuffixSupport" },
    },
    InputTitle: {
      control: "text",
      type: { name: "string" },
      description: `The "Input Title" allows users to input and edit a custom title for their content. This field is intended for users to clearly label or identify the subject of their text or project.`,
      table: { category: "Title/PlaceHolder" },
    },

    // LabelPosition: {
    //   control: { type: 'radio' },
    //   options: ['top', 'left', 'right'],
    //   description: 'Position of the label relative to the input field',
    //   if: {
    //     arg: 'UrlPrefix',
    //     eq: '',
    //   },
    //   table : {
    //     disable : false
    //   }
    // },
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      table: { category: "Required/Validation" },
      description: `The "Required" property for a Input is a boolean that determines if the field must be filled by the user. When set to true, the Input becomes mandatory, and the form cannot be submitted without a value.`,
    },
    SetControlonRight: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: false,
      },
      description: `Enable this only when the device is mobile to adjust the input behavior accordingly.`
    },
    ShowRequiredFieldMark: {
      control: "boolean",
      table: {
        // disable: true,
        type: { summary: "Boolean" },
        category: "Required/Validation"
      },
      description: `The ShowRequiredFieldMark property lets users toggle a red star indicator for required fields by setting it to true or false. When true, the red mark is displayed, visually signaling mandatory fields in the component`,
    },
    FocusBorder: {
      control: "select", // Use "select" for a dropdown in Storybook
      type: { name: "string" },
      options: ["none", "blue", "green", "red"], // Define possible variants
      description: `The "FocusBorder" property specifies the border style when the input is focused. Options include 'none' (no border), 'blue' (blue border), 'green' (green border), 'red' (red border), or other custom variants. The selected variant applies a corresponding border color or style when the input is focused.`,
      defaultValue: "none", // Optional: Set a default variant
    },
    MaximumLength: {
      control: {
        type: "number",
        min: 1,
      },
      table: { category: "InputTools" },
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
    CustomErrorMessage: {
      control: "text",
      type: { name: "string" },
      description: `The "CustomErrorMessage" property allows users to define a personalized error message that will appear when input validation fails. This message helps guide users by providing clear feedback on what went wrong and how to correct it.`,
      if: {arg: "Validation", neq: "regex"},
      
      table: {
        disable: (context) => context.args.Validation === "none",
        category: "Required/Validation"
      }
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

    Password: {
      control: "boolean",
      description: `The "Password" field allows users to input sensitive information, such as a password, with the characters masked for privacy. The entered value is hidden by default to protect it from being viewed by others.`,
      table: { category: "InputTools" },
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
      description: `The Tooltip Message property allows users to input a custom message for each tab, which will display in the tooltip when hovered or tapped. This enables personalized guidance or descriptions to assist users in understanding each tab’s purpose.`,
      table: { category: "Tooltip" },
    },
    TooltipScreenTitleForMobile: {
      control: "text",
      type: { name: "string" },
      description: `The Tooltip Screen Title for Mobile is required when displaying the tooltip in a mobile environment. In this case, the tooltip appears as a bottom sheet, and this property defines the title shown at the top of the bottom sheet. It helps provide context to the user about the tooltip content.`,
      table: { category: "ForMobile" },
    },
    InputDescription: {
      control: "text",
      type: { name: "string" },
      description: `The "Input Title" allows users to input and edit a custom title for their content. This field is intended for users to clearly label or identify the subject of their text or project.`,
      table: { category: "Title/PlaceHolder" },
    },
    EnableOnChangeValidation : {
      control: 'boolean',
      description: 'Enables validation on each input change event.',
      defaultValue: false,
      table: { category: "Required/Validation" },
    },
    // PrefixSupport: {
    //   control: { type: "radio" },
    //   options: ["prefix", "suffix"],
    //   description:
    //     "The PrefixSupport property lets users choose between a prefix or suffix option, determining where additional text or symbols appear relative to the main content. This flexibility aids in formatting values, such as currencies or measurements, for better readability.",
    //   if: {
    //     arg: "UrlPrefix",
    //     eq: "",
    //   },
    // },
    EnableBody: {
      control: { type: "boolean" },
      description:
        "The EnableBody property allows users to toggle between displaying HTML content or plain text in a popup. Setting it to true enables rich HTML formatting, while false limits the content to simple text for a cleaner display.",
    },
    isIconBody: {
      control: false,
      description: `The isIconBody property allows users to add a component, such as an SVG, to display an icon at the start of an input box. This enhances the input field's design and provides a visual cue for its purpose.\n
      isIconBody={<div> <Svg name="bicycle" style={{width:"16px",height:"16px"}}/> </div>}`,
      if: { arg: "EnableBody", eq: true },
      table: { category: "InputTools" },
    },
    PrefixCustomMsg: {
      control: "text",
      type: { name: "string" },
      description: `The "CustomMsg" property allows users to display a custom message when "PrefixSupport" variant is selected.`,
      table: { category: "PrefixSupport" },
      if: { 
        arg: "PrefixIcon", 
        eq: "CustomMsgPrefix"
      }
    },
    SuffixCustomMsg: {
      control: "text",
      type: { name: "string" },
      description: `The "CustomMsg" property allows users to display a custom message when "PrefixSupport" variant is selected.`,
      table: { category: "SuffixSupport" },
      if: { 
        arg: "SuffixIcon", 
        eq: "CustomMsgSuffix"
      }
    },
    // PrefixSuffixChar: {
    //   control: "text",
    //   type: { name: "string" },
    //   description: `The PrefixSuffixChar property allows users to add a single character that appears as a prefix/suffix in an input field. This feature enhances context by predefining symbols like currency or units before user input.`,
    //   if: { arg: "PrefixSupport", in: ["prefix", "suffix"] },
    // },
    AlertPassiveMessage: {
      control: "boolean",
      description: `The "AlertPassiveMessage" is a boolean property that controls the display of a passive alert or notification message. When set to true, the message is shown to provide non-intrusive feedback; when false, no message is displayed.`,
      table: { category: "Required/Validation" },
    },
    InputDisable: {
      control: "boolean",
      type: { name: "boolean" },
      table: { category: "InputTools" },
      description: `The "Input Disable" property is a boolean that determines whether the textbox is active or not. When set to true, the textbox becomes disabled, preventing user input; when false, the textbox remains editable.`,
    },
    Validation: {
      control: { type: "radio" },
      options: ["none", "numeric", "email", "phone", "regex"],
      description: `The "Validation" property specifies the type of input that is allowed in a textbox, ensuring data is entered in the correct format. It can be set to None (no validation), Numeric (only numbers), Email, Phone, or Regex for custom pattern matching.`,
      table: { category: "Required/Validation" },
    },
    Any: {
      control: "text",
      type: { name: "string" },
      description:
        "The regex pattern for custom validation. Here pass any regex without slashes ( / ). E.g., ^[1-9][0-9]{9}$ ",
      if: { arg: "Validation", truthy: ((args) => {
        return true
      } )()},
      table: { category: "Validation", disable: "true" },

    },
    UrlPrefix: {
      control: "text",
      type: { name: "string" },
      description: `The "UrlPrefix" allows users to input a custom value that will be automatically appended as the prefix to any URL entered. This helps ensure consistency by predefining part of the URL structure, such as "https://", before the user adds the rest of the address.`,
      table: { category: "InputTools" },
    },
    RegexPattern: {
      control: "text",
      type: { name: "string" },
      description:
        "The regex pattern for custom validation. Here pass any regex without slashes ( / ). E.g., ^[1-9][0-9]{9}$ ",
      if: { arg: "Validation", eq: "regex" },
      table: { category: "Required/Validation" },
    },
    RegexErrorMessage: {
      control: "text",
      type: { name: "string" },
      description:
        "Custom error message to display when regex validation fails.",
      if: { arg: "Validation", eq: "regex" },
      table: { category: "Required/Validation" },
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
    OnInputDrop: {
      action: "onClick",
      table: {
        category: "Events",
      },
      description: `The "OnInputDrop" event for a textbox is triggered when the InputDrop is clicked by the user. This event can be used to handle actions such as focusing the input, triggering tooltips, or logging user interaction.`,
    },
    InputId: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
    },
    NotificationData: {
      control: "object",
      type: { name: "array" },
      description: `Json Data for Passive Alert which help to customize and behave differently what user want.`,
      if: { arg: "AlertPassiveMessage" },
    },
    customClassName: {
      table: {
        disable: true,
      },
    },
    Protocol: {
      control: { type: "select" },
      options: ["http://", "https://", "none"],
      description:
        "The Protocol property allows users to select between HTTP and HTTPS, defining the type of connection for data transmission. Choosing HTTPS enhances security by encrypting the data, while HTTP remains unencrypted.",
      if: { arg: "UrlPrefix" },
    },
    SetValue: {
      control: "text",
      type: { name: "string" },
      description:
        "The SetValue property allows users to input and edit a custom value for the textbox. This field is intended for users to input and update the content of the textbox.",
        table: { category: "InputTools" },
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

    InputDrop: {
      control: "boolean",
      description:
        "The InputDrop property allows users to create a dropdown menu for selecting values or options.",
        table: { category: "InputTools" },
    },
    DropInValue: {
      control: "text",
      type: { name: "string" },
      description:
        "The DropInValue property allows users to set and edit a custom value for The InputDrop. This property only work if InputDrop is true .",
      if: { arg: "InputDrop" },
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
      table: { category: "InputTools" },
    },
    // SearchInputControl: {
    //   control: "boolean",
    //   type: { name: "boolean" },
    //   table: {
    //     category: "Search",
    //   },
    //   if: { arg: "PrefixSupport" , truthy: false },
    // },
    // ClearSearch:{
    //   control: "boolean",
    //   type: { name: "boolean" },
    //   table: {
    //     category: "Search",
    //   },
    //   if: { arg: "PrefixIcon", eq: "SearchInputControl" },
    // }
    TagTextbox: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The "TagTextbox" property allows users to create a textbox that supports multiple tags or labels. This feature is useful for categorizing or tagging items within the input field, enhancing organization and searchability.`,
      table: { category: "InputTools" },
    },
    Type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: "The Type property specifies the type of input field, such as 'text', 'password', 'email', 'number', etc.",
      table: { category: "InputTools" },
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
    InputMode: {
      control: { type: 'select' },
      options: ['text', 'decimal', 'numeric'],
      description: "Controls the virtual keyboard type on mobile/tablet devices. 'text' shows standard keyboard, 'numeric' shows numbers only, 'decimal' shows numbers with decimal point.",
      table: { category: "InputTools" },
    },
    min: {
      control: "number",
      type: { name: "number" },
      description: "The min property specifies the minimum value for the input field.",
      table: { category: "InputTools" },
    },
    max: {
      control: "number",
      type: { name: "number" },
      description: "The max property specifies the maximum value for the input field.",
      table: { category: "InputTools" },
    },
    OnInput: {
      action: "onInput",
      table: {
        category: "Events",
      },
      description: "The OnInput event is triggered when the value of the input field is changed.",
    },
    OnBlurValidation: {
      control: "boolean",
      type: { name: "boolean" },
      table : {category : 'Required/Validation'},
      description : "The onBlurValidation event for a textbox is triggered when the textbox loses focus, typically when a user clicks or tabs out of the field. This event is based on True/False and check validation state."
    },
    MobileViewSearch: {
      control : "boolean",
      type: { name: "boolean" },
      description : "he MobileViewSearch event for a textbox is triggered when the user want the to show teh design fro mobile ,"
    }
  },

  decorators: [
    (Story, context) => {
      const { Validation, LabelPosition } = context.args;
      context.args.numericValidation = Validation === "numeric";
      context.args.emailValidation = Validation === "email";
      context.args.phoneValidation = Validation === "phone";
      return <Story />;
    },
  ],
};

export const Default = {
  args:{
    InputTitle:"Title:",
    PlaceHolder:"",
    PrefixIcon:"none",
    SuffixIcon:"none",
    SetControlonRight: false,
    // LabelPosition: "top",
    Password:false,
    TagTextbox: false,
    AlertPassiveMessage:false,
    InputId:"",
    Validation:"none",
    FocusBorder: 'none',
    UrlPrefix:"",

    // InputDescription: "",
    OnValidation: () => {},
    EnableOnChangeValidation:false,
    Required:true,
    OnBlurValidation : true,
    BeakPosition:"Left",
    InfoTooltipMessage:"",
    NotificationData:[{ Duration: 1000, NotificationTitle: "Maximum length reached.", types: "error" }],
    SetValue:'',
    Name:'',
    EnableBody:false,
    isIconBody:<div>%</div>,
    PrefixCustomMsg:"",
    SuffixCustomMsg:"",
    AutoFocus:false,

    Type:"text",
   
    InputMode:"text",
    min:0,
    max:100,

    CustomErrorMessage:"invalid email",
    OnKeyDown:(e) => { console.log(e, "OnKeyDown") },
    OnKeyUp:(e) => { console.log(e, "OnKeyUp") },
    OnPaste:(e) => { console.log(e, "OnPaste") },
    OnClick:(e) => {},
    OnInput:(e) => {},
    MobileViewSearch: false
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

export const Password = {
  args: {
    InputTitle: "Password:",
    PlaceHolder: "Password",
    PrefixIcon:"password",
    InfoTooltipMessage: "",
    BeakPosition: "Left",
    Password: true,
    Type:"password",
    // LabelPosition: "top",
    Required: true,
    InputId:"",
    SetValue: '',
    OnClick: () => { },
  },
  parameters: {
    docs: {
      description: {
        story: "Use when prompting user for password.",
      },
    },
  },
  argTypes: {
    PrefixSupport: { table: { disable: true } },
    UrlPrefix: { table: { disable: true } }, // Hide BadgeSize manually in this specific story
    Protocol: { table: { disable: true } }, // Hide Protocol manually in this specific story
  },
};

export const URL = {
  args: {
    InputTitle: "URL:",
    PlaceHolder: "URL Input",
    PrefixIcon:"none",
    InputId:"",
    InfoTooltipMessage: "",
    BeakPosition: "Left",
    UrlPrefix: "www.vagaro.com/",
    SetValue: '',
    OnClick: () => { },
  },
  parameters: {
    docs: {
      description: {
        story: "Use when prompting user for URL.",
      },
    },
  },
  argTypes: {
    PrefixIcon: {
      table: {
        disable: true,
      },
    },
    Password: {
      table: {
        disable: true,
      },
    },
  },
};

export const ErrorValidation = {
  args: {
    InputTitle: "Title:",
    PlaceHolder: "Input Field",
    InputId:"",
    PrefixIcon:"none",
    InfoTooltipMessage: "",
    BeakPosition: "Left",
    Required: true,
    SetValue: '',
    OnClick: () => { },
  },
  parameters: {
    docs: {
      description: {
        story: "Error validation for textboxes ensures that user input meets required conditions, like required fields, length, or specific formats",
      },
    },
  },
};

export const Disabled = {
  args: {
    InputTitle: "Title:",
    PrefixIcon:"none",
    InputId:"",
    PlaceHolder: "Input Field",
    InfoTooltipMessage: "",
    BeakPosition: "Left",
    InputDisable: true,
    SetValue: '',
    OnClick: () => { },
  },
  parameters: {
    docs: {
      description: {
        story: "Disabling a field prevents users from interacting with or modifying its content while keeping it visible on the form. Disabled fields do not get submitted with the form data.",
      },
    },
  },
};

export const FocusBorder = {
  args: {
    InputTitle: "Title:",
    PrefixIcon:"none",
    InfoTooltipMessage: "",
    BeakPosition: "Left",
    PlaceHolder: "Input Field",
    InputId:"",
    FocusBorder: 'blue',
    SetValue: '',
    OnClick: () => { },
  },
  parameters: {
    docs: {
      description: {
        story: "Use when prompting user for focus border.",
      },
    },
  },
};

export const DropInInput = {
  args: {
    InputTitle: "Title:",
    InfoTooltipMessage: "",
    BeakPosition: "Left",
    PrefixIcon:"none",
    PlaceHolder: "Enter Miles",
    InputId: "",
    InputDrop: true,
    SetValue: "",
    DropInValue: 'All United States',
    InputText: 'All United States',
    OnClick: () => { },
  },
  parameters: {
    docs: {
      description: {
        story: "Use when prompting user for focus border.",
      },
    },
  },
};

export const TagTextbox = {
  args:{
    InputTitle:"Title:",
    PlaceHolder:"",
    TagTextbox: true,
    PrefixIcon:"none",
    SuffixIcon:"none",
    SetControlonRight: false,
    // LabelPosition: "top",
    Password:false,
    TagTextbox: false,
    AlertPassiveMessage:false,
    InputId:"",
    Validation:"none",
    UrlPrefix:"",

    // InputDescription: "",
    EnableOnChangeValidation:false,
    Required:true,
    OnBlurValidation : true,
    BeakPosition:"Left",
    InfoTooltipMessage:"",
    NotificationData:[{ Duration: 1000, NotificationTitle: "Maximum length reached.", types: "error" }],
    SetValue:'',
    Name:'',
    EnableBody:false,
    isIconBody:<div>%</div>,
    PrefixCustomMsg:"",
    SuffixCustomMsg:"",
    AutoFocus:false,

    Type:"text",
   
    InputMode:"text",
    min:0,
    max:100,

    CustomErrorMessage:"invalid email",
    OnKeyDown:(e) => { console.log(e, "OnKeyDown") },
    OnKeyUp:(e) => { console.log(e, "OnKeyUp") },
    OnPaste:(e) => { console.log(e, "OnPaste") },
    OnClick:(e) => {},
    OnInput:(e) => {},
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