import VgTextarea from "../../../components/VgTextarea/VgTextarea";

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "uplifting", label: "Uplifting" },
  { value: "inspirational", label: "Inspirational" },
  { value: "trendy", label: "Trendy" },
  { value: "Gentle & Caring", label: "Gentle & Caring" },
  { value: "motivational", label: "Motivational" },
  { value: "energetic", label: "Energetic" },
];

const RawData = [
  {
    Index: 0,
    InputDescription: "I am salon professional Nikunj sir",
    Tone: "energetic",
    Range: 100,
  },
  {
    Index: 1,
    InputDescription: "I am salon professional Sagar Battul",
    Tone: "trendy",
    Range: 75,
  },
  {
    Index: 2,
    InputDescription:
      "I am salon professional The issue arises from the fact that when you're updating the history in your",
    Tone: "casual",
    Range: 25,
  },
  {
    Index: 3,
    InputDescription:
      "I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.",
    Tone: "motivational",
    Range: 50,
  },
  {
    Index: 4,
    InputDescription: "I am salon professional Sagar Battul",
    Tone: "professional",
    Range: 0,
  },
];
export default {
  title: "Textarea",
  component: VgTextarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text Areas allow users to type in a large amount of text. If prompting for small amount of text, use Input Field instead.",
      },
    },
  },
  tags: ["autodocs"],

  argTypes: {
    LabelText: {
      control: "text",
      type: { name: "string" },
      description: `The "LabelText" property allows users to input a custom heading or label that appears at the top of a component. This title provides context or identifies the purpose of the content displayed within the component.`,
      table : {category : "Label/PlaceHolder"}
    },
    PlaceHolder: {
      control: "text",
      type: { name: "string" },
      description: `The "Placeholder" property allows users to set temporary, instructional text inside a textarea, guiding what kind of input is expected. This text disappears once the user starts typing in the field.`,
      table : {category : "Label/PlaceHolder"}
    },
    TextareaVariant: {
      options: ["Default", "FileUploader", "RequiredText"],
      control: { type: "radio" },
      description: `The "TextareaVariant" property allows users to choose between different types of text areas: default, file uploader, or RequiredText.\n
- Default: A standard, multi-line text field for general input.\n
- FileUploader: A text area integrated with functionality to upload files, allowing users to attach documents or images.\n
- RequiredText: A mandatory text field where users must enter information before proceeding, often marked as required in forms. `,
table: { category: "Textarea Tools" },
    },
    SetValue: {
      control: "text",
      type: { name: "string" },
      required: false,
      description: `The "SetValue" property allows users to input or edit text within a multi-line field. This value represents the content of the textarea and can be modified by the user to include any desired text`,
      table: { category: "Textarea Tools" },
    },
    FocusBorder: {
      control: "boolean",
      table: {
        disable: true,
      },
      description: `The "Focus Border" property for a textarea is a boolean that controls whether a border appears when the textarea is focused. If set to true, the border becomes visible when the user clicks or navigates into the textarea; otherwise, it remains hidden.`,
    },

    Error: {
      control: "boolean",
      table: {
        disable: true,
      },
      description: `The "Error" property is a boolean that indicates whether an error state is active. When set to true, a red border appears around the field along with an error message, alerting the user to correct the input; when false, no error indication is shown.`,
    },

    OnClickRegenerate: {
      table: { category: "AiControls /Events" },
      action: "clicked",
      if: { arg: "AiControlPopup", eq: true },
    },

    NativeAction: {
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
    CloseBackTitle: {
      control: "string",
      table: { disable: true },
    },
    VagaroToolkit: {
      control: "Number",
      type: { name: "Number" },
      table: { disable: true },
      description: "The VagaroToolkit property, when set to a Number value",
    },

    AiControlId: {
      table: { disable: true },
      control: "string",
      if: { arg: "AiControlPopup", eq: true },
    },
    TextareaLength: {
      control: "number",
      description: `The TextareaLength property allows users to specify the number of lines visible in a Textarea by entering a row number. This provides flexibility to adjust the Textarea's height for better content visibility and user convenience.`,
      table: { category: "Textarea Tools" },
      if: { arg: "AutoHeight", eq: false },
    },

    MaximumLength: {
      control: {
        type: "number",
        min: 1,
      },
      type: { name: "number" },
      table: { category: "Textarea Tools" },
      description: `The "MaximumLength" property for a textarea allows users to set a numeric limit on the number of characters that can be entered. This ensures that the text input does not exceed the specified character count, helping control data length.`,
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
    AiClickEvent: {
      action: "onClick",
      table: { category: "Events" },
      description: `The "onChange" listener for a textarea detects changes whenever the user modifies the text. This event allows developers to trigger specific actions or functions dynamically as the user types or updates the textarea content.`,
      if: { arg: "AiControlPopup", eq: true },
    },
    onChange: {
      action: "onChange",
      table: { category: "Events" },
      description: `The "onChange" listener for a textarea detects changes whenever the user modifies the text. This event allows developers to trigger specific actions or functions dynamically as the user types or updates the textarea content.`,
    },
    OnBlur: {
      action: "onBlur",
      description: `The onBlur event for a textarea is triggered when the textarea loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the textarea`,
      table: {
        category: "Events",
      },
    },
    MinimumLength: {
      control: {
        type: "number",
        min: 1,
      },
      type: { name: "number" },
      table: { category: "Textarea Tools" },
      description: `The "MinimumLength" property allows users to set a numeric value that defines the minimum number of characters required in a textarea. This ensures that the user must enter at least the specified number of characters before the input is considered valid.`,
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

    Name: {
      control: "text",
      type: { name: "string" },
      table: {
        disable: true, // Hide from docs
      },
      description:
        "The Name property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging.",
    },

    TextAreaDisable: {
      control: "boolean",
      table: {
        disable: true,
      },
      description: `The "TextAreaDisable" property is a boolean that controls whether the textarea is interactive. When set to true, the textarea becomes disabled, preventing user input; when false, it remains editable.`,
    },
    AlertPassiveMessage: {
      control: "boolean",
      description: `The "AlertPassiveMessage" is a boolean property that controls the display of a passive alert or notification message. When set to true, the message is shown to provide non-intrusive feedback; when false, no message is displayed.`,
      table: { category: "Required/Validation" },
    },
    TextAreaId: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
    },
    AiControlPopup: {
      table: { category: "AiControls" },
      control: "boolean",
      description: `Controls the visibility of the AI-related popup, enabling or disabling it based on the boolean value. When set to true, the popup will be displayed, allowing users to interact with AI-generated content. When set to false, the popup will be hidden, preventing any AI interactions from appearing on the screen`,
      table: { category: "AI Control" },
    },
    ReviewPopup: {
      table: { category: "AiControls" },
      control: "boolean",
      description: `Controls the display of the AI popup in the review process. When set to true, the AI popup will open regardless of whether the input is filled or not, allowing users to interact with or review AI-generated content. When set to false, the AI popup remains closed, even if there is input or content to review.`,
      table: { category: "AI Control" },
    },
    

    // AiControl code start
    RawData: {
      table: { category: "AI Control" },
      control: { type: "object" },
      description:
        "The RawData property enables users to pass JSON data directly into the AI component for display and processing. This allows for dynamic content rendering, providing structured data for the AI to interpret and present.",
      if: { arg: "AiControlPopup", eq: true },
    },
    ToneMetadata: {
      table: { category: "AI Control" },
      description:
        "The ToneMetadata property allows users to input JSON data defining tone metadata, which specifies the desired tone or mood for content. This helps the AI component interpret and adjust the response style accordingly, enhancing communication relevance.",
      if: { arg: "AiControlPopup", eq: true },
    },

    OnClickClose: {
      table: { category: "AiControls /Events" },
      action: "clicked",
      description:
        "The OnClickClose event triggers an action when a user clicks to close a popup or modal, allowing for custom behavior upon closure. This event is useful for managing cleanup, saving state, or initiating follow-up actions as needed.",
      if: { arg: "AiControlPopup", eq: true },
    },

    OnClickUseThisText: {
      table: { category: "AiControls /Events" },
      action: "clicked",
      description:
        'The OnClickUseThisText event activates when a user selects a "Use This Text" option, applying or inserting the chosen text. This event streamlines text selection processes, enabling quick content updates or input insertion.',
      if: { arg: "AiControlPopup", eq: true },
    },

    OnChangeTone: {
      table: { category: "AiControls /Events" },
      action: "clicked",
      description:
        "The OnChangeTone event triggers when a user selects a different tone, allowing dynamic adjustments to content style. This event helps adapt responses or text to match the selected tone, enhancing customization and user engagement.",
      if: { arg: "AiControlPopup", eq: true },
    },

    OnChangeRange: {
      table: { category: "AiControls /Events" },
      action: "clicked",
      description:
        "The OnChangeRange event activates when a user adjusts a range value, such as a slider, updating the displayed or applied range dynamically. This event enables real-time feedback and control over settings within specified limits.",
      if: { arg: "AiControlPopup", eq: true },
    },

    OnClickPrevious: {
      table: { category: "AiControls /Events" },
      action: "clicked",
      description:
        'The OnClickPrevious event triggers when a user clicks a "Previous" button, navigating to the prior screen or content. This event supports seamless backward navigation in multi-step processes or paginated views.',
      if: { arg: "AiControlPopup", eq: true },
    },

    OnClickNext: {
      table: { category: "AiControls /Events" },
      action: "clicked",
      description:
        'The OnClickNext event activates when a user clicks a "Next" button, moving them to the following screen or content. This event facilitates smooth forward navigation in sequences or multi-step workflows.',
      if: { arg: "AiControlPopup", eq: true },
    },
    OnClickCancle: {
      action: "clicked",
      description:
        "The OnClickCancle event triggers an action when a user clicks to close a popup or modal, allowing for custom behavior upon closure. This event is useful for managing cleanup, saving state, or initiating follow-up actions as needed.",
      table: { category: "AiControls /Events" },
      if: { arg: "AiControlPopup", eq: true },
    },
    AsyncClickEvent: {
      control: 'boolean',
      description: `Indicates if AiClickEvent is an asynchronous function.Use this prop only if the DialogShowHide prop's value is variable(changing throughout the component life cycle). `,
      defaultValue: false,
      table: { category: "AI Control" },
    },
    CharacterCountEnable: {
      control: "boolean",
      description:
        "The CharacterCountEnable property allows users to enable or disable character count functionality for a textarea by setting it to true or false. When true, it displays a live character count, helping users track input length.",
        table: { category: "Textarea Tools" },
    },

    DialogShowHide: {
      control: "boolean",
      description: "",
      if: { arg: "AiControlPopup", eq: true },
      table: { category: "AI Control" },
    },
    ReviewSection:{
      control: "boolean",
      description:`The "Review" section property is a boolean that enables and allows the use of child components for the AI pop-up in the textarea. boolean`,
      table: { category: "AI Control" },
    },
    ReviewSectionBody: {
      control:{type:"any"},
      description:
      "The ReviewSectionBody property allows users to add child elements to display comprehensive content within the center of a popup. This structure enables a detailed, organized presentation of information in a focused view.",
      if: { arg: 'ReviewSection', eq: true },
      table: { category: "AI Control" },
    },
    EmojiButton: {
      control: "boolean",
      description: "The EmojiButton property enables or disables the emoji picker button in the textarea. When enabled, users can access and insert emojis into their text content.",
      table: { category: "SmilyTextarea" },
    },
    CrossButton: {
      control: "boolean",
      description: "The CrossButton property controls the visibility of a clear/reset button. When enabled, users can quickly clear the textarea content with a single click.",
      table: { category: "SmilyTextarea" },
    },
    TickButton: {
      control: "boolean",
      description: "The RightButton property toggles the visibility of an action button positioned on the right side of the textarea. This button can be used for custom actions or submissions.",
      table: { category: "SmilyTextarea" },
    },
    OnEmojiClick: {
      action: "clicked",
      description: "The OnEmojiClick event triggers when a user clicks an emoji in the emoji picker. This event allows for custom actions or functions to be executed when an emoji is selected.",
      table: {category: 'Events'}
    },
    OnCrossClick: { 
      action: "clicked",
      description: "The OnCrossClick event triggers when a user clicks the cross button in the It provides two parameters: the event and the selected item from the list.. This event allows for custom actions or functions to be executed when the cross button is clicked.",
      table: {category: 'Events'}
    },
    OnTickClick: {
      action: "clicked",
      description: "The OnTickClick event triggers when a user clicks the tick button in the TextArea. It provides two parameters: the event and the selected item from the list.This event allows for custom actions or functions to be executed when the tick button is clicked.",
      table: {category: 'Events'}
    },

    CharacterCountEnableForAi: {
      control: "boolean",
      description: "The CharacterCountEnableForAi property enables or disables the character count display specifically for AI-generated content. When enabled, it shows a live character count for AI responses, helping track the length of generated text.",
      table: { category: "AI Control" },
    },

    MaximumLengthForAi: {
      control: {
        type: "number",
        min: 1,
      },
      type: { name: "number" },
      table: { category: "AI Control" },
      description: "The MaximumLengthForAi property sets a character limit specifically for AI-generated content. This ensures AI responses don't exceed the specified length, helping maintain concise and focused generated text.",
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

    AutoFocus:{
      control:"boolean",
      description:`The "AutoFocus" property is a boolean that controls whether an input field automatically receives focus when the page loads.`,
      table: { category: "Textarea Tools" },
    },
    IsHtml: {
      control: "boolean",
      description: `The "IsHtml" property is a boolean that indicates whether the content of the textarea should be treated as HTML. When set to true, the textarea will interpret and render HTML tags within its content; when false, it will treat the content as plain text.`,
      table: { category: "Textarea Tools" },
    },
    ShowRequiredFieldMark: {
      control: "boolean",
      table: {
        type: { summary: "Boolean" },
        category: "Required/Validation"
      },
      description: `The ShowRequiredFieldMark property lets users toggle a red star indicator for required fields by setting it to true or false. When true, the red mark is displayed, visually signaling mandatory fields in the component`,
    },
    AutoHeight: {
      control: "boolean",
      description: `The "AutoHeight" property enables the textarea to automatically adjust its height based on the content. 
  When set to true, the component expands or contracts to fit the entered text, improving usability and layout flexibility.`,
      table: { category: "Textarea Tools" },
    },
    AiPopupSetValue: {
      control: { type: "object" },
      description: `The AiPopupSetValue property allows you to pre-populate the AI popup with a specific object containing tone, range, rangeLabel, description, and index. When provided, the AI popup will use these values as its initial state when opened, enabling the user to resume editing from their last selection or a saved state.`,
      table: { category: "AI Control" },
    },


  },
  decorators: [
    (Story, context) => {
      const { MinimumLength, MaximumLength } = context.args;
      if (MinimumLength && MaximumLength && MinimumLength > MaximumLength) {
        context.args.MinimumLength = MaximumLength;
      }
      return <Story {...context} />;
    },
  ],
};

export const Default = {
  args: {

    LabelText: "Title:",
    PlaceHolder: "Type here...",
    TextAreaId: "",
    AsyncClickEvent: true,
    CharacterCountEnable: false,
    TextareaVariant: "Default",
    SetValue: "",
    VagaroToolkit: 1,
    NativeAction: 13,
    CloseBackTitle: "From Control",
    Footer: 2,
    TimerCount: 0,
    FullLength: false,
    AiControlPopup: false,
    ReviewPopup: false,
    AiControlId: "AiControlId",
    DialogShowHide: true,
    MaximumLength: 1500,
    CharacterCountEnableForAi: true,
    MaximumLengthForAi: 1500,
    RawData: RawData,
    ToneMetadata: toneOptions,
    EmojiButton: false,
    CrossButton: false,
    TickButton: false,
    Name: "",
    ReviewSection: false,
    ReviewSectionBody:()=><div></div>,
    OnEmojiClick: (e) => { },
    OnCrossClick: (e) => { },
    OnTickClick: (e, inputValue) => {console.log(e, inputValue, "tick") },
    OnClickCancle: () => { },
    OnClickClose: () => { },
    OnClickUseThisText: () => { },
    OnChangeTone: () => { },
    OnChangeRange: () => { },
    OnClickPrevious: () => { },
    OnClickNext: () => { },
    OnClickRegenerate: () => { },
    onChange: () => { },
    AiClickEvent: () => { },
    IsHtml: false,
    AutoHeight: false,
    
    AiPopupSetValue: {
      Index: 0,
      InputDescription:"I am salon professional Sagar Battul",
      Tone: "professional",
      Range: 0,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Its default Textarea that help to add multiple text",
      },
    },
  },
};

export const Error_validation = {
  args: {
    CharacterCountEnable: false,
    TextareaVariant: "Default",
    AsyncClickEvent: true,
    Error: true,
    TextAreaId: "",
    Name: "",
    SetValue: "",
    AutoHeight: false
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error validation for textboxes ensures that user input meets required conditions, like required fields, length, or specific formats",
      },
    },
  },
};

export const Disabled = {
  args: {
    TextareaVariant: "Default",
    TextAreaDisable: true,
    TextAreaId: "",
    AsyncClickEvent: true,
    SetValue: "",
    AutoHeight: false
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabling a field prevents users from interacting with or modifying its content while keeping it visible on the form. Disabled fields do not get submitted with the form data.",
      },
    },
  },
};

export const Focus = {
  args: {
    CharacterCountEnable: false,
    TextareaVariant: "Default",
    FocusBorder: true,
    TextAreaId: "",
    AsyncClickEvent: true,
    Name: "",
    SetValue: '',
    AutoHeight: false
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabling a field prevents users from interacting with or modifying its content while keeping it visible on the form. Disabled fields do not get submitted with the form data.",
      },
    },
  },
};
