import React, { useRef, useState } from "react";
import VgPopup from "../VgPopup/VgPopup";
import VgInput from "../VgTextbox/VgTextbox";
import "./VgForm.scss";
import VgDropdown from "../VgDropdown/VgDropdown";
import VgButton from "../VgButton/VgButton";

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
    // // Filter out null refs before validation
    // const validationResults = Object.keys(formValidator.current).reduce(
    //   (acc: { [key: string]: any }, key) => {
    //     const ref = formValidator.current[key];
    //     if (ref && typeof ref.validate === 'function') {
    //       const result = ref.validate();
    //       if (result) {
    //         acc[key] = result;
    //       }
    //     } else {
    //       console.warn(`No valid ref found for ${key}`);
    //     }
    //     return acc;
    //   }, {}
    // );
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
      <div className="vg-reacttk-popup">
        <div className="vg-reacttk-popup-form">
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
              <div className="mb-3">
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
                  OnSearchForApi={(e: any) => {
                    console.log(e);
                  }}
                  DropdownId="DropdownId2"
                  DropdownName=""
                  SearchByApi={true}
                  DropdownTitle={"Select Customers"}
                  SearchPlaceholder="Search users"
                  ApplyButtonOn
                  DropdownClosed={() => {}}
                  GroupOptions
                  Multi={true}
                  OpenFromBody
                  Required={true}
                  // CloseMenuOnSelect={false}
                  Searchable={true}
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
