import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AjaxServiceV1 from "../../../common/AjaxServiceV1.jsx";
import VgPopup from "../../VgPopup/VgPopup";
import VgInput from "../../VgTextbox/VgTextbox";
import VgAddressControl from "../VgAddressControl";
import "../VgAddressControl.scss";
import "./AddressControlPopup.scss";

interface AddressControlPopupProps {
  show: boolean;
  popupValue: string;
  setPopupValue: string | undefined | any;
  onClose: () => void;
  onSelect?: (address: any, value: string) => void;
  SetValue?: string;
  TitleAddressline1: string;
  TitleAddressline2: string;
  PlaceHolderAddressline1: string;
  PlaceHolderAddressline2: string;
  currentSelectedCountry: number;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress?: (val: any) => void;
  AddressOnChange: (data: any, selectAddressValue: string) => void;
  handleChangeAddressLine2: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCountryChange: (data: any) => void;
  setVerifyAddress : any
  verifyAddressCountryDropdown: boolean;
}

interface CountryOption {
  StateID: number;
  StateName: string;
  CountryID: number;
  StateCode: string;
  DisplayStateCode: string;
}

enum StateLabel {
  state = "State",
  county = "County",
  province = "Province",
  state_territory = "State/Territory",
}

enum ZipCodeLabel {
  zipcode = "ZIP Code",
  postcode = "Postcode",
  postal_code = "Postal Code",
}
const countryFlag: Record<string, string> = {
  "1": "us",
  "2": "uk",
  "3": "canada",
  "4": "aus",
};
const countryName: Record<string, string> = {
  "1": "United States",
  "2": "United Kingdom",
  "3": "Canada",
  "4": "Australia",
};

const AddressControlPopup: React.FC<AddressControlPopupProps> = ({
  show,
  popupValue,
  setPopupValue,
  onClose,
  SetValue,
  onSelect,
  TitleAddressline1,
  TitleAddressline2,
  PlaceHolderAddressline2,
  PlaceHolderAddressline1,
  currentSelectedCountry,
  setShow,
  setAddress,
  AddressOnChange,
  handleChangeAddressLine2,
  handleCountryChange,
  setVerifyAddress,
  verifyAddressCountryDropdown
}) => {
  const [countryId, setCountryId] = useState(1);
  const [stateLabel, setStateLabel] = useState("State");
  const [zipcodeLabel, setZipcodeLabel] = useState("ZIP code");
  const [inputValue, setInputValue] = useState('');
  const [addressDetails, setAddressDetails] = useState({
    address: { value: SetValue || "" , error: "" },
    addressLine2: { value: "", error: "" },
    city: { value: "", error: "" },
    state: { value: "", error: "" },
    zipcode: { value: "", error: "" },
  });
  const [addressData, setAddressData] = useState<any>({});
  const [stateOptions, setStateOptions] = useState<CountryOption[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const formValidator = useRef<{ [key: string]: any | null }>({});
  const addressControlRef = useRef<any>(null);

  const stateLabelMap: Record<number, string> = {
    1: StateLabel.state,
    2: StateLabel.county,
    3: StateLabel.province,
    4: StateLabel.state_territory,
  };

  const zipLabelMap: Record<number, string> = {
    1: ZipCodeLabel.zipcode,
    2: ZipCodeLabel.postcode,
    3: ZipCodeLabel.postal_code,
    4: ZipCodeLabel.postcode,
  };


  const onCountryChange = (id: number) => {
    if (addressControlRef?.current?.clearAddressData && countryId !== id) {
      addressControlRef?.current.clearAddressData();
      setAddressDetails({
        address: { value: "", error: "" },
        addressLine2: { value: "", error: "" },
        city: { value: "", error: "" },
        state: { value: "", error: "" },
        zipcode: { value: "", error: "" },
      });
    }
    setCountryId(id);
    // handleCountryChange(id);
    // switch (id) {
    //   case 1:
    //     setStateLabel(StateLabel.state);
    //     setZipcodeLabel(ZipCodeLabel.zipcode);
    //     break;
    //   case 2:
    //     setStateLabel(StateLabel.county);
    //     setZipcodeLabel(ZipCodeLabel.postcode);
    //     break;
    //   case 3:
    //     setStateLabel(StateLabel.province);
    //     setZipcodeLabel(ZipCodeLabel.postal_code);
    //     break;
    //   case 4:
    //     setStateLabel(StateLabel.state_territory);
    //     setZipcodeLabel(ZipCodeLabel.postcode);
    //     break;
    //   default:
    //     setStateLabel(StateLabel.state);
    //     setZipcodeLabel(ZipCodeLabel.zipcode);
    //     break;
    // }
   
    setStateLabel(stateLabelMap[id] ?? StateLabel.state);
    setZipcodeLabel(zipLabelMap[id] ?? ZipCodeLabel.zipcode);
    
    
  };

  const handleChangeAddress = (
    value: string,
    changeKey: keyof typeof addressDetails
  ) => {
    setAddressDetails((prev) => ({
      ...prev,
      [changeKey]: {
        ...(prev?.[changeKey] ?? {}),
        value,
        error: "",
      },
    }));
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  }
  
  const handleSaveAddress = (response: any, payload: Record<string, any>) => {
    if (response?.data?.Data) {

      setVerifyAddress(false)
      const data = response?.data?.Data.split("|");
          setAddressDetails((prev) =>({
            ...prev,
            city : {value : data[0] , error : ""},
            state : {value : data[3] , error : ""}
          }))
    } else {
      setVerifyAddress(true)
      setAddressDetails((prev) =>({
              ...prev,
              city : {value : "" , error : ""},
              state : {value : "" , error : ""}
            }))
    }
  };
  const handleSave = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data?: any
  ) => {
    e?.preventDefault();

    const validationResults = Object.keys(formValidator.current).reduce(
      (acc: { [key: string]: any }, key) => {
        const result = formValidator.current[key]?.validate?.();
        if (result) {
          acc[key] = result;
        }
        return acc;
      },
      {}
    );

    const isZipValid =
      validationResults.zipcode?.IsValidate === true ||
      validationResults.zipcode?.Required === false;

    const isCityValid = addressDetails?.city?.value?.trim() !== "";
    const isStateValid = addressDetails?.state?.value?.trim() !== "";
    const isAddressValid = validationResults?.address?.IsValidate === true;

    if (!isZipValid || !isCityValid || !isStateValid || !isAddressValid) {
      console.warn("Validation failed. Not saving address.");
      return;
    }

    const stateName = stateOptions?.find(
      (state) => state?.StateCode === addressDetails?.state?.value
    )?.StateName;
    const addressData = {
      ZipCode: addressDetails?.zipcode?.value,
      CityState: `${addressDetails?.city?.value}, ${addressDetails?.state?.value}`,
      Address2: addressDetails?.addressLine2?.value,
      CountryID: countryId,
      City: addressDetails?.city?.value,
      State: stateName,
      StateName: stateName,
      StateCode: addressDetails?.state?.value,
      countryName: countryName[countryId],
      Address: `${addressDetails?.addressLine2?.value} ${addressDetails?.city?.value} ${stateName} , ${addressDetails?.zipcode?.value}`,
    };
    setAddress && setAddress(addressData);
    onSelect &&
      onSelect(
        addressData?.Address ? addressData : {},
        `${addressData.Address} ${addressData.City} ${addressData.State} ${addressData.ZipCode}`
      );
    AddressOnChange && AddressOnChange(addressData, `${addressData.Address}`);
    handleCountryChange(countryId);
    setShow(false);
  };

  const handleAlertClose = () => setShowAlert(false);

  const handleBlurZipcode = () => {
    if (!addressDetails?.zipcode?.value) return;
    const payload = {
      CountryID: countryId,
      StrZipCode: addressDetails?.zipcode?.value,
      City: addressDetails?.city?.value,
      StateName: addressDetails?.state?.value,
      Address: addressDetails?.addressLine2?.value,
      IsStateless: false,
      CountryCode: countryFlag[countryId?.toString()],
    };
    
    AjaxServiceV1(
      "",
      "address/GetCityByZipCodeWithStatecode",
      payload,
      (response: any) => handleSaveAddress(response, payload),
      (err: any) => console.error("err", err),
      1
    );
  };

  const handleSelectAddress = (data: any, value: string) => {
    handleChangeAddress(value, "address");
    setAddressData(data);
  };

  useEffect(() => {
    AjaxServiceV1(
      "",
      "address/getstatesbymultiplecountryid",
      { CountryIDs: "" },
      (response: any) => {
        setStateOptions(response.data.Data);
      },
      () => {
        setStateOptions([]);
      },
      1
    );
  }, []);

  useEffect(() => {
  if (currentSelectedCountry && currentSelectedCountry !== countryId) {
    onCountryChange(currentSelectedCountry); 
  }
  
}, [currentSelectedCountry]);


  const PopupBody = () => (
    <>
      <div className="vg-addresspopup-text">
        Our system doesn’t recognize your address. Please provide the following
        information.
      </div>
      <VgAddressControl
        ref={(data: any) => (formValidator.current["address"] = data)}
        Required
        AddressControlId="address"
        AddressLine2InputName="verify-address-control-popup-input"
        CallBackTimeCount={0}
        CountryDropdownCloseName=""
        CountryDropdownOpenName="Select Country"
        CurrentCountry={currentSelectedCountry}
        EnvironmentUrl="https://api.vagaro.com/"
        NativeActionValue={13}
        Orientation="vertical"
        CountryDropdown={verifyAddressCountryDropdown}
        PlaceHolderAddressline1={PlaceHolderAddressline1}
        PlaceHolderAddressline2={PlaceHolderAddressline2}
        ShowHideFooter={2}
        TitleAddressline1={TitleAddressline1}
        TitleAddressline2={TitleAddressline2}
        VagaroToolkit={1}
        onSelect={handleSelectAddress}
        ManualAddress
        ShouldVerifyAddress={false}
        OnCountryChange={onCountryChange}
        OnChange={(e: any) =>
          handleChangeAddress(e?.target?.value, "addressLine2")
        }
        
      />

        <VgInput
            ref={(data: any) => (formValidator.current["city"] = data)}
            InputDescription=""
            InputTitle="Address Line 2:"
            LabelPosition="top"
            OnBlur={() => {}}
            PlaceHolder="Address Line 2 (Optional)"
            UrlPrefix=""
            SetValue={inputValue}
            Validation="none"
            OnChange={(e) => {
              handleChange(e)
            }}
            InputId="city"
          />
      <div className="vg-addresspopup-fields">
        <div className="vg-addresspopup-field">

        
          <VgInput
            ref={(data: any) => (formValidator.current["city"] = data)}
            InputDescription=""
            InputTitle="City:"
            Required
            LabelPosition="top"
            OnBlur={() => {}}
            PlaceHolder="City"
            UrlPrefix=""
            SetValue={addressDetails?.city?.value}
            Validation="none"
            OnChange={(e) => {
              handleChangeAddress(e?.target?.value, "city");
            }}
            InputId="city"
          />
         
        </div>
        <div className="vg-addresspopup-field">
          <label className="vg-input-label">{stateLabel}:</label>
          <select
            className={`vg-addresspopup-state-dropdown ${
              addressDetails?.state?.error ? "vg-input-control-error" : ""
            }`}
            value={addressDetails?.state?.value}
            onChange={(e) => handleChangeAddress(e?.target?.value, "state")}
            ref={(data: any) => {
              formValidator.current["state"] = {
                ...data,
                validate: () => {
                  if (!addressDetails?.state.value) {
                    setAddressDetails((prev) => ({
                      ...prev,
                      state: { ...addressDetails?.state, error: "required" },
                    }));
                  }
                  return {
                    state: addressDetails?.state?.value,
                    id: "state",
                    IsValidate: Boolean(addressDetails?.state?.value),
                  };
                },
              };
            }}
          >
            <option value="">Select</option>
            {stateOptions
              ?.filter((state) => state?.CountryID === countryId)
              ?.map((country) => {
                return (
                  <option key={country.StateID} value={country.StateCode}>
                    {country.StateCode}
                  </option>
                );
              })}
          </select>
          {addressDetails?.state?.error && (
            <span className="vg-input-control-error-msg">
              {addressDetails?.state?.error}
            </span>
          )}
        </div>
        <div className="vg-addresspopup-field">
          <VgInput
            ref={(data: any) => (formValidator.current["zipcode"] = data)}
            InputTitle={zipcodeLabel}
            OnBlur={handleBlurZipcode}
            PlaceHolder={zipcodeLabel}
            Required
            OnChange={(e) => {
              handleChangeAddress(e?.target?.value, "zipcode");
            }}
            InputId="zipcode"
            SetValue={addressDetails?.zipcode?.value}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      <VgPopup
        ButtonPrimary="Save"
        ButtonSecondary="Cancel"
        CloseBackTitle="From Control"
        CloseButton
        Footer={2}
        FooterButton="both"
        Popupopen={show}
        OnClickPrimary={handleSave}
        OnClickSecondary={onClose}
        PopupId="PopupId"
        PopupTitle="Verify Address"
        Size="medium"
        TextDescription=""
        TimerCount={0}
        VagaroToolkit={1}
        customClassName="vg-addresspopup-control-popup"
        onClose={onClose}
        PopupBody={PopupBody}
        FormValidation={formValidator?.current}
        FormValid
        CloseOnOutsideClick={false}
      />
    </>
  );
};

export default AddressControlPopup;
