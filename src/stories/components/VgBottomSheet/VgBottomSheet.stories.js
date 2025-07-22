import VgBottomSheet from "../../../components/VgBottomSheet/VgBottomSheet";
const BottomSheetIds = {
  ACTION_LIST: 1,
  BUTTON_GROUP: 2,
  POPUP: 3,
  ACTION: 4,
  MENU_LIST: 5,
  OPTIONS_LIST: 6,
};

const employeeActions = [
  {
    name: "Edit Profile",
    action: "editProfile",
  },
  {
    name: "Edit Password & Security",
    action: "editPasswordSecurity",
  },
  {
    name: "Hours",
    action: "viewHours",
  },
  {
    name: "Services",
    action: "viewServices",
  },
  {
    name: "Share Calendar",
    action: "shareCalendar",
  },
  {
    name: "Rent Collection",
    action: "rentCollection",
  },
  {
    name: "Deactivate Employee",
    action: "deactivateEmployee",
  },
  {
    name: "Disable Online Booking",
    action: "disableOnlineBooking",
  },
  {
    name: "Transfer Employee Data",
    action: "transferEmployeeData",
  },
  {
    name: "Delete",
    action: "deleteEmployee",
  },
];

const menuActions = [
  {
    name: "Menu Action",
    action: "menuAction",
    icon: (
      <svg
        viewBox="0 0 14 13"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.0938 6.375C13.0938 6.90234 12.6543 7.3418 12.1562 7.3418H7.9375V11.5605C7.9375 12.0586 7.49805 12.4688 7 12.4688C6.47266 12.4688 6.0625 12.0586 6.0625 11.5605V7.3418H1.84375C1.31641 7.3418 0.90625 6.90234 0.90625 6.375C0.90625 5.87695 1.31641 5.4668 1.84375 5.4668H6.0625V1.24805C6.0625 0.720703 6.47266 0.28125 7 0.28125C7.49805 0.28125 7.9375 0.720703 7.9375 1.24805V5.4668H12.1562C12.6543 5.4375 13.0938 5.87695 13.0938 6.375Z"></path>
      </svg>
    ),
  },
  {
    name: "Menu Action",
    action: "menuAction",
    icon: (
      <svg
        viewBox="0 0 14 13"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.0938 6.375C13.0938 6.90234 12.6543 7.3418 12.1562 7.3418H7.9375V11.5605C7.9375 12.0586 7.49805 12.4688 7 12.4688C6.47266 12.4688 6.0625 12.0586 6.0625 11.5605V7.3418H1.84375C1.31641 7.3418 0.90625 6.90234 0.90625 6.375C0.90625 5.87695 1.31641 5.4668 1.84375 5.4668H6.0625V1.24805C6.0625 0.720703 6.47266 0.28125 7 0.28125C7.49805 0.28125 7.9375 0.720703 7.9375 1.24805V5.4668H12.1562C12.6543 5.4375 13.0938 5.87695 13.0938 6.375Z"></path>
      </svg>
    ),
  },
  {
    name: "Menu Action",
    action: "menuAction",
    icon: (
      <svg
        viewBox="0 0 14 13"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.0938 6.375C13.0938 6.90234 12.6543 7.3418 12.1562 7.3418H7.9375V11.5605C7.9375 12.0586 7.49805 12.4688 7 12.4688C6.47266 12.4688 6.0625 12.0586 6.0625 11.5605V7.3418H1.84375C1.31641 7.3418 0.90625 6.90234 0.90625 6.375C0.90625 5.87695 1.31641 5.4668 1.84375 5.4668H6.0625V1.24805C6.0625 0.720703 6.47266 0.28125 7 0.28125C7.49805 0.28125 7.9375 0.720703 7.9375 1.24805V5.4668H12.1562C12.6543 5.4375 13.0938 5.87695 13.0938 6.375Z"></path>
      </svg>
    ),
  },
  {
    name: "Menu Action",
    action: "menuAction",
    icon: (
      <svg
        viewBox="0 0 14 13"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.0938 6.375C13.0938 6.90234 12.6543 7.3418 12.1562 7.3418H7.9375V11.5605C7.9375 12.0586 7.49805 12.4688 7 12.4688C6.47266 12.4688 6.0625 12.0586 6.0625 11.5605V7.3418H1.84375C1.31641 7.3418 0.90625 6.90234 0.90625 6.375C0.90625 5.87695 1.31641 5.4668 1.84375 5.4668H6.0625V1.24805C6.0625 0.720703 6.47266 0.28125 7 0.28125C7.49805 0.28125 7.9375 0.720703 7.9375 1.24805V5.4668H12.1562C12.6543 5.4375 13.0938 5.87695 13.0938 6.375Z"></path>
      </svg>
    ),
  },
  {
    name: "Menu Action",
    action: "menuAction",
    icon: (
      <svg
        viewBox="0 0 14 13"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.0938 6.375C13.0938 6.90234 12.6543 7.3418 12.1562 7.3418H7.9375V11.5605C7.9375 12.0586 7.49805 12.4688 7 12.4688C6.47266 12.4688 6.0625 12.0586 6.0625 11.5605V7.3418H1.84375C1.31641 7.3418 0.90625 6.90234 0.90625 6.375C0.90625 5.87695 1.31641 5.4668 1.84375 5.4668H6.0625V1.24805C6.0625 0.720703 6.47266 0.28125 7 0.28125C7.49805 0.28125 7.9375 0.720703 7.9375 1.24805V5.4668H12.1562C12.6543 5.4375 13.0938 5.87695 13.0938 6.375Z"></path>
      </svg>
    ),
  },
  {
    name: "Menu Action",
    action: "menuAction",
    icon: (
      <svg
        viewBox="0 0 14 13"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.0938 6.375C13.0938 6.90234 12.6543 7.3418 12.1562 7.3418H7.9375V11.5605C7.9375 12.0586 7.49805 12.4688 7 12.4688C6.47266 12.4688 6.0625 12.0586 6.0625 11.5605V7.3418H1.84375C1.31641 7.3418 0.90625 6.90234 0.90625 6.375C0.90625 5.87695 1.31641 5.4668 1.84375 5.4668H6.0625V1.24805C6.0625 0.720703 6.47266 0.28125 7 0.28125C7.49805 0.28125 7.9375 0.720703 7.9375 1.24805V5.4668H12.1562C12.6543 5.4375 13.0938 5.87695 13.0938 6.375Z"></path>
      </svg>
    ),
  },
];

export default {
  // title: "Bottom Sheet",
  component: VgBottomSheet,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Bottom Sheets are a common mobile-only component that appear from the bottom of the screen to display certain actions or information. They can contain Action Lists, Option Lists, Popups, Tooltips, Content Warnings, and Button Groups.
          <br/><span style='color:red;'>Note: This control is designed for mobile only</span>
          <br/><span style='color:red;'>Note: 'Id' field contain Enum 1= Action  2 = Bottom Group  3 = Popup</span>`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Id: { table: { disable: true }, control: false },
    Description: {
      description:
        "The Description property allows users to input a custom text description that appears in the bottom sheet. This description provides additional information or context about the content or purpose of the bottom sheet.",
    },
    BottomsheetData: {
      description:
        "The Description property allows users to input a custom text description that appears in the bottom sheet. This description provides additional information or context about the content or purpose of the bottom sheet.",
    },
    OnClickSecondary: {
      action: "clicked",
      table: { category: "Events" },
      description:
        "onClick is an event handler that triggers a specific action when a user clicks on the control.",
    },
    OnClick: {
      action: "clicked",
      table: { category: "Events" },
      description:
        "onClick is an event handler that triggers a specific action when a user clicks on the control. It provides two parameters: the event and the selected item from the list.",
    },
    VagaroToolkit: {
      control: "Number",
      type: { name: "Number" },
      table: { disable: true },
      description: "The VagaroToolkit property, when set to a Number value",
    },
    OnClickPrimary: {
      action: "clicked",
      table: { category: "Events" },
      description:
        "onClick is an event handler that triggers a specific action when a user clicks on the control.",
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
    BottomSheetId: {
      control: "string",
      table: { disable: true },
    },
    Id: { table: { disable: true }, control: false },
    PopupTitle: {
      control: { type: "text" },
      description:
        "The PopupTitle property allows users to input custom title for the popup.",
    },
  },
};

// Example usage of OnClick with two parameters
export const ActionList = {
  args: {
    Id: BottomSheetIds.ACTION,
    Description: `Replace this component with a custom local component that contains your popup content.`,
    NativeAction: 0,
    CloseBackTitle: "From Control",
    OnClick: (e, selectedMenuList) => {
      console.log(e, selectedMenuList, "Action List Clicked");
    },
    OnClickPrimary: (e) => {
      console.log(e, "primary button Clicked");
    },
    OnClickSecondary: (e) => {
      console.log(e, "secondary button Clicked");
    },
    VagaroToolkit: 1,
    BottomsheetData: menuActions,
    Footer: 0,
    TimerCount: 0,
    IsFullLength: false,
  },
  render: (args) => (
    <VgBottomSheet {...{ ...args, Id: BottomSheetIds.MENU_LIST }} />
  ),
  parameters: {
    docs: {
      description: {
        story: "List of Action item will be available",
      },
    },
  },
};

export const ButtonGroup = {
  args: {
    Id: BottomSheetIds.BUTTON_GROUP,
    Description: `Replace this component with a custom local component that contains your popup content.`,
    OnClickPrimary: () => {},
    OnClickSecondary: () => {},
    OnClick: (e) => {
      console.log(e, "Button Group Clicked");
    },
    NativeAction: 0,
    CloseBackTitle: "From Control",
    VagaroToolkit: 1,
    Footer: 0,
    TimerCount: 0,
    IsFullLength: false,
  },
  render: (args) => (
    <VgBottomSheet {...{ ...args, Id: BottomSheetIds.BUTTON_GROUP }} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Group of buttons to select one of them",
      },
    },
  },
};

export const Popup = {
  args:{
    Id:BottomSheetIds.POPUP,
    PopupTitle:"Pop-up Title",
    Description:`Replace this component with a custom local component that contains your popup content.`,
    OnClickPrimary:() => {},
    OnClickSecondary:() => {},
    OnClick:(e) => {
      console.log(e, "Popup Clicked");
    },
    VagaroToolkit:1,
    NativeAction:0,
    CloseBackTitle:"From Control",
    Footer:0,
    TimerCount:0,
    IsFullLength:false,
  },
  render:(args) => (
    <VgBottomSheet {...{ ...args, Id: BottomSheetIds.POPUP }} />
  ),
  parameters:{
    docs:{
      description:{
        story:
          "Popup UI where title and description are available along with buttons",
      },
    },
  },
};
