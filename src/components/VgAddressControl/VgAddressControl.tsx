import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  Fragment,
  useImperativeHandle,
} from "react";
import Select, {
  components,
  ControlProps,
  OptionProps,
  GroupBase,
} from "react-select";
import "../VgAddressControl/VgAddressControl.scss";
import AjaxService from "../../common/AjaxService";
import AjaxServiceV1 from "../../common/AjaxServiceV1";
import axios from "axios";
import Portal from "../../common/Portal";
import "../VgPhoneControl/VgPhoneControl.scss";
import "../VgTextbox/VgTextbox.scss";
import { utils } from "../../utils/utils";
import AddressControlPopup from "./AddressControlPopup/AddressControlPopup";

// Interface for country options
interface CountryOption {
  countryCode: string;
  countryID: number;
  countryName: string;
  cssClass: string;
  dialingCode: string;
  isBusinessUseOnly: boolean;
}

export interface VgAddressControlProps {
  TitleAddressline1?: string;
  TitleAddressline2?: string;
  PlaceHolderAddressline1?: string;
  PlaceHolderAddressline2?: string;
  onSelect?: (address: any, value: string) => void;
  OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  AddressControlId?: string;
  [key: string]: any;
  NativeActionValue?: number;
  CountryDropdownOpenName?: string;
  ShowHideFooter?: number;
  CallBackTimeCount?: number;
  IsFullLenght?: boolean;
  EnvironmentUrl?: string;
  VagaroToolkit?: number;
  Orientation?: "vertical" | "horizontal";
  Required?: boolean;
  CountryDropdown?: boolean;
  ShowRequiredFieldMark?: boolean;
  AddressLine1InputName?: string;
  AddressLine2InputName?: string;
  OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnChangeAddressLine2?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  SetValue?: string;
  CurrentCountry?: number;
  AutoFocus?: boolean; // Prop definition
  ManualAddress?: boolean; // Prop definition
  ShouldVerifyAddress?: boolean; // Prop definition
  OnCountryChange?: (countryId: number) => void;
  SetAddresLine2Value?: string;
  AllCountry?: boolean;
  Show_Address_line2?: boolean;
  Disabled?: boolean; // Prop definition
  ClearIcon?: boolean;
  VerifyAddressCountryDropdown?: boolean;
  OnValidation?: (isValid: boolean, errorMessage: string) => void;
}

// Option type for react-select
interface SelectOptionType extends CountryOption {
  value: number;
  label: string;
}

interface VgAddressControlRef {
  validate: () => any;
}

// Default country options
const defaultCountryOptions: CountryOption[] = [
  {
    countryCode: "US",
    countryID: 1,
    countryName: "United States of America",
    cssClass: "us-f",
    dialingCode: "1",
    isBusinessUseOnly: true,
  },
  {
    countryCode: "GB",
    countryID: 2,
    countryName: "United Kingdom",
    cssClass: "uk-f",
    dialingCode: "44",
    isBusinessUseOnly: true,
  },
  {
    countryCode: "CA",
    countryID: 3,
    countryName: "Canada",
    cssClass: "canada-f",
    dialingCode: "1",
    isBusinessUseOnly: true,
  },
  {
    countryCode: "AU",
    countryID: 4,
    countryName: "Australia",
    cssClass: "aus-f",
    dialingCode: "61",
    isBusinessUseOnly: true,
  },
];

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  target: React.ReactNode;
  onClose: () => void;
  id: string;
  Disabled?: boolean;
  countryInputRef?: any;
  CountryDropdown?: boolean;
}

const Menu: React.FC<any> = (props) => {
  return (
    <>
      <div
        className="all-country-flag-react cmn-select-dropdown"
        style={{
          width: "328px",
          backgroundColor: "white",
          borderRadius: 4,
          position: "absolute",
          zIndex: 2,
        }}
        {...props}
      />
      <input type="hidden" id="PhoneControlId" />
    </>
  );
};

interface BlanketProps {
  onClick?: () => void;
}

const Blanket: React.FC<BlanketProps> = (props) => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1,
    }}
    {...props}
  />
);

const Dropdown: React.FC<DropdownProps> = ({
  children,
  isOpen,
  target,
  onClose,
  id,
  Disabled,
  countryInputRef,
  CountryDropdown,
}) => (
  <div
    className={`custome-select-wrap countrydropdown ${
      isOpen && !Disabled ? "show-select" : ""
    } ${Disabled ? "country-disabled" : ""}`}
    ref={countryInputRef}
  >
    {target}
    {isOpen && !Disabled ? (
      <Portal
        wrapperElementId="phonecountry"
        inputRef={countryInputRef}
      >
        <div className="vg-reacttk-country-dropdown-wrap --width-address">
          <Menu id={id}>{children}</Menu>
        </div>
      </Portal>
    ) : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
    <div className="select-backdrop" onClick={onClose}></div>
  </div>
);

const PropsData = {
  ControlID: "off",
  countryID: 1,
  UserRole: 1,
};

interface AddressInput {
  setAddressData?: (data: any) => void;
  updateAddressData?: (data: any) => void;
  setDisabledControl?: (data: any) => void;
  setDisabledCountry?: (data: any) => void;
  setDisabledAddress?: (data: any) => void;
  updateCountry?: (data: any) => void;
  openSelect2?: () => void;
  closeSelect2?: () => void;
  setDefaultValue?: (val: string) => void;
}

declare global {
  interface Window {
    CountryDropdownOpen: (data: any) => any;
    CountryDropdownClose: (data: any) => any;
    AddressCallBackOpen: () => any;
  }
}

// Main component
const VgAddressControl = forwardRef<VgAddressControlRef, VgAddressControlProps>(
  (
    {
      TitleAddressline1 = "",
      TitleAddressline2 = "",
      PlaceHolderAddressline1 = "Business Address Line 1",
      PlaceHolderAddressline2 = "Business Address Line 2",
      onSelect,
      OnBlur,
      AddressControlId = "vg-address-control",
      NativeActionValue = 0,
      CountryDropdownOpenName = "Select Country",
      CountryDropdownCloseName = "",
      ShowHideFooter = 0,
      CallBackTimeCount = 0,
      IsFullLenght = false,
      EnvironmentUrl = "",
      VagaroToolkit = 0,
      Orientation = "vertical",
      Required = false,
      CountryDropdown = false,
      ShowRequiredFieldMark = false,
      AddressLine1InputName = "vg-address-line-1",
      AddressLine2InputName = "vg-address-line-2",
      OnChange,
      OnChangeAddressLine2,
      SetValue = "",
      CurrentCountry = 1, // Default to 1 if not provided or invalid
      AutoFocus = false, // Default value
      ManualAddress = false, // Default value
      ShouldVerifyAddress = true, // Default value
      OnCountryChange,
      SetAddresLine2Value = "",
      AllCountry = false,
      Show_Address_line2 = false,
      Disabled = false, // Default value
      ClearIcon = false,
      VerifyAddressCountryDropdown = false,
      OnValidation,
      ...restProps
    },
    ref
  ) => {

    // Custom option for react-select
    const CustomOption = (
      props: OptionProps<SelectOptionType, false, GroupBase<SelectOptionType>>
    ) => {
      return (
        <components.Option {...props}>
          <div
            className={`select2-result-label countrys-Code ${props.data.cssClass}`}
          >
            <div
              className={`countrys-Code ${props.data.cssClass} allflag-show`}
            />
            {props.label}
          </div>
        </components.Option>
      );
    };

    // Initialize state with the default list
    const [allCountryOptions, setAllCountryOptions] = useState<CountryOption[]>(
      defaultCountryOptions
    );

    const [currentSelectedCountry, setCurrentSelectedCountry] =
      useState<number>(() => {
        const validCountries = defaultCountryOptions.map((c) => c.countryID);
        return validCountries.includes(CurrentCountry) ? CurrentCountry : 1;
      });

    const [selectedCountry, setSelectedCountry] =
      useState<CountryOption | null>(() => {
        const initialCountry = defaultCountryOptions.find(
          (c) => c.countryID === currentSelectedCountry
        );
        return initialCountry || defaultCountryOptions[0] || null; // Fallback to first default
      });
    const ApiURLEnum = {
      getLocationOrPlaceDetail: "address/GetLocationOrPlaceDetail",
    };

    const [inputValue, setInputValue] = useState<string>(SetValue);
    const [addressResults, setAddressResults] = useState<any[]>([]);
    const [addressDropdown, setAddressDropdown] = useState<boolean>(false);
    const [countriesLoading, setCountriesLoading] = useState<boolean>(false);
    const [isAddressValid, setIsAddressValid] = useState(true); // Track address validity
    const addressRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const addressDropdownRef = useRef<HTMLUListElement | null>(null);

    const [addressLine2Value, setAddressLine2Value] =
      useState<string>(SetAddresLine2Value); // Local state for Address Line 2
    const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const countryInputRef = useRef<any>();
    const [isRequiredState, setIsRequiredState] = useState(Required);
    const [touched, setTouched] = useState(false);
    const [addressValue, setAddressValue] = useState<any>(
      SetValue && { Address: SetValue }
    );
    const addressPluginRef = useRef<AddressInput | null>(null);
    const isAndroidiOSPro = utils.CheckIsFromProAppWithoutState();
    const [storedValue, setStoredValue] = useState("");
    const [isCheckRequired, setIsCheckRequired] = useState<Boolean>(false);
    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const [addressStr, setAddressStr] = useState("");
    const [verifyAddress, setVerifyAddress] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState(false);
    const [inputWidth, setInputWidth] = useState<number | null>(null);

    const inputClassNames = [
      "vg-input-control vg-input-address",
      Disabled && "vg-input-address-disabled",
      isCheckRequired && !inputValue && "vg-input-control-error",
    ]
      .filter(Boolean)
      .join(" ");
    const [filteredOptions, setFilteredOptions] = useState<SelectOptionType[]>(
      []
    );
    const [addressInputclick,setAddressInputclick] = useState(false)
    // Effect to update internal input value if SetValue prop changes externally
    useEffect(() => {
      setIsAddressValid(!!SetValue || !ShouldVerifyAddress);
    }, [SetValue, ShouldVerifyAddress]);

    useEffect(() => {
      setAddressLine2Value(SetAddresLine2Value); // Update local state when prop changes
    }, [SetAddresLine2Value]);

    // Effect to focus the input if AutoFocus is true
    useEffect(() => {
      if (AutoFocus && inputRef.current && !Disabled) {
        inputRef.current.focus();
      }
    }, [AutoFocus, Disabled]);

    // Effect to handle CurrentCountry prop changes
    useEffect(() => {
      const currentSource = AllCountry
        ? allCountryOptions
        : defaultCountryOptions;
      const validCountries = currentSource.map((c) => c.countryID);

      if (!validCountries.includes(CurrentCountry)) {
        const defaultCountryId = 1;
        setCurrentSelectedCountry(defaultCountryId);
        const defaultCountry = currentSource.find(
          (c) => c.countryID === defaultCountryId
        );
        setSelectedCountry(defaultCountry || null);
      } else if (CurrentCountry !== currentSelectedCountry) {
        setCurrentSelectedCountry(CurrentCountry);
        const newCountry = currentSource.find(
          (c) => c.countryID === CurrentCountry
        );
        setSelectedCountry(newCountry || null);
      }
    }, [CurrentCountry, AllCountry, allCountryOptions, currentSelectedCountry]); // Add dependencies

    // Effect to handle AllCountry prop
    useEffect(() => {
      if (AllCountry) {
        setCountriesLoading(true);
        AjaxService.Get(
          `countrylist/countrylistdetails`,
          "",
          function onSuccess(data: any) {
            try {
              if (
                data?.data?.data &&
                Array.isArray(data.data.data) &&
                data.data.data.length > 0
              ) {
                const fetchedCountries: CountryOption[] = data.data.data;
                setAllCountryOptions(fetchedCountries);

                // Re-evaluate selected country based on fetched list and CurrentCountry prop
                const validFetchedCountries = fetchedCountries.map(
                  (c) => c.countryID
                );
                const targetCountryId = validFetchedCountries.includes(
                  CurrentCountry
                )
                  ? CurrentCountry
                  : 1;
                const initialSelected =
                  fetchedCountries.find(
                    (c) => c.countryID === targetCountryId
                  ) || fetchedCountries[0];

                if (initialSelected) {
                  setSelectedCountry(initialSelected);
                  setCurrentSelectedCountry(initialSelected.countryID);
                } else {
                  setSelectedCountry(null);
                  setCurrentSelectedCountry(1); // Fallback
                  console.warn(
                    "No countries found or default couldn't be set from fetched list."
                  );
                }
              } else {
                console.warn(
                  "API returned no country data or unexpected format. Using default list.",
                  data
                );
                setAllCountryOptions(defaultCountryOptions); // Fallback to default
                const initialSelected =
                  defaultCountryOptions.find(
                    (c) => c.countryID === CurrentCountry
                  ) || defaultCountryOptions[0];
                setSelectedCountry(initialSelected);
                setCurrentSelectedCountry(initialSelected?.countryID ?? 1);
              }
            } catch (error) {
              console.error("Error processing fetched country list:", error);
              setAllCountryOptions(defaultCountryOptions); // Fallback on error
              const initialSelected =
                defaultCountryOptions.find(
                  (c) => c.countryID === CurrentCountry
                ) || defaultCountryOptions[0];
              setSelectedCountry(initialSelected);
              setCurrentSelectedCountry(initialSelected?.countryID ?? 1);
            } finally {
              setCountriesLoading(false);
            }
          },
          function OnError(error: any) {
            console.error(
              "API Error fetching country list. Using default list.",
              error
            );
            setAllCountryOptions(defaultCountryOptions); // Fallback on error
            const initialSelected =
              defaultCountryOptions.find(
                (c) => c.countryID === CurrentCountry
              ) || defaultCountryOptions[0];
            setSelectedCountry(initialSelected);
            setCurrentSelectedCountry(initialSelected?.countryID ?? 1);
            setCountriesLoading(false);
          }
        );
      } else {
        // Use default list when AllCountry is false
        setAllCountryOptions(defaultCountryOptions);
        const validDefaultCountries = defaultCountryOptions.map(
          (c) => c.countryID
        );
        const targetCountryId = validDefaultCountries.includes(CurrentCountry)
          ? CurrentCountry
          : 1;
        const defaultSelected = defaultCountryOptions.find(
          (c) => c.countryID === targetCountryId
        );
        setSelectedCountry(defaultSelected || defaultCountryOptions[0] || null);
        setCurrentSelectedCountry(targetCountryId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AllCountry]); // Removed CurrentCountry dependency here as it's handled in another effect

    // Effect to handle CountryDropdown (disabling dropdown and setting country)
    useEffect(() => {
      if (CountryDropdown) {
        const currentSource = AllCountry
          ? allCountryOptions
          : defaultCountryOptions;
        const targetCountry = currentSource.find(
          (c) => c.countryID === currentSelectedCountry // Use state value
        );
        setSelectedCountry(targetCountry || currentSource[0] || null);
      }
      // No dependency change needed here as it reacts to CountryDropdown and relies on other effects for country data
    }, [
      CountryDropdown,
      currentSelectedCountry,
      AllCountry,
      allCountryOptions,
    ]);

    const selectOptions = useMemo(() => {
      const currentLocationCountryId = 1; 
      const currentLocationGroup: SelectOptionType[] = [];
      const otherLocationsGroup: SelectOptionType[] = [];

      allCountryOptions.forEach((country) => {
        const option: SelectOptionType = {
          ...country, 
          value: country.countryID,
          label: country.countryName,
        };
        if (country.countryID === currentLocationCountryId) {
          currentLocationGroup.push(option);
        } else {
          otherLocationsGroup.push(option);
        }
      });

      const groupedOptions: GroupBase<SelectOptionType>[] = [];
      if (currentLocationGroup.length > 0) {
        groupedOptions.push({
          label: "Current Location",
          options: currentLocationGroup,
        });
      }
      if (otherLocationsGroup.length > 0) {
        otherLocationsGroup.sort((a, b) => a.label.localeCompare(b.label)); // Sort others alphabetically
        groupedOptions.push({
          label: "Other Locations",
          options: otherLocationsGroup,
        });
      }

      // Fallback if grouping fails but data exists
      if (groupedOptions.length === 0 && allCountryOptions.length > 0) {
        return allCountryOptions
          .map((country) => ({
            ...country,
            value: country.countryID,
            label: country.countryName,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
      }

      return groupedOptions;
    }, [allCountryOptions]); // Recompute only when allCountryOptions changes // Depend on source and grouping logic trigger

    const selectedSelectValue = useMemo(() => {
      if (!selectedCountry) return null;

      const findOption = (
        options: ReadonlyArray<SelectOptionType | GroupBase<SelectOptionType>>
      ): SelectOptionType | null => {
        for (const item of options) {
          if ("options" in item) {
            // It's a group
            const found = (item.options as SelectOptionType[]).find(
              (opt) => opt.value === selectedCountry.countryID
            );
            if (found) return found;
          } else {
            // It's a flat option
            const flatOption = item as SelectOptionType;
            if (flatOption.value === selectedCountry.countryID)
              return flatOption;
          }
        }
        return null;
      };

      const found = findOption(selectOptions);
      if (found) return found;

      // Fallback if not found in structured options (e.g., during loading or mismatch)
      return {
        ...selectedCountry,
        value: selectedCountry.countryID,
        label: selectedCountry.countryName,
      };
    }, [selectedCountry, selectOptions]);

    const handleCountryChange = (selectedOption: SelectOptionType | null) => {
      if (selectedOption) {
        const { value, label, ...countryData } = selectedOption;
        const newSelectedCountry = countryData as CountryOption;
        setSelectedCountry(newSelectedCountry); // Update selectedCountry state
        setAddressDropdown(false);
        setInputValue("");
        setAddressResults([]);
        setIsAddressValid(true); // Reset validation on country change
      } else {
        setSelectedCountry(null);
        setCurrentSelectedCountry(1); // Default to the first country if none is selected
      }
      OnCountryChange && OnCountryChange(selectedOption?.countryID);
      setIsDropOpen(false);
    };

    const handleInputChange = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerifyAddress(true)
        const value = event.target.value;
        setInputValue(value);
        setIsSearching(true);
        setIsAddressValid(value ? true : !ShouldVerifyAddress);
        OnChange?.(event);

        if (!value.trim()) {
          setAddressValue({});
          setIsAddressValid(!ShouldVerifyAddress); // or false depending on validation logic
        } 
        else if (ManualAddress) {
          setAddressValue({ Address: value });
          setIsAddressValid(true);
        }

        if (ManualAddress || !value || !selectedCountry) {
          setAddressResults([]);
          setAddressDropdown(false);
          return;
        }

        setAddressDropdown(true);
        const queryParams = new URLSearchParams({
          searchText: value,
          countryFilter: selectedCountry.countryCode,
          IsCallNewAddressAPI: "true",
        }).toString();
        const endpoint = `${ApiURLEnum.getLocationOrPlaceDetail}?${queryParams}`;

        AjaxServiceV1(
          EnvironmentUrl,
          endpoint,
          null,
          (response: any) => {
            if (
              response?.data?.Data &&
              Array.isArray(response.data.Data) &&
              response.data.Data.length > 0
            ) {
              setAddressResults(response.data.Data);
            } else {
              setAddressResults([{ NoMatch: "No matches found" }]);
            }
            setIsSearching(false);
          },
          () => {
            setAddressResults([]);
            setAddressDropdown(true);
            setIsSearching(false);
          },
          3
        );
      },
      [
        selectedCountry,
        OnChange,
        ManualAddress,
        ShouldVerifyAddress,
        EnvironmentUrl,
        ApiURLEnum.getLocationOrPlaceDetail,
      ]
    );

      const handleSelectDropdata = useCallback(
        async (data: any) => {
          setAddressDropdown(false);
          setVerifyAddress(false);
          if (!selectedCountry || !data || !data.place_id) {
            return;
          }

          const params = {
            placeId: data.place_id,
            description: data.CityState || data.FormattedAddress || "",
            CountryID: selectedCountry.countryID,
            IsStateless: false,
            CountryCode: selectedCountry.countryCode,
            IsCallNewAddressAPI: true,
          };

          AjaxServiceV1(
            "",
            "address/GetPlaceDetailByPlaceId",
            params,
            (data: any) => {
              if (data?.data?.Data) {
                const result = data.data.Data;
                const value = `${result.Address}, ${result.CityState}, ${result.ZipCode}`;
                setInputValue(value);
                setStoredValue(value);
                setIsCheckRequired(false);
                onSelect?.(result, value);

                setAddressValue(result);
                //  if (OnValidation) {
                //    OnValidation(true, "");
                //  }
              }
            },
            () => {}
          );
        },
        [selectedCountry, onSelect]
      );

    const handleClickOutsideAddress = useCallback((event: MouseEvent) => {
      if (
        addressRef.current &&
        !addressRef.current.contains(event.target as Node)
      ) {
        setAddressDropdown(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutsideAddress);
      return () => {
        document.removeEventListener("mousedown", handleClickOutsideAddress);
      };
    }, [handleClickOutsideAddress]);

    const CustomMenuList = (props: any) => {
      return (
        <>
          <components.MenuList {...props}>{props.children}</components.MenuList>
        </>
      );
    };

    const DropdownIndicator = (props: any) => {
      return (
        <Fragment {...props}>
          <div
            className="vg-remove-icon"
            style={{
              display:
                props.selectProps.inputValue.length === 0 ? "none" : "block",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 8.00098C0 3.59473 3.5625 0.000976562 8 0.000976562C12.4062 0.000976562 16 3.59473 16 8.00098C16 12.4385 12.4062 16.001 8 16.001C3.5625 16.001 0 12.4385 0 8.00098ZM5.46875 6.53223L6.9375 8.00098L5.46875 9.46973C5.15625 9.78223 5.15625 10.251 5.46875 10.5322C5.75 10.8447 6.21875 10.8447 6.5 10.5322L7.96875 9.06348L9.46875 10.5322C9.75 10.8447 10.2188 10.8447 10.5 10.5322C10.8125 10.251 10.8125 9.78223 10.5 9.46973L9.03125 8.00098L10.5 6.53223C10.8125 6.25098 10.8125 5.78223 10.5 5.46973C10.2188 5.18848 9.75 5.18848 9.46875 5.46973L7.96875 6.96973L6.5 5.46973C6.21875 5.18848 5.75 5.18848 5.46875 5.46973C5.15625 5.78223 5.15625 6.25098 5.46875 6.53223Z"></path>
            </svg>
          </div>
        </Fragment>
      );
    };

    const handleSearchInputChange = (event: any) => {
      setSearchValue(event.target.value);
    };

    const handleInputFocus = () => {
      if (!isAddressValid) {
        setIsAddressValid(true);
      }
      if (inputValue && !ManualAddress) {
        const event = {
          target: { value: inputValue },
        } as React.ChangeEvent<HTMLInputElement>;
        handleInputChange(event);
      }
      if (inputRef.current && inputValue) {
        inputRef.current.select();
      }
      if (!ManualAddress) {
        setIsSearching(true);
      }
    };

    useEffect(() => {
      if (addressResults && addressResults.length > 0) {
        setIsSearching(false);
      }
    }, [addressResults]);

    const handleInputClick = (e:any) => {
      if(inputRef.current?.focus && addressInputclick){
        setAddressInputclick(false);
        setTimeout(() => {
          inputRef.current?.blur();
        }, 0);
        e.preventDefault();
        e.stopPropagation();
      } else {
        setAddressInputclick(true);
      }
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setAddressInputclick(false)
      setTouched(true);

      if (!Required) {
        setIsCheckRequired(false);
      }
      if (Required && !inputValue) {
        setIsCheckRequired(true);
      }

      if (Required && ShouldVerifyAddress) {
        setIsAddressValid(!!inputValue.trim());
      }
      const isValid =
        !Required ||
        (ManualAddress
          ? !!inputValue.trim()
          : Object.keys(addressValue ?? {}).length > 0);
      if (OnValidation) {
        OnValidation(isValid, isValid ? "" : "Address is required");
      }

      if (OnBlur) {
        OnBlur(e);
      }
    };

    useEffect(() => {
      if (searchValue.trim() !== "") {
        const filtered = selectOptions.flatMap((group) =>
          "options" in group
            ? group.options.filter((option) =>
                option.label.toLowerCase().includes(searchValue.toLowerCase())
              )
            : []
        );
        setFilteredOptions(filtered);
      } else {
        setFilteredOptions([]);
      }
    }, [searchValue, selectOptions]);

    useEffect(() => {
      // Reset filteredOptions when the dropdown is reopened
      if (!isDropOpen) {
        setFilteredOptions([]);
        setSearchValue(""); // Clear the search input
      }
    }, [isDropOpen]);

    useEffect(() => {
      if (CountryDropdown === false) {
        setIsDropOpen(false);
      }
    }, [CountryDropdown, isDropOpen]);

    if (window !== undefined) {
      if (isAndroidiOSPro === true) {
        window.CountryDropdownOpen = (data: any) => {
          if (data === true) {
            var obj: any = {
              NativeAction: NativeActionValue,
              callFromLocation: AddressControlId,
              Footer: ShowHideFooter,
              IsFullLength: IsFullLenght,
              VagaroToolkit: VagaroToolkit,
            };
            var messageObj: any = {};
            messageObj.message = "";
            messageObj.messageType = 0;
            messageObj.screenTitle = CountryDropdownOpenName;
            messageObj.screenType = 0;
            messageObj.navType = 0;
            messageObj.action = "53|~|" + JSON.stringify(obj);
            utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
          }
        };

        window.CountryDropdownClose = (data: any) => {
          if (data === true) {
            var obj: any = {
              NativeAction: NativeActionValue,
              Footer: 1,
              IsFullLength: IsFullLenght,
              callFromLocation: AddressControlId,
              VagaroToolkit: VagaroToolkit,
            };
            var messageObj: any = {};
            messageObj.message = "";
            messageObj.messageType = 0;
            messageObj.screenTitle = CountryDropdownCloseName;
            messageObj.screenType = 0;
            messageObj.navType = 0;
            messageObj.action = "53|~|" + JSON.stringify(obj);
            utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
          }
        };
      }
    }

    const handleChange = (e: any) => {
      setAddressLine2Value(e?.target?.value);
      if (OnChange) {
        OnChange(e);
      }
    };

    const AddressOnChange = (data: any, selectAddressValue: string) => {
      onSelect(data, selectAddressValue);
      setAddressStr(selectAddressValue);
      setInputValue(selectAddressValue);
      setIsAddressValid(true);
      if (ManualAddress) {
        setAddressValue(
          selectAddressValue ? { Address: selectAddressValue } : {}
        );
      } else {
        setAddressValue(data);
      }
    };

    const onCountryChange = (data: any) => {
      OnCountryChange && OnCountryChange(data);
      setCurrentSelectedCountry(data);
    };

    const handleCloseAddressPopup = () => {
      setInputValue(SetValue);
      setShowAddressPopup(false);
    };

    const validation = () => {
      setTouched(true);
      if (Required) {
        setIsCheckRequired(true);
      }
      if (!(Object.keys(addressValue ?? {}).length && Required)) {
        if (AutoFocus && !showAddressPopup) {
          addressPluginRef.current?.openSelect2 &&
            addressPluginRef.current?.openSelect2();
        }
      }
      
    let validateObject = {
      [AddressControlId]: addressValue,

      IsValidate:
        Object.keys(addressValue ?? {}).length && Required ? true : false,

      IsRequired:
        !Object.keys(addressValue ?? {}).length && Required ? true : false,

      id: AddressControlId,
    };
    if (
      Required &&
      ShouldVerifyAddress &&
      verifyAddress &&
      inputValue.length &&
      !showAddressPopup && !validateObject.IsValidate
    ) {
      setShowAddressPopup(true);
    }
    if (OnValidation) {
      OnValidation(
        validateObject.IsValidate,
        validateObject.IsValidate ? '' : ""
      );
    }
    return validateObject;

    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
      openAddressPopup: () => setShowAddressPopup(true),
      ...(addressPluginRef?.current ?? {}),
    }));

    useEffect(() => {
      setIsRequiredState(!!storedValue || !!inputValue);
    }, [storedValue, inputValue]);


    useEffect(() => {
      const timeout = setTimeout(() => {
        if (inputRef.current) {
          const width = inputRef.current.offsetWidth;
          setInputWidth(width);
        }
      }, 100); 

      return () => clearTimeout(timeout);
    }, []);

     useEffect(() => {
          const handleScroll = () => {
            if (addressDropdownRef.current) {
              addressDropdownRef.current.style.display = 'none';
            }
          };
    
          window.addEventListener("scroll", handleScroll);
    
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, []);
    return (
      <>
        <div
          className={`vg-reacttk-country-dropdown-wrap --width-address ${
            Orientation === "horizontal" ? "vg-horizontal" : "vg-vertical"
          }`}
        >
          <div className="vg-country-flag-dropdown">
            {/* Render TitleAddressline1 */}
            {TitleAddressline1 && (
              <div className="vg-input-label">
                {ShowRequiredFieldMark && ( // Show star only if required
                  <span className="required-input-mark">*</span>
                )}
                {TitleAddressline1}
              </div>
            )}

            <div
              className={`vg-addresswithcountry address-phone-plugin ${
                !CountryDropdown ? "disable-country" : ""
              }`}
              id={PropsData.ControlID}
              ref={countryInputRef}
            >
              <Dropdown
                id={PropsData.ControlID}
                isOpen={isDropOpen}
                onClose={() => {
                  setIsDropOpen(false);
                }}
                Disabled={Disabled}
                countryInputRef={countryInputRef}
                target={
                  <div
                    onClick={() => setIsDropOpen((prev) => !prev)}
                    className={`selectedcountry ${selectedSelectValue?.cssClass} allflag-show`}
                  ></div>
                }
              >
                <div
                  className="select2-search"
                  onClick={(e) => e.stopPropagation()}
                >
                  <label
                    htmlFor="s2id_autogen4_search"
                    className="select2-offscreen"
                  ></label>
                  <input
                    type="text"
                    autoComplete="false"
                    className="select2-input text-primary"
                    id="s2id_autogen4_search"
                    placeholder="Search for a Country"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <Select
                  options={
                    filteredOptions.length > 0 ? filteredOptions : selectOptions
                  }
                  controlShouldRenderValue={false}
                  value={selectedSelectValue}
                  onChange={handleCountryChange}
                  hideSelectedOptions={false}
                  components={{
                    Option: CustomOption,
                    DropdownIndicator,
                    IndicatorSeparator: null,
                  }}
                  placeholder={CountryDropdownOpenName}
                  isLoading={countriesLoading}
                  isDisabled={Disabled} // Disable if CountryDropdown OR Disabled is true
                  isClearable={false}
                  isSearchable={false}
                  menuIsOpen={isDropOpen && !Disabled}
                  defaultValue={selectedSelectValue}
                  classNamePrefix={"vg-country-dropdown-search"}
                />
              </Dropdown>
              <div
                className={`select-country-mar vg-select-icon-mar input-focus-relative ${selectedSelectValue?.cssClass}`}
              >
                <input
                  ref={inputRef}
                  id={PropsData.ControlID}
                  type="text"
                  autoComplete={PropsData.ControlID}
                  className={inputClassNames}
                  title={inputValue}
                  onChange={(e) => handleInputChange(e)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required={Required && !storedValue}
                  disabled={Disabled} // Apply disabled state
                  placeholder={PlaceHolderAddressline1}
                  value={inputValue}
                  autoFocus={AutoFocus}
                  onClick={handleInputClick}
                />
                {storedValue && ClearIcon && (
                  <span
                    className="vg-input-address-icon"
                    onClick={() => {
                      if (Disabled) {
                        return;
                      }
                      setInputValue("");
                      setStoredValue("");
                      setVerifyAddress(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                    </svg>
                  </span>
                )}
              </div>
              {/* Address Suggestions Dropdown */}
              {!ManualAddress && addressDropdown && (
                <Portal
                                  wrapperElementId="address-suggestions-dropdown"
                                  wrapperElement="div"
                                  inputRef={inputRef}
                                  type={5}
                                >
                
                <div className="select2-results"  ref={addressRef} style={{ width: inputWidth ?? undefined }}>
                  <ul className="select2-results__options" ref={addressDropdownRef}>
                    {isSearching ? (
                      <li className="select2-results__option">
                        <div className="payrolladdress-control">
                          <span className="fullocation">Searching...</span>
                        </div>
                      </li>
                    ) : (
                      addressResults &&
                      addressResults.length > 0 &&
                      addressResults.map((result, index) => {
                        if (result.NoMatch) {
                          return (
                            <li
                              className="select2-results__option"
                              role="option"
                              aria-selected="false"
                              key={index}
                            >
                              <div className="payrolladdress-control">
                                <span
                                  className="fullocation"
                                  style={{ cursor: "default" }}
                                >
                                  {result.NoMatch}
                                </span>
                              </div>
                            </li>
                          );
                        }
                        return (
                          <li
                            className="select2-results__option"
                            key={result.place_id || result.id || index}
                            onClick={(e) => {
                              handleSelectDropdata(result);
                            }}
                            role="option"
                            aria-selected="false"
                          >
                            <div className="payrolladdress-control">
                              <img
                                style={{ verticalAlign: "middle" }}
                                src="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/flamingo-map-newicon-new@2x.png"
                                width={12}
                                alt="location icon"
                              />
                              <span
                                className="fullocation"
                                dangerouslySetInnerHTML={{
                                  __html: result.FormattedAddress,
                                }}
                              />
                              <span>{result.description}</span>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
                </Portal>
              )}
            </div>

            {isCheckRequired &&
              !inputValue && ( // Show error only if required and invalid
                <div
                  className="vg-input-control-error-address"
                >
                  required
                </div>
              )}
          </div>

          {/* Address Line 2 */}
          {Show_Address_line2 && (
            <div className="vg-address-line2">
              {TitleAddressline2?.length > 0 && TitleAddressline2 && <div className="vg-input-label">{TitleAddressline2}</div>}
              <input
                type="text"
                autoComplete="off"
                className={`vg-input-control vg-input-address ${
                  Disabled ? "vg-input-address-disabled" : ""
                }`}
                name={AddressLine2InputName}
                placeholder={PlaceHolderAddressline2}
                value={addressLine2Value} // Use local state
                onChange={(e) => {
                  setAddressLine2Value(e.target.value); // Update local state
                  if (OnChangeAddressLine2) {
                    OnChangeAddressLine2(e);
                  } // Propagate change
                }}
                disabled={Disabled}
              />
            </div>
          )}
        </div>
        {showAddressPopup && (
          <AddressControlPopup
            show={showAddressPopup}
            popupValue={inputValue}
            setPopupValue={setInputValue}
            onClose={handleCloseAddressPopup}
            onSelect={onSelect}
            SetValue={SetValue}
            TitleAddressline1={TitleAddressline1}
            TitleAddressline2={TitleAddressline2}
            PlaceHolderAddressline1={PlaceHolderAddressline1}
            PlaceHolderAddressline2={PlaceHolderAddressline2}
            currentSelectedCountry={currentSelectedCountry}
            setShow={setShowAddressPopup}
            setAddress={addressPluginRef.current?.updateAddressData}
            AddressOnChange={AddressOnChange}
            handleChangeAddressLine2={handleChange}
            handleCountryChange={(data) => {
              onCountryChange(data);
              if (addressPluginRef?.current?.updateCountry) {
                addressPluginRef.current?.updateCountry(data);
              }
            }}
            setVerifyAddress={setVerifyAddress}
            verifyAddressCountryDropdown={VerifyAddressCountryDropdown}
          />
        )}
      </>
    );
  }
);

export default VgAddressControl;
