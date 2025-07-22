import VgButton from "../../../components/VgButton/VgButton";
import VgSvg from "../../../components/VgSvg/VgSvg";
import VgThreeDotMenu from "../../../components/VgThreeDotMenu/VgThreeDotMenu";

export default {
  title: "Three Dot Menu",
  component: VgThreeDotMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Three dot menu displays a dropdown of menu Items. Each item has an id, label, and optional icon. Supports two positions: vertical and horizontal. `MenuOptions` determines the trigger type: 'ThreeDot', 'Icon', or 'TextBox'.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    MenuOptions: {
      options: ["ThreeDot", "Icon", "TextBox", "TextBoxWithBorder", "CustomMenu"],
      control: { type: "radio" },
      description: "Defines the trigger type: ThreeDot icon, custom Icon, TextBox, or CustomMenu.",
    },
    Items: {
      control: { type: "object" },
      description: "Array of menu Items. Each should have `id`, `label`, `percentage`, and optionally `icon`.",
    },
    MenuButtonPosition: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
      description: "Alignment of the three dot menu trigger button.",
    },
    IconSVG: {
      control: { type: "object" },
      description: "Custom SVG icon to use if `MenuOptions` is 'Icon'. Optional.",
    },
    ThreeDotMenuOpenPosition: {
      control: { type: "radio" },
      options: ["Left", "Right"],
      description: "Controls the position (left/right) of the dropdown list.",
    },
    OnClick: {
      action: "onClick",
      table: { category: "Events" },
      description: "Triggered when an item from the dropdown is clicked.",
    },
    OnThreeDotMenuClick: {
      action: "onThreeDotMenuClick",
      table: { category: "Events" },
      description: "Triggered when the trigger button is clicked.",
    },
    // Newly Added TextBox-specific Props
    TextValue: {
      control: { type: "text" },
      description: "Current value of the TextBox when `MenuOptions` is 'TextBox'.",
    },
    TextboxPrefixValue: {
      control: { type: "text" },
      description: "Currency symbol or prefix to display before the TextBox value (e.g., '$', '£', '€').",
    },
    OnTextClick: {
      action: "onTextClick",
      table: { category: "Events" },
      description: "Triggered when the TextBox is clicked. Only for `MenuOptions = 'TextBox'`.",
      if: { arg: "MenuOptions", eq: "TextBox" },
    },
    OnTextChange: {
      action: "onTextChange",
      table: { category: "Events" },
      description: "Triggered when the TextBox value changes. Only for `MenuOptions = 'TextBox'`.",
      if: { arg: "MenuOptions", eq: "TextBox" },
    },
    OnTextBlur: {
      action: "onTextBlur",
      table: { category: "Events" },
      description: "Triggered when the TextBox loses focus. Only for `MenuOptions = 'TextBox'`.",
      if: { arg: "MenuOptions", eq: "TextBox" },
    },
    OnTextKeyUp: {
      action: "onTextKeyUp",
      table: { category: "Events" },
      description: "Triggered on key up event. Only for `MenuOptions = 'TextBox'`.",
      if: { arg: "MenuOptions", eq: "TextBox" },
    },
    OnTextKeyDown: {
      action: "onTextKeyDown",
      table: { category: "Events" },
      description: "Triggered on key down event. Only for `MenuOptions = 'TextBox'`.",
      if: { arg: "MenuOptions", eq: "TextBox" },
    },
    OnTextKeypress: {
      action: "onTextKeypress",
      table: { category: "Events" },
      description: "Triggered on keypress event. Only for `MenuOptions = 'TextBox'`.",
      if: { arg: "MenuOptions", eq: "TextBox" },
    },
    OnTextFoucus: {
      action: "onTextFocus",
      table: { category: "Events" },
      description: "Triggered when the TextBox is focused. Only for `MenuOptions = 'TextBox'`.",
      if: { arg: "MenuOptions", eq: "TextBox" },
    },
    TextMaxLength: {
      control: { type: "number" },
      description: "Maximum character length allowed in the TextBox. Only for `MenuOptions = 'TextBox'`.",
      if: { arg: "MenuOptions", eq: "TextBox" },
    },
    CustomMenuRender: {
      control: { type: "object" },
      description: "Custom JSX/HTML content to render in the menu trigger. Can be JSX elements, components, or functions returning JSX. Only for `MenuOptions = 'CustomMenu'`.",
      if: { arg: "MenuOptions", eq: "CustomMenu" },
    },
    SelectedItem: {
      control: { type: "object" },
      description: "Data for the currently selected row. Can be used to customize menu behavior per row.",
    },
    Disabled: {
      control: { type: "boolean" },
      description: "Disables the Three Dot Menu, preventing interaction.",
    },
    MenuOpen: {
      control: { type: "boolean" },
      description: "Controls the visibility of the dropdown menu.",
    },
    Cursor: {
      control: { type: "boolean" },
      description: "CSS cursor style for the Three Dot Menu trigger button.",
    },
  },
};

export const ThreeDot = {
  args:{
    MenuOptions:"ThreeDot",
    Items:[
      { id: '1', label: '$25.00', percentage: '5%' },
  { id: '2', label: '$558.00', percentage: '10%' },
],
    MenuButtonPosition:"horizontal",
    SelectedItem:{ id: '8', label: '$89.00', percentage: '40%' },
    ThreeDotMenuOpenPosition:"Right",
    TextValue:"0.00",
    Disabled:false,
   CustomMenuRender:(
      <VgButton
        ButtonVariant="secondary"
        ButtononClick={() => {}}
        ButtononHover={() => {}}
        IconPlacement="suffix"
        Size="small"
      >
        More &nbsp;<i class="fa-solid fa-angle-down "></i>
      </VgButton>
    ),
    TextMaxLength:10,
    OnClick:(e) => console.log(e, "clicked"),
    OnThreeDotMenuClick:(e, isOpen) => console.log(e, isOpen, "clicked"),
    MenuOpen:true,
    Cursor:false,
    IconSVG:(
      <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" />
      </svg>
    ),
  },
  parameters:{
    docs:{
      description:{
        story:"Use Three Dot Menu with `MenuOptions` set to 'TextBox' to show a text input that triggers a dropdown. You can set a currency prefix using the `TextboxPrefixValue` prop.",
      },
    },
  },
};

export const ThreeDotIcon = {
  args:{
    MenuOptions:"Icon",
    Items:[
      { id: '1', label: '$25.00', percentage: '5%' },
      { id: '2', label: '$558.00', percentage: '10%' },
      { id: '3', label: '$896.00', percentage: '15%' },
      { id: '4', label: '$78.00', percentage: '20%' },
      { id: '5', label: '$25.00', percentage: '25%' },
      { id: '6', label: '$63.00', percentage: '30%' },
      { id: '7', label: '$58.00', percentage: '35%' },
      { id: '8', label: '$89.00', percentage: '40%' },
    ],
    MenuButtonPosition:"horizontal",
    SelectedItem:{ id: '8', label: '$89.00', percentage: '40%' },
    ThreeDotMenuOpenPosition:"Right",
    Disabled:false,
    Cursor:false,
    TextMaxLength:10,
     CustomMenuRender:(
      <VgButton
        ButtonVariant="secondary"
        ButtononClick={() => {}}
        ButtononHover={() => {}}
        IconPlacement="suffix"
        Size="small"
      >
        More &nbsp;<i class="fa-solid fa-angle-down "></i>
      </VgButton>
    ),
    IconSVG:(
      <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" />
      </svg>
    ),
    OnClick:(e) => console.log(e, "clicked"),
    OnThreeDotMenuClick:(e, isOpen) => console.log(e, isOpen, "clicked"),
    MenuOpen:true
  },
  parameters:{
    docs:{
      description:{
        story:"Use Three Dot Menu with `MenuOptions` set to 'TextBox' to show a text input that triggers a dropdown. You can set a currency prefix using the `TextboxPrefixValue` prop.",
      },
    },
  },
};

export const TextBox = {
  args:{
    MenuOptions:"TextBox",
    Items:[
      { id: '1', label: '$25.00', percentage: '5%' },
      { id: '2', label: '$558.00', percentage: '10%' },
      { id: '3', label: '$896.00', percentage: '15%' },
      { id: '4', label: '$78.00', percentage: '20%' },
      { id: '5', label: '$25.00', percentage: '25%' },
      { id: '6', label: '$63.00', percentage: '30%' },
      { id: '7', label: '$58.00', percentage: '35%' },
      { id: '8', label: '$89.00', percentage: '40%' },
    ],
    MenuButtonPosition:"horizontal",
    SelectedItem:{ id: '8', label: '$89.00', percentage: '40%' },
    ThreeDotMenuOpenPosition:"Right",
    TextValue:"0.00",
    TextboxPrefixValue:"$",
    Cursor:false,
    Disabled:false,
    TextMaxLength:10,
    IconSVG:(
      <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" />
      </svg>
    ),
     CustomMenuRender:(
      <VgButton
        ButtonVariant="secondary"
        ButtononClick={() => {}}
        ButtononHover={() => {}}
        IconPlacement="suffix"
        Size="small"
      >
        More &nbsp;<i class="fa-solid fa-angle-down "></i>
      </VgButton>
    ),
    OnClick:(e) => console.log(e, "clicked"),
    OnThreeDotMenuClick:(e, isOpen) => console.log(e, isOpen, "clicked"),
    OnTextClick:() => console.log("Text clicked"),
    OnTextChange:(e) => console.log("Text changed", e),
    OnTextBlur:() => console.log("Text blurred"),
    OnTextKeyUp:() => console.log("Key up"),
    OnTextKeyDown:() => console.log("Key down"),
    OnTextKeypress:() => console.log("Key press"),
    OnTextFoucus:() => console.log("Text focused"),
    MenuOpen:true
  },
  parameters:{
    docs:{
      description:{
        story:"Use Three Dot Menu with `MenuOptions` set to 'TextBox' to show a text input that triggers a dropdown. You can set a currency prefix using the `TextboxPrefixValue` prop.",
      },
    },
  },
};

export const TextBoxWithBorder = {
  args:{
    MenuOptions:"TextBoxWithBorder",
    Items:[
      { id: '1', label: '$25.00', percentage: '5%' },
      { id: '2', label: '$558.00', percentage: '10%' },
      { id: '3', label: '$896.00', percentage: '15%' },
      { id: '4', label: '$78.00', percentage: '20%' },
      { id: '5', label: '$25.00', percentage: '25%' },
      { id: '6', label: '$63.00', percentage: '30%' },
      { id: '7', label: '$58.00', percentage: '35%' },
      { id: '8', label: '$89.00', percentage: '40%' },
    ],
    MenuButtonPosition:"horizontal",
    // SelectedItem: { id: '8', label: '$89.00', percentage: '40%' },
    ThreeDotMenuOpenPosition:"Right",
    TextValue:"0.00",
    TextboxPrefixValue:"$ ",
    Disabled:false,
    Cursor:true,
    TextMaxLength:10,
    IconSVG:(
      <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" />
      </svg>
    ),
     CustomMenuRender:(
      <VgButton
        ButtonVariant="secondary"
        ButtononClick={() => {}}
        ButtononHover={() => {}}
        IconPlacement="suffix"
        Size="small"
      >
        More &nbsp;<i class="fa-solid fa-angle-down "></i>
      </VgButton>
    ),
    OnClick:(e) => console.log(e, "clicked"),
    OnThreeDotMenuClick:(e, isOpen) => console.log(e, isOpen, "clicked"),
    OnTextClick:() => console.log("Text clicked"),
    OnTextChange:(e) => console.log("Text changed", e),
    OnTextBlur:() => console.log("Text blurred"),
    OnTextKeyUp:() => console.log("Key up"),
    OnTextKeyDown:() => console.log("Key down"),
    OnTextKeypress:() => console.log("Key press"),
    OnTextFoucus:() => console.log("Text focused"),
    MenuOpen:true
  },
  parameters:{
    docs:{
      description:{
        story:"Use Three Dot Menu with `MenuOptions` set to 'TextBox' to show a text input that triggers a dropdown. You can set a currency prefix using the `TextboxPrefixValue` prop.",
      },
    },
  },
};

export const CustomMenu = {
  args: {
    MenuOptions: "CustomMenu",
    Items: [
      { id: '1', label: 'Get Directions'},
      { id: '2', label: 'View Business'},
      { id: '3', label: 'Message Business'},
      { id: '4', label: 'Cancel Appointment'},
    ],
    ThreeDotMenuOpenPosition: "Right",
    Disabled: false,
    Cursor: false,
    OnClick: (e) => console.log(e, "clicked"),
    CustomMenuRender: (
      <VgButton
        ButtonVariant="secondary"
        ButtononClick={() => {}}
        ButtononHover={() => {}}
        IconPlacement="suffix"
        Size="small"
      >
        More &nbsp;<i class="fa-solid fa-angle-down "></i>
      </VgButton>
    ),
    OnThreeDotMenuClick: (e, isOpen) => console.log(e, isOpen, "clicked"),
    MenuOpen: true,
    IconSVG: (
      <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Use Three Dot Menu with `MenuOptions` set to 'CustomMenu' to show a custom button that triggers a dropdown. The CustomMenuRender prop allows you to pass any custom JSX element as the trigger button.",
      },
    },
  },
};