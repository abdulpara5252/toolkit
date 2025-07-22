import VgAvatar from "../../../components/VgAvatar/VgAvatar";

export default {
  title: "Avatar",
  component: VgAvatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Avatars are images used to represent an individual or business in Vagaro.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    ProfileUrl: {
      control: { type: "text" },
      description:
        "The ProfileUrl field allows users to specify an image URL for product variants using HTTP links. It can be utilized to dynamically display images for different product options in an e-commerce application. For eg: https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg",
    },
    NoProfile: {
      control: { type: "text" },
      description: `The NoProfile field serves as a fallback mechanism, displaying the initial character of the input text if the image fails to load. This ensures that a visual placeholder, like the first letter of the variant name, appears in the component when the image is unavailable.`,
    },

    AvatarSize: {
      control: { type: "radio" },
      options: ["X-Small","Small", "Medium", "Large"],
      description: `The AvatarSize property allows users to choose from different size options for the avatar, including X-Small, Small, Medium and Large. This ensures flexibility in displaying the avatar at various dimensions based on the design needs.`,
    },
  },
};

export const Default = {
  args: {
    ProfileUrl:
      "",
    NoProfile: "Daniel klein",
    AvatarSize: "Large",
  },
};
