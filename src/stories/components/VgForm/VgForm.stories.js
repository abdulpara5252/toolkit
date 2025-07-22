import VgForm from "../../../components/VgForm/VgForm";
import VgPopupForm from "../../../components/VgForm/VgPopupForm";
import VgTableForm from "../../../components/VgForm/VgTableForm";

export default {
  title: "Form/VgForm",
  component: VgForm,
  parameters: {
    layout: "fullscreen", // Changed from "centered" since it's a full form
    docs: {
      description: {
        component: `
VgForm is a comprehensive form component that demonstrates the integration of multiple Vagaro custom components including:

- **Input Controls**: VgInput with various validation types (text, email, numeric, regex)
- **Date/Time Components**: VgDatePicker, VgTimePicker, VgDateRangePicker  
- **Selection Components**: VgDropdown, VgCheckbox, VgToggle
- **Communication**: VgPhoneControl with country dropdown, VgAddressControl with verification
- **Media**: VgImageUploader, VgColorPicker
- **UI Elements**: VgBadge, VgTooltip, VgAvatar, VgBottomSheet, VgPopup
- **Advanced Features**: VgTextarea with AI integration, VgDragList, VgStepper

The form includes comprehensive validation handling through refs and demonstrates real-world usage patterns for employee profile management.

**Key Features:**
- Form validation with error handling
- API integration for dropdown data
- Responsive design with mobile-first approach
- AI-powered textarea with tone and range controls
- Drag & drop list management
- Multi-step stepper controls
        `,
      },
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Since VgForm doesn't accept props, we'll document what it contains
    // FormSections: {
    //   description: "The form contains multiple sections: Personal Information, Company Information, and Business Information",
    //   table: {
    //     category: "Structure",
    //     type: { summary: "object" },
    //     defaultValue: { summary: "Fixed structure with predefined sections" },
    //   },
    //   control: false,
    // },
  },
};

// Template function
const Template = (args) => <VgForm {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {};
Default.storyName = "Complete Form";
Default.parameters = {
  docs: {
    source: {
      code: `import React, { Fragment, useRef, useState } from "react";
import axios from "axios";
import {
  VgAddressControl,
  VgButton,
  VgColorPicker,
  VgDatePicker,
  VgDateRangePicker,
  VgDropdown,
  VgImageUploader,
  VgInput,
  VgPhoneControl,
  VgTextarea,
  VgTimePicker,
  VgToggle,
  Svg,
  VgReviewRating,
  VgStepper,
  VgSmileyInput,
  VgLoginInput,
  VgTextEditor,
} from "@vagaro/vagaro-react-toolkit";
//import theme tokens and typography tokens css for implement theme and typography (styles) in react toolkit components
import "../vg-theme-token.css"; //import vg-theme-token css
import "../vg-typography-token.css"; //import vg-typography-token css

const VgForm: React.FC = () => {
  const [error, setError] = useState("");
  const formValidator = useRef<{ [key: string]: any | null }>({});
  const [show, setShow] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    // Manually trigger form validation and access ref values
    const validationResults = Object.keys(formValidator.current).reduce(
      (acc: { [key: string]: any }, key) => {
        const result = formValidator.current[key]?.validate();
        if (result) {
          acc[key] = result;
        }
        return acc;
      },
      {}
    );
    console.log("Form validation results:", validationResults);
  };

  const defaultOptions = [
    { id: "1", name: "Joe edited 2hfkdshfkds Ford 333 0", selected: true },
    { id: "2", name: "Yash Mathukiya", selected: true },
    { id: "3", name: "Rich@rd^ Miller", selected: true },
    { id: "4", name: "Harischandra ?", selected: false },
    { id: "5", name: "Mayur Multi Provider", selected: false },
    { id: "6", name: "emp10 10", selected: false },
    { id: "7", name: "John20 Lewish", selected: false },
    { id: "8", name: "tick ettest", selected: false },
    { id: "9", name: "Owner Owner", selected: false },
    { id: "10", name: "SP Sync Employee", selected: false },
  ];

  const handleAIClick = async () => {
    const response = await axios(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(response.data);
    setShow(true);
  };

  return (
    <Fragment>
      <div className="vg-reacttk">
        <div className="vg-section-title">Personal Information</div>
        <div className="emp-profile-form-wrap">
          <div className="emp-profile-form">
            <div className="emp-form-row">
              <div className="emp-col-6 mb-3">
                <VgInput
                  ref={(data: any) => (formValidator.current["url"] = data)}
                  InfoTooltipMessage=""
                  InputId="input1"
                  InputMode="none"
                  InputTitle="Url:"
                  Name=""
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  PlaceHolder=""
                  PrefixIcon="none"
                  EnableOnChangeValidation={false}
                  RegexErrorMessage="Invalid Url"
                  RegexPattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,9}(:[0-9]{1,5})?(\/.*)?$"
                  SetValue=""
                  SuffixIcon="none"
                  Type="text"
                  UrlPrefix="www.vagaro.com/"
                  Validation="regex"
                  max={100}
                  min={0}
                  Required
                />
              </div>
              <div className="emp-col-6 mb-3">
                <VgInput
                  ref={(data: any) => (formValidator.current["email"] = data)}
                  CustomErrorMessage="invalid email"
                  InfoTooltipMessage=""
                  InputId="Email"
                  InputMode="none"
                  InputTitle="Email:"
                  Required
                  Name="Email"
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  PlaceHolder=""
                  PrefixIcon="none"
                  SetControlonRight
                  SetValue=""
                  SuffixIcon="none"
                  Type="text"
                  UrlPrefix=""
                  Validation="email"
                  max={100}
                  min={0}
                />
              </div>
              <div className="emp-col-6 mb-3">
                <VgDatePicker
                  Country="U.S.A"
                  DatePickerId=""
                  DatePickerName=""
                  DefaultDate="firstDateOfMonth"
                  Disableddates={[]}
                  EnvironmentUrlDp="https://api.vagaro.com/"
                  Maxdate={new Date("2025-12-30T18:30:00.000Z")}
                  Mindate={new Date("2024-12-31T18:30:00.000Z")}
                  OnBlur={() => {}}
                  Onchange={() => {}}
                  Placeholder="Select Date"
                  SetControlonRight
                  SetValue=""
                  Title="Date Picker:"
                />
                {error && (
                  <div className="vg-input-control-error-msg">{error}</div>
                )}
              </div>

              <div className="emp-col-6 mb-3">
                <label className="field-label">Select:</label>
                <select className="vg-input-control custom-select-control">
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-Binary</option>
                </select>
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgInput
                  ref={(data: any) =>
                    (formValidator.current["password"] = data)
                  }
                  CustomErrorMessage="invalid password"
                  FocusBorder="none"
                  InfoTooltipMessage=""
                  InputId=""
                  InputMode="none"
                  InputTitle="Password:"
                  Name=""
                  OnBlur={() => {}}
                  OnBlurValidation
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  OnValidate={() => {}}
                  Password
                  PlaceHolder=""
                  PrefixIcon="none"
                  Required
                  SetValue=""
                  SuffixIcon="none"
                  Type="text"
                  UrlPrefix=""
                  Validation="none"
                  max={100}
                  min={0}
                />
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgInput
                  ref={(data: any) =>
                    (formValidator.current["firstname"] = data)
                  }
                  InfoTooltipMessage=""
                  InputId=""
                  InputMode="none"
                  InputTitle="First Name:"
                  Required
                  Name=""
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  PlaceHolder=""
                  PrefixIcon="none"
                  SetControlonRight
                  SetValue=""
                  Type="text"
                  Validation="none"
                  max={100}
                  min={0}
                  UrlPrefix=""
                />
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgInput
                  DropInValue="All United States"
                  InfoTooltipMessage=""
                  InputDrop
                  InputId=""
                  InputText="All United States"
                  InputTitle="DropInInput:"
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  OnValidate={() => {}}
                  PlaceHolder="Enter Miles"
                  PrefixIcon="none"
                  SetValue=""
                />
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgTextarea
                  AsyncClickEvent
                  AutoFocus
                  CharacterCountEnableForAi
                  CloseBackTitle="From Control"
                  Footer={2}
                  LabelText="TextArea:"
                  MaximumLength={1500}
                  MaximumLengthForAi={1500}
                  Name=""
                  NativeAction={13}
                  OnBlur={() => {}}
                  OnCrossClick={() => {}}
                  OnEmojiClick={() => {}}
                  OnTickClick={() => {}}
                  PlaceHolder="Type here..."
                  SetValue=""
                  TextAreaId=""
                  TextareaVariant="Default"
                  TimerCount={0}
                  VagaroToolkit={1}
                  onChange={() => {}}
                />
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <div key="false">
                  <VgAddressControl
                    ref={(data: any) =>
                      (formValidator.current["address"] = data)
                    }
                    AddressControlId=""
                    AddressLine1InputName="address1"
                    AddressLine2InputName="address2"
                    Show_Address_line2
                    CallBackTimeCount={0}
                    CountryDropdownCloseName=""
                    CountryDropdownOpenName="Select Country"
                    CurrentCountry=""
                    EnvironmentUrl="https://api.vagaro.com/"
                    CountryDropdown
                    NativeActionValue={13}
                    OnBlur={() => {}}
                    OnChange={() => {}}
                    Orientation="vertical"
                    PlaceHolderAddressline1="Business Address Line 1"
                    PlaceHolderAddressline2="Business Address Line 2 (Optional)"
                    SetAddresLine2Value=""
                    ShouldVerifyAddress
                    ShowHideFooter={2}
                    TitleAddressline1="Business Address Line 1:"
                    TitleAddressline2="Business Address Line 2 (Optional):"
                    VagaroToolkit={1}
                    onSelect={() => {}}
                    Required
                    VerifyAddressCountryDropdown
                  />
                </div>
              </div>
              <div className="emp-col-6 mb-3 fullwidth">
                <VgTextEditor
                  AiControlPopup
                  OnChange={() => {}}
                  OnChangeRange={() => {}}
                  OnChangeTone={() => {}}
                  OnClickCancle={() => {}}
                  OnClickClose={() => {}}
                  OnClickNext={() => {}}
                  OnClickPrevious={() => {}}
                  OnClickRegenerate={() => {}}
                  OnClickUseThisText={() => {}}
                  PlaceHolder="Enter description"
                  AutoFocus={false}
                  RawData={[
                    {
                      Index: 0,
                      InputDescription: "I am salon professional Nikunj sir",
                      Range: 100,
                      Tone: "energetic",
                    },
                    {
                      Index: 1,
                      InputDescription: "I am salon professional Sagar Battul",
                      Range: 75,
                      Tone: "trendy",
                    },
                    {
                      Index: 2,
                      InputDescription:
                        "I am salon professional The issue arises from the fact that when you're updating the history in your",
                      Range: 25,
                      Tone: "casual",
                    },
                    {
                      Index: 3,
                      InputDescription:
                        "I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.",
                      Range: 50,
                      Tone: "motivational",
                    },
                    {
                      Index: 4,
                      InputDescription: "I am salon professional Sagar Battul",
                      Range: 0,
                      Tone: "professional",
                    },
                  ]}
                  SetValue=""
                  Style
                  Title="Text Editor:"
                  ToolbarRawData={{
                    Alignment: true,
                    BackgroundColor: true,
                    Bold: true,
                    BulletListButton: true,
                    Clear: true,
                    Fontcolor: true,
                    Fontfamily: true,
                    Fontsize: true,
                    InsertNames: true,
                    Italic: true,
                    Link: true,
                    NumberListButton: true,
                    Redo: false,
                    Strikethrough: true,
                    Underline: true,
                    Undo: false,
                  }}
                />
              </div>
              <div className="emp-col-6 mb-3">
                <label className="field-label">Birthday:</label>
                <VgDateRangePicker
                  ButtonPrimary="Submit"
                  ButtonSecondary="Clear"
                  ButtonThird="Cancel"
                  DateFormat="MM DD, YYYY"
                  DateRangeName=""
                  DateRangePickerId="DateRangePickerId1"
                  DateRangePickerPosition=""
                  DefaultEndDate="none"
                  DefaultOption="This Month"
                  DefaultStartDate="today"
                  DisabledDates={[]}
                  EndDateInputName=""
                  MaxDate={new Date("2025-12-30T18:30:00.000Z")}
                  MinDate={new Date("2024-12-31T18:30:00.000Z")}
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  Placeholder="MM DD, YYYY"
                  StartDateInputName=""
                  Title=""
                />
              </div>
              <div className="emp-col-6 mb-3">
                <VgPhoneControl
                  ref={(data: any) => (formValidator.current["phone "] = data)}
                  CloseBackTitle="Vagaro React Toolkit"
                  CurrentCountry={1}
                  Footer={2}
                  NativeActionVal={13}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnBlur={() => {}}
                  PhoneControlId="phoneControlId1"
                  PlaceHolder="Enter Phone Number"
                  TimerCount={1000}
                  Required={true}
                  Title="Phone Number:"
                  VagaroToolkit={1}
                  Validation="Default"
                  CountryDropdown
                  AllCountry
                />
              </div>
              <div className="emp-col-3 mb-3">
                <label className="field-label">Select Color:</label>
                <div className="emp-inner-col-custome">
                  <div className="w100">
                    <VgDropdown
                      ref={(data: any) =>
                        (formValidator.current["DropdownId2"] = data)
                      }
                      AutoFocus
                      CallBackTimeCount={0}
                      ClearSearch
                      ClassNamePrefix="vg-select2-dropdown"
                      DefaultValue={[]}
                      DropdownClosingName=""
                      // DropdownData={dropdownData}
                      ApiUrl="https://dev50apiv2.bookitall.com/us02/api/v2/merchants/inventory/brands?&IsBusinessUsedBrand=true&VendorId="
                      ApiRequestParams={{
                        headers: {
                          ac_tkn: "",
                          "Content-Type": "application/json",
                          accept: "application/json",
                          "accept-language": "en-US",
                          "cache-control": "no-cache",
                          employeeid: "s1OHm55HTnWmUg8RcYbyrg==",
                          merchantid: "q3Vf9lrABcqgyMpc4kBJ7w==",
                          origin: "https://dev50.bookitall.com",
                          pragma: "no-cache",
                          priority: "u=1",
                          referer: "https://dev50.bookitall.com/",
                          "sec-ch-ua-mobile": "?0",
                          "sec-ch-ua-platform": "Windows",
                          "sec-fetch-dest": "empty",
                          "sec-fetch-mode": "cors",
                          "sec-fetch-site": "same-site",
                          "user-agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
                          userid: "s1OHm55HTnWmUg8RcYbyrg==",
                        },
                        parentIdKey: "id",
                        parentTitleKey: "name",
                        method: "GET",
                        ChildIdKey: "",
                        ChildTitleKey: "",
                        responseType: "Single",
                        dataKey: "data.brands",
                        totalCountKey: "data.count",
                        nestedChildObject: "",
                        parentChildRelationshipName: "parentId",
                      }}
                      OnSearchForApi={(e) => {
                        console.log(e);
                      }}
                      DropdownId="DropdownId2"
                      DropdownName=""
                      SearchByApi={true}
                      DropdownTitle={""}
                      SearchPlaceholder="Search users"
                      IsApplyButtonOn
                      DropdownClosed={() => {}}
                      GroupOptions
                      Multi={true}
                      OpenFromBody
                      Required
                      // CloseMenuOnSelect={false}
                      IsSearchable={true}
                      ShowCheckBoxInGroup
                      ChildCheckbox
                      SetBottomSheetDropdown={true}
                      ShowCustomMessage="No users found. Please try another search."
                      MenuPlacement="auto"
                      NativeActionValue={13}
                      DropdownPlaceholder={"Select Users"}
                      RequiredMessage="This field is required"
                      RightSwipeEvent
                      SetCustomPlaceholder
                      ShowHideFooter={2}
                      TabIndex={0}
                      Loading={true}
                      VagaroToolkit={1}
                      VirtualDropdownHeight={0}
                      // Virtualization={true}
                      ScrollPagination={true}
                      AddOptionButtonText=""
                      RecordsPerPage={10}
                      OnScrollPagination={(e) => {
                        console.log(e);
                      }}
                      onChange={(selectedOptions) => {
                        console.log("Selected:", selectedOptions);
                      }}
                    />
                  </div>
                  <Svg name="at" width={50} height={50} />
                  <div>
                    <VgColorPicker
                      CloseBackTitle="Vagaro React Toolkit"
                      ColorPickerId="colorPickerId1"
                      Footer={2}
                      NativeActionVal={13}
                      OnChange={() => {}}
                      TimerCount={0}
                      Title="Color Picker"
                      VagaroToolkit={1}
                    />
                  </div>
                </div>
              </div>
              <div className="emp-col-3 mb-3">
                <div className="emp-three-col">
                  <VgTimePicker
                    ref={(data: any) =>
                      (formValidator.current["timepicker"] = data)
                    }
                    CustomErrorMessage="Please enter a valid start time."
                    OnBlur={() => {}}
                    OnSelect={() => {}}
                    OnChange={() => {}}
                    TimePickerId="TimePickerId2"
                    Title="Select Time:"
                    VagaroToolkit={1}
                  />
                </div>
              </div>
              <div className="emp-col-3 mb-3">
                <VgInput
                  CustomMsg="$"
                  InfoChip
                  InputDescription=""
                  InputId="input-five"
                  InputTitle="Price:"
                  Required
                  LabelPosition="top"
                  OnBlur={() => {}}
                  PlaceHolder="0.00"
                  PrefixSupport="prefix"
                  TooltipMessage="Price with tax"
                  UrlPrefix=""
                  Validation="numeric"
                  numericValidation
                  OnChange={() => {}}
                />
              </div>
              <div className="emp-col-3 mb-3">
                <VgStepper
                  ref={(data: any) => (formValidator.current["stepper"] = data)}
                  CustomErrorMessage="Error reason"
                  CustomIntervalText="min"
                  LabelText="Steppper:"
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnDecrement={() => {}}
                  OnIncrement={() => {}}
                  SetInterval={5}
                  SetValue={0}
                  Required
                />
              </div>
              <div className="emp-col-3 mb-3">
                <VgSmileyInput
                  Name=""
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnEmojiClick={() => {}}
                  OnFocus={() => {}}
                  OnKeyUp={() => {}}
                  OnSendButtonClick={() => {}}
                  Placeholder="Type a message..."
                  SetValue=""
                  SmileyIcon
                />
              </div>
              <div className="emp-col-3 mb-3">
                <VgLoginInput
                  AllCountry
                  AutoFocus
                  CountryDropdown
                  InputId=""
                  InputTitle="Log In or Sign Up:"
                  Name=""
                  OnBlur={() => {}}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInputChange={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  OnPhoneControlChange={() => {}}
                  PlaceHolder="Email or Phone Number"
                  // Required
                  SetValue=""
                  ShowRequiredFieldMark
                  Type="text"
                />
              </div>

              <div className="emp-col-6 mb-3 fullwidth">
                <VgToggle
                  Description="Customers will be able to view email and phone number contact information on Vagaro.com."
                  OnChange={() => {}}
                  ToggleVariation="WithDescription"
                  Title="Show Contact Email and Phone on Vagaro.com"
                  ToggleId="switch-one"
                />
              </div>
            </div>
            <div className="emp-company-info">
              <div className="vg-section-title">COMPANY INFORMATION</div>
              <div className="emp-form-row">
                <div className="emp-col-6 mb-3">
                  <label className="field-label">Start Date:</label>
                  <VgDatePicker
                    Country="U.S.A"
                    DatePickerId="DatePickerId2"
                    //DatePickerName={() => {}}
                    DefaultDate="today"
                    isPastDateDisable={false}
                    VagaroToolkit={1}
                    isFutureDateDisable={false}
                    Disableddates={[]}
                    EnvironmentUrlDp="https://api.vagaro.com/"
                    Maxdate={new Date("2024-12-30T18:30:00.000Z")}
                    Onchange={() => {}}
                    Placeholder="Select Date"
                  />
                </div>

                <div className="emp-col-6 mb-3">
                  <VgDropdown
                    AutoFocus
                    CallBackTimeCount={0}
                    ClassNamePrefix="vg-select2-dropdown"
                    ClearSearch
                    CustomPlaceholderName="Selected"
                    DefaultValue={[]}
                    DropdownPlaceholder="Selected"
                    DropdownClosingName=""
                    DropdownData={[
                      {
                        label: "Account Owner",
                        options: [
                          {
                            label: "Alexandra98 OKeefee",
                            value: "Alexandra98 OKeefee",
                          },
                        ],
                      },
                      {
                        label: "Access Level Dhaval update",
                        options: [
                          {
                            label: "Vanilla",
                            value: "vanilla",
                          },
                          {
                            label: "Chocolate",
                            value: "chocolate",
                          },
                          {
                            label: "Strawberry",
                            value: "strawberry",
                          },
                          {
                            label: "Salted Caramel",
                            value: "salted-caramel",
                          },
                        ],
                      },
                    ]}
                    DropdownId="DropdownId2"
                    DropdownName=""
                    ChildCheckbox={false}
                    DropdownTitle="Reports To:"
                    SearchPlaceholder="Search"
                    DropdownClosed={() => {}}
                    GroupOptions
                    Multi={false}
                    OpenFromBody
                    Required
                    Searchable={false}
                    ShowCheckBoxInGroup={false}
                    ShowCustomMessage="No results found. Please try another search."
                    MenuPlacement="auto"
                    NativeActionValue={13}
                    Placeholder="Select Report To"
                    RequiredMessage="This field is required"
                    RightSwipeEvent
                    SetCustomPlaceholder
                    ShowHideFooter={2}
                    ShowSelectAllSelectNone
                    TabIndex={0}
                    VagaroToolkit={1}
                    VirtualDropdownHeight={300}
                    onChange={(e) => {
                      console.log("first", e);
                    }}
                  />
                </div>

                <div className="emp-col-6 mb-3 fullwidth">
                  <VgTextarea
                    AiClickEvent={() => handleAIClick()}
                    AiControlId="AiControlId"
                    ControlPopup
                    CloseBackTitle="From Control"
                    DialogShowHide={show}
                    AsyncClickEvent
                    Footer={2}
                    Label
                    LabelText="Title:"
                    Name=""
                    NativeAction={13}
                    OnBlur={() => {}}
                    OnChangeRange={() => {}}
                    OnChangeTone={() => {}}
                    OnClickCancle={() => {
                      setShow(false);
                    }}
                    OnClickClose={() => {
                      setShow(false);
                    }}
                    OnClickNext={() => {}}
                    OnClickPrevious={() => {}}
                    OnClickRegenerate={() => {}}
                    OnClickUseThisText={() => {
                      setShow(false);
                    }}
                    PlaceHolder="Type here..."
                    RawData={[
                      {
                        Index: 0,
                        InputDescription: "I am salon professional Nikunj sir",
                        Range: 100,
                        Tone: "energetic",
                      },
                      {
                        Index: 1,
                        InputDescription:
                          "I am salon professional Sagar Battul",
                        Range: 75,
                        Tone: "trendy",
                      },
                      {
                        Index: 2,
                        InputDescription:
                          "I am salon professional The issue arises from the fact that when you're updating the history in your",
                        Range: 25,
                        Tone: "casual",
                      },
                      {
                        Index: 3,
                        InputDescription:
                          "I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.",
                        Range: 50,
                        Tone: "motivational",
                      },
                      {
                        Index: 4,
                        InputDescription:
                          "I am salon professional Sagar Battul",
                        Range: 0,
                        Tone: "professional",
                      },
                    ]}
                    SetIndex={5}
                    SetValue=""
                    TextAreaId=""
                    TextareaVariant="Default"
                    TimerCount={0}
                    ToneMetadata={[
                      {
                        label: "Professional",
                        value: "professional",
                      },
                      {
                        label: "Casual",
                        value: "casual",
                      },
                      {
                        label: "Uplifting",
                        value: "uplifting",
                      },
                      {
                        label: "Inspirational",
                        value: "inspirational",
                      },
                      {
                        label: "Trendy",
                        value: "trendy",
                      },
                      {
                        label: "Gentle & Caring",
                        value: "Gentle & Caring",
                      },
                      {
                        label: "Motivational",
                        value: "motivational",
                      },
                      {
                        label: "Energetic",
                        value: "energetic",
                      },
                    ]}
                    VagaroToolkit={1}
                    onChange={() => {}}
                  />
                  <VgTextarea
                    AiClickEvent={() => {}}
                    AiControlId="AiControlId"
                    ControlPopup
                    CloseBackTitle="From Control"
                    DialogShowHide
                    Footer={2}
                    CharacterCountEnable
                    CharacterCountEnableForAi
                    Label
                    LabelText="Title:"
                    MaximumLength={1500}
                    MaximumLengthForAi={1500}
                    Name=""
                    NativeAction={13}
                    OnBlur={() => {}}
                    OnChangeRange={() => {}}
                    OnChangeTone={() => {}}
                    OnClickCancle={() => {}}
                    OnClickClose={() => {}}
                    OnClickNext={() => {}}
                    OnClickPrevious={() => {}}
                    OnClickRegenerate={() => {}}
                    OnClickUseThisText={() => {}}
                    OnCrossClick={() => {}}
                    OnEmojiClick={() => {}}
                    OnTickClick={() => {}}
                    PlaceHolder="Type here..."
                    RawData={[
                      {
                        Index: 0,
                        InputDescription: "I am salon professional Nikunj sir",
                        Range: 100,
                        Tone: "energetic",
                      },
                      {
                        Index: 1,
                        InputDescription:
                          "I am salon professional Sagar Battul",
                        Range: 75,
                        Tone: "trendy",
                      },
                      {
                        Index: 2,
                        InputDescription:
                          "I am salon professional The issue arises from the fact that when you're updating the history in your",
                        Range: 25,
                        Tone: "casual",
                      },
                      {
                        Index: 3,
                        InputDescription:
                          "I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.",
                        Range: 50,
                        Tone: "motivational",
                      },
                      {
                        Index: 4,
                        InputDescription:
                          "I am salon professional Sagar Battul",
                        Range: 0,
                        Tone: "professional",
                      },
                    ]}
                    SetValue=""
                    TextAreaId=""
                    TextareaVariant="Default"
                    TimerCount={0}
                    ToneMetadata={[
                      {
                        label: "Professional",
                        value: "professional",
                      },
                      {
                        label: "Casual",
                        value: "casual",
                      },
                      {
                        label: "Uplifting",
                        value: "uplifting",
                      },
                      {
                        label: "Inspirational",
                        value: "inspirational",
                      },
                      {
                        label: "Trendy",
                        value: "trendy",
                      },
                      {
                        label: "Gentle & Caring",
                        value: "Gentle & Caring",
                      },
                      {
                        label: "Motivational",
                        value: "motivational",
                      },
                      {
                        label: "Energetic",
                        value: "energetic",
                      },
                    ]}
                    VagaroToolkit={1}
                    AsyncClickEvent
                    onChange={() => {}}
                  />
                  <div className="emp-sms-counter">
                    Bios are displayed on the vagaro.com listing page and are
                    viewable by the public.
                  </div>
                </div>
              </div>
            </div>
            <div className="emp-company-info">
              <div className="vg-section-title">BUSINESS INFORMATION</div>
              <div className="emp-col-6 fullwidth">
                <VgToggle
                  Description="Receive emails about your upcoming appointments."
                  OnChange={() => {}}
                  ToggleId="switch-three"
                  ToggleVariation="WithDescription"
                  Title="Email Notifications"
                />
              </div>
              <div className="emp-col-6 fullwidth">
                <VgToggle
                  Description="Receive texts about your upcoming appointments."
                  OnChange={() => {}}
                  ToggleId="2"
                  ToggleVariation="WithDescription"
                  Title="switch-four"
                />
              </div>
              <div className="emp-col-6 fullwidth">
                <VgToggle
                  Description="Receive push notifications through the Vagaro Pro app about your upcoming appointments."
                  OnChange={() => {}}
                  ToggleId="3"
                  ToggleVariation="WithDescription"
                  Title="switch-five"
                />
              </div>
              <div className="emp-col-6 fullwidth">
                <VgToggle
                  Description="Receive notifications about low inventory quantity."
                  OnChange={() => {}}
                  ToggleId="switch-six"
                  ToggleVariation="WithDescription"
                  Title="Low Inventory Notifications"
                />
              </div>
              <div className="emp-col-6 fullwidth">
                <VgToggle
                  Description="Receive notifications about low inventory quantity."
                  OnChange={() => {}}
                  ToggleId="switch-six"
                  ToggleVariation="WithDescription"
                  Title="Low Inventory Notifications"
                />
              </div>
              <div className="h-full overflow-auto">
                <div className="text-[13px]">
                  <VgDragList
                    ShowEditSave
                    ParentCheckboxTitle="Employees"
                    RawData={defaultOptions}
                    onChange={() => {}}
                    OnEditSave={() => {}}
                  />
                </div>
              </div>
              <div className="emp-col-6 fullwidth">
                <VgImageUploader
                  ref={(data: any) =>
                    (formValidator.current["imageUploader"] = data)
                  }
                  Editor
                  MaxFileSize={100}
                  SupportedFileFormate={[
                    "video/mp4", // MP4 - Most widely supported
                    "video/avi", // AVI - High quality, large file size
                    "video/mkv", // MKV - Supports multiple audio/subtitle tracks
                    "video/mov", // MOV - Apple format, high quality
                    "video/wmv", // WMV - Windows Media Video
                    "video/flv", // FLV - Flash Video
                    "video/webm", // WEBM - Optimized for web
                    "video/mpg", // MPEG - Used for DVDs and broadcasting
                    "video/mpeg", // MPEG - Alternative extension
                    "video/ogv", // OGV - Open-source format
                    "video/3gp", // 3GP - Mobile device format
                    "video/asf", // ASF - Advanced Systems Format
                    "video/ts", // TS - Transport stream for broadcasting
                    "image/png", // PNG -
                    "image/jpg", // JPG -
                    "image/jpeg", // JPG -
                  ]}
                  StoreOnAzureContainer={false}
                  Variation="Rectangle"
                  UploadFileName="test.jpg"
                  ContainerFolderPath="/Appointments/TestUpload"
                  DriveContainerName="blobcontainer"
                  Multiple
                  ImageUploaderId="imageUploader"
                  GetContainerNameAPIUrl="https://us02.vagaro.com/websiteapi/homepage/getcontainersastokenkey"
                  GetContainerNameAPIPayload={{
                    ExpirySecond: 600,
                    businessID: 245007,
                  }}
                  OnChange={() => {}}
                />
              </div>

              <div>
                <VgReviewRating
                  OnClick={() => {}}
                  RatingSize="Medium"
                  SetRating={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="vg-reacttk-footer emp-profile-footer">
        <VgButton
          ButtonText="Cancel"
          ButtonVariant="secondary"
          ButtononClick={handleClick}
          IconPlacement="prefix"
          ValidForm={true}
        >
          Cancel
        </VgButton>
        <VgButton
          ButtonText="Next"
          ButtonVariant="primary"
          ButtononClick={handleClick}
          IconPlacement="prefix"
          ValidForm={true}
          FormValidations={formValidator.current}
        >
          Next
        </VgButton>
      </div>
    </Fragment>
  );
};

export default VgForm;
`,
      language: 'jsx',
    },
  },
};

// Story showcasing Popup Form
const TemplateForm = (args) => <VgPopupForm {...args} />;
export const PopupFormExample = TemplateForm.bind({});
PopupFormExample.args = {};
PopupFormExample.storyName = "Popup Form Example";
PopupFormExample.parameters = {
  docs: {
    description: {
      story: `Example showing how to use VgPopup with Form:
      `,
    },
    source: {
      code: `import React, { useRef } from "react";
import { VgButton, VgDropdown, VgInput, VgPopup } from "@vagaro/vagaro-react-toolkit";
//import theme tokens and typography tokens css for implement theme and typography (styles) in react toolkit components
import "../vg-theme-token.css"; //import vg-theme-token css
import "../vg-typography-token.css"; //import vg-typography-token css

const VgPopupForm = () => {
  const formValidator = useRef<{ [key: string]: any | null }>({});
  const [open, setOpen] = useState(false);
  
  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    // Manually trigger form validation and access ref values
    const validationResults = Object.keys(formValidator.current).reduce(
      (acc: { [key: string]: any }, key) => {
        const result = formValidator.current[key]?.validate();
        if (result) {
          acc[key] = result;
        }
        return acc;
      }, {}
    );
    console.log("Form validation results:", validationResults);

    // Check if both components are valid
    const isEmailValid = validationResults["email"]?.IsValidate === true;
    const isDropdownValid = validationResults["DropdownId2"]?.IsValidate === true;

    if (isEmailValid && isDropdownValid) {
      console.log("Both components are valid, closing popup");
      setOpen(false); // Close the popup
    } else {
      console.log("Validation failed for one or more components, popup remains open");
    }
  };

  return (
    <div>
      <div style={{height: "300px" }}>
        <div style={{display: "flex", justifyContent: "center"}}>
          <VgButton
            ButtonVariant="primary"
            ButtononClick={() => handlePopupOpen()}
            IconPlacement="prefix"
            ValidForm={true}
          >
            Open Popup
          </VgButton>
        </div>
        
        <VgPopup
          ButtonPrimary="Primary"
          ButtonSecondary="Secondary"
          ButtonThird="Back"
          CloseBackTitle="From Control"
          CloseButton
          Footer={2}
          FooterButton="both"
          OnClickPrimary={handleClick}
          OnClickSecondary={() => {}}
          PopupId="PopupId12"
          PopupTitle="Popup Title Content Here"
          PopupBody={() => (
            <div className="popup-body">
              <div>
                <VgInput
                  ref={(data: any) => (formValidator.current["email"] = data)}
                  CustomErrorMessage="invalid email"
                  FocusBorder="none"
                  InfoTooltipMessage=""
                  InputId="email"
                  InputMode="none"
                  InputTitle="Title:"
                  Name=""
                  OnBlur={() => {}}
                  OnBlurValidation
                  OnChange={() => {}}
                  OnClick={() => {}}
                  OnFocus={() => {}}
                  OnInput={() => {}}
                  OnInputDrop={() => {}}
                  OnKeyDown={() => {}}
                  OnKeyUp={() => {}}
                  OnPaste={() => {}}
                  OnValidate={() => {}}
                  PlaceHolder=""
                  PrefixIcon="none"
                  Required={true}
                  SetValue=""
                  SuffixIcon="none"
                  Type="text"
                  UrlPrefix=""
                  Validation="none"
                  max={100}
                  min={0}
                />
              </div>
              <div>
                <VgDropdown
                  ref={(data: any) =>
                    (formValidator.current["DropdownId2"] = data)
                  }
                  AutoFocus
                  CallBackTimeCount={0}
                  ClearSearch
                  ClassNamePrefix="vg-select2-dropdown"
                  DefaultValue={[]}
                  DropdownClosingName=""
                  ApiUrl="https://dev50apiv2.bookitall.com/us02/api/v2/merchants/inventory/brands?&IsBusinessUsedBrand=true&VendorId="
                  ApiRequestParams={{
                    headers: {
                      ac_tkn: "",
                      "Content-Type": "application/json",
                      accept: "application/json",
                      "accept-language": "en-US",
                      "cache-control": "no-cache",
                      employeeid: "s1OHm55HTnWmUg8RcYbyrg==",
                      merchantid: "q3Vf9lrABcqgyMpc4kBJ7w==",
                      origin: "https://dev50.bookitall.com",
                      pragma: "no-cache",
                      priority: "u=1",
                      referer: "https://dev50.bookitall.com/",
                      "sec-ch-ua-mobile": "?0",
                      "sec-ch-ua-platform": "Windows",
                      "sec-fetch-dest": "empty",
                      "sec-fetch-mode": "cors",
                      "sec-fetch-site": "same-site",
                      "user-agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
                      userid: "s1OHm55HTnWmUg8RcYbyrg==",
                    },
                    parentIdKey: "id",
                    parentTitleKey: "name",
                    method: "GET",
                    ChildIdKey: "",
                    ChildTitleKey: "",
                    responseType: "Single",
                    dataKey: "data.brands",
                    totalCountKey: "data.count",
                    nestedChildObject: "",
                    parentChildRelationshipName: "parentId",
                  }}
                  OnSearchForApi={(e: any) => {
                    console.log(e);
                  }}
                  DropdownId="DropdownId2"
                  DropdownName=""
                  SearchByApi={true}
                  DropdownTitle={"Select Customers"}
                  SearchPlaceholder="Search users"
                  IsApplyButtonOn
                  DropdownClosed={() => {}}
                  GroupOptions
                  Multi={true}
                  OpenFromBody
                  Required={true}
                  // CloseMenuOnSelect={false}
                  IsSearchable={true}
                  ShowCheckBoxInGroup
                  ChildCheckbox
                  SetBottomSheetDropdown={true}
                  ShowCustomMessage="No users found. Please try another search."
                  MenuPlacement="auto"
                  NativeActionValue={13}
                  DropdownPlaceholder={"Select Users"}
                  RequiredMessage="This field is required"
                  RightSwipeEvent
                  SetCustomPlaceholder
                  ShowHideFooter={2}
                  TabIndex={0}
                  Loading={true}
                  VagaroToolkit={1}
                  VirtualDropdownHeight={0}
                  ScrollPagination={true}
                  AddOptionButtonText=""
                  RecordsPerPage={10}
                  OnScrollPagination={(e) => {
                    console.log(e);
                  }}
                  onChange={(selectedOptions) => {
                    console.log("Selected:", selectedOptions);
                  }}
                />
              </div>
            </div>
          )}
          Popupopen={open}
          Size="large"
          TextDescription=""
          ThirdButtonVariant="primary"
          TimerCount={0}
          VagaroToolkit={1}
          customClassName=""
          onClose={() => {setOpen(false)}}
          FormValid={true}
          FormValidation={formValidator.current}
        />
      </div>
    </div>
  );
};

export default VgPopupForm;
      `,
      language: 'jsx',
    },
  },
};

const TableForm = (args) => <VgTableForm {...args} />;
export const TableFormExample = TableForm.bind({});
TableFormExample.args = {};
TableFormExample.storyName = "Table Form Example";
TableFormExample.parameters = {
  docs: {
    description: {
      story: `Example showing how to use VgTableForm:
      `,
    },
    source: {
      code: `import React, { Fragment, useRef, useState, useEffect } from "react";
      import VgInput from "../VgTextbox/VgTextbox";
      import VgButton from "../VgButton/VgButton";
      import VgTextarea from "../VgTextarea/VgTextarea";
      import VgCheckbox from "../VgCheckbox/VgCheckbox";
      import VgDatePicker from "../VgDatePicker/VgDatePicker";
      import VgTimePicker from "../VgTimePicker/VgTimePicker";
      import VgAddressControl from "../VgAddressControl/VgAddressControl";
      import VgDateRangePicker from "../VgDateRangePicker/VgDateRangePicker";
      import VgImageUploader from "../VgImageUploader/VgImageUploader";
      import VgToggle from "../VgToggle/VgToggle";
      import VgPhoneControl from "../VgPhoneControl/VgPhoneControl";
      
      import "./VgForm.scss";
      import VgBadge from "../VgBadge/VgBadge";
      import VgTooltip from "../VgTooltip/VgTooltip";
      import VgAvatar from "../VgAvatar/VgAvatar";
      import VgBottomSheet from "../VgBottomSheet/VgBottomSheet";
      import VgColorPicker from "../VgColorPicker/VgColorPicker";
      import VgDropdown from "../VgDropdown/VgDropdown";
      import VgLinkControl from "../VgLinkControl/VgLinkControl";
      import VgPopup from "../VgPopup/VgPopup";
      import VgMapControl from "../VgMapControl/VgMapControl";
      import axios from "axios";
      import VgSegments from "../VgSegments/VgSegments";
      import Svg from "../VgSvg/Svg";
      import VgThreeDotMenu from "../VgThreeDotMenu/VgThreeDotMenu";
      import VgDragList from "../VgDragList/VgDragList";
      import VgStepper from "../VgStepper/VgStepper";
      import VgTextEditor from "../VgTextEditor/VgTextEditor";
      import VgSmileyInput from "../VgSmileyInput/VgSmileyInput";
      import VgLoginInput from "../VgLoginInput/VgLoginInput";
      import VgCheckoutCustomerDropdown from "../VgCheckoutCustomerDropdown/VgCheckoutCustomerDropdown";
      import VgReviewRating from "../VgReviewRating/VgReviewRating";
      import VgRadio from "../VgRadio/VgRadio";
      import VgTableGrid from "../VgTables/VgTableGrid";
      
      const VgTableForm: React.FC = () => {
        const [email, setEmail] = useState("");
        const [confirmEmail, setConfirmEmail] = useState("");
        const [error, setError] = useState("");
        const formValidator = useRef<{ [key: string]: any | null }>({});
        const handleClick = (e: any) => {
          e.preventDefault();
          // Manually trigger form validation and access ref values
          const validationResults = Object.keys(formValidator.current).reduce(
            (acc: { [key: string]: any }, key) => {
              const result = formValidator.current[key]?.validate();
              if (result) {
                acc[key] = result;
              }
              return acc;
            },
            {}
          );
          console.log("Form validation results:", validationResults);
        };
      
        const [show, setShow] = useState(false);
      
        const defaultOptions = [
          { id: "1", name: "Joe edited 2hfkdshfkds Ford 333 0", selected: true },
          { id: "2", name: "Yash Mathukiya", selected: true },
          { id: "3", name: "Rich@rd^ Miller", selected: true },
          { id: "4", name: "Harischandra ?", selected: false },
          { id: "5", name: "Mayur Multi Provider", selected: false },
          { id: "6", name: "emp10 10", selected: false },
          { id: "7", name: "John20 Lewish", selected: false },
          { id: "8", name: "tick ettest", selected: false },
          { id: "9", name: "Owner Owner", selected: false },
          { id: "10", name: "SP Sync Employee", selected: false },
        ];
      
        const handleAIClick = async () => {
          const response = await axios(
            "https://jsonplaceholder.typicode.com/todos/1"
          );
          console.log(response.data);
          setShow(true);
        };
      
        let RawData = [
          {
            label: "Colours",
            options: [
              {
                color: "#00B8D9",
                label: "Ocean",
                value: "ocean",
              },
              {
                color: "#0052CC",
                label: "Blue",
                value: "blue",
              },
              {
                color: "#5243AA",
                label: "Purple",
                value: "purple",
              },
              {
                color: "#FF5630",
                label: "Red",
                value: "red",
              },
              {
                color: "#FF8B00",
                label: "Orange",
                value: "orange",
              },
              {
                color: "#FFC400",
                label: "Yellow",
                value: "yellow",
              },
              {
                color: "#36B37E",
                label: "Green",
                value: "green",
              },
              {
                color: "#00875A",
                label: "Forest",
                value: "forest",
              },
              {
                color: "#253858",
                label: "Slate",
                value: "slate",
              },
              {
                color: "#666666",
                label: "Silver",
                value: "silver",
              },
            ],
          },
          {
            label: "Flavours",
            options: [
              {
                label: "Vanilla",
                rating: "safe",
                value: "vanilla",
              },
              {
                label: "Chocolate",
                rating: "good",
                value: "chocolate",
              },
              {
                label: "Strawberry",
                rating: "wild",
                value: "strawberry",
              },
              {
                label: "Salted Caramel",
                rating: "crazy",
                value: "salted-caramel",
              },
            ],
          },
        ];
      
        const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
          validateEmails(e.target.value, confirmEmail);
        };
      
        const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmEmail(e.target.value);
          validateEmails(email, e.target.value);
        };
      
        const validateEmails = (emailValue: string, confirmEmailValue: string) => {
          if (emailValue && confirmEmailValue && emailValue !== confirmEmailValue) {
            setError("Emails do not match");
          } else if (emailValue === confirmEmailValue) {
            setError("");
          } else {
            setError("");
          }
        };
      
        const [dropdownData, setDropdownData] = useState<DropdownGroup[]>([]);
        const [defaultValue, setDefaultValue] = useState<DropdownOption[]>([]);
        const [Loading, setIsLoading] = useState(false);
        const [page, setPage] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);
        const [hasMore, setHasMore] = useState(true);
      
        // Add a pageSize constant
        const PAGE_SIZE = 10; // Adjust based on your API's page size
      
        const fetchUsers = async (page: number, searchTerm: any = "") => {
          try {
            setIsLoading(true);
      
            const searchQuery = searchTerm ? '' : "";
      
            // Add limit and proper pagination parameters
            const response = await fetch(
            );
      
            const users: User[] = await response.json();
      
            // Check if we've reached the end of the data
            if (users.length < PAGE_SIZE) {
              setHasMore(false);
            }
      
            // If no users returned on first page
            if (users.length === 0 && page === 1) {
              setDropdownData([]);
              setHasMore(false);
              return;
            }
      
            const groupedUsers = users.reduce<Record<string, DropdownGroup>>(
              (acc, user) => {
                const companyName = user?.title;
      
                if (!acc[companyName]) {
                  acc[companyName] = {
                    label: companyName,
                    options: [],
                  };
                }
      
                // Check for duplicate entries before adding
                const isDuplicate = acc[companyName].options.some(
                  (option) => option.value === user.id.toString()
                );
      
                if (!isDuplicate) {
                  acc[companyName].options.push({
                    label: user.title,
                    value: user.id.toString(),
                  });
                }
      
                return acc;
              },
              {}
            );
      
            const formattedData: DropdownGroup[] = Object.values(groupedUsers);
      
            setDropdownData((prev) => {
              if (page === 1) return formattedData;
      
              // Merge new data with existing data, preventing duplicates
              const merged = [...prev];
              formattedData.forEach((newGroup) => {
                const existingGroupIndex = merged.findIndex(
                  (g) => g.label === newGroup.label
                );
                if (existingGroupIndex === -1) {
                  merged.push(newGroup);
                } else {
                  // Merge options, preventing duplicates
                  newGroup.options.forEach((newOption) => {
                    if (
                      !merged[existingGroupIndex].options.some(
                        (existing) => existing.value === newOption.value
                      )
                    ) {
                      merged[existingGroupIndex].options.push(newOption);
                    }
                  });
                }
              });
              return merged;
            });
      
            // Set default value only on first load
            if (
              page === 1 &&
              formattedData.length > 0 &&
              formattedData[0].options.length > 0
            ) {
              setDefaultValue([formattedData[0].options[0]]);
            }
          } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load dropdown options");
            setHasMore(false);
          } finally {
            setIsLoading(false);
          }
        };
      
        // Update scroll handler to prevent unnecessary fetches
        const handleScrollPagination = async (e: React.UIEvent<HTMLDivElement>) => {
          const target = e.target as HTMLDivElement;
          const { scrollTop, scrollHeight, clientHeight } = target;
      
          // Only fetch more if we're near the bottom and not already loading
          if (
            !Loading &&
            hasMore &&
            scrollHeight - scrollTop <= clientHeight + 100 // 100px threshold
          ) {
            setPage((prev) => prev + 1);
          }
        };
      
        // Reset pagination when search term changes
        const handleSearch = (searchTerm: string) => {
          setPage(1);
          setHasMore(true);
          fetchUsers(1, searchTerm);
        };
      
        // Initial data fetch
        useEffect(() => {
          fetchUsers(page);
        }, [page]);
      
        const handkeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          const min = 0;
          const max = 100;
          const inputValue = e.currentTarget.value;
          let newValue = parseInt((inputValue as any) || 0, 10);
      
          if (e.key === "ArrowDown") {
            newValue = newValue - 1 < min ? min : newValue - 1;
      
            // Increase value on ArrowDown
          } else if (e.key === "ArrowUp") {
            // Decrease value on ArrowUp
            newValue = newValue + 1 > max ? max : newValue + 1;
          }
        };
        return (
          <Fragment>
            <div style={{ width: "100%"}}><VgTableGrid
                ColumnData={[
                  {
                    DataValue: 'Employees',
                    Dataheader: 'Employees',
                    Sorting: false,
                    Width: 20,
                    sticky: false
                  },
                  {
                    DataValue: 'Access Leval',
                    Dataheader: 'Access Leval',
                    Sorting: false,
                    Width: 10,
                    sticky: false
                  },
                  {
                    DataValue: 'Employee Type',
                    Dataheader: 'Employee Type',
                    Sorting: false,
                    Width: 10,
                    sticky: false
                  },
                  {
                    DataValue: 'Status',
                    Dataheader: 'Status',
                    Sorting: false,
                    Width: 10,
                    sticky: false
                  },
                  {
                    DataValue: 'renewalStatus',
                    Dataheader: 'Renewal Status',
                    Sorting: false,
                    Width: 10,
                    sticky: false
                  },
                  {
                    DataValue: 'Component',
                    Dataheader: '',
                    Sorting: false,
                    Width: 10,
                    sticky: true
                  }
                ]}
                Footer="Sticky"
                OnChange={() => { }}
                OnClick={() => { }}
                OnClickSorting={() => { }}
                OnRowClick={() => { }}
                PagingType="None"
                RowData={[
                  {
                    'Access Leval': 'Admin',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: {
                      Badge: [
                        {
                          BadgeSize: 'inline',
                          BadgeText: 'Active',
                          BadgeVariation: 'positive'
                        }
                      ]
                    },
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },
                  {
                    'Access Leval': 'Admin',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: {
                      Badge: [
                        {
                          BadgeSize: 'inline',
                          BadgeText: 'Active',
                          BadgeVariation: 'positive'
                        }
                      ]
                    },
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },
                  {
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: {
                      Badge: [
                        {
                          BadgeSize: 'inline',
                          BadgeText: 'Active',
                          BadgeVariation: 'positive'
                        }
                      ]
                    },
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },
                  {
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },
                  {
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },
                  {
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },
                        {
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },
                        // {
                        //   id: '6',
                        //   label: '$558.00',
                        //   percentage: '10%'
                        // },
                        // {
                        //   id: '4',
                        //   label: '$558.00',
                        //   percentage: '10%'
                        // },{
                        //   id: '5',
                        //   label: '$558.00',
                        //   percentage: '10%'
                        // },{
                        //   id: '6',
                        //   label: '$55821.00',
                        //   percentage: '10%'
                        // },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  },{
                    'Access Leval': 'All Access',
                    Component: <VgThreeDotMenu
                      IconSVG={<svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.55469 11.4512C1.67188 11.041 1.90625 10.6602 2.19922 10.3672L11.1055 1.46094C11.8379 0.728516 13.0391 0.728516 13.7715 1.46094L14.9141 2.60352C15.002 2.69141 15.0898 2.80859 15.1484 2.89648C15.6465 3.62891 15.5586 4.625 14.9141 5.26953L6.00781 14.1758C5.97852 14.2051 5.91992 14.2344 5.89062 14.293C5.59766 14.5273 5.27539 14.7031 4.92383 14.8203L1.37891 15.8457C1.14453 15.9336 0.880859 15.875 0.705078 15.6699C0.5 15.4941 0.441406 15.2305 0.5 14.9961L1.55469 11.4512ZM2.22852 14.1465L4.51367 13.4727C4.57227 13.4434 4.66016 13.4141 4.71875 13.3848L3.66406 13.1797C3.42969 13.1211 3.22461 12.9453 3.19531 12.7109L2.99023 11.6562C2.96094 11.7148 2.93164 11.8027 2.90234 11.8613L2.22852 14.1465ZM5.77344 12.418L11.7207 6.4707L9.875 4.6543L3.95703 10.6016L4.25 12.0957L5.77344 12.418Z" /></svg>}
                      Items={[
                        {
                          id: '1',
                          label: '$25.00',
                          percentage: '5%'
                        },
                        {
                          id: '2',
                          label: '$558.00',
                          percentage: '10%'
                        },
                {
                          id: '3',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '4',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '5',
                          label: '$558.00',
                          percentage: '10%'
                        },{
                          id: '6',
                          label: '$558.00',
                          percentage: '10%'
                        },
                      ]}
                      MenuButtonPosition="vertical"
                      MenuOpen
                      MenuOptions="ThreeDot"
                      OnClick={() => { }}
                      OnThreeDotMenuClick={() => { }}
                      SelectedItem={{
                        id: '8',
                        label: '$89.00',
                        percentage: '40%'
                      }}
                      TextValue="0.00"
                      ThreeDotMenuOpenPosition="Right"
                    />,
                    'Employee Type': 'Service Provider',
                    Employees: <div className="emp-table-data"><div className="profile-td"><VgAvatar AvatarSize="Small" NoProfile="Daniel klein" ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" /></div><div className="emp-list-data"><div className="emp-table-name">Molly Larsen</div><div className="emp-table-discription">Mollylovesoak@gmail.com</div><div className="emp-table-discription">(415) 944-7445</div></div><div className="progress-data"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle className="bg" cx="50" cy="50" r="40" /><circle className="bg" cx="50" cy="50" r="45" /><circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: '282', strokeDashoffset: '169' }} /></svg><span className="percentage-text">40%</span></div></div>,
                    'Modified By': 'Admin 1',
                    'Modified Date': 'Nov 23, 2024',
                    Status: '',
                    cell: '(415) 944-7445',
                    email: 'Mollylovesoak@gmail.com',
                    name: 'Molly Larsen',
                    renewalStatus: 'Active'
                  }
                ]}
              //   SelectedIds={[]}
                ShowHeaderCheckbox
                ShowRowCheckbox
                SortingType="Inline"
                TableGridType="Employee List"
                SelectedIds={[]}
              /></div>
      
            {/* Employee Profile Design end*/}
          </Fragment>
        );
      };
      
      // Type definitions
      interface User {
        id: number;
        label: string;
        title: string;
        value: string;
        options: {
          id: string;
          label: string;
          title: string;
          value: string;
        };
      }
      
      interface DropdownOption {
        label: string;
        value: string;
      }
      
      interface DropdownGroup {
        label: string;
        options: DropdownOption[];
      }
      
      export default VgTableForm;
      `
    },
  },
};
