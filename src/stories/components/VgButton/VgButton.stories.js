import VgButton from "../../../components/VgButton/VgButton";

let lastVariant = null;
let variantPropKeys = [
  "ButtonIcon",
  "IconPlacement",
  "children",
  "actionbutton",
  "IconList",
  "SocialButton",
  "PillTabData",
  "DropdownMenuOptions",
  "DropdownClick",
  "TextAlign",
  "ColorVariant",
  "Size"
];

const defaultPropsMap = {
  primary: { children: "Button", IconPlacement: "prefix" },
  secondary: { children: "Button", IconPlacement: "prefix" },
  destructive: { children: "Button", IconPlacement: "prefix" },
  ghost: { children: "Button", IconPlacement: "prefix" },
  close: { children: "", ButtonIcon: "" },
  selector: { children: "Button", ButtonIcon: "plus" },
  icon: { children: "", IconList: "heart" },
  theme: { children: "Button", IconPlacement: "prefix" },
  tutorial: { children: "Button" },
  action: { children: "", actionbutton: "vertical", ButtonIcon: "" },
  ai: { children: "Button" },
  AiWithIcon: { children: "Enhance with Vagaro AI" },
  Social: { children: "Continue with Facebook", SocialButton: "Facebook" },
  link: { children: "Copy Link", ButtonIcon: "link" },
  Red: { children: "Red" },
  Black: { children: "Connect", ButtonIcon: "connect" },
  Pill: { children: "Button", ButtonIcon: "plus", IconPlacement: "prefix" },
  Dropdown: { children: "Button", ButtonIcon: "dropdown", IconPlacement: "suffix" },
  DropdownMenu: {
    children: "Upload",
    ButtonIcon: "caret",
    IconPlacement: "suffix",
    DropdownMenuOptions: [
      { label: "Appointment File", value: "appointment" , imageUrl: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp" },
      { label: "Customer File", value: "customer" , imageUrl: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"},
    ],
    TextAlign: "left",
    ColorVariant: "primary",
  },
  PillTab: {
    MobileView: false,
    PillTabData: {
      LeftLabel: {
        id: "left",
        name: "Left Label",
        pillColor: "primary",
      },
      SquareLabel: [],
      RightLabel: {
        id: "right",
        name: "Right Label",
        pillColor: "primary",
      },
    },
  },
  RedGhost: { children: "Button", IconPlacement: "suffix" },
};

export default {
  title: "Button",
  component: VgButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Buttons are used to take immediate action and can include actions such as 'Add', 'Next', 'Save'.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    ButtonVariant: {
      options: [
        "primary",
        "secondary",
        "destructive",
        "ghost",
        "close",
        "selector",
        "icon",
        "theme",
        "tutorial",
        "action",
        "ai",
        "AiWithIcon",
        "Social",
        "link",
        // "ButtonDisabled",
        "Red",
        "Black",
        "Pill",
        "Dropdown",
        "DropdownMenu",
        "PillTab",
        "RedGhost",
      ],
      control: { type: "select" },
      description: `It shows the available button variant options, which are as follows:
- primary (default)
- secondary
- destructive
- ghost
- close
- selector
- icon
- theme
- tutorial
- action
- ai
- AiWithIcon
- Social
- link
- ButtonDisabled
- Pill
- Dropdown
- DropdownMenu
- PillTab
- RedGhost`,
    },
    SocialButton: {
      control: { type: "select" },
      options: ["Facebook", "Gplus", "Apple"],
      description: `The "isSocial" property allows the button to act as a dropdown for social media actions. The available options are:
- Facebook
- Gplus
- Apple`,
      if: { arg: "ButtonVariant", eq: "Social" },
    },
    actionbutton: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
      description: "Alignment of the three-dot button",
      if: { arg: "ButtonVariant", eq: "action" },
    },
    ButtonIcon: {
      control: { type: "select" },
      options: ["plus", "pencil", "map", "refund", "receipt", "link", "preview", 'download', 'filter', 'connect', 'dropdown', 'caret', 'video'],
      description: `The "Button Icon" property allows you to add an icon to the button, with available options such as plus, pencil, or camera. These icons can visually indicate the button's purpose, such as adding (plus), editing (pencil), or capturing a photo (camera). `,
    },
    // onClick: {
    //   action: "clicked",
    //   table: { category: "Events", disable: true },
    //   description: "Handler triggered when the button is clicked.",
    // },
    IconPlacement: {
      control: { type: "radio" },
      options: ["prefix", "suffix"],
      description: `The "IconPlacement" property determines where the icon will be placed relative to the button text. It can either be set to 'prefix' to display the icon before the text or 'suffix' to show it after the text.`,
      if: {
        arg: "ButtonVariant",
        when: (variant) =>
          ["primary", "secondary", "destructive"].includes(variant),
      },
    },
    ButtononClick: {
      action: "clicked",
      table: {
        category: "Events",
      },
      description: `The "Button Click" property handles the action triggered when the button is pressed. It defines the specific function or event that will be executed upon the user interacting with the button, enabling various behaviors such as navigation or form submission.`,
    },
    ButtononHover: {
      action: "hovered",
      table: {
        category: "Events",
      },
      description: `The "ButtonHover" listener for a Button detects when the user can hover cursor on button to change button highlight. This property triggers a function or event, allowing the application to respond to the user's interaction in real-time.`,
    },
    ButtonText: {
      control: { type: "text" },
      description: `The "Button Text" property allows you to specify the string that appears on the button, acting as its label. It accepts any text value, enabling you to customize the visible button label for different actions or functions.`,
      table: {
        disable: "true",
      },
    },
    ref: {
      control: { type: "text" },
      description: `The "Button Text" property allows you to specify the string that appears on the button, acting as its label. It accepts any text value, enabling you to customize the visible button label for different actions or functions.`,
      table: {
        disable: "true",
      },
    },
    children: {
      control: { type: "text" },
      description: `The Child property allows dynamic content to be displayed on the button, enabling the button's label to be customized. Users can pass any text or element as a child, which will be rendered as the button's content.`,
    },
    ButtonDisabled: {
      control: { type: "boolean" }, // Automatically inferred when 'options' is defined
      description: `The "Button Disabled" property determines whether the button is disabled or not. When set to true, the button will be inactive and unresponsive to user interactions, preventing any associated actions from being triggered.`,
    },
    IconList: {
      control: { type: "select" },
      options: ["heart", "preview", "download", "print"],
      description: `The "iconList" property allows you to add an icon to the button, with available options such as plus, pencil, or camera. These icons can visually indicate the button's purpose, such as adding (plus), editing (pencil), or capturing a photo (camera). `,
      if: { arg: "ButtonVariant", eq: "icon" },
    },
    CheckFormValidation: {
      table: {
        disable: true,
      },
    },
    FormValidations: {
      table: {
        disable: true,
      },
    },
    FromValid: {
      table: {
        disable: true,
      },
    },
    ValidForm: {
      table: {
        disable: true,
      },
    },
    Size: {
      control: { type: "select" },
      options: [ "regular" , "small", "large", "full-width"],
      description: `The "Size" property allows you to specify the size of the button.`,
    },
    PillTabData: {
      name: "PillTabData",
      control: { type: "object" },
      description: "Object containing labels for left and right pill buttons",
      if: { arg: "ButtonVariant", eq: "PillTab" }
    },
    DropdownMenuOptions: {
      name: "DropdownMenuOptions",
      control: { 
        type: 'object',
        defaultValue: [
          {
            label: 'Appointment File',
            value: 'appointment',
            imageUrl: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
          },
          {
            label: 'Customer File',
            value: 'customer',
            imageUrl: 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp'
          }
        ]
      },
      description: "Array of menu options for the dropdown menu. Each option should be an object with 'label', 'value', and optional 'imageUrl' properties.",
      table: {
        type: { 
          summary: 'array',
          detail: `[
  { 
    label: string, 
    value: string,
    imageUrl?: string 
  }
]`
        }
      }
    },
    DropdownClick: {
      name: "DropdownClick",
      action: "dropdownClicked",
      table: {
        category: "Events",
      },
      description: "Handler triggered when a dropdown menu item is clicked. Receives the clicked item object containing 'label' and 'value' properties.",
    },
    TextAlign: {
      name: "TextAlign",
      control: { type: 'select' },
      options: ['left', 'center'],
      description: 'Aligns the button text: left or center.'
    },
    ColorVariant: {
      name: "ColorVariant",
      control: { type: 'select' },
      options: ['primary', 'secondary', 'theme', 'leave', 'black'],
      description: 'Select the color variant for the button. This will override the default button colors.',
    },
    MobileView: {
      control: { type: "boolean" },
      description: 'Toggle to simulate mobile-specific styling or behavior for the component.'
    },
    SelectedIds: {
      control: false,
      description: "Array of selected tab IDs. Controls which pills are active in the PillTab component. Useful for externally setting or updating pill selection state.",
      if: { arg: "ButtonVariant", eq: "PillTab" }
    },
    OnChange: {
      control: false,
      table: {
        category: "Events",
      },
      description: "Callback function triggered when the selected pill(s) change. Receives an array of selected pill IDs as an argument. Use this to handle or track selection state externally.",
      if: { arg: "ButtonVariant", eq: "PillTab" }
    },
    Width: {
      control: "text",
      description: "Sets the width of the dropdown. Accepts CSS width values like 'auto' for automatic sizing, specific pixel values like '120px', percentages like '100%', or any valid CSS width value.",
      if: { arg: "ButtonVariant", eq: "DropdownMenu" }
    },
    DropdownAlign: {
      name: "DropdownAlign",
      control: { type: 'select' },
      options: ['left', 'right'],
      description: "Sets the horizontal alignment of the dropdown menu. Use 'left' to align the menu to the left edge of the button (default), or 'right' to align it to the right edge.",
      if: { arg: "ButtonVariant", eq: "DropdownMenu" }
    },
    ToggleMode: {
      control: { type: 'boolean' },
      description: `The "ToggleMode" property enables toggle behavior for the button. When set to true, the button can switch between active and inactive states, allowing users to use the button as an on/off or toggle switch for specific actions or features.`,
      if: { arg: "ButtonVariant", eq: "PillTab" }
    }
  },
  decorators: [
    (Story, context) => {
      const { ButtonVariant } = context.args;
      const currentDefaults = defaultPropsMap[ButtonVariant] ?? {};
      const shouldResetProps = lastVariant !== ButtonVariant;

      if (shouldResetProps) {
        variantPropKeys.forEach((key) => {
          delete context.args[key];
        });

        context.args = {
          ButtonVariant,
          ...currentDefaults,
        };
        lastVariant = ButtonVariant;
      }

      if (ButtonVariant === "Social") {
        if (!context.args.SocialButton) {
          context.args.SocialButton = "Facebook";
        }
        context.args.children = `Continue with ${context.args.SocialButton}`;
        context.args.ButtonIcon = "";
      }

      if(ButtonVariant === "ai") {
        context.args.ButtonIcon = "";
      }

      if (ButtonVariant === "PillTab") {
        context.args.PillTabData = {
          LeftLabel: context.args.PillTabData?.LeftLabel ?? {
            id: "left",
            name: "Left Label",
            pillColor: "primary",
          },
          SquareLabel: context.args.PillTabData?.SquareLabel ?? [],
          RightLabel: context.args.PillTabData?.RightLabel ?? {
            id: "right",
            name: "Right Label",
            pillColor: "primary",
          },
        };
      }

      if (context.args.ButtonVariant !== 'DropdownMenu') {
        context.args.DropdownMenuOptions = undefined;
        context.args.TextAlign = undefined;
        context.args.ColorVariant = undefined;
      } else {
        context.args.children = context.args.children || "Upload";
        context.args.ButtonIcon = context.args.ButtonIcon || "caret";
        context.args.IconPlacement =  context.args.IconPlacement || "suffix";
        context.args.DropdownMenuOptions = context.args.DropdownMenuOptions || [
          { label: "Appointment File", value: "appointment" , imageUrl: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp" },
          { label: "Customer File", value: "customer" ,imageUrl: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"},
        ];
        context.args.TextAlign = context.args.TextAlign || "left";
        context.args.ColorVariant = context.args.ColorVariant || "#388e3c";
      }

      const disableButtonIcon = [
        "close",
        "icon",
        "action",
        "tutorial",
        "ai",
        "AiWithIcon",
        "Social",
        "PillTab",
        "Red",
      ].includes(ButtonVariant);
      const disableIconplacement = [
        "close",
        "icon",
        "action",
        "tutorial",
        "ai",
        "AiWithIcon",
        "Social",
        "PillTab",
        "Red"
      ].includes(ButtonVariant);
      const disableButtonText = [
        "primary",
        "secondary",
        "destructive",
        "ghost",
        "selector",
        "theme",
        "tutorial",
        "close",
        "icon",
        "action",
        "ai",
        "AiWithIcon",
        "Social",
        "link",
        "Pill",
        "Dropdown",
        "DropdownMenu",
        "RedGhost",
        "Red",
        "Black",
        "PillTab",
      ].includes(ButtonVariant);
      const disablechildren = ["close", "icon", "action", "PillTab", "AiWithIcon", "Social"].includes(
        ButtonVariant
      );
      const disableDropdownMenuOptions = [
        "primary",
        "secondary",
        "destructive",
        "ghost",
        "selector",
        "theme",
        "tutorial",
        "close",
        "icon",
        "action",
        "ai",
        "AiWithIcon",
        "Social",
        "link",
        "Pill",
        "Dropdown",
        "RedGhost",
        "Red",
        "Black",
        "PillTab",
      ].includes(ButtonVariant);

      const disabledMobileViewOption = [
        "primary",
        "secondary",
        "destructive",
        "ghost",
        "selector",
        "theme",
        "tutorial",
        "close",
        "icon",
        "action",
        "ai",
        "AiWithIcon",
        "Social",
        "link",
        "Pill",
        "Dropdown",
        "DropdownMenu",
        "RedGhost",
        "Red",
        "Black",
      ].includes(ButtonVariant);
      context.argTypes.ButtonIcon.table = {
        disable: disableButtonIcon,
      };
      context.argTypes.IconPlacement.table = {
        disable: disableIconplacement,
      };
      context.argTypes.ButtonText.table = {
        disable: disableButtonText,
      };
      context.argTypes.children.table = {
        disable: disablechildren,
      };
      context.argTypes.DropdownMenuOptions.table = {
        disable: disableDropdownMenuOptions,
      };
      context.argTypes.TextAlign.table = {
        disable: disableDropdownMenuOptions,
      };
      context.argTypes.ColorVariant.table = {
        disable: disableDropdownMenuOptions,
      };
      context.argTypes.MobileView.table = {
        disable: disabledMobileViewOption,
      };
      if (["action", "icon", "close"].includes(ButtonVariant)) {
        context.args.ButtonIcon = "";
        context.args.children = "";
      }
      const showOnClick =
        context.args.ButtononClick || context.args.ButtononClick === undefined;
      return (
        <Story
          {...context}
          argTypes={{
            ...context.argTypes,
            actionbutton: {
              ...context.argTypes.actionbutton,
              table: {
                ...context.argTypes.actionbutton.table,
                disable: ButtonVariant !== "action",
              },
            },
          }}
        />
      );
    },
  ],
};

export const Primary = {
  args: {
    ButtonVariant: "primary",
    actionbutton: "vertical",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary buttons are used most commonly. Only use another button if it requires more or less visual weight.",
      },
    },
  },
};

export const Secondary = {
  args: {
    ButtonVariant: "secondary",
    IconPlacement: "suffix",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Secondary buttons are used when a button requires less visual weight than the primary button.",
      },
    },
  },
};

export const Destructive = {
  args: {
    ButtonVariant: "destructive",
    IconPlacement: "prefix",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Destructive buttons are used to signify a destructive action, such as deleting a page.",
      },
    },
  },
};

export const WithIcon = {
  args: {
    ButtonVariant: "primary",
    ButtonIcon: "pencil",
    IconPlacement: "prefix",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use when giving additional visual information on what the button does.",
      },
    },
  },
};

export const Close = {
  args: {
    ButtonVariant: "close",
  },
  parameters: {
    docs: {
      description: {
        story: "The Close Button is used when closing a popup or page.",
      },
    },
  },
};

export const Action = {
  args: {
    ButtonVariant: "action",
    actionbutton: "vertical",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the Action button to signify that the user can do more with the item.",
      },
    },
  },
};

export const Ghost = {
  args: {
    ButtonVariant: "ghost",
    IconPlacement: "suffix",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Ghost Buttons are used to reduce visual clutter while still signifying important actions. Use when an actual button would take up too much space.",
      },
    },
  },
};

export const Icon = {
  args: {
    ButtonVariant: "icon",
    IconList: "heart",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use Icon buttons when a regular button would take up too much space and to give a visual indicator of what the action is.",
      },
    },
  },
};

export const Selector = {
  args: {
    ButtonVariant: "selector",
    ButtonIcon: "plus",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Selector button are used to Add something. Like you going to add grocery item into Cart",
      },
    },
  },
  argTypes: {
    IconPlacement: { table: { disable: true } },
  },
};

export const Theme = {
  args: {
    ButtonVariant: "theme",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Theme buttons are used in specific situations where the action is closely tied to the contents on the page. If confused about using, use Primary Button instead.",
      },
    },
  },
};

export const Tutorial = {
  args: {
    ButtonVariant: "tutorial",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the Tutorial button as a link to the tutorial for a feature.",
      },
    },
  },
  argTypes: {
    IconPlacement: { table: { disable: true } }, // Hide BadgeSize manually in this specific story
  },
};

export const AI = {
  args: {
    ButtonVariant: "ai",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Use the AI button for any action associated with AI.",
      },
    },
  },
};

export const AiIcon = {
  args: {
    ButtonVariant: "AiWithIcon",
    ButtononClick: () => { }
  },
  parameters: {
    docs: {
      description: {
        story: "Use to indicate AI actions when AI button is too big.",
      },
    },
  },
  argTypes: {
    IconPlacement: { table: { disable: true } }, // Hide BadgeSize manually in this specific story
  },
};

export const Social = {
  args: {
    ButtonVariant: "Social",
    SocialButton: "Facebook",
    ButtononClick: () => { },
  },
  parameters: {
    docs: {
      description: {
        story: "Use social actions when interacting with social buttons for Facebook, Google+, and Apple.",
      },
    },
  },
  argTypes: {
    IconPlacement: { table: { disable: true } }, // Hide BadgeSize manually in this specific story
    ButtonIcon: { table: { disable: true } }
  },
};

export const Link = {
  args: {
    ButtonVariant: "link",
    children: "Copy Link",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use to Generate a unique URL that links directly to this service on your page, defaulting to the current results and displaying the selected availability.",
      },
    },
  },
};

export const Red = {
  args: {
    ButtonVariant: "Red",
    children: "Red",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use to Generate a unique URL that links directly to this service on your page, defaulting to the current results and displaying the selected availability.",
      },
    },
  },
};

export const Black = {
  args: {
    ButtonVariant: "Black",
    children: "Connect",
    ButtonIcon: "connect",
    Size: "full-width",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Black buttons are used when a button requires less visual weight than the primary button.",
      },
    },
  },
};

export const Pill = {
  args: {
    ButtonVariant: "Pill",
    ButtonIcon: "plus",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pill selector button are used to Add something. Like you going to add grocery item into Cart",
      },
    },
  },
};

export const Dropdown = {
  args: {
    ButtonVariant: "Dropdown",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use when giving additional visual information on what the button does.",
      },
    },
  },
};

export const DropdownMenu = {
  args: {
    ButtonVariant: "DropdownMenu",
    ButtonIcon: "caret",
    ColorVariant: "primary",
    DropdownMenuOptions: [
      { label: " EMV Reader", value: "appointment" , imageUrl: "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com//Images/cardreader.png" },
      { label: " PayPro Mini", value: "customer" , imageUrl: "https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com//Images/newpaypromini.png"},
    ],
    TextAlign: "left",
    children: "Upload",
    Width: "",
    DropdownAlign: "left",
  },
  parameters: {
    docs: {
      description: {
        story: `
Dropdown button with menu options for \`Appointment File\` and \`Customer File\`, custom color, fixed width and height, bold and left-aligned text, and icon on the right (suffix) by default.

Use the \`Width\` prop to control the dropdown menu's width. It accepts CSS width values like:
- \`"auto"\`
- \`"120px"\`
- \`"100%"\`

If left empty, it defaults to the button’s width.
      `.trim(),
    },
    },
  },
};

export const PillTab = {
  args: {
    ButtonVariant: "PillTab",
    PillTabData: {
      LeftLabel: { id: "left", name: "Left Label", pillColor: "primary" },
      SquareLabel: [],
      RightLabel: { id: "right", name: "Right Label", pillColor: "primary", isCloseOtherPills: true }
    },
    MobileView: false,
    SelectedIds: [],
    ButtononClick: () => {},
    OnChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: `
Filled buttons are used for primary actions with strong emphasis.

By default, the Pill Tab displays a Left and Right label button.

If additional buttons are needed, use the \`SquareLabel\` prop to pass an array of button objects in the same format as \`LeftLabel\` or \`RightLabel\`.

The \`pillColor\` property supports the following values only: 
- \`"primary"\`
- \`"secondary"\`
- \`"theme"\`
- \`"leave"\`
        `.trim(),
      },
    },
  },
};

export const RedGhost = {
  args: {
    ButtonVariant: "RedGhost",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "RedGhost Buttons are used to reduce visual clutter while still signifying important actions. Use when an actual button would take up too much space.",
      },
    },
  },
};