import VgTooltip from "../../../components/VgTooltip/VgTooltip";

export default {
  title: "Tooltip",
  component: VgTooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltips are helpful indicators that display contextual information to the user on hover or focus. Use a Bottom Sheet for the mobile version.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    TooltipText: {
      description: `The "Tooltip Text" property allows users to input custom text that will be displayed when the tooltip is triggered by hover, click, or focus.`,
    },
    ScreenTitleForMobile: {
      description: `The Tooltip Screen Title for Mobile is required when displaying the tooltip in a mobile environment. In this case, the tooltip appears as a bottom sheet, and this property defines the title shown at the top of the bottom sheet. It helps provide context to the user about the tooltip content.`,
    },
    Children: {
      description: "The Children property allows developers to assign a child object, enabling tooltips to be displayed dynamically from its content. This enhances flexibility in linking contextual information to specific UI elements.",
      control: { type: "text" },
    },
    Html: {
      control: "boolean",
      description: "Set to true to render HTML content within the tooltip. When false, the text is rendered as plain text.",
      defaultValue: true,
    },
    TextAlign: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: `The "TextAlign" property controls the alignment of the tooltip text, allowing users to set it as left, center, or right aligned.`,
    },
    BeakPoint: {
      control: 'select',
      options: ['Up', 'Down'],
      description: 'The "BeakPoint" property of the Tooltip controls its position, such as placing it Up or Down.',
    },
    BeakPosition: {
      control: 'select',
      options: ['Left', 'Middle', 'Right'],
      description: 'The "BeakPosition" property for the Tooltip determines the position of the info tooltip message, allowing it to be set to Left, Right, or Middle.',
    },
  },
};

export const Tooltip = {
  args:{
    TooltipText:"<div>This is a tooltip message.</div>",
    Html:false,
    ScreenTitleForMobile:"",
    Children:<div className="vg-tooltiptext">Tooltip</div>,
    TextAlign:"right",
    BeakPoint:"Up",
    BeakPosition:"Middle"
  },
};


