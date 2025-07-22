import VgCheckoutCustomerDropdown from "../../../components/VgCheckoutCustomerDropdown/VgCheckoutCustomerDropdown";

export default {
  title: "Checkout Customer Dropdown",
  component: VgCheckoutCustomerDropdown,
  parameters: {
    layout: "default",
    docs: {
      description: {
        component:
          "Dropdown Fields allow users to select from an Options List displayed in a Dropdown Menu. Dropdown Fields are useful for hiding a long list of options. If the options need to always be visible to users, consider using Segment instead.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    DropdownPlaceholder: {
      control: "text",
      type: { name: "string" },
      description:
        "The DropdownPlaceholder property allows users to input a default text value that appears in a dropdown before any selection is made. It provides a hint or prompt about what the dropdown is for or what options are available.",
      table: {
        category: 'Title/PlaceHolder'
      }
    },
    DropdownTitle: {
      control: "text",
      type: { name: "string" },
      description: `The "Dropdown Title" allows users to input and edit a custom title for their content. This field is intended for users to clearly label or identify the subject of their text or project.`,
      table: {
        category: 'Title/PlaceHolder'
      }
    },
    DropdownName: {
      control: "text",
      type: { name: "string" },
      description: "The DropdownName property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging.",
    },
    VagaroToolkit: {
      control: "Number",
      type: { name: "Number" },
      table: { disable: true },
      description:
        "The VagaroToolkit property, when set to a Number value",
    },
    OpenDropdown: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
      description: "Dropdown menu default open by set true",
    },
    ShowCheckbox: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The ShowCheckbox property, when set to a boolean value, determines whether a checkbox appears next to parent items in a dropdown. If true, users can select or deselect parent categories using checkboxes.",
    },
    SearchPlaceholder: {
      control: "text",
      type: { name: "string" },
      description:
        `The SearchPlaceholder property allows the user to search for an item in the dropdown string `,
      table: {
        category: 'Title/PlaceHolder'
      }
    },
    onChange: {
      action: "onChange",
      table: { category: "Events" },
      description: `The "onChange" listener for dropdown. when select any option from options menu`,
    },
    OnScrollPagination: {
      action: "scrolled",
      table: { category: "Events" },
      description: `Triggered when the user scrolls within the dropdown. It fires when the user scrolls near the bottom of the options list, typically to load more items via pagination. The event provides the scroll position and can be used to trigger additional data loading or pagination actions.`,
    },
    OnSearch: {
      action: "onChange",
      table: { category: "Events" },
      description: `Triggered when the user scrolls within the dropdown. It fires when the user scrolls near the bottom of the options list, typically to load more items via pagination. The event provides the scroll position and can be used to trigger additional data loading or pagination actions.`,
    },
    OpenFromBody: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
    },
    CloseFromOutSide: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
    },
    DropdownClosed: {
      control: "onChange",
      table: {
        disable: true, // Hide from docs
      },
    },
    SetCustomPlaceholder: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
    },
    DropdownClosingName: {
      control: "text",
      table: {
        disable: true, // Hide from docs
      },
    },
    IsSelect2OpenCallback: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
    },
    Select2OpenCallback: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
    },
    ShowCustomMessage: {
      control: "text",
      table: {
        disable: true, // Hide from docs
      },
    },
    RightSwipeEvent: {
      control: "boolean",
      table: {
        disable: true, // Hide from docs
      },
    },
    ClassNamePrefix: {
      control: "text",
      table: {
        disable: true, // Hide from docs
      },
    },
    CustomClassNamePrefix: {
      control: "text",
      table: {
        disable: true, // Hide from docs
      },
    },
    DropdownId: {
      control: "text",
      table: { disable: true },
    },
    NativeActionValue: {
      control: "number",
      table: {
        disable: true, // Hide from docs
      },
    },
    ShowHideFooter: {
      control: "number",
      table: {
        disable: true, // Hide from docs
      },
    },
    CallBackTimeCount: {
      control: "number",
      table: {
        disable: true, // Hide from docs
      },
    },
    TabIndex: {
      control: "number",
      table: {
        disable: true, // Hide from docs
      },
    },
    OnClickOutside: {
      action: "clicked",
      table: { category: "Events" },
      description: `The OnClickOutside event is triggered when a user clicks outside the dropdown. It can be used to get the dropdown's status of click outside state or perform other actions.`,
    },
  },
};

export const Default = {
  args: {
    DropdownTitle: "Customers",
    DropdownPlaceholder: "Search by Name, Phone Number, or Email Address",
    ApiUrlInToday: 'https://api.vagaro.com/US02/api/v2/merchants/checkout/checkout/getcustomersnotcheckedout',
    ApiRequestParams:{
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json; charset=UTF-8',
        'Device': 'website',
        'DeviceID': 'calendar',
        'Origin': 'https://us02.vagaro.com',
        'Referer': 'https://us02.vagaro.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        '_vdpb_id': 'U2FsdGVkX1+umlO2U/mSDMlK3nw5J2MMiKuS7qEEQbk=',
        '_vdpt': 'U2FsdGVkX18Al4roMEJIWtwEw5Hb/3D2WXkYgGhAxN+McSgBQ2p1WyR7UBD/hre+a5XgL3EAPn659wGVV9kviA==',
        '_vdpu_id': 'U2FsdGVkX19EahXCuijIlgXkQEa4FCIzq9VSuKNsW+w=',
        'bi': '354300',
        'grouptoken': 'US02',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'token1': 'U2FsdGVkX1/x1d2faRet+6hL6euMFJ2xKMr+Z7Dum8o=',
        'token2': 'U2FsdGVkX1/Vqu75CNpb/bcr9GnTqx0HRMn0UX0VWag=',
        'ui': '186684467',
      },
    },  
    SearchPlaceholder: "Search",
    ShowCheckbox: true,
    OpenFromBody: true,
    CloseFromOutSide: false,
    DropdownName: "",
    DropdownClosingName: "",
    IsSelect2OpenCallback: false,
    Select2OpenCallback: false,
    ShowCustomMessage: "No Customers Found",
    RightSwipeEvent: true,
    ClassNamePrefix: "vg-checkout-customer-dropdown",
    CustomClassNamePrefix: "",
    DropdownId: "",
    NativeActionValue: 13,
    ShowHideFooter: 2,
    CallBackTimeCount: 0,
    // IsFullLenght: false,
    TabIndex: 0,
    VagaroToolkit: 1,
    OnClickOutside: () => { },
    onChange: () => { },
    DropdownClosed: () => { },
    EnableTabs: true,
    BusinessId: 354300,
    HasCustomerRight: true,
    LoginUserId: 0,
    DepositGroupID: "",
    TransactionDate: "2025-04-29",
    SelectedCustomer: {
      "value": 223328789,
      "label": "aa aa",
      "email": "mayurparekhimported1@vagaro.com",
      "profileImage": "default-image-url",
      "points": 0,
      "customerData": {
        "UserID": 223328789,
        "FirstName": "aa",
        "LastName": "aa",
        "Cell": "",
        "DayPhone": "",
        "NightPhone": "",
        "EmailId": "mayurparekhimported1@vagaro.com",
        "CellCountryId": 1,
        "EncCusID": "cv-IDmFA8PgsytuR~DvAEA=="
      }
    }
  },
};