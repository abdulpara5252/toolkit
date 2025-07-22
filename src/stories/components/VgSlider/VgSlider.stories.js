import VgSlider from "../../../components/VgSlider/VgSlider";

export default {
  title: "Slider",
  component: VgSlider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Segments is a UI component that displays multiple tabs, allowing users to switch between them by tapping. Each tab represents a different view or section, loading unique content when selected.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Title: {
      control: "text",
      description:
        "The title property in a Slider component allows users to set a custom label for the slider, providing context or instructions for its use. This enhances user experience by clearly indicating the purpose of the slider.",
    },
    Description: {
      control: "text",
      description:
        "The description property in a Slider component provides additional context or instructions for the slider's use. This enhances user experience by clearly indicating the purpose of the slider and guiding users on how to interact with it.",
    },
    Min: {
      control: "number",
      description:
        "The min property in a Slider component sets the minimum value that the slider can represent. This ensures that users cannot select a value lower than this specified limit, providing a clear range for interaction.",
    },
    Max: {
      control: "number",
      description:
        "The max property in a Slider component sets the maximum value that the slider can represent. This ensures that users cannot select a value higher than this specified limit, providing a clear range for interaction.",
    },
    DefaultValue: {
      control: "number",
      description:
        "The defaultValue property in a Slider component sets the initial value of the slider when it first renders. This allows developers to define a starting point for user interaction, ensuring that the slider is positioned correctly within its defined range.",
    },
    OnChange: {
      action: "changed",
      table: {
        category: "Events",
      },
      description:
        "The onChange property triggers an event when the slider value changes, allowing developers to handle user interactions and update the application state accordingly.",
    },
  },
};

export const Default = {
  args: {
    Title: "Calendar Line Spacing",
    Description:
      "This is the amount of space between time slots on your calendar.",
    Min: 0,
    Max: 100,
    DefaultValue: 27,
    OnChange: () => {}
  },
};
