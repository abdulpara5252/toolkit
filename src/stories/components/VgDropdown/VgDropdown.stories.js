import VgDropdown from "../../../components/VgDropdown/VgDropdown";

export default {
  title: "Dropdown",
  component: VgDropdown,
  parameters: {
    layout: "centered",
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
    // IsSearchable: {
    //   control: "boolean",
    //   type: { name: "boolean" },
    //   description:
    //     "The IsSearchable property enables or disables the search functionality within a dropdown. When enabled, it allows users to search for specific items in the dropdown list, improving navigation in long lists.",
    // },
    // ClearSearch:{
    //   control: "boolean",
    //   type: { name: "boolean" },
    //   description: `The ClearSearch property removes the searched item from the search filter in the dropdown.`,
    //   if: { arg: "IsSearchable", eq: true },
    // },
    ClearSelection: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The ClearSelection property, when set to a boolean value, allows users to clear any selected option in a dropdown. If true, a clear or reset option is provided, enabling users to deselect their current choice.",
        if: { arg: "Multi", eq: false },
    },
    DropdownDisabled: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true,
      },
      description:
        "The DropdownDisabled property, when set to a boolean value, controls whether a component (like a button or dropdown) is active or inactive. If true, the component is disabled, preventing user interaction.",
    },
    Virtualization: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The Virtualization property, when set to true, allows the parent item to be included in the dropdown options. This enables users to select a parent category or group within hierarchical dropdowns.",
      // table: { disable : true }
    },
    Multi: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The Multi property, when set to a boolean value, enables group functionality in a dropdown. If true, it allows users to organize options into multiple selectable groups within the dropdown.",
      table: { category: "Multi Select" },
    },
    Expanded: {
      control: "boolean",
      type: { name: "boolean" },
      description: 'The Expanded property, when set to a boolean value, controls the expand/collapse functionality in a dropdown. When  true, it allows users to group options into multiple selectable sections that can be expanded within the dropdown.',
      table: { category: "Multi Select" },
    },
    groupOptions: {
      control: "boolean",
      type: { name: "boolean" },
      description: "Select All checkbox Group option enable by set true",
      table: {
        disable: true,
      },
    },
    ApiUrl: {
      control: { type: "text" },
      description: "The RowData property allows users to input JSON data to populate the rows of a table component.",
      table: { category: 'API' }
    },
    ApiRequestParams: {
      control: "object",
      type: { name: "object" },
      description: `Object defining API request parameters
  - **parentIdKey**: Key for the parent ID (e.g., "id")
  - **parentTitleKey**: Key for the parent title (e.g., "title")
  - **childIdKey**: Key for the child ID (e.g., "id")
  - **childTitleKey**: Key for the child title (e.g., "value")
  - **responseType**: "Single" | "Grouped" | "Nested"
  - **nestedChildObject**: Key representing the nested child object (e.g., "child")
  - **parentChildRelationshipName**: Relationship key between parent and child single list from responce (e.g., "parentId")
  - **headers**: Request headers
    - **Authorization**: "Bearer your-token"
    - **Content-Type**: "application/json"
  - **method**: "GET" | "POST"
  - **body**: Accepts body when POST method is passed
  - **dataKey**: Key for data object (e.g., "data")
  - **totalCountKey**: Key for total count (e.g., "count")

      `,
      table: { category: 'API' }
    },

    FocusBorder: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The "Focus Border" property is a boolean that controls whether the Textbox displays a border when focused. If set to true, the border becomes visible when the user clicks or navigates into the Textbox; otherwise, it remains hidden.`,
      table: {
        disable: true,
      },
    },
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The Required property, when set to a boolean value, designates whether a field or dropdown must be filled out before form submission. If true, the field is mandatory, and users must select or input a value.",
      table: { category: 'Required/Validation' }
      // table: {
      //   disable: true,
      // },
    },
    ShowRequiredFieldMark: {
      control: "boolean",

      // table: {
      //   disable: true,
      //   type: { summary: 'Boolean' },
      // },
      description: `The ShowRequiredFieldMark property lets users toggle a red star indicator for required fields by setting it to true or false. When true, the red mark is displayed, visually signaling mandatory fields in the component.
 `,
      table: { category: 'Required/Validation' }
    },
    DropdownName: {
      control: "text",
      type: { name: "string" },
      description: "The DropdownName property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging.",
      // table: {
      //   disable: true,
      // },
    },
    DropdownData: {
      control: "object",
      type: { name: "array" },
      description: `The DropdownData property allows users to input a JSON structure containing parent and child elements, which can be used to dynamically populate a hierarchical dropdown. This makes it easy to display nested options within the dropdown menu.
      \n
[{
  "label": "Colours",
  "options": [{
    "value": "ocean",
    "label": "Ocean"
  }]
}, {
  "label": "Flavours",
  "options": [{
    "value": "vanilla",
    "label": "Vanilla"
  }]
}]`,
      if: { arg: "ApiUrl", eq: "" },
    },
    DefaultSelectedValue: {
      control: "object",
      type: { name: "array" },
      table: { disable: true },
      description: `The DefaultSelectedValue  property allows users to specify a value that will be pre-selected and displayed as the default in a dropdown or input field. This ensures a starting selection is available before any user interaction. E.g. { value: "ocean", label: "Ocean" }`,
    },
    // CloseMenuOnSelect: {
    //   control: "boolean",
    //   type: { name: "boolean" },
    //   description:
    //     "The CloseMenuOnSelect property, when set to a boolean value, controls whether the dropdown automatically closes after an option is selected. If true, the dropdown will close upon selection, enhancing user flow.",
    // },
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
    ShowCheckBoxInGroup: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The ShowCheckBoxInGroup property, when set to a boolean value, determines whether a checkbox appears next to parent items in a dropdown. If true, users can select or deselect parent categories using checkboxes.",
      // if: { arg: "Multi" },
      table: { category: "Multi Select" },
    },
    ChildCheckbox: {
      control: "boolean",
      type: { name: "boolean" },
      // if: { arg: "Multi" },
      description: `The ChildCheckbox property, when set to true, enables child selection functionality within the dropdown. This allows users to group options, making both parent and child selections possible within the dropdown.`,
      table: { category: "Multi Select" },
    },
    ShowSelectAllSelectNone: {
      control: "boolean",
      type: { name: "boolean" },
      description:
        "The ShowSelectAllSelectNone property, when set to a boolean value, set custom selected options name instead of All selected",
      if: { arg: "Multi" },
      table: {
        disable: false, // Hide from docs
      },
    },
    CustomPlaceholderName: {
      control: "text",
      type: { name: "string" },
      description:
        "The CustomPlaceholderName property, set dropdown custom selected options name",
      if: { arg: "Multi" },
      table: { category: "Multi Select" },
    },
    //     DropdownWidth: {
    //       control: "number",
    //       type: { name: "number" },
    //       description: `The DropdownWidth property controls the width of the dropdown component:
    // - When set to 0: The dropdown will automatically adjust its width based on content (auto width)
    // - When set to any positive number: The dropdown will have a fixed width in pixels (e.g., 350 for 350px)

    //This flexibility allows the dropdown to either adapt to its content or maintain a specific width as needed.`,

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
      if: { arg: "ScrollPagination" },
      description: `Triggered when the user scrolls within the dropdown. It fires when the user scrolls near the bottom of the options list, typically to load more items via pagination. The event provides the scroll position and can be used to trigger additional data loading or pagination actions.`,
    },
    Loading: {
      control: "boolean",
      table: {
        disable: true, // Hide from docs
      },
    },
    OnSearchForApi: {
      action: "onChange",
      table: { category: "Events" },
      description: `Triggered when the user scrolls within the dropdown. It fires when the user scrolls near the bottom of the options list, typically to load more items via pagination. The event provides the scroll position and can be used to trigger additional data loading or pagination actions.`,
    },
    OnOptionButtonClick: {
      action: "clicked",
      table: { category: "Events" },
      description: ``,
      if: { arg: "AddOptionButtonText" },
    },
     OnValidation: {
      action: 'onValidationChange',
      description: 'This event is triggered when the validation status of the input changes.',
    },
    OpenFromBody: {
      control: "boolean",
      type: { name: "boolean" },
      table: {
        disable: true, // Hide from docs
      },
    },
    GroupOptions: {
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
    MenuPlacement: {
      control: "text",
      table: {
        disable: true, // Hide from docs
      },
    },
    DropdownName: {
      control: "text",
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
    // SearchByApi: {
    //   control: "boolean",
    //   type: { name: "boolean" },
    //   description: "The SearchByApi property enables or disables searching options via API.",
    // },
    ShowCustomMessage: {
      control: "text",
      table: {
        disable: true, // Hide from docs
      },
    },
    DefaultValue: {
      control: "text",
      table: {
        disable: true, // Hide from docs
      },
    },
    // IsApplyButtonOn: {
    //   control: "boolean",
    //   table: {
    //     disable: true, // Hide from docs
    //   },
    // },
    RightSwipeEvent: {
      control: "boolean",
      table: {
        disable: true, // Hide from docs
      },
    },
    VirtualDropdownHeight: {
      control: "number",
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
    RequiredMessage: {
      control: "text",
      description: `The RequiredMessage property is used to validate input and display an error message when required.`,
      table: { category: 'Required/Validation' }
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
    IsFullLenght: {
      control: "boolean",
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
    AutoFocus: {
      control: "boolean",
      table: {
        disable: true, // Hide from docs
      },
    },
    SearchAutoFocus: {
      control: "boolean",
      type: { name: "boolean" },
      table: { category: 'Search' }
    },
    SetDefault: {
      control: "boolean",
      table: {
        disable: true,
      },
      description:
        `The SetDefault property is used to set the dropdown to its default state programmatically. This property ensures flexibility by allowing users to reset or initialize the dropdown.`,
    },
    ScrollPagination: {
      control: "boolean",
      table: {
        category: "Scroll Pagination",
        // disable: ({ Virtualization }) => Virtualization 
      },
      if: { arg: "Virtualization", eq: false },
      description: "The ScrollPagination property enables loading more options when scrolling to the bottom of the dropdown list."
    },
    AddOptionButtonText: {
      control: { type: "text" },
      description: `The Child property allows dynamic content to be displayed on the button, enabling the button's label to be customized. Users can pass any text or element as a child, which will be rendered as the button's content.`,
      table: { category: 'OptionButton' }
    },
    InfoTooltipMessage: {
      control: "text",
      type: { name: "string" },
      description: `The Tooltip Message property allows users to input a custom message for each tab, which will display in the tooltip when hovered or tapped. This enables personalized guidance or descriptions to assist users in understanding each tab's purpose.`,
      table: { category: 'ToolTip' }
    },
    Searchable: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The Searchable property, when set to a boolean value, enables or disables the search functionality within a dropdown. When enabled, it allows users to search for specific items in the dropdown list, improving navigation in long lists.`,
      table: { category: 'Search' }
    },
    BeakPosition: {
      control: 'select',
      options: ['Left', 'Middle', 'Right'],
      description: '',
      if: {
        arg: "InfoTooltipMessage",
        truthy: true
      },
    },
    RecordsPerPage: {
      control: "number",
      description: `The RecordsPerPage property defines the number of items displayed per page in the dropdown list.`,
      table: { category: "Scroll Pagination" },
    },
    SelectedIds: {
      control: "array",
      description: `The SelectedIds property, allows users to pre-select items in the dropdown list by passing an array of selected item IDs.
  - **[-1]**: Pass -1 to select all items
  - **["KItWsEk3ocJtLTwkvfnp~g==", "KO5br9z-dW3wT~cttMntJQ==",]**: Pass an array of item IDs to select specific items
      `,
      table: { category: 'DefaultValue' }
    },
    SetBottomSheetDropdown: {
      control: "boolean",
      type: { name: "boolean" },
      description: `The SetBottomSheetDropdown property, when set to a boolean value, allows the dropdown to be displayed as a bottom sheet. It works only in mobile view.`,
      table: { category: 'ForMobile' }
    },
    OnClickOutside: {
      action: "clicked",
      table: { category: "Events" },
      description: `The OnClickOutside event is triggered when a user clicks outside the dropdown. It can be used to get the dropdown's status of click outside state or perform other actions.`,
    },
    CloseCallback: {
      action: "clicked",
      table: { category: "Events" },
      description: `The CloseCallback event is triggered when a user clicks back button in mobile the dropdown. It can be used to get the dropdown's status of click outside state or perform other actions.`,
    },
  },
};

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

const flavourOptions = [
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "salted-caramel", label: "Salted Caramel" },
];

const groupedOptions = [
  {
    label: "Colours",
    options: colourOptions,
  },
  {
    label: "Flavours",
    options: flavourOptions,
  },
];


export const Default = {
  args:{
    DropdownTitle:"Field Title",
    DropdownPlaceholder:"Select Color Options",
    ApiUrl:"https://dev50apiv2.bookitall.com/us02/api/v2/merchants/inventory/brands?&IsBusinessUsedBrand=true&VendorId=",
    ApiRequestParams:{
      headers:{
        'ac_tkn': '',
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'accept-language': 'en-US',
        'cache-control': 'no-cache',
        'employeeid': 's1OHm55HTnWmUg8RcYbyrg==',
        'merchantid': 'q3Vf9lrABcqgyMpc4kBJ7w==',
        'origin': 'https://dev50.bookitall.com',
        'pragma': 'no-cache',
        'priority': 'u=1',
        'referer': 'https://dev50.bookitall.com/',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': "Windows",
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
        'userid': 's1OHm55HTnWmUg8RcYbyrg=='
      },
      parentIdKey:'id',
      parentTitleKey:'name',
      method:'GET',
      ChildIdKey:'',
      ChildTitleKey:"",
      responseType:"Single",
      dataKey:"data.brands",
      totalCountKey:"data.count",
      nestedChildObject:"",
      parentChildRelationshipName:"parentId",
    },
    SearchPlaceholder:"Search",
    ScrollPagination:true,
    DropdownDisabled:false,
    Multi:true,
    Expanded:false,
    Virtualization:false,
    DropdownData:[{
      "label": "Colours",

      "options": [{
        "value": "ocean",
        "label": "Oceans"
      }, {
        "value": "blue",
        "label": "Blue"
      }, {
        "value": "purple",
        "label": "Purple"
      }, {
        "value": "red",
        "label": "Red"
      }, {
        "value": "orange",
        "label": "Orange"
      }, {
        "value": "yellow",
        "label": "Yellow"
      }, {
        "value": "green",
        "label": "Green"
      }, {
        "value": "forest",
        "label": "Forest"
      }, {
        "value": "slate",
        "label": "Slate"
      }, {
        "value": "silver",
        "label": "Silver"
      }]
    }, {
      "label": "Flavours",

      "options": [{
        "value": "vanilla",
        "label": "Vanilla"
      }, {
        "value": "chocolate",
        "label": "Chocolate"
      }, {
        "value": "strawberry",
        "label": "Strawberry"
      }, {
        "value": "salted-caramel",
        "label": "Salted Caramel"
      }]
    }], 
    ClearSelection: false,
    OnValidation: () => {},
    Required:false,
    Virtualization:false,
    ShowCheckBoxInGroup:true,
    ChildCheckbox:true,
    ShowSelectAllSelectNone:true,
    CustomPlaceholderName:"Selected",
    OpenFromBody:true,
    GroupOptions:true,
    CloseFromOutSide:false,
    SetCustomPlaceholder:true,
    MenuPlacement:"auto",
    DropdownName:"",
    DropdownClosingName:"",
    IsSelect2OpenCallback:false,
    Select2OpenCallback:false,
    ShowCustomMessage:"No results found. Please try another search.",
    DefaultValue:[],
    SetDefault:false,
    OpenDropdown:false,
    RightSwipeEvent:true,
    VirtualDropdownHeight:300,
    ClassNamePrefix:"vg-select2-dropdown",
    CustomClassNamePrefix:"custom-class",
    RequiredMessage:"This field is required",
    DropdownId:"",
    NativeActionValue:13,
    ShowHideFooter:2,
    CallBackTimeCount:0,
    IsFullLenght:false,
    TabIndex:0,
    AutoFocus:true,
    SearchAutoFocus:false,
    VagaroToolkit:1,
    AddOptionButtonText:"sdc",
    InfoTooltipMessage:"",
    BeakPosition:"Left",
    SelectedIds:[-1],
    Searchable:true,
    RecordsPerPage:10,
    CloseCallback:() => {},
    SetBottomSheetDropdown:true,
    OnClickOutside:() => { },
    onChange:() => { },
    DropdownClosed:() => { },
  },

};

export const Disabled = {
  args: {
    DropdownTitle: "Field Title",
    DropdownPlaceholder: "Select Colour Options",
    DropdownDisabled: true,
    ApiUrl: "https://67a5ed83510789ef0df9c505.mockapi.io/api/users",
    InfoTooltipMessage: "",
    BeakPosition: "Left",
    VagaroToolkit: 1,
    NativeActionValue: 13,
    ShowHideFooter: 2,
    DropdownId: "",
    DefaultValue: []
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Disabled variant, when set to a boolean value, controls whether a component is active or inactive.",
      },
    },
  },
};

export const ErrorValidation = {
  args: {
    DropdownTitle: "Field Title",
    DropdownPlaceholder: "Select Colour Options",
    Required: true,
    ApiUrl: "https://67a5ed83510789ef0df9c505.mockapi.io/api/users",
    InfoTooltipMessage: "",
    BeakPosition: "Left",
    NativeActionValue: 13,
    ShowHideFooter: 2,
    DropdownId: "",
    VagaroToolkit: 1,
    DefaultValue: []
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Error Validation variant, when set to a boolean value, designates whether a field or dropdown must be filled out before form submission.",
      },
    },
  },
};

export const FocusBorder = {
  args: {
    DropdownTitle: "Field Title",
    DropdownPlaceholder: "Select Colour Options",
    ApiUrl: "https://67a5ed83510789ef0df9c505.mockapi.io/api/users",
      InfoTooltipMessage: "",
    BeakPosition: "Left",
    NativeActionValue: 13,
    DropdownWidth: 0,
    ShowHideFooter: 2,
    DropdownId: "",
    FocusBorder: true,
    VagaroToolkit: 1,
    DefaultValue: []
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Focus Border variant, Use when prompting user for focus border.",
      },
    },
  },
};
