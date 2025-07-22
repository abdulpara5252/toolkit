import VgSmileyInput from "../../../components/VgSmileyInput/VgSmileyInput"
const meta = {
    title: 'Smiley Input',
    component: VgSmileyInput,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Smiley Input will be used as the chat box',
            }
        }
    },
    tags: ['autodocs'],
    argTypes:{
        Placeholder: {
            type: 'string',
            description: 'The placeholder text that will be displayed when the input field is empty.'
        },
        SetValue: {
            control: "text",
            type: { name: "string" },
            description:
              "The SetValue property allows users to input and edit a custom value for the smiley input. This field is intended for users to input and update the content of the smiley input.",
            table: {
              disable: false,
            },
        },
        Name: {
            control: "text",
            type: { name: "string" },
            table: {
              disable: false, // Hide from docs
            },
            description:
              "The Name property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging.",
        },
        SmileyIcon:{
          control: "boolean",
          description: "The SmileyIcon property allows users to display an icon in the smiley input. This property is used to indicate the presence of an icon in the input field, which can be useful for providing visual feedback or indicating the type of input expected.",
        },
        OnBlur: {
            action: "onBlur",

            description: `The onBlur event for a smiley input is triggered when the smiley input loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the smiley input`,
            table: {
              category: "Events",
            },
          },
          OnChange: {
            action: "onChange",
            table: {
              category: "Events",
            },
            description: `The "OnChange" listener for a smiley input detects changes whenever the user modifies the text. This event allows developers to trigger specific actions or functions dynamically as the user types or updates the smiley input content.`,
          },
          OnKeyUp: {
            action: "onKeyup",
            table: {
              category: "Events",
            },
            description: `The "OnKeyUp" listener for a smiley input detects when a user releases a key while interacting with the input field. This event is triggered after the key is released, providing an opportunity to perform actions such as real-time validation, dynamic search, or updating the UI as the user types. It is commonly used for tracking user input as it happens, allowing for a more interactive experience.`,
          },
          OnFocus: {
            action: "onFocus",
            description: `The "OnFocus" event for a smiley input is triggered when the smiley input gains focus, typically when a user clicks or tabs into the field. This event can be used to highlight the field, fetch additional data, or provide user assistance.`,
            table: {
              category: "Events",
            },
          },
          OnEmojiClick: {
            table: {
                category: "Events",
            },
            action: "clicked",
            description: "The OnEmojiClick event triggers when a user clicks an emoji in the emoji picker. This event allows for custom actions or functions to be executed when an emoji is selected.",
          },
          OnSendButtonClick: {
            table: {
                category: "Events",
            },
            action: "clicked",
            description: "The OnSendButtonClick callback is triggered when the send button is clicked. It receives an event object (e) and the current input value (inputValue), allowing actions like sending messages, submitting data, or processing user input.",
          },
    }
}
export default meta

export const Default = {
  args: {
     Placeholder: "Type a message...",
     OnSendButtonClick:(e, value) => {
      console.log("Send button clicked", e, value);
     }
  },
};
