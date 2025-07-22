import VgDateRangePicker from '../../../components/VgDateRangePicker/VgDateRangePicker';

function getMinMaxDates() {
  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear, 0, 1); 
  const maxDate = new Date(currentYear, 11, 31); 

  return { minDate, maxDate };
}

export default {
  title: 'Date Range Picker',
  component: VgDateRangePicker,
  parameters: {
    layout: 'default',
    docs: {
      description: {
        component:
          `A **Date Range Picker** is a user interface component that allows users to select a start and end date from a calendar or input field. It's commonly used in applications for booking, filtering data within a specific time period, or scheduling events over a date range.`
      }
    },
  },
  tags: ['autodocs'],
  argTypes: {
    Title: {
      control: "text",
      type: { name: "string" },
      description: `Allow users to input a personalized title for the date picker, enhancing flexibility in display.`,
      table: { category: "Title/PlaceHolder" },
    },
    DefaultStartDate: {
      control: 'select',
      options: ['today', 'firstDateOfMonth', 'none'],
      description: 'The DefaultStartDate property allows users to select a specific date from a date picker that will be displayed as the default. This ensures the date picker starts with a pre-selected date upon opening.',
      table: {
        type: { summary: 'Date' },
        DefaultOption: { summary: '-' },
        category: "DateRangeTools" 
      },
      transform: (value) => {
        const today = new Date();
        const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        switch (value) {
          case 'today':
            return today;
          case 'firstDateOfMonth':
            return firstOfMonth;
          case 'none':
            return null;
          default:
            return null;
        }
      },
    },
    DefaultEndDate: {
      control: 'select',
      options: ['endDateOfMonth', 'none'],
      description: 'The DefaultEndDate property allows users to select a specific date from a date picker that will be displayed as the default. This ensures the date picker starts with a pre-selected date upon opening.',
      table: {
        type: { summary: 'Date' },
        DefaultOption: { summary: '-' },
        category: "DateRangeTools"
      },
      transform: (value) => {
        const today = new Date();
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        switch (value) {
          case 'endDateOfMonth':
            return endOfMonth;
          case 'none':
            return null;
          default:
            return null;
        }
      },
    },
    OnChange: {
      action: 'changed',
      description: 'The OnChange event listener for a date range triggers a function when the user selects or modifies the date range in the date picker. It allows developers to handle actions or updates based on changes in the selected dates.',
      table: {
        category: 'Events',
    },
    },
    OnBlur: {
      action: 'onBlur',
      description: `The onBlur event for a date range picker is triggered when the date range picker loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the date picker`,
      table: {
        category: 'Events',
      },
    },
    OnClick: {
      action: 'onClick',
      description: `The onClick event for a date range picker is triggered when the user clicks on the date range picker component. This event can be used to open the date picker or perform actions when the user interacts with it.`,
      table: {
        category: 'Events',
      },
    },
    MinDate: {
      control: 'date',
      description: '	The MinDate property allows users to set a minimum date from the date picker, preventing the selection of any date earlier than the specified value. This is useful for restricting date ranges.',
      table: {
        type: { summary: 'Date' },
        DefaultOption: { summary: '-' },
        category: "DateRangeTools"
      },
    },
    MaxDate: {
      control: 'date',
      description: 'The MaxDate property allows users to set a maximum date from the date picker, preventing the selection of any date beyond the specified limit. This helps in controlling the upper date range for user input.',
      table: {
        type: { summary: 'Date' },
        category: "DateRangeTools",
      },
    },
    Placeholder: {
      control: 'text',
      description: 'The DatePlaceholder property allows users to input custom placeholder text for the date picker field. This text provides a prompt or hint about selecting a date before any date is chosen.',
      table: {
        type: { summary: 'String' },
        DefaultOption: { summary: '-' },
        category: "Title/PlaceHolder" 
      },
    },
    DateFormat: {
      control: 'text',
      description: 'The DateFormat property allows users to define the format in which the date will be displayed, such as MM DD, YYYY or YYYY, DD MM or YYYY,MM DD or DD MM, YYYY  This ensures consistency in how the selected date appears in the date picker.',
      table: {
        type: { summary: 'String' },
        DefaultOption: { summary: '-' },
        category: "DateRangeTools"
      },
    },
    Disabled: {
      control: 'boolean',
      description: 'The DisabledDates property allows users to provide a list of specific dates that will be disabled in the date picker. These dates cannot be selected by the user, ensuring restricted date choices.',
      table: {
        disable: true,
        type: { summary: 'Boolean' },
      },
    },
    EmptyInputValue: {
      control: 'boolean',
      description: 'The EmptyInputValue property allows users to Empty date picker. These dates cannot be selected by the user, ensuring restricted date choices.',
      table: { category: "DateRangeTools" },
    },
    ButtonPrimary: {
      control: { type: "text" },
      description:
        "The Child property allows dynamic content to be displayed on the button, enabling the button's label to be customized. Users can pass any text or element as a child, which will be rendered as the button's content.",
        table: { category: "DateRangeTools" },
    },
    ButtonSecondary: {
      control: { type: "text" },
      description:
        "The Child property allows dynamic content to be displayed on the button, enabling the button's label to be customized. Users can pass any text or element as a child, which will be rendered as the button's content.",
        table: { category: "DateRangeTools" },
    },
    ButtonThird: {
      control: { type: "text" },
      description:
        "The Child property allows dynamic content to be displayed on the button, enabling the button's label to be customized. Users can pass any text or element as a child, which will be rendered as the button's content.",
        table: { category: "DateRangeTools" },
    },
    DisabledDates: {
      control: 'array',
      description: `The DisabledDates property allows users to provide a list of specific dates that will be disabled in the date picker. These dates cannot be selected by the user, ensuring restricted date choices.
      
  Disableddates :  ["Oct 5, 2024", "Oct 6, 2024", "Oct 7, 2024", "Oct 8, 2024", "Oct 9, 2024", "Oct 10, 2024"]
      `,
      table: {
        type: { summary: 'Array<Date>' },
        DefaultOption: { summary: '-' },
        category: "DateRangeTools"
      },
    },
    Required: {
      control: 'boolean',
      description: 'The DateRequired property, when set to a boolean value, makes selecting a date mandatory in the date picker. If true, the user must choose a date before proceeding or submitting a form.',
      table: {
        category : "Required/Validation",
        type: { summary: 'Boolean' },
      },
    },
    ShowRequiredFieldMark: {
      control: "boolean",
      table: {
        category : "Required/Validation",
        type: { summary: 'Boolean' },
      },
      description: `The ShowRequiredFieldMark property lets users toggle a red star indicator for required fields by setting it to true or false. When true, the red mark is displayed, visually signaling mandatory fields in the component.`,
    },
    DateRangeName: {
      action: 'dateRangeName',
      table: { category: "DateRangeTools" },
    },
    StartDateInputName:{
      control: "text",
      type: { name: "string" },
      table: { category: "DateRangeTools" },
      description: "The StartDateInputName property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging."
    },
    EndDateInputName:{
      control: "text",
      type: { name: "string" },
      table: { category: "DateRangeTools" },
      description: "The EndDateInputName property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging."
    },
    DateRangePickerId : {
      action : 'string',
      table : {disable : true}
    },
    DefaultOption: {
      control: 'select',
      options: ["Today" , "Yesterday" , "Last 7 Days" , "Last 30 Days" , "This Month" , "Last Month" , "This Year" , "Last Year" , "none"],
      description: 'The DefaultOption select set in input',
      table: { category: "DateRangeTools" },
    },
    SetControlonRight: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: false,
      },
      description: `Enable this only when the device is mobile to adjust the input behavior accordingly.`
    },
    VagaroToolkit: {
      control: "Number",
      type: { name: "Number" },
      table: { disable: true },
      description:
        "The VagaroToolkit property, when set to a Number value",
    },
    ClearButtonCallback: {
      control: 'boolean',
      description: `The ClearButtonCallback property allows users to define a callback function that is triggered when the clear button is clicked in the date range picker. This function can be used to reset the date range or perform any other action when the user chooses to clear the selected dates.`,
    },
    SetValue: {
      control: "text",
      description: `The \`SetValue\` property allows users to input custom placeholder text for the date picker field. This text serves as a prompt or hint before any date is selected.

**Examples:**
- \`"06 29 2025 - 07 05 2025"\`
- \`"2025-07-05T00:00,2025-10-05T00:00"\``,
    },
     DateRangePickerPosition: {
      control: "select",
       options: ["left" , "right" , "auto"],
      table: { category: "DateRangeTools" },
      description: "The DateRangePickerPosition property controls where the date range picker appears relative to the input field. Options are: **'left'** (picker appears to the left), **'right'** (picker appears to the right), and **'auto'** (picker automatically chooses the best position based on available space). By default, the picker appears on the left unless another option is specified."
    },
	
  },
};

export const DateRangePicker = (args) => <VgDateRangePicker {...args} />;
const { minDate, maxDate } = getMinMaxDates();


DateRangePicker.args = {
  Title: "Date Range Picker:",
  DefaultStartDate: 'today',
  DateRangeName: "",
  DefaultEndDate: 'none',
  MinDate: minDate,
  MaxDate: maxDate,
  Placeholder: 'MM DD, YYYY',
  DateFormat: 'MM DD, YYYY',
  Disabled: false,
  DisabledDates: [],
  Required: false,
  ButtonPrimary: "Submit",
  ButtonSecondary: "Clear",
  ButtonThird: "Cancel",
  DateRangePickerId: 'DateRangePickerId1',
  EmptyInputValue: false,
  DefaultOption : "This Month",
  StartDateInputName: "",
  EndDateInputName: "",
  SetControlonRight: false,
  ClearButtonCallback: false,
  SetValue: ''
};
