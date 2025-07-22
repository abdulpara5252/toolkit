import VgTextEditor from "../../../components/VgTextEditor/VgTextEditor"

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
  title: "Text Editor",
  component: VgTextEditor,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The TextFormatter component allows users to format text within a textarea, offering options like bold, italic, underline, and alignment. It enhances text editing by providing a rich set of formatting tools directly within the component."
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Title: {
      control: "text",
      type: { name: "string" },
      description: `The Title property allows users to enter a custom heading or label, which appears prominently in the interface. This enhances clarity, helping users understand the purpose or context of the displayed content.`,
    },
    Style: {
      control: "boolean",
      table: { disable: true }
    },
    ToolbarRawData: {
      control: 'array',
      description: `The Raw Data property allows users to input JSON specifying text formatting properties, such as bold, italic, and underline. This enables customized styling for text elements, enhancing visual emphasis and readability.`,
    },
    RawData: {
      control: { type: "object" },
      description: 'The RawData property enables users to pass JSON data directly into the AI component for display and processing. This allows for dynamic content rendering, providing structured data for the AI to interpret and present.',
    },
    SetValue: {
      control: "text",
      type: { name: "string" },
      description:
        "The SetValue property allows users to input and edit a custom value for the textbox. This field is intended for users to input and update the content of the textbox.",
    },
    MaximumLength: {
      control: {
        type: "number",
        min: 1,
      },
      type: { name: "number" },
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
    MaximumLengthForAi: {
      table: { category: "AiControls" },
      control: {
        type: "number",
        min: 1,
      },
      type: { name: "number" },
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
    PlaceHolder: {
      control: "text",
      type: { name: "string" },
      description: `The "Placeholder" property allows users to set temporary, instructional text inside a textarea, guiding what kind of input is expected. This text disappears once the user starts typing in the field.`,
    },
    // Ai Control Events
    AiControlPopup: {
      table: { category: "AiControls" },
      control: "boolean",
      description: `The OnClickPrevious event triggers when a user clicks a "Previous" button, navigating to the prior screen or content. This event supports seamless backward navigation in multi-step processes or paginated views.`,
    },

    ToneMetadata: {
      table: { category: "AiControls" },
      description: "The ToneMetadata property allows users to input JSON data defining tone metadata, which specifies the desired tone or mood for content. This helps the AI component interpret and adjust the response style accordingly, enhancing communication relevance.",
      if: { arg: 'AiControlPopup', eq: true }
    },
    OnChange: {
      action: "onChange",
      table: {
        category: "Events",
      },
      description: `The "OnChange" listener for a address control detects changes whenever the user modifies the text. This event allows developers to trigger specific actions or functions dynamically as the user types or updates the textbox content.`,
    },
    OnClickClose: {
      table: { category: "AiControlsEvents" },
      action: 'clicked',
      description: 'The OnClickClose event triggers an action when a user clicks to close a popup or modal, allowing for custom behavior upon closure. This event is useful for managing cleanup, saving state, or initiating follow-up actions as needed.',
      if: { arg: 'AiControlPopup', eq: true }
    },

    OnClickUseThisText: {
      table: { category: "AiControlsEvents" },
      action: 'clicked',
      description: 'The OnClickUseThisText event activates when a user selects a "Use This Text" option, applying or inserting the chosen text. This event streamlines text selection processes, enabling quick content updates or input insertion.',
      if: { arg: 'AiControlPopup', eq: true }
    },

    OnChangeTone: {
      table: { category: "AiControlsEvents" },
      action: 'clicked',
      description: 'The OnChangeTone event triggers when a user selects a different tone, allowing dynamic adjustments to content style. This event helps adapt responses or text to match the selected tone, enhancing customization and user engagement.',
      if: { arg: 'AiControlPopup', eq: true }
    },

    OnChangeRange: {
      table: { category: "AiControlsEvents" },
      action: 'clicked',
      description: 'The OnChangeRange event activates when a user adjusts a range value, such as a slider, updating the displayed or applied range dynamically. This event enables real-time feedback and control over settings within specified limits.',
      if: { arg: 'AiControlPopup', eq: true }
    },

    OnClickPrevious: {
      table: { category: "AiControlsEvents" },
      action: 'clicked',
      description: 'The OnClickPrevious event triggers when a user clicks a "Previous" button, navigating to the prior screen or content. This event supports seamless backward navigation in multi-step processes or paginated views.',
      if: { arg: 'AiControlPopup', eq: true }
    },

    OnClickNext: {
      table: { category: "AiControlsEvents" },
      action: 'clicked',
      description: 'The OnClickNext event activates when a user clicks a "Next" button, moving them to the following screen or content. This event facilitates smooth forward navigation in sequences or multi-step workflows.',
      if: { arg: 'AiControlPopup', eq: true }
    },

    OnClickCancle: {
      table: { category: "AiControlsEvents" },
      action: "clicked",
      description:
        "The OnClickCancle event triggers an action when a user clicks to close a popup or modal, allowing for custom behavior upon closure. This event is useful for managing cleanup, saving state, or initiating follow-up actions as needed.",
      if: { arg: "AiControlPopup", eq: true },
    },
   
   OnClickRegenerate: {
    table: { category: "AiControlsEvents" },
      action: 'clicked',
      if: { arg: 'AiControlPopup', eq: true }
    }
  }
}
export const TextEditor = {
  args: {
    Title: "Description:",
    PlaceHolder: "Enter description",
    Style: true,
    AiControlPopup: true,
    ToolbarRawData: {
      "Fontfamily": true,
      "Fontsize": true,
      "Fontcolor": true,
      "BackgroundColor": true,
      "Bold": true,
      "Italic": true,
      "Underline": true,
      "Link": true,
      "Alignment": true,
      "Strikethrough": true,
      "Clear": true,
      "InsertNames": true,
      "Undo": false,
      "Redo": false,
      "NumberListButton": true,
      "BulletListButton": true
    },
    ToneMetadata: toneOptions,
    RawData: RawData,
    SetValue: "",
    // MaximumLength: 10,
    // OnChange: () => {},
    OnClickCancle: () => {},
    OnClickClose: () => {},
    OnClickUseThisText: (e) => {},
    OnChangeTone: (e) => {},
    OnChangeRange: (e) => {},
    OnClickPrevious: (e) => {},
    OnClickNext: (e) => {;},
    OnClickRegenerate: (e) => {},
  }
};