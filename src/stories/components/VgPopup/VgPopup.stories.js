import VgPopup from "../../../components/VgPopup/VgPopup";
import VagaroDeviceConnetImage from '../../assets/VagaroDeviceConnetImage.png'

export default {
  title: "Popup",
  component: VgPopup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Popup UI where title and description are available along with Button",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {

    PopupTitle: {
      control: { type: "text" },
      description:
        "The PopupTitle allows users to input a custom title for a popup window. This title appears at the top of the popup, helping identify its purpose or content.",
    },
    PopupSubTitle: {
      control: { type: "text" },
      description:
        "The PopupSubTitle allows users to input a custom subtitle for a popup window. This subtitle appears below the main title and provides additional context or information about the popup's purpose or content.",
    },
    EnableBody: {
      control: { type: "boolean" },
      description:
        "The EnableBody property allows users to toggle between displaying HTML content or plain text in a popup. Setting it to true enables rich HTML formatting, while false limits the content to simple text for a cleaner display.",
    },
    
    PopupBody: {
      control:{type:"any"},
      description:
      "The PopupBody property allows users to add child elements to display comprehensive content within the center of a popup. This structure enables a detailed, organized presentation of information in a focused view.",
      if: { arg: 'EnableBody', eq: true },
    },
    TextDescription:{
      description:"The TextDescription property allows users to input a description for the popup, providing additional context or details. This enhances the popup's content, ensuring clarity and better user understanding.",
      if: { arg: 'EnableBody', eq: false },
    },
    Popupopen: {
      control:{type:"boolean"},
      description:
        "The PopupOpen property lets developers set the initial visibility of a popup, toggling it open or closed based on a true or false value. This control enhances user experience by determining if the popup appears automatically or awaits user interaction.",
    },
    ButtonPrimary: {
      control: { type: "text" },
      description:
        "The Child property allows dynamic content to be displayed on the button, enabling the button's label to be customized. Users can pass any text or element as a child, which will be rendered as the button's content.",
    },
    PrimaryButtonVariant: {
      control: { type: "text" },
      description:
        "The PrimaryButtonVariant property allows users to select between primary, secondary, and tertiary button styles for the primaray button in a popup.",
    },
    ButtonSecondary: {
      control: { type: "text" },
      description:
        "The Child property allows dynamic content to be displayed on the button, enabling the button's label to be customized. Users can pass any text or element as a child, which will be rendered as the button's content.",
    },
    SecondaryButtonVariant: {
      control: { type: "text" },
      description:
        "The SecondaryButtonVariant property allows users to select between primary, secondary, and tertiary button styles for the secondary button in a popup.",
    },
    ButtonThird: {
      control: { type: "text" },
      description:
        "The Child property allows dynamic content to be displayed on the button, enabling the button's label to be customized. Users can pass any text or element as a child, which will be rendered as the button's content.",
    },
    ThirdButtonVariant: {
      control: { type: "text" },
      description:
        "The ThirdButtonVariant property allows users to select between primary, secondary, and tertiary button styles for the third button in a popup.",
    },
    FormValid:  {
      control: { type: "boolean" },
      description:
        "The FormValid property indicates whether a form is valid or not. This property is used to display appropriate error messages or enable or disable form submission based on the validation state.",
    },
    FormValidation: {
      if: { arg: 'FormValid', eq: true },
    },
    Size: {
      control: { type: "radio" },
      options: ["small", "medium", "large", "extralarge","full-body-popup"],
      description:
        "The 'Size' property allows users to select between small, medium, large, and extra-large sizes for a popup.",
    },
    CloseButton: {
      control: { type: "boolean" },
      description:
        "The CloseButton property controls the visibility of the close button in a popup or modal.",
    },
    CloseOnOutsideClick: {
      control: { type: "boolean" },
      description:
        "The CloseOnOutsideClick option allows the popup to automatically close when the user clicks outside of it.",
    },
    FooterButton: {
      control: { type: "radio" },
      options: ["none", "primaryButton", "secondaryButton" , "thirdButton", "both"],
      description:
        "The FooterButton setting allows users to choose how buttons are displayed in the footer of the popup.",
    },
    OnClickPrimary: {
      action: "clicked",
      description: "Triggers when the primary button is clicked.",
      table: {
        category: "Events",
      },
    },
    OnClickThird: {
      action: "clicked",
      description: "Triggers when the Third button is clicked.",
      table: {
        category: "Events",
      },
    },
    OnClickSecondary: {
      action: "clicked",
      description: "Triggers when the secondary button is clicked.",
      table: {
        category: "Events",
      },
    },
    onClose: {
      action: "clicked",
      description: "Triggers when the close icon, primary button or secondary button is clicked.",
      table: {
        category: "Events",
      },
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
    IsFullLength: {
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
    PopupId: { table: { disable: true }, control: "string" },
    customClassName: {
      control: { type: "text" },
      table:{
        disable: true
      }
    },
    CheckboxVisible: {
      control: { type: "boolean" },
    },
    MobileView:{
      control: { type: "boolean" },
    },
    FooterLeft : {
      control : {
        type : "boolean"
      }
    },
    FooterLeftBody : {
      control:{type:"any"},
      if: { arg: 'FooterLeft', eq: true },
    },
    TitleIsShow: {
      control: { type: "boolean" },
      description:
        "The TitleIsShow property toggles the visibility of the popup's header section. When true, it displays the title and subtitle; when false, it hides them entirely.",
    },

    PopupImage: {
      control: {type: "text"},
      description:
        "The PopupImage property allows users to render a full-width image at the top of the popup. It accepts a ReactNode such as an <img> element or component.",
    },

    DescriptionType: {
      control: { type: "radio" },
      options: ["plain", "bullet", "number"],
      description:
        "The DescriptionType property defines how the TextDescription content is formatted — as plain paragraphs, bullet points, or a numbered list.",
    },

    FullWidthButtons: {
      control: { type: "boolean" },
      description:
        "The FullWidthButtons property controls the width behavior of the footer buttons. When true, buttons stretch to full width; otherwise, they take up auto width.",
    },

    BottomSheet: {
      control: { type: "boolean" },
      description: "If true, shows the popup as a bottom sheet with slide-up animation; otherwise, uses default popup style."
    },
    PopupType: {
      control: { type: "radio" },
      options: ["default", "custom", "premium"],
      description: "Defines the layout style of the popup (default/custom/premium)."
    },
    IsCallBack: {
      control: { type: "boolean" },
      description:
        "If true (default), enables mobile callback logic in the popup. Set to false to disable callback behavior.",
    },
  },
};

export const Popup = (args) => {
  const { FooterButton } = args;

  const getFooterButtonsProps = () => {
    if (FooterButton === "both") {
      return {
        OnClickPrimary: args.OnClickPrimary,
        OnClickSecondary: args.OnClickSecondary,
      };
    } else if (FooterButton === "primaryButton") {
      return {
        OnClickPrimary: args.OnClickPrimary,
      };
    } else if (FooterButton === "secondaryButton") {
      return {
        OnClickSecondary: args.OnClickSecondary,
      }; 
    } else if (FooterButton === "thirdButton") {
      return {
        OnClickPrimary: args.OnClickPrimary,
        OnClickSecondary: args.OnClickSecondary,
        OnClickThird: args.OnClickThird,
      };
    }
    return {};
  };

  return (
    <VgPopup
      PopupType={args.PopupType}
      PopupId="PopupId"
      CloseButton={args.CloseButton}
      PopupBody={args.PopupBody}
      // Children={args.Children}
      PopupTitle={args.PopupTitle}
      PopupSubTitle={args.PopupSubTitle}
      Size={args.Size}
      SecondaryButtonVariant={args.SecondaryButtonVariant}
      PrimaryButtonVariant = {args.PrimaryButtonVariant}
      ThirdButtonVariant = {args.ThirdButtonVariant}
      VagaroToolkit={args.VagaroToolkit}
      FooterButton={FooterButton}
      CloseOnOutsideClick={args.CloseOnOutsideClick}
      CheckboxVisible={args.CheckboxVisible}
      NativeAction={args.NativeActionVal}
      Footer={args.Footer}
      TimerCount={args.TimerCount}
      IsFullLength={args.IsFullLength}
      CloseBackTitle={args.CloseBackTitle}
      ButtonPrimary={args.ButtonPrimary}
      ButtonSecondary={args.ButtonSecondary}
      ButtonThird={args.ButtonThird}
      FormValid={args.FormValid}
      FormValidation={args.FormValidation}
      Popupopen={args.Popupopen}
      onClose={args.onClose}
      EnableBody={args.EnableBody}
      TextDescription={args.TextDescription}
      customClassName={args.customClassName}
      MobileView={args.MobileView}
      FooterLeft={args.FooterLeft}
      FooterLeftBody={args.FooterLeftBody}
      BottomSheet={args.BottomSheet}
      {...getFooterButtonsProps()}
      IsCallBack={args.IsCallBack}
    />
  );
};

Popup.args = {
  PopupType: "default",
  PopupTitle: "Popup Title Content Here",
  PopupSubTitle: "Popup Sub Title Content Here",
  Popupopen:true,
  EnableBody:false,
  TextDescription:"A modal message goes here. The modal message should be descriptive and provide context as to what actions are taking place and display any relevant settings to configure.",
  PopupBody:()=><div>Popup Body</div>,
  FooterButton: "both",
  CloseButton: true,
  Size: "small",
  CloseOnOutsideClick: false,
  VagaroToolkit: 1,
  NativeAction: 13,
  CloseBackTitle: "From Control",
  Footer: 2,
  TimerCount: 0,
  IsFullLength: false,
  ButtonPrimary: "Primary",
  PrimaryButtonVariant: "primary",
  ButtonSecondary: "Secondary",
  SecondaryButtonVariant: "secondary",
  ButtonThird: "Back",
  ThirdButtonVariant: "primary",
  onClose:()=>{},
  OnClickPrimary: () => {},
  OnClickSecondary: () => {},
  OnClickThird: () => {},
  customClassName: "",
  CheckboxVisible: false,
  MobileView: false,
  FooterLeft: false,
  FooterLeftBody : ()=> {},
  BottomSheet: false,
  IsCallBack: true,
};

Popup.parameters = {
  controls: {
    include: [
      "PopupType",
      "PopupTitle",
      "PopupSubTitle",
      "Popupopen",
      "EnableBody",
      "TextDescription",
      "FooterButton",
      "CloseButton",
      "Size",
      "CloseOnOutsideClick",
      "ButtonPrimary",
      "PrimaryButtonVariant",
      "ButtonSecondary",
      "SecondaryButtonVariant",
      "ButtonThird",
      "ThirdButtonVariant",
      "CheckboxVisible",
      "MobileView",
      "FooterLeft",
      "BottomSheet",
      "FormValid",
      "onClose",
      "OnClickPrimary",
      "OnClickSecondary",
      "OnClickThird",
      "IsCallBack",
    ],
  },
};

export const CustomPopup = {
  args: {
    PopupType: "custom",
    Popupopen: false,
    CloseButton: true,
    EnableBody: true,
    PopupBody: () => (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Custom Popup Body Only</h2>
      </div>
    ),
    onClose: () => {},
    IsCallBack: true,
  },
  parameters: {
    docs: {
      description:{
        story:'This is the Custom Popup that will open when triggered by a button.',
      },
    },
    controls: {
      include: [
        "PopupType",
        "Popupopen",
        "CloseButton",
        "PopupBody",
        "EnableBody",
        "CloseOnOutsideClick",
        "onClose",
        "MobileView",
        "IsCallBack",
      ],
    },
  },
};

export const PremiumPopup = (args) => {
  const { FooterButton } = args;

  const getFooterButtonsProps = () => {
    if (FooterButton === "both") {
      return {
        OnClickPrimary: args.OnClickPrimary,
        OnClickSecondary: args.OnClickSecondary,
      };
    } else if (FooterButton === "primaryButton") {
      return {
        OnClickPrimary: args.OnClickPrimary,
      };
    } else if (FooterButton === "secondaryButton") {
      return {
        OnClickSecondary: args.OnClickSecondary,
      };
    } else if (FooterButton === "thirdButton") {
      return {
        OnClickPrimary: args.OnClickPrimary,
        OnClickSecondary: args.OnClickSecondary,
        OnClickThird: args.OnClickThird,
      };
    }
    return {};
  };

  return (
    <VgPopup
      PopupType={args.PopupType}
      PopupId="PremiumPopupId"
      CloseButton={args.CloseButton}
      CloseOnOutsideClick={args.CloseOnOutsideClick}
      PopupTitle={args.PopupTitle}
      PopupSubTitle={args.PopupSubTitle}
      PopupImage={args.PopupImage}
      TitleIsShow={args.TitleIsShow}
      DescriptionType={args.DescriptionType}
      FullWidthButtons={args.FullWidthButtons}
      TextDescription={args.TextDescription}
      FooterButton={args.FooterButton}
      SecondaryButtonVariant={args.SecondaryButtonVariant}
      PrimaryButtonVariant = {args.PrimaryButtonVariant}
      ThirdButtonVariant = {args.ThirdButtonVariant}
      ButtonPrimary={args.ButtonPrimary}
      ButtonSecondary={args.ButtonSecondary}
      ButtonThird={args.ButtonThird}
      Popupopen={args.Popupopen}
      onClose={args.onClose}
      IsCallBack={args.IsCallBack}
      {...getFooterButtonsProps()}
    />
  );
};

PremiumPopup.args = {
  PopupType: "premium",
  Popupopen: false,
  TitleIsShow: true,
  CloseButton: true,
  CloseOnOutsideClick: false,
  EnableBody:false,
  PopupImage: (VagaroDeviceConnetImage),
  PopupTitle: "Sell Gift Cards Online!",
  TextDescription: "Ready to boost revenue all year long? Launch your\n online store and start selling gift cards through Vagaro—fast and easy!",
  DescriptionType: "plain",
  FooterButton: "both",
  ButtonPrimary: "Get Started",
  ButtonSecondary: "Maybe Later",
  ButtonThird: "Back",
  FullWidthButtons: true,
  PrimaryButtonVariant: "primary",
  SecondaryButtonVariant: "secondary",
  ThirdButtonVariant: "primary",
  OnClickPrimary: () => {},
  OnClickSecondary: () => {},
  OnClickThird: () => {},
  onClose: () => {},
  IsCallBack: true,
};

PremiumPopup.parameters = {
  docs: {
    description: {
      story:
        'This is the Premium Popup with image, optional header, styled description, and full-width buttons.\n\n💡 Tip: To display multi-line content in the description, use "\\n" to break lines.\nSet `DescriptionType` to "bullet" or "number" to show lists.',
    },
  },
  controls: {
    include: [
      "PopupType",
      "Popupopen",
      "PopupId",
      "CloseButton",
      "CloseOnOutsideClick",
      "TitleIsShow",
      "PopupTitle",
      "PopupImage",
      "TextDescription",
      "DescriptionType",
      "FooterButton",
      "ButtonPrimary",
      "ButtonSecondary",
      "FullWidthButtons",
      "onClose",
      "OnClickPrimary",
      "OnClickSecondary",
      "IsCallBack"
    ],
  },
};

