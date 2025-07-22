import VgReviewRating from "../../../components/VgReviewRating/VgReviewRating";

export default {
  title: "Review Rating",
  component: VgReviewRating,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    SetRating: {
        control: {
            type: "number",
            max: 5,
            min: 1,
          },
        description: `The SetRating property allows users to input and edit a custom value for the rating. This field is intended for users to input and update the content of the rating.`,
        transform: (value) => {
            if (value > 5 || value < 1 ) {
              return 1;
            }
            return value;
          },
    },
    RatingSize: {
        control: { type: "select" },
        options: ["Small", "Medium", "Large"],
        description: `The RatingSize property allows users to choose from different size options for the avatar, including X-Small, Small, Medium, Large, and X-Large. This ensures flexibility in displaying the avatar at various dimensions based on the design needs.`,
      },
      OnClick: {
        action: "clicked",
        table: {
          category: "Events",
        },
        description: `The "Button Click" property handles the action triggered when the button is pressed. It defines the specific function or event that will be executed upon the user interacting with the button, enabling various behaviors such as navigation or form submission.`,
      },
      ReadOnly:{
        control: { type: "boolean" },
        description: `The ReadOnly property allows users to set the rating as read-only, preventing any changes to the rating value. This is useful in scenarios where the rating should be displayed without allowing user modifications.`,
      }
  },
};

export const Default = {
  args: {
    SetRating: 0,
    RatingSize: 'Medium',
    OnClick: (e, val) => {},
    ReadOnly: false,
  },
};
