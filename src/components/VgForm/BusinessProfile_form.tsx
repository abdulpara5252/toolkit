import React, { Fragment, useEffect, useRef } from "react";
import VgInput from "../VgTextbox/VgTextbox";
import VgButton from "../VgButton/VgButton";
import VgTextarea from "../VgTextarea/VgTextarea";
import  VgAddressControl from "../VgAddressControl/VgAddressControl";
import VgToggle from "../VgToggle/VgToggle";
import "./BusinessProfile_form.scss";
import VgPhoneControl from "../VgPhoneControl/VgPhoneControl";
import VgMapControl from "../VgMapControl/VgMapControl";

const BusinessProfile_form = () => {
  const formValidator = useRef<{ [key: string]: any | null }>({});
  const handleClick = (e: any, data: any) => {
  };

  return (
    <Fragment>
      <div className="form-container">
        <div className="vgform-container">
          <h2 className="form-title">Business information</h2>
          <div className="vgform">
            <div className="field">
              <VgInput
                ref={(data: any) =>
                  (formValidator.current["businessName"] = data)
                }
                InputDescription=""
                InputTitle="Business Name:"
                Required
                LabelPosition="top"
                OnBlur={() => {}}
                PlaceHolder="Input Field"
                UrlPrefix=""
                Validation="regex"
                OnChange={() => {}}
                InputId="input-one"
              />
            </div>
            <div className="field">
              <VgTextarea
                AiClickEvent={() => {}}
                Label
                LabelText="Business Description:"
                PlaceHolder="Within a paragraph or two, write a compelling description of your business. Be sure to mention what you’re best known for, where you’re located and how you fit into your industry."
                TextareaVariant="Default"
                onChange={() => {}}
                MaximumLength={1500}
                TextAreaId="textArea-one"
              />
            </div>
            <div className="fields">
              <div className="field">
                <VgPhoneControl
                  ref={(data: any) =>
                    (formValidator.current["businessPhone"] = data)
                  }
                  CloseBackTitle="Vagaro React Toolkit"
                  CurrentCountry={1}
                  Footer={0}
                  NativeActionVal={0}
                  OnChange={() => {}}
                  OnClick={() => {}}
                  Required
                  PhoneControlId="phoneControl"
                  PlaceHolder="Enter Phone Number"
                  TimerCount={0}
                  Title="Business Phone:"
                  VagaroToolkit={1}
                  Validation="Default"
                />
              </div>
              <div className="field">
                <VgInput
                  ref={(data: any) =>
                    (formValidator.current["businessEmail"] = data)
                  }
                  InputDescription=""
                  InputTitle="Business Email:"
                  Required
                  LabelPosition="top"
                  OnBlur={() => {}}
                  PlaceHolder="Input Field"
                  UrlPrefix=""
                  Validation="email"
                  OnChange={() => {}}
                  InputId="input-two"
                />
              </div>
            </div>
            <div className="fields">
              <div className="field">
                <VgInput
                  InputDescription=""
                  InputTitle="Business Website:"
                  Required
                  LabelPosition="top"
                  OnBlur={() => {}}
                  PlaceHolder="Input Field"
                  UrlPrefix=""
                  Validation="none"
                  OnChange={() => {}}
                  InputId="input-three"
                />
              </div>
              <div className="field">
                <VgInput
                  ref={(data: any) =>
                    (formValidator.current["vagaroUrl"] = data)
                  }
                  InputTitle="Vagaro URL:"
                  OnBlur={() => {}}
                  PlaceHolder="URL Input"
                  UrlPrefix="www.vagaro.com/"
                  Required
                  OnChange={() => {}}
                  InputId="input-four"
                />
              </div>
            </div>
            <div className="field switch-full">
              <VgToggle
                Description="Share your phone number on your Vagaro page."
                OnChange={() => {}}
                ToggleVariation="WithDescription"
                Title="Show Contact Information"
                ToggleId="switch-one"
              />
            </div>
            <div className="field switch-full">
              <VgToggle
                Description="Show the Message button on your Vagaro page so users can send messages to your business through Vagaro Connect."
                OnChange={() => {}}
                ToggleVariation="WithDescription"
                Title="Show Vagaro Connect Messaging"
                ToggleId="switch-two"
              />
            </div>
            <div className="field switch-full switch-full-last">
              <VgToggle
                Description="List your business on Vagaro.com for online booking."
                OnChange={() => {}}
                ToggleVariation="WithDescription"
                Title="List Business on Vagaro.com"
                ToggleId="switch-three"
              />
            </div>
          </div>
          <h2 className="form-title">Business location</h2>
          <div className="vgform-half">
            <div className="vgform">
              <div className="field">
                <VgAddressControl
                  ref={(data: any) =>
                    (formValidator.current["businessAddress"] = data)
                  }
                  CallBackTimeCount={0}
                  CountryDropdownCloseName="Vagaro React Toolkit"
                  CountryDropdownOpenName="Select Country"
                  EnvironmentUrl="https://api.vagaro.com/"
                  TitleAddressline1="Business Address Line 1:"
                  NativeActionValue={0}
                  Orientation="vertical"
                  PlaceHolderAddressline1="Your Address (Hidden Online)"
                  PlaceHolderAddressline2="Apt, suite, building number, etc."
                  ShowHideFooter={0}
                  VagaroToolkit={1}
                  onSelect={() => {}}
                  AddressControlId="addressControl"
                />
              </div>
              <div className="fields">
                <div className="field">
                  <VgInput
                    CustomMsg="mi"
                    InfoChip
                    DropInValue="All United States"
                    InputDrop
                    InputText="All United States"
                    InputDescription=""
                    InputTitle="Service Area Radius:"
                    LabelPosition="top"
                    OnBlur={() => {}}
                    PlaceHolder="Enter miles"
                    TooltipMessage="Distance from your address. Customers outside of this service area cannot book online."
                    UrlPrefix=""
                    PrefixSupport="suffix"
                    Validation="regex"
                    OnChange={() => {}}
                    InputId="input-five"
                    SetValue=""
                  />
                </div>
                <div className="field">
                  <VgInput
                    CustomMsg="min"
                    InfoChip
                    InputDescription=""
                    InputTitle="One-Way Driving Time:"
                    Required
                    LabelPosition="top"
                    MaximumLength={4}
                    OnBlur={() => {}}
                    PlaceHolder="One-Way Driving Time"
                    TooltipMessage="Blocked time on calendar before and after service."
                    UrlPrefix=""
                    PrefixSupport="suffix"
                    Validation="numeric"
                    numericValidation
                    OnChange={() => {}}
                    InputId="input-six"
                  />
                </div>
              </div>
              <div className="fields">
                <div className="field">
                  <VgInput
                    InputDescription=""
                    InputId="input-seven"
                    InputTitle="Additional Travel Fee:"
                    Required
                    LabelPosition="top"
                    MaximumLength={4}
                    OnBlur={() => {}}
                    PlaceHolder="Additional Travel Fee:"
                    PrefixSupport="prefix"
                    UrlPrefix=""
                    Validation="numeric"
                    numericValidation
                    OnChange={() => {}}
                  />
                </div>
                <div className="field">
                  <VgInput
                    CustomMsg="pts"
                    InputDescription=""
                    InputTitle="Additional Points to Redeem:"
                    Required
                    LabelPosition="top"
                    MaximumLength={5}
                    OnBlur={() => {}}
                    PlaceHolder="Additional Points to Redeem:"
                    PrefixSupport="suffix"
                    UrlPrefix=""
                    Validation="numeric"
                    numericValidation
                    OnChange={() => {}}
                    InputId="input-eight"
                  />
                </div>
              </div>
              <div className="field">
                <VgToggle
                  Description="Navigation apps will direct customers to your business based on your business address and not where your map marker is set."
                  OnChange={() => {}}
                  ToggleVariation="WithDescription"
                  Title="Use Business Address for Navigation App Directions"
                  ToggleId="switch-four"
                />
              </div>
            </div>
            <div className="business-map">
              <VgMapControl
                CloseBackTitle=""
                FixIncorrectMarker
                Footer={2}
                Latitude={41.38867}
                Longitude={-71.95875}
                MapControlId="MapControlId1"
                MapHeight="100%"
                MapWidth="100%"
                NativeAction={13}
                Radius={0}
                TimerCount={1000}
                VagaroToolkit={1}
              />
            </div>
          </div>
          <h2 className="form-title">Business location</h2>
          <div className="vgform">
            <div className="field">
              <VgToggle
                Description="Business hours will reflect the schedule of your employee’s working hours."
                OnChange={() => {}}
                ToggleVariation="WithDescription"
                Title="Use Employee Working Hours"
                ToggleId="switch-five"
              />
            </div>
            <div className="business-location-toggle"></div>
          </div>
        </div>
        <div className="fields-action">
          <VgButton
            ButtonVariant="secondary"
            ButtononClick={handleClick}
            IconPlacement="prefix"
            ValidForm={true}
          >
            Cancel
          </VgButton>
          <VgButton
            ButtonVariant="primary"
            ButtononClick={handleClick}
            IconPlacement="prefix"
            ValidForm={true}
            FormValidations={formValidator.current}
          >
            Save
          </VgButton>
        </div>
      </div>
    </Fragment>
  );
};

export default BusinessProfile_form;
