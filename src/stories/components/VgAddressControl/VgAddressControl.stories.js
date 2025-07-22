import { useEffect, useRef } from "react"; // Import useRef
import VgAddressControl from "../../../components/VgAddressControl/VgAddressControl";

const countryOptions = {
  "United States of America": 1,
  "United Kingdom": 2,
  Canada: 3,
  Australia: 4,
};

// Keep countryFlag mapping as it might be useful elsewhere or if the logic needs adjustment
const countryFlag = { 1: "us-f", 2: "uk-f", 3: "canada-f", 4: "aus-f" };

export default {
  title: "Address Control",
  component: VgAddressControl,

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Address Control allows users to search for addresses using the Google Address API, providing real-time suggestions as they type. This streamlines the address entry process by offering accurate, auto-completed address options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // --- TitleAddressline1/PlaceHolder ---
    TitleAddressline1: {
      control: "text",
      type: { name: "string" },
      description:
        "The TitleAddressline1 property allows users to input a custom label for the Address Control, providing a clear heading or title for the address input field. This helps users understand the purpose of the field.",
      table: { category: "TitleAddressline1/PlaceHolder" },
    },
    TitleAddressline2: {
      control: "text",
      type: { name: "string" },
      description:
        "The TitleAddressline2 property allows users to input a custom label for the Address Control, providing a clear heading or title for the address input field. This helps users understand the purpose of the field.",
      table: { category: "TitleAddressline1/PlaceHolder" },
    },
    PlaceHolderAddressline1: {
      control: "text",
      type: { name: "string" },
      description:
        "The PlaceHolderAddressLine1 property sets a placeholder text in the address search field, guiding users to enter an address",
      table: { category: "TitleAddressline1/PlaceHolder" },
    },
    PlaceHolderAddressline2: {
      control: "text",
      type: { name: "string" },
      description:
        "ThePlaceHolderAddressLine2 property allows users to input a secondary address field value, such as an apartment number or suite. It provides an additional field for more detailed address information.",
      table: { category: "TitleAddressline1/PlaceHolder" },
    },

    // --- Events ---
    onSelect: {
      action: "selected",
      description:
        "The onSelect event is triggered when a user selects an address suggestion from the dropdown. It receives the detailed address object and the formatted address string.",
      table: { category: "Events" },
    },
    OnBlur: {
      action: "onBlur",
      description: `The onBlur event for a address control is triggered when the address control loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the address control`,
      table: { category: "Events" },
    },
    OnChange: {
      action: "onChange",
      description: `The "OnChange" listener for a address control detects changes whenever the user modifies the text in either Address Line 1 or Address Line 2 input fields. It receives the standard input change event.`,
      table: { category: "Events" },
    },
    OnChangeAddressLine2:{
      action: "onChange",
      description: `The "OnChange" listener for a address control detects changes whenever the user modifies the text in  Address Line 2 input fields. It receives the standard input change event.`,
      table: { category: "Events" },
    },
    OnCountryChange: {
        action: "onCountryChange",
        description: "Callback function triggered when the selected country changes. Receives the new country ID.",
        table: { category: "Events" },
    },
    

    // --- AddressTools ---
    Orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: `Enable users to choose between horizontal or vertical layout for the address control using a convenient radio option.`,
      table: { category: "AddressTools" },
    },
    CountryDropdown: {
      control: "boolean",
      type: { name: "boolean" },
      description: `When true, the country dropdown is disabled, fixing the country to the value specified in 'CurrentCountry'. When false, the user can change the country.`,
      table: { category: "AddressTools" },
    },
    CurrentCountry: {
      control: "select",
      options: Object.keys(countryOptions), // Use keys for display
      mapping: countryOptions, // Map display keys to IDs
      description: `Sets the initially selected country or the fixed country if 'CountryDropdown' is true. Uses country name for selection, maps to ID internally.`,
      table: { category: "AddressTools" },
    },
    AllCountry: {
      control: "boolean",
      type: { name: "boolean" },
      description: `When true, fetches and displays a list of all available countries in the dropdown. When false, uses a predefined short list (US, UK, CA, AU).`,
      table: { category: "AddressTools" },
    },
    Show_Address_line2: {
      control: "boolean",
      type: { name: "boolean" },
      description: `Controls the visibility of the Address Line 2 input field and its corresponding title (TitleAddressline2). Set to true to show, false to hide.`,
      table: { category: "AddressTools" },
    },
    SetValue: {
      control: "text",
      type: { name: "string" },
      description: `Programmatically sets the initial value of the Address Line 1 input field. Changes to this prop after initial render will update the input.`,
      table: { category: "AddressTools" },
    },
    SetAddresLine2Value: {
      control: "text",
      type: { name: "string" },
      description: `Programmatically sets the initial value of the Address Line 2 input field. Changes to this prop after initial render will update the input.`,
      table: { category: "AddressTools" },
    },
    ManualAddress: { // Added
      control: "boolean",
      type: { name: "boolean" },
      description: `When true, disables the automatic address suggestion lookup via the API. Users can type freely without suggestions appearing.`,
      table: { category: "AddressTools" },
    },

    // --- Behavior/State ---
    Disabled: { // Added
      control: "boolean",
      type: { name: "boolean" },
      description: `When true, disables the entire address control (country select, address inputs), preventing user interaction.`,
      table: { category: "Behavior/State" },
    },
    AutoFocus: { // Added
      control: "boolean",
      type: { name: "boolean" },
      description: `When true, automatically focuses the Address Line 1 input field when the component mounts (if not disabled).`,
      table: { category: "Behavior/State" },
    },

    // --- Required/Validation ---
    Required: {
      control: "boolean",
      type: { name: "boolean" },
      description: `Specifies whether the Address Line 1 field is mandatory. If true, basic validation styling may be applied if the field is empty on blur (behavior might depend on 'ShouldVerifyAddress').`,
      table: { category: "Required/Validation" },
    },
    ShowRequiredFieldMark: {
      control: "boolean",
      type: { name: "boolean" },
      description: `When true and 'Required' is also true, displays a red asterisk (*) next to the main title (TitleAddressline1) to visually indicate the field is mandatory.`,
      table: { category: "Required/Validation" },
    },
    AddressControlId : {
      action : 'string',
      table : {disable : true}
    },
    ShouldVerifyAddress: { // Added
      control: "boolean",
      type: { name: "boolean" },
      description: `Influences basic validation behavior. If true (default) and 'Required' is true, the field will be marked invalid if left empty. If false, this basic empty check might be bypassed. (Note: Exact verification logic may vary).`,
      table: { category: "Required/Validation" },
    },
    VerifyAddressCountryDropdown: {
      control: "boolean",
      type: { name: "boolean" },
    },

    // --- Internal/Advanced (Hidden from Docs) ---
    VagaroToolkit: {
      control: "number",
      table: { disable: true },
      description: "Internal Vagaro property.",
    },
    AddressControlId: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
    },
    CountryDropdownCloseName: {
      control: "text", // Changed from action
      table: { disable: true },
      description: "Legacy or unused property.",
    },
    CountryDropdownOpenName: {
      control: "text",
      table: { disable: true }, // Often better handled by placeholder logic
      description: "Placeholder text for the country dropdown.",
    },
    NativeActionValue: {
      control: "number",
      table: { disable: true },
      description: "Legacy or internal property.",
    },
    ShowHideFooter: {
      control: "number",
      table: { disable: true },
      description: "Legacy or internal property.",
    },
    CallBackTimeCount: {
      control: "number",
      table: { disable: true },
      description: "Legacy or internal property.",
    },
    IsFullLenght: { // Note: Typo in original prop name? Should be IsFullLength?
      control: "boolean",
      table: { disable: true }, // Assuming this controls internal layout, hide for now
      description: "Controls if the component takes full width.",
    },
    EnvironmentUrl: {
      control: "text",
      table: { disable: true },
      description: "API environment URL (should likely be configured globally).",
    },
    AddressLine1InputName: {
      control: "text",
      table: { disable: true }, // Usually not needed for story interaction
      description: "The 'name' attribute for the Address Line 1 input.",
    },
    AddressLine2InputName: {
      control: "text",
      table: { disable: true }, // Usually not needed for story interaction
      description: "The 'name' attribute for the Address Line 2 input.",
    },
    ClearIcon:{
      control: "boolean",
      type: { name: "boolean" },
      table: { disable: true },
      description: `The ClearSearch property removes the searched item from the search filter in the dropdown.`,
    },
    OnValidation: {
      action: 'onValidationChange',
      description: 'This event is triggered when the validation status of the input changes.',
      // type: { name: 'Function', returns: 'void' },
      table: {
        type: { summary: '(isValid: boolean, errorMessage?: string) => void' },
        category: "Events"
      },
    },
  },
};

// export const AddressControl = (args) => {
//   return <div key={`${args.AllCountry}`}> {/* Keying by AllCountry AND CurrentCountry might be safer if remount is needed */}
//     <VgAddressControl {...args} />
//   </div>
// };

export const AddressControl = (args) => {
  useEffect(() => {
    const elementId = 'AddressControllerCountrytxtaddress'; // Target element ID
    const element = document.getElementById(elementId); // Use standard DOM API
    const flagClass = countryFlag[args.AllCountry]; // Get the flag class based on the prop

    // Store the class added in this effect run for cleanup
    let addedFlagClass = null;

    if (element && flagClass) { // Check if element exists and flag class is found
      addedFlagClass = flagClass; // Remember the class we are adding
      element.classList.add('selectedcountry', addedFlagClass); // Use classList.add
    } else {
      if (!element) {
        // console.warn(`Storybook Effect: Element with ID '${elementId}' not found.`);
      }
      if (!flagClass) {
        // console.warn(`Storybook Effect: No flag class found in 'countryFlag' for CurrentCountry: ${args.AllCountry}`);
      }
    }

    return () => {
      if (element && addedFlagClass) { // Check element and if a class was added
        element.classList.remove(addedFlagClass); // Use classList.remove
      }
    };
  }, [args.AllCountry]); 

  return (
    <div key={args.AllCountry}>
      <VgAddressControl {...args} />
    </div>
  );
};



AddressControl.args = {
  TitleAddressline1: "Business Address Line 1:",
  TitleAddressline2: "Business Address Line 2 (Optional):",
  PlaceHolderAddressline1:"Business Address Line 1",
  PlaceHolderAddressline2:"Business Address Line 2 (Optional)",
  SetValue: "",
  SetAddresLine2Value: "",
  CurrentCountry: "", // Use the key from countryOptions for default selection
  Orientation: "vertical",
  Show_Address_line2: true, // Show line 2 by default
  AllCountry: false, // Use short list by default
  CountryDropdown: true, // Allow country change by default
  Required: false,
  ShowRequiredFieldMark: false,
  Disabled: false, // Added default
  AutoFocus: false, // Added default
  ManualAddress: false, // Added default
  ShouldVerifyAddress: true, // Added default
  NativeActionValue: 13, // Keep hidden defaults if necessary
  CountryDropdownOpenName: "Select Country",
  CountryDropdownCloseName: "",
  ShowHideFooter: 2,
  CallBackTimeCount: 0,
  AddressControlId: "",
  VagaroToolkit: 1,
  IsFullLenght: false,
  EnvironmentUrl: "https://api.vagaro.com/",
  AddressLine1InputName: "address1", // Can provide defaults if needed internally
  AddressLine2InputName: "address2",
  ClearIcon: false,
  VerifyAddressCountryDropdown: false,
  AddressControlId: 'AddressControlId1',
  OnValidation: () => {},
  OnCountryChange:() => {}
};