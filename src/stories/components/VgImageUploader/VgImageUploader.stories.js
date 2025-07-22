import VgImageUploader from "../../../components/VgImageUploader/VgImageUploader";

export default {
  title: "Image Uploader",
  component: VgImageUploader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An Image Uploader allows users to upload images in either square or rectangular dimensions, often with cropping or resizing options to ensure the correct aspect ratio. It is commonly used in applications requiring profile pictures, product images, or gallery uploads with predefined size constraints.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    MaxFileSize: {
      control: "number",
      description:
        "The MaxFileSize property defines the maximum allowable file size, in megabytes (MB), for an image upload control. This helps ensure that users cannot upload images larger than the specified size, improving performance and preventing oversized file uploads.",
    },
    SupportedFileFormate: {
      control: "array",
      description:
        "The SupportedFileFormats property accepts an array of file formats that the user specifies, allowing only those file types to be uploaded. This ensures that users can only upload files in approved formats, such as JPEG, PNG, or PDF, providing better control over file validation.",
    },
    Disabled: {
      control: "boolean",
      description:
        "The Disable property is a boolean that determines whether a component is interactive or not. When set to true, the component becomes non-functional and visually indicates that it is inactive, preventing any user actions.",
    },
    Editor: {
      control: "boolean",
      description:
        "Flag to indicate whether the image editor (like Filerobot) is enabled for editing the uploaded image.",
    },
    ImagePosition: {
      control: { type: "radio" },
      type: { name: "radio" },
      options: ["External", "Internal"],
      description: `External:- This property allows users to upload a new image and view it in the new container and the multiple image uploader, images overlap with a specific count.
      Internal:- This feature allows users to upload images same container and the multiple image uploader, images are appended side by side.`,
    },
    ImageUploaderId: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
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
    MaxFilePopupText: {
      control: "text",  
      type: { name: "string" },
      description:
        "The MaxFilePopupText property is used to specify the text that appears in a popup when a user attempts to upload a file that exceeds the maximum file size limit. This provides clear feedback to users about the file size restriction.",
      
    },
    OnChange: {
      action: "onChange",
      description:
        "The OnChange event handler is triggered when the value of an input element changes. It is commonly used to capture user input data, validate form fields, or trigger actions based on user interactions.",
      table: {
        category: "Events",
      },
    },
    FileCount: {
      description:
        "The FileCount property allows user to specify the maximum number of files that can be uploaded.",
    },
    ImageUploader: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "Enables the image uploader functionality. When true, users can upload images.",
    },
    ImageUrl: {
      control: "text",
      type: { name: "string" },
      description:
        "The ImageUrl property is used to specify the URL of an image that can be displayed or uploaded. It allows users to provide a link to an image resource, enabling the component to fetch and display the image from the specified URL.",
      
    },
    AllowMultipleUpload: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The AllowMultipleUpload property is a boolean that determines whether users can upload multiple files at once. When set to true, it enables the selection and upload of multiple files simultaneously, enhancing user convenience.",
    },
  },
};

export const ImageUploader = {
  args: {
    ImagePosition: "External",
    MaxFileSize: 4,
    SupportedFileFormate: [
      "image/jpeg",
      "image/png",
      "image/heic",
      "image/jpg",
    ],
    Disabled: false,
    ImageUploaderId: "",
    Editor: true,
    Name: "",
    FileCount: 1,
    OnChange: () => {},
    ImageUploader: false,
    ImageUrl: "",
    MaxFilePopupText: "Invalid Image Size",
    AllowMultipleUpload: false,
  },
};
