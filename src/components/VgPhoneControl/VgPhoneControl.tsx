import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
} from "react";
import { useState, useEffect } from "react";
import "./VgPhoneControl.scss";
import "../VgTextbox/VgTextbox.scss";
import Select, { components } from "react-select";
import { AsYouType } from "libphonenumber-js/min";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import VgPassiveNotification from "../VgPassiveNotification/VgPassiveNotification";
import { handleAutoFocus, utils } from "../../utils/utils";
import Portal from "../../common/Portal";

const countriesData = [
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

type AnyType = any;

interface CountryData {
  countryCode: string;
  countryID: number;
  countryName: string;
  cssClass: string;
  dialingCode: string;
  isBusinessUseOnly: boolean;
  label?: string;
  value?: number;
}

interface CountryOption {
  cssClass: string;
  value: number;
  label: string;
  dialingCode: string;
  countryCode: string | AnyType;
}

interface CountryGroup {
  label: string;
  options: CountryOption[];
}

interface CurrentCountry {
  current: CountryOption;
}

interface BannerData {
  message: string;
  type: number;
}

interface validation {
  txtCell: AnyType;
  CountryID: number;
  countryCode?: AnyType;
  isBanner?: boolean;
}

export interface PhoneControlProps {
  Title: string;
  PlaceHolder?: string;
  Validation: string;
  CustomErrorMessage?: string;
  Disable?: boolean;
  FocusBorder?: boolean;
  Required?: boolean;
  CurrentCountry: number;
  isDisabled?: boolean;
  Footer?: number;
  TimerCount?: number;
  FullLength?: boolean;
  CloseBackTitle?: string;
  OnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnKeyUp: (e: React.MouseEvent<HTMLInputElement>) => void;
  OnClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  OnBlur: (e: React.MouseEvent<HTMLInputElement>) => void;
  OnValidation?: (isValid: boolean, errorMessage?: string) => void;
  PhoneControlId?: string;
  [key: string]: any;
  VagaroToolkit: Number;
  MaximumLength?: number;
  SetValue?:string;
  Value?:string;
  CountryDropdown?: boolean;
  ShowRequiredFieldMark?:boolean;
  Name?:string
  AutoFocus?:boolean;
  AllCountry?: boolean;
  CheckPhoneControl?: string; 
  OnCountryChange?: (countryId: number) => void;
  SearchCountry?: boolean;
}

interface RefProps {
  validate: () => any;
  closeDropdown: () => any;
}

const DropdownIndicator = (props: AnyType) => {
  return (
    <Fragment {...props}>
      <div
        className="vg-remove-icon"
        style={{
          display: props.selectProps.inputValue.length === 0 ? "none" : "block",
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

const ErrorType = {
  Success: 1,
  Fail: 2,
  Warning: 3,
};

const Menu: React.FC<AnyType> = (props) => {
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

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  target: React.ReactNode;
  onClose: () => void;
  id: string;
  isDisabled?: boolean;
  countryInputRef?: any;
  CountryDropdown?: boolean;
}



const Dropdown: React.FC<DropdownProps> = ({
  children,
  isOpen,
  target,
  onClose,
  id,
  isDisabled,
  countryInputRef,
  CountryDropdown
}) => (
  
  <div
    className={`custome-select-wrap countrydropdown ${
      isOpen && !isDisabled ? "show-select" : ""
    } ${isDisabled ? "vg-phone-control-disabled" : ""}`}
    
    ref={countryInputRef}
  >
    {target}
    {isOpen && !isDisabled ? (
      <Portal
        wrapperElementId="phonecountry"
        inputRef={countryInputRef}
      >
        <div className="vg-reacttk-country-dropdown-wrap">
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

const VgPhoneControl = forwardRef<RefProps, PhoneControlProps>(
  (
    {
      CurrentCountry,
      Validation,
      CustomErrorMessage,
      Required = false,
      FocusBorder,
      Title,
      PlaceHolder,
      Disable,
      PhoneControlId = "",
      NativeActionVal = 0,
      Footer = 0,
      TimerCount = 0,
      FullLength = false,
      CloseBackTitle,
      VagaroToolkit = 0,
      MaximumLength, 
      SetValue,
      CountryDropdown = false,
      OnBlur,
      OnClick,
      ShowRequiredFieldMark = false,
      Name="vg-phone-control",
      AutoFocus=false,
      AllCountry = false,
      OnChange = () => {},
      OnKeyUp = () => {},
      CheckPhoneControl, // New prop
      OnValidation,
      OnCountryChange,
      SearchCountry = false,
    },
    ref
  ) => {


    const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<CountryOption>({
      cssClass: "",
      value: 0,
      label: "",
      dialingCode: "",
      countryCode: "",
    });
    const [CountryList, setCountryList] = useState<CountryGroup[]>([]);
    const [cellNumber, setCellNumber] = useState<AnyType>({});
    const [inputValue, setInputValue] = useState<string>();
    const [validateInputErrorMessage, setValidateInputErrorMessage] =
      useState<string>("");    
    const [bannerData, setBannerData] = useState<BannerData>({
      message: "",
      type: 0,
    });
    const [isCheckRequired, setIsCheckRequired] = useState<Boolean>(false);

    const phoneInputRef = useRef<AnyType>();
    const cellNumberRef = useRef<AnyType>(cellNumber);
    const selectedDataRef = useRef<CurrentCountry | CountryOption>(
      selectedData
    );
    const countryInputRef = useRef<AnyType>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isAndroidiOSPro = utils.CheckIsFromProAppWithoutState();
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event: any) => {
      setSearchText(event.target.value);
    };
    let formattedNumber: any;
    useEffect(() => {
      if(CountryDropdown === false ){
      setIsDropOpen(false);
     }
    }, [CountryDropdown, isDropOpen]);

    useEffect(() => {
      setInputValue(SetValue);
    },[SetValue])

    useEffect(() => {
      if (inputValue) {
        phonePluginSetPhonePattern({});
      }
    }, [inputValue])

    
    useEffect(() => {
      const initialCountryID = CurrentCountry;
      const country = countriesData.find(
        (country) => country.countryID === initialCountryID
      );
      if (!country) return;

      setSelectedData({
        cssClass: country?.cssClass,
        value: country?.countryID,
        label: `${country?.countryName} +${country?.dialingCode}`,
        dialingCode: country?.dialingCode,
        countryCode: country?.countryCode,
      });
    }, [CurrentCountry]);

    const transformToCountryGroup = (data: CountryData[], currentCountryId: number): CountryGroup[] => {
      const selectedCode = data.find((country) => country.countryID === currentCountryId);
    
      const currentLocations = selectedCode
        ? [
            {
              value: selectedCode.countryID,
              label: `${selectedCode.countryName} +${selectedCode.dialingCode}`,
              dialingCode: selectedCode.dialingCode,
              countryCode: selectedCode.countryCode,
              cssClass: selectedCode.cssClass,
            },
          ]
        : [];
    
      const otherLocations = data
        .filter((country) => country.countryID !== currentCountryId)
        .map((country) => ({
          value: country.countryID,
          label: `${country.countryName} +${country.dialingCode}`,
          dialingCode: country.dialingCode,
          countryCode: country.countryCode,
          cssClass: country.cssClass,
        }));
    
      return [
        {
          label: "Current Location",
          options: currentLocations,
        },
        {
          label: "Other Location",
          options: otherLocations,
        },
      ];
    };

    useEffect(() => {
      if (AllCountry) {
        const fetchCountryList = async () => {
          try {
            const response = await fetch("https://api.vagaro.com/us02/api/v2/countrylist/countrylistdetails");
            if (!response.ok) {
              throw new Error("Failed to fetch country list");
            }
            const data = await response.json();
    
            if (!Array.isArray(data.data) || data.data.length === 0) {
              console.warn("API returned empty or invalid data. Falling back to static data.");
              setCountryList([]);
              return;
            }
    
            const transformedData = transformToCountryGroup(data.data, CurrentCountry || 1);
            setCountryList(transformedData);
          } catch (error) {
            console.error("Error fetching country list:", error);
            setCountryList([]);
          }
        };
    
        fetchCountryList();
      } else {
        setCountryList([]);
      }
    }, [AllCountry, CurrentCountry]);

    const getFilteredCountryList = () => {
      if (!searchText.trim()) {
        return CountryList;
      }
    
      const allOptions = CountryList.flatMap((group) => group.options);
      const filteredOptions = allOptions.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
    
      return [
        {
          label: "Filtered Results",
          options: filteredOptions,
        },
      ];
    };

    useEffect(() => {
      selectedDataRef.current = selectedData;
    }, [selectedData]);

    useEffect(() => {
      cellNumberRef.current = cellNumber;
    }, [cellNumber]);

    useEffect(() => {
      if ((Validation === "None" && Validation) || inputValue === "") {
        setValidateInputErrorMessage("");
      }
    }, [Validation, inputValue]);

    useEffect(() => {
      phonePluginGetCountryList();
      document.addEventListener("mousedown", handleClickToCloseDropdown);
      return () => {
        document.removeEventListener("mousedown", handleClickToCloseDropdown);
      };
    }, []);

    useEffect(() => {
      if (countriesData.length && CurrentCountry) {
        phonePluginGetCountryList_Success(countriesData);
      }
      else if(AllCountry){
        phonePluginGetCountryList_Success(CountryList as any)
      }
    }, [CurrentCountry, countriesData, AllCountry]);


    useEffect(() => {
      handleAutoFocus(AutoFocus, phoneInputRef);
    }, [AutoFocus])

    const handleClickToCloseDropdown = (event: MouseEvent) => {
      if (!isDropOpen) return;
    
      const target = event.target as Node | null;
      
      const searchInput = document.getElementById("s2id_autogen4_search");
      if (searchInput && searchInput.contains(target)) {
        return;
      }
      
      const dropdownContent = document.querySelector(".vg-reacttk-country-dropdown-wrap");
      if (dropdownContent && dropdownContent.contains(target)) {
        return;
      }
      
      if (countryInputRef.current && countryInputRef.current.contains(target)) {
        return;
      }
      
      setIsDropOpen(false);
      if (isAndroidiOSPro) {
        SelectCloseHeaderCallback();
      }
    };

    const phonePluginIsNullOrUndefineOrBlank = (data: AnyType) => {
      if (
        typeof data == "undefined" ||
        data === undefined ||
        data === "" ||
        data === null
      ) {
        return true;
      }
      return false;
    };
    
    const phonePluginSetPhonePattern = ({ e, selectedDataOnLoad }: AnyType) => {
      if (e !== undefined && e != null) {
        if (
          !(e.shiftKey === true && e.keyCode === 9) &&
          !(e.ctrlKey === true && e.keyCode === 90) &&
          !(e.ctrlKey === true && e.keyCode === 65) &&
          (e.shiftKey === true ||
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            e.keyCode >= 106)
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      }

      if (selectedData == null && selectedDataOnLoad === undefined) return;
      const countryId = selectedData
        ? selectedData.value.toString()
        : selectedDataOnLoad.value.toString();

      if (!phonePluginIsNullOrUndefineOrBlank(phoneInputRef?.current?.value)) {
        let phoneVal = phoneInputRef.current.value.replace(/([()-\s])+/g, "");
        if (
          typeof countryId !== "undefined" &&
          countryId !== null &&
          countryId !== ""
        ) {
          let phoneNumber = phoneVal.replace(/([()-\s])+/g, "");
          let valLength = phoneNumber.length;

          if (valLength <= 0) {
            return;
          }

          if (
            valLength === 11 &&
            phoneNumber[0] === "0" &&
            parseInt(countryId) <= 4
          ) {
            phoneNumber = phoneNumber.substring(1);
            valLength = phoneNumber.length;
          }

          const minLengthToCompare = 9;
          const maxLengthToCompare = 11;

          if (countryId === "1" || countryId === "3") {
            if (valLength === 10) {
              
              if (countryId === "3") {
                formattedNumber = phoneNumber.replace(
                  /(\d{3})\-?(\d{3})\-?(\d{4})/,
                  "$1-$2-$3"
                );
              } 
              else if (countryId === "6") {
                formattedNumber = phoneNumber.replace(
                  /(\d{5})\-?(\d{5})/,
                  "$1-$2"
                );
              }
              else {
                formattedNumber = phoneNumber.replace(
                  /(\d{3})\-?(\d{3})\-?(\d{4})/,
                  "($1) $2-$3"
                );
              }
              phoneInputRef.current.value = formattedNumber;
            } else if (valLength > 10) {
              phoneInputRef.current.value = phoneNumber;
            }
          } else if (countryId === "2" || countryId === "4") {
            if (
              valLength >= minLengthToCompare &&
              valLength <= maxLengthToCompare
            ) {
              let formattedNumber;
              if (valLength === 9) {
                formattedNumber = phoneNumber.replace(
                  /(\d{3})\-?(\d{3})\-?(\d{3})/,
                  "$1 $2 $3"
                );
              } else if (valLength === 10) {
                formattedNumber = phoneNumber.replace(
                  /(\d{3})\-?(\d{3})\-?(\d{4})/,
                  "$1 $2 $3"
                );
              } else if (valLength === 11) {
                formattedNumber = phoneNumber.replace(
                  /(\d{3})\-?(\d{3})\-?(\d{4})/,
                  "$1 $2 $3"
                );
              }
              phoneInputRef.current.value = formattedNumber;
            } else if (valLength > maxLengthToCompare) {
              phoneInputRef.current.value = phoneNumber;
            }
          } else {
            const countryCode = selectedData
              ? selectedData.countryCode
              : selectedDataOnLoad.countryCode;
            let formattedNumber = phoneNumber;

            try {
              const parsedNumber = parsePhoneNumberFromString(
                phoneNumber,
                countryCode
              );

              if (parsedNumber && parsedNumber.isValid()) {
                if (countryId === "2" || countryId === "4" || countryId === "6" )  {
                  const nationalFormatted = parsedNumber.format("NATIONAL").replace(/^0/, '');
                  phoneInputRef.current.value = nationalFormatted;
                }
                else {
                  phoneInputRef.current.value =
                    parsedNumber.format("INTERNATIONAL");
                }
              } else {
                phoneInputRef.current.value = formattedNumber;
              }
            } catch (error) {
              phoneInputRef.current.value = formattedNumber;
            }
          }
        } else {
          const formattedNumber = phoneVal.replace(
            /(\d{3})\-?(\d{3})\-?(\d{4})/,
            "($1)-$2-$3"
          );
          phoneInputRef.current.value = formattedNumber;
        }
      }
      setCellNumber(phoneInputRef?.current);
      setInputValue(phoneInputRef.current.value);
      if(formattedNumber){
        if (OnKeyUp && e !== undefined && e !== null) {
          OnKeyUp(e);
        }
      }
    };
    
    const phonePluginGetCountryList = () => {
      phonePluginGetCountryList_Success(countriesData);
    };

    const phonePluginGetCountryList_Success = (result: CountryData[]) => {
      let countryId = CurrentCountry || PropsData.countryID;

      if (!countryId) {
        countryId = 1;
      }

      const CurrentNumber = SetValue;

      const selectedCode = result.find(
        (country: { countryID: number }) => country.countryID === countryId
      );

      let selected: AnyType = {};
      if (selectedCode) {
        selected = {
          cssClass: selectedCode.cssClass,
          value: selectedCode.countryID,
          label: `${selectedCode.countryName} +${selectedCode.dialingCode}`,
          dialingCode: selectedCode.dialingCode,
          countryCode: selectedCode.countryCode,
        };
      }

      setSelectedData(selected);

      if (CurrentNumber) {
        phoneInputRef.current.value = CurrentNumber;
        phonePluginSetPhonePattern( selected );
      }

      let filteredResult = result;
      if (PropsData.UserRole === 1) {
        filteredResult = result.filter(
          (a: { isBusinessUseOnly: boolean }) => a.isBusinessUseOnly === true
        );
      }

      const OtherLocations = filteredResult
        .filter((element) => element.countryID !== selected.value)
        .map((element) => ({
          cssClass: element.cssClass,
          value: element.countryID,
          label: `${element.countryName} +${element.dialingCode}`,
          dialingCode: element.dialingCode,
          countryCode: element.countryCode,
        }));

      const currentLocations = selected ? [selected] : [];

      const countryGroup = [
        {
          label: "Current Location",
          options: currentLocations,
        },
        {
          label: "Other Location",
          options: OtherLocations,
        },
      ];

      setCountryList(countryGroup);
    };

    const formatOptionLabel = (country: { label: string }) => country.label;
    const CustomOption = (props: AnyType) => (
      <components.Option {...props}>
        <div
          className={`select2-result-label countrys-Code ${props.data.cssClass}`}
        >
          <span className={props.data.cssClass}>
            {props.data.label?.split("+")[0]}
          </span>
          <span className="country-code-text">{`+${props.data.dialingCode}`}</span>
        </div>
      </components.Option>
    );

    const onCountryChange = (selectedOption: AnyType) => {
      setIsDropOpen(false);
      setSelectedData(selectedOption);
      phonePluginSetPhonePattern(selectedOption);
      setSearchText("");
      CloseDropdown();
      OnCountryChange && OnCountryChange(selectedOption?.value);

    };

    const displayErrorMessage = (type: number, message: string) => {
      setBannerData({ type, message });

      setTimeout(() => {
        setBannerData({ type, message: "" });
      }, 4000);
    };

    

    const commonValidateNumber = ({
      txtCell,
      CountryID,
      countryCode,
      isBanner = false,
    }: validation) => {
      let isSuccess = true;
      let WarningMessage = "";

      if (txtCell?.value?.length > 0) {
        if (CountryID <= 4 || CountryID === 6) {
          if (CountryID === 4 || CountryID === 2) {
            const Minlength = 9;
            const Maxlength = 11;
            if (txtCell.value.replace(/[^0-9.]/g, "").trim() === "") {
              WarningMessage = "Please enter phone number.";
              isSuccess = false;
            } else if (
              txtCell.value.trim().match(/\d/g).length < Minlength ||
              txtCell.value.trim().match(/\d/g).length > Maxlength
            ) {
              isSuccess = false;
              WarningMessage = `Phone number must be of ${Minlength} to ${Maxlength} digits.`;
            } else {
              isSuccess = true;
            }
          }
          else if (CountryID === 1 || CountryID === 3 || CountryID === 6 ) {
            const MaxLength = 10;

            if (txtCell.value.replace(/[^0-9.]/g, "").trim() === "") {
              WarningMessage = "Please enter phone number.";
              isSuccess = false;
            } else if (
              txtCell.value.trim().match(/\d/g).length < MaxLength ||
              txtCell.value.trim().match(/\d/g).length > MaxLength
            ) {
              isSuccess = false;
              WarningMessage = `Phone number must be of ${MaxLength} digits.`;
            } else {
              isSuccess = true;
            }
          }
        } else {

          if (!isSuccess) {
            WarningMessage = "Number is not a valid phone number.";
          }
        }

        if (!isSuccess) {
          if (isBanner) {
            setValidateInputErrorMessage("");
            displayErrorMessage(ErrorType.Warning, WarningMessage);
          } else {
            setValidateInputErrorMessage(WarningMessage);
          }
        } else if (!isBanner) {
          setValidateInputErrorMessage("");
        }
      } else if (!isBanner) {
        setValidateInputErrorMessage("");
      }

      if (isSuccess) {
        txtCell.classList.remove("errorInput");
        if (isBanner) {
          displayErrorMessage(ErrorType.Success, "");
        }
      } else {
        txtCell.classList.add("errorInput");
      }

    return { isSuccess, WarningMessage };
    };

    useEffect(() => {
      if(inputValue && Validation === "Default"){
        commonValidateNumber({
          txtCell: phoneInputRef?.current,
          CountryID: selectedData?.value,
          countryCode: selectedData?.countryCode,
        });
        phonePluginSetPhonePattern({})
      }
    },[selectedData])

    const runPhoneValidation = () => {
      const isValid = IsCheckValidateNumber(); // your internal validation check
      const errorMessage = validateInputErrorMessage;
      const isRequiredError = Required && !inputValue;

      const overallValid = isValid && !isRequiredError;

      // Expose result to parent
      if (typeof OnValidation === "function") {
        OnValidation(overallValid, overallValid ? "" : errorMessage);
      }

      return overallValid;
    };


      const phoneOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
      
        if (CheckPhoneControl == null || CheckPhoneControl == "" ) {
          value = value.replace(/[^0-9.]/g, "");
          if (value !== e.target.value) {
            e.target.value = value;
            e.preventDefault();
          }
        }
      
        if (value.length > MaximumLength) {
          e.target.value = value.substring(0, MaximumLength); // Trim value to MaximumLength characters
        }
      
        setInputValue(e?.target?.value);

        if (OnValidation) {
          runPhoneValidation();
        }
        if (OnChange) {
          OnChange(e);
        }
      };
      

      const OnBlurNumber = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(OnBlur){
          OnBlur(e);
        }
        if(!Required){
          setIsCheckRequired(false);
        }
        if (Required && !inputValue) {
          setIsCheckRequired(true);
        }

        runPhoneValidation();
        if (Validation === "Default") {
          commonValidateNumber({
            txtCell: phoneInputRef?.current,
            CountryID: selectedData?.value,
            countryCode: selectedData?.countryCode,
          });
        }
        if (Validation === "Passive") {
          commonValidateNumber({
            txtCell: phoneInputRef?.current,
            CountryID: selectedData?.value,
            countryCode: selectedData?.countryCode,
            isBanner: true,
          });
        }
      };

    const hasError =
      validateInputErrorMessage ||
      CustomErrorMessage ||
      bannerData.message ||
      (isCheckRequired && !inputValue && Required );

    const inputClassNames = [
      "vg-input-control",
      hasError && "vg-input-control-error",
      FocusBorder && "vg-input-control-focus",
      Disable && "vg-input-control-disabled",
    ]
      .filter(Boolean)
      .join(" ");

    const IsCheckValidateNumber = () => {
        if (!inputValue) {
          setIsCheckRequired(true);
          return false;
        } else {
          const {isSuccess} = commonValidateNumber({
            txtCell: phoneInputRef?.current,
            CountryID: selectedData?.value,
            countryCode: selectedData?.countryCode,
          })
          setIsCheckRequired(isSuccess);
          return isSuccess;
        }
    };
    const validation = () => {
      const isValid = IsCheckValidateNumber(); // current validation logic
      const errorMessage = validateInputErrorMessage;
      if (Required && !inputValue) {
        setIsCheckRequired(true);
      }

       if (typeof OnValidation === "function") {
         const isRequiredError = Required && !inputValue;
         const overallValid = isValid && !isRequiredError;

         OnValidation(overallValid, overallValid ? "" : errorMessage);
       }

      let validateObject = {
        [PhoneControlId]: inputValue,
        IsValidate: isValid,
        Required: !inputValue && Required ? true : false,
        countryDetails: selectedData,
        errorMessage: errorMessage,
        id: PhoneControlId,
        checkcontrol: "PhoneControl"
      };
      handleAutoFocus(AutoFocus && !isValid, phoneInputRef)
      return validateObject;
    };

    const SelectOpenHeaderCallback = () => {
      if (isAndroidiOSPro) {
        utils.CallBackGivenToMobileApp(
          NativeActionVal,
          Title,
          Footer,
          TimerCount,
          FullLength
        );

        var obj: any = {
          NativeAction: NativeActionVal,
          Footer: Footer,
          FullLength: FullLength,
          callFromLocation: PhoneControlId,
          VagaroToolkit: VagaroToolkit,
        };

        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;
        messageObj.screenTitle = Title;
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "53|~|" + JSON.stringify(obj);
        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }
    };

    const SelectCloseHeaderCallback = () => {
      if (isAndroidiOSPro) {
        var obj: any = {
          NativeAction: NativeActionVal,
          Footer: 1,
          FullLength: FullLength,
          callFromLocation: PhoneControlId,
          VagaroToolkit: VagaroToolkit,
        };

        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;
        messageObj.screenTitle = CloseBackTitle;
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "53|~|" + JSON.stringify(obj);

        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }
    };

    const OpenSelectDropdown = () => {
      setIsDropOpen((prev) => !prev);
      SelectOpenHeaderCallback();
    };

    const CloseDropdown = () => {
      if (isDropOpen === true ) {
        setIsDropOpen(false);
        SelectCloseHeaderCallback();
      }
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
      closeDropdown: () => CloseDropdown(),
    }));

    return (
      <>
          {bannerData.message && (
            <VgPassiveNotification
              Duration={4000}
              NotificationTitle={bannerData.message}
              types="error"
            />
          )}
        
        <div className="vg-reacttk-country-dropdown-wrap">
          {Title?.length > 0 && ( <label className="vg-input-label">{ShowRequiredFieldMark && Required ? <span className="required-input-mark">*</span> : ''}{Title}</label>)}
          <div className="vg-country-flag-dropdown">
            <div
              id={`dvWrap${PropsData.ControlID}`}
              className={`vg-addresswithcountry address-phone-plugin ${!CountryDropdown ? 'disable-country' : ''}`}
              ref={inputRef}
            >
              <Dropdown
                id={PropsData.ControlID}
                isOpen={isDropOpen}
                onClose={() => {
                  setIsDropOpen(false);
                  if (isAndroidiOSPro) {
                    SelectCloseHeaderCallback();
                  }
                }}
                isDisabled={Disable}
                countryInputRef={countryInputRef}
                target={
                  <>
                    <span
                      className={`selectedcountry ${selectedData?.cssClass} ${
                        Disable ? "vg-phone-control-disabled" : ""
                      }`}
                      onClick={() => OpenSelectDropdown()}
                    ></span>
                    <div
                      id={`dvDialingCode${PropsData.ControlID}`}
                      className="country-code"
                    >
                      {selectedData ? `+${selectedData.dialingCode}` : "+1"} 
                    </div>
                  </>
                }
              >
                {SearchCountry && 
                 <div className="select2-search" onClick={(e) => e.stopPropagation()}>
                  <label htmlFor={PropsData.ControlID} className="select2-offscreen"></label>
                  <input
                    type="text"
                    autoComplete="false"
                    className="select2-input text-primary"
                    id={PropsData.ControlID}
                    placeholder="Search for a Country"
                    value={searchText}
                    onChange={handleInputChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                }
                <Select
                  classNamePrefix="vg-country-dropdown-search"
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: null,
                    Option: CustomOption,
                  }}
                  controlShouldRenderValue={false}
                  hideSelectedOptions={false}
                  isClearable={false}
                  isSearchable={false}
                  value={selectedData}
                  defaultValue={selectedData}
                  onChange={onCountryChange}
                  options={getFilteredCountryList()}
                  menuIsOpen={isDropOpen && !Disable}
                  getOptionLabel={formatOptionLabel}
                />
              </Dropdown>

              <div
                className={`select-country-mar vg-select-icon-mar input-focus-relative ${selectedData?.cssClass}`}
              >
                <input
                  id={PropsData.ControlID}
                  type="text"
                  autoComplete={PropsData.ControlID}
                  ref={phoneInputRef}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className={inputClassNames}
                  onBlur={OnBlurNumber}
                  disabled={Disable}
                  onKeyUp={(e) => phonePluginSetPhonePattern({ e })}
                  onChange={(e) => phoneOnChange(e)}
                  placeholder={PlaceHolder}
                  maxLength={MaximumLength+4}  
                  value={inputValue}
                  name={Name}
                  autoFocus={AutoFocus}
                />
                {isCheckRequired && !inputValue && Required && (
                  <span className="vg-input-control-error-msg">
                    {"required"}
                  </span>
                )}
                {(validateInputErrorMessage || CustomErrorMessage) && (
                  <span className="vg-input-control-error-msg">
                    {validateInputErrorMessage || CustomErrorMessage}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <input
          type="hidden"
          onClick={() => CloseDropdown()}
          id={PhoneControlId}
        />
      </>
    );
  }
);

export default VgPhoneControl;