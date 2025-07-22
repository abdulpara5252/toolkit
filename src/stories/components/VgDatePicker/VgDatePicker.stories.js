import VgDatePicker from "../../../components/VgDatePicker/VgDatePicker";

function getMinMaxDates() {
  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear, 0, 1);
  const maxDate = new Date(currentYear, 11, 31);

  return { minDate, maxDate };
}

export default {
  title: "Date Picker",
  component: VgDatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The **Date Picker** component allows users to select a date from a visual calendar interface, making it easy to choose and input dates. It simplifies date selection with features like predefined ranges, minimum/maximum dates, and formatting options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Title: {
      control: "text",
      type: { name: "string" },
      description: `Allow users to input a personalized title for the date range picker, enhancing flexibility in display.`,
    },
    DefaultDate: {
      control: "text",
      // options: ["today", "firstDateOfMonth", "clear", "none"],
      type : {name : "string"},
      description:
        `The DefaultDate property allows users to select a specific date from a date picker that will be displayed as the default. This ensures the date picker starts with a pre-selected date upon opening.
  - **today**: show today date by default
  - **firstDateOfMonth**: show first date of this month by default
  - **none**: don't show any date by default
  - **clear**: don't show any date by default
  - **User can also add customedate like 28 Jun ,2025**: 
        `,
      table: {
        type: { summary: "Date" },
        defaultValue: { summary: "-" },
      },
      transform: (value) => {
        const today = new Date();
        const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        switch (value) {
          case "today":
            return today;
          case "firstDateOfMonth":
            return firstOfMonth;
          case "none":
            return null;
          default:
            return null;
        }
      },
    },
    SetControlonRight: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: false,
      },
      description: `Enable this only when the device is mobile to adjust the input behavior accordingly.`
    },
    Onchange: {
      action: "changed",
      description:
        "The OnChange event listener for a date range triggers a function when the user selects or modifies the date range in the date picker. It allows developers to handle actions or updates based on changes in the selected dates.",
      table: {
        category: "Events",
      },
    },
    OnBlur: {
      action: 'onBlur',
      description: `The onBlur event for a date picker is triggered when the date picker loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the date picker`,
      table: {
        category: 'Events',
      },
    },
    Mindate: {
      control: "date",
      description:
        "	The MinDate property allows users to set a minimum date from the date picker, preventing the selection of any date earlier than the specified value. This is useful for restricting date ranges.",
      table: {
        type: { summary: "Date" },
        defaultValue: { summary: "-" },
      },
    },
    SelectAnytime:{
      control: "boolean",
      description:
        "The SelectAnytime property allows users to select any date from the date picker, regardless of the specified minimum or maximum date. This provides flexibility in date selection.",
    },

    isPastDateDisable: {
      control: "boolean",
      description:
        "	The isPastDateDisable property allows users to set a disable past date from the date picker, preventing the selection of any date earlier than the specified value. This is useful for restricting date ranges.",
      table: {
        disable: false,
      },
    },
    isFutureDateDisable: {
      control: "boolean",
      description:
        "	The isFutureDateDisable property allows users to set a disable Future date from the date picker, preventing the selection of any date earlier than the specified value. This is useful for restricting date ranges.",
      table: {
        disable: false,
      },
    },
    Maxdate: {
      control: "date",
      description:
        "The MaxDate property allows users to set a maximum date from the date picker, preventing the selection of any date beyond the specified limit. This helps in controlling the upper date range for user input.",
      table: {
        type: { summary: "Date" },
        defaultValue: { summary: "-" },
      },
    },
    Placeholder: {
      control: "text",
      description:
        "The DatePlaceholder property allows users to input custom placeholder text for the date picker field. This text provides a prompt or hint about selecting a date before any date is chosen.",
      table: {
        type: { summary: "String" },
        defaultValue: { summary: "-" },
      },
    },
    SetValue: {
      control: "text",
      description:
        "The **SetValue** property allows users to set a custom value for the date picker field. This value can be a specific date or date-time string, and will be displayed as the selected date in the picker.",
    },
    DateFormat: {
      control: "select",
      options: ["MMM DD, YYYY", "YYYY, DD MMM", "YYYY, MMM DD"], // Dropdown options for date format
      description:
        "The DateFormat property allows users to define the format in which the date will be displayed, such as MMM DD, YYYY or YYYY, DD MMM or YYYY,MMM DD. This ensures consistency in how the selected date appears in the date picker.",
      table: {
        disable: true,
        type: { summary: "String" },
        defaultValue: { summary: "-" },
      },
    },
    Country: {
      control: "select",
      options: ["U.S.A", "Canada", "Australia", "U.K."],
      description: `Country options for date format`,
    },
    Disabled: {
      control: "boolean",
      // table: {
      //   disable: true,
      // },
      description:
        "The DisabledDates property allows users to provide a list of specific dates that will be disabled in the date picker. These dates cannot be selected by the user, ensuring restricted date choices.",
    },
    Disableddates: {
      control: "array",
      description: `The DisabledDates property allows users to provide a list of specific dates that will be disabled in the date picker. These dates cannot be selected by the user, ensuring restricted date choices.

  Disableddates :  ["Oct 5, 2024", "Oct 6, 2024", "Oct 7, 2024", "Oct 8, 2024", "Oct 9, 2024", "Oct 10, 2024"]`,
      table: {
        type: { summary: "Array<Date>" },
        defaultValue: { summary: "-" },
      },
    },
    FocusBorder: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true,
      },
      description: `The Date Picker focus control activates the calendar view when the input field gains focus, allowing users to easily pick a date.`,
    },
    EmptyInputValue: {
      control: 'boolean',
      description: 'The EmptyInputValue property allows users to Empty date picker. These dates cannot be selected by the user, ensuring restricted date choices.',
    },
    DateRequired: {
      control: "boolean",
      description:
        "The DateRequired property, when set to a boolean value, makes selecting a date mandatory in the date picker. If true, the user must choose a date before proceeding or submitting a form.",
      table: {
        type: { summary: "Boolean" },
        defaultValue: { summary: "-" },
      },
    },
    ShowRequiredFieldMark: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The ShowRequiredFieldMark property lets users toggle a red star indicator for required fields by setting it to true or false. When true, the red mark is displayed, visually signaling mandatory fields in the component.`,
    },
    DatePickerName: {
      action: "datePickerName",
      table: { disable: true },
      description:"The DatePickerName property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging."
    },
    DatePickerOpen: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The DatePickerOpen property allows users to set the initial open state of the date picker. When set to true, the date picker opens automatically, providing immediate access to date selection.",
    },
    DatePickerId: {
      action: "string",
      table: { disable: true },
    },
    EnvironmentUrlDp: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
    },
    CrossIcon: {
      control: "boolean",
      type: { name: "boolean" },
      description: `When enabled, displays a cross icon that allows users to clear the selected date with a single click.`,
      table: {
        type: { summary: "Boolean" },
        defaultValue: { summary: "false" },
      },
    },
    CloseDatepickerOnSelect: {
      control: "boolean",
      type: { name: "boolean" },
      description: `When enabled, the date picker automatically closes after a date is selected. When disabled, the date picker remains open after selection, allowing for quick date comparisons or multiple selections.`,
      table: {
        type: { summary: "Boolean" },
        defaultValue: { summary: "true" },
      },
    },
    DatePickerVariant: {
      control: { type: "select" },
      options: ["small", "regular"],
      description:
        "The DatePickerVariant property allows users to select the size variant of the date picker. 'small' creates a more compact date picker suitable for limited space, while 'regular' displays the standard-sized date picker with conventional spacing and dimensions.",
      table: {
        type: { summary: "String" },
        defaultValue: { summary: "regular" },
      },
    },
    VagaroToolkit: {
      control: "Number",
      type: { name: "Number" },
      table: { disable: true },
      description:
        "The VagaroToolkit property, when set to a Number value",
    },
    DateFormat: {
      control: 'text',
      description: 'The DateFormat property allows users to define the format in which the date will be displayed, such as MM DD, YYYY or YYYY, DD MM or YYYY,MM DD  This ensures consistency in how the selected date appears in the date picker.',
    },
    HideCalendarIcon: {
      control: 'boolean',
      type: { name: "boolean" },
      description: `the 'HideCalendarIcon' property controls the visibility of the calendar icon and CLock icon.`,
    },
    ShowIcon: {
      control : 'text',
      description: `Show a custom icon when the calendar icon is hidden.`,
      table: { if: { arg: "HideCalendarIcon", truthy: true }, },
    },
    AnyTimeClick: {
      control: "boolean",
      description: `The AnyTimeClick property allows users to to click on AnyTime Button other wise it will not work.`,
    }
  },
};

const { minDate, maxDate } = getMinMaxDates();

export const Default = {
  args:{
    Title:"Date Picker:",
    DatePickerName:"",
    DatePickerOpen:false,
    SelectAnytime:false,
    isPastDateDisable:false,
    isFutureDateDisable:false,
    DefaultDate:"today",
    Mindate:minDate,
    Maxdate:maxDate,
    Placeholder:"Select Date",
    DatePickerVariant:"small",
    Country:"U.S.A",
    Disabled:false,
    Disableddates:[],
    DateRequired:false,
    DatePickerId:"",
    EmptyInputValue:false,
    EnvironmentUrlDp:"https://api.vagaro.com/",
    SetValue:"",
    CrossIcon:false,
    CloseDatepickerOnSelect:false,
    Onchange: () => {},
  },
  parameters:{
    docs:{
      description:{
        story:
          "The Date Picker default control allows users to select a single date from a calendar view, offering a simple and intuitive way to input dates.",
      },
    },
  },
};

export const Disabled = {
  args: {
    Title: "Date Picker",
    isPastDateDisable: false,
    isFutureDateDisable: false,
    DatePickerName: "",
    DatePickerId: "",
    Disabled: true,
    EmptyInputValue: true,
    DefaultDate: "today",
    CrossIcon: false
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Date Picker disable mode prevents user interaction, making the date picker inactive and grayed out, blocking date selection.",
      },
    },
  },
};

export const Focus = {
  args: {
    Title: "Date Picker",
    DatePickerName: "",
    isPastDateDisable: false,
    isFutureDateDisable: false,
    PlaceHolder: "Select Date",
    DatePickerId: "",
    FocusBorder: true,
    EmptyInputValue: true,
    DefaultDate: "today",
    SetControlonRight: false,
    CrossIcon: false
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Date Picker focus control activates the calendar view when the input field gains focus, allowing users to easily pick a date.",
      },
    },
  },
};
