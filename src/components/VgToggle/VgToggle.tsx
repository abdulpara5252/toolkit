import React, {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./VgToggle.scss";
import "../VgTextbox/VgTextbox.scss";
import VgTooltip from "../VgTooltip/VgTooltip";
import Svg from "../VgSvg/Svg";

export interface VgToggleProps {
  ToggleVariation?: "Default" | "WithDescription" | "Expanded" | "InputToggle";
  Title?: string;
  ToggleId?: string;
  ExpandedText?: string;
  Disable?: boolean;
  ToggleOn?: boolean;
  Description?: string;
  CopyHorizontal?: boolean;
  ToogleRight?: boolean;
  SetValue?: boolean | string;
  CopyVertical?: boolean;
  SetToggleOption?: string,
  CustomButtonText?: string,
  OnChange?: (checked: boolean) => void;
  CustomButtonTextOnClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  OnClick?: (e: React.MouseEvent<HTMLInputElement> | string) => void;
  VerticalOnClick?: (e: React.MouseEvent<HTMLInputElement> | string) => void;
  HorizontalOnClick?: (e: React.MouseEvent<HTMLInputElement> | string) => void;
  Name?: string,
  BeakPosition?: 'Left' | 'Middle' | 'Right';
  InfoTooltipMessage?:string
  OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

interface VgTextareaRef {
  validate: () => any;
}
const expandedText = "Replace your content here";
const VgToggle: React.FC<VgToggleProps> = forwardRef<
  VgTextareaRef,
  VgToggleProps
>(
  (
    {
      ToggleVariation = "Default",
      Title = "",
      ExpandedText = <div dangerouslySetInnerHTML={{ __html: expandedText }} />,
      Disable = false,
      ToggleOn = false,
      Description,
      CopyHorizontal = false,
      CopyVertical = false,
      OnChange,
      SetValue,
      ToogleRight,
      SetToggleOption,
      OnClick,
      ToggleId = "",
      CustomButtonText="",
      VerticalOnClick,
      HorizontalOnClick,
      Name = "vg-switch",
      BeakPosition = 'Middle',
      InfoTooltipMessage,
      CustomButtonTextOnClick,
      OnBlur
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState<boolean>(ToggleOn || false);
    const [toggleOption, setToggleOption] = useState<"$" | "%" | null>(SetToggleOption || "$");
    const [inputValue, setInputValue] = useState<string>(SetValue || "");
    const [showToggleSection, setShowToggleSection] = useState<boolean>(false);
    const [activeButton, setActiveButton] = useState<
      "arrow-copy-vertical" | "arrow-copy-horizontal"
    >("arrow-copy-vertical");
    const toggleSectionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      setInputValue(SetValue);
    }, [SetValue]);

    useEffect(() => {
      setToggleOption(SetToggleOption || "%");
    }, [SetToggleOption]);

    useEffect(() => {
      setIsChecked(ToggleOn);
    }, [ToggleOn]);


    useEffect(() => {
      if (ToggleVariation === "InputToggle") {
        setActiveButton("arrow-copy-vertical");
      }
    }, [ToggleVariation]);

    useEffect(() => {
      const numericValue = parseInt(inputValue, 10);
      if (toggleOption === "%") {
        if (numericValue > 100) {
          setInputValue("100");
        }
      }
    }, [toggleOption]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          toggleSectionRef.current &&
          !toggleSectionRef.current.contains(event.target as Node)
        ) {
          setShowToggleSection(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newCheckedState = e.target.checked;
      setIsChecked(newCheckedState);
      if (OnChange) {
        OnChange(newCheckedState);
      }
    };

    const handleOptionClick = (option: "$" | "%"): void => {
      setToggleOption(option);
      if (OnClick) {
        OnClick(option);
      }
      // Also call OnBlur with the formatted value when the toggle changes
      if (OnBlur) {
        if (option === '$') {
          OnBlur(`$${inputValue?.replace('$', '')}`);
        } else {
          OnBlur(`${inputValue?.replace('%', '')}%`);
        }
      }
    };

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>): void => {
      setShowToggleSection(true);
      // if (OnClick) {
      //   OnClick(e);
      // }
    };

    const handleButtonClick = (
      buttonType: "arrow-copy-vertical" | "arrow-copy-horizontal"
    ): void => {
      if (buttonType === "arrow-copy-vertical") {
        setActiveButton(buttonType);
        OnClick(buttonType);
        VerticalOnClick(buttonType);
      } else {
        setActiveButton(buttonType);
        HorizontalOnClick(buttonType);
      }
    };

    interface CustomButtonTextClickEvent {
      type: string;
    }

    const handleCustomButtonTextClick = (e: CustomButtonTextClickEvent): void => {
      if (CustomButtonTextOnClick) {
       CustomButtonTextOnClick(e);
      }
    };

    const validation = () => {
      let validateObject = {
        [ToggleId]: isChecked,
        IsValidate: true,
        IsRequired: true,
      };
      return validateObject;
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));

    return (
      <>
        {ToggleVariation !== "InputToggle" && (
          <>
            {ToggleVariation === "Default" && (
              <>
                <div className={`vg-toggle-switch ${ToogleRight ? "vg-toggle-switch-right" : ""}`}>
                  <input
                    type="checkbox"
                    id={`switch-${ToggleId}`}
                    className={`vg-switch-input ${
                      isChecked ? "checked" : ""
                      }`}
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={Disable}
                    name={Name}
                  />
                  <label htmlFor={`switch-${ToggleId}`} className="vg-switch-label">
                    {ToggleVariation !== "Default"   &&  (
                      <>
                        <div className="toggle-switch-title">{Title}</div>
                        <div className="toggle-switch-desc">{Description}</div>
                      </>
                    )}
                    {ToggleVariation !== "Default" && isChecked && (
                      <div className="expanded-image-box">
                        <p>{ExpandedText}</p>
                      </div>
                    )}
                  </label>
                </div>
              </>
            )}
          </>
        )}

        {ToggleVariation !== "InputToggle" && (
          <>
            {ToggleVariation === "WithDescription" && (
              <>
                <div className={`vg-toggle-switch ${ToogleRight ? "vg-toggle-switch-right" : ""}`}>
                  <input
                    type="checkbox"
                    id={`switch-${ToggleId}`}
                    className={`vg-switch-input ${isChecked ? "checked" : ""}`}
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={Disable}
                    name={Name}
                  />
                  <label htmlFor={`switch-${ToggleId}`} className="vg-switch-label">
                    <>
                      <div className="toggle-switch-title vg-toggle-lable-title">
                        {Title}
                        {InfoTooltipMessage && InfoTooltipMessage != '' ? (
                          <span className="vg-toggle-label-infochip">
                            <VgTooltip
                              BeakPoint="Up"
                              BeakPosition={BeakPosition}
                              Children={
                                <div className="vg-tooltiptext">
                                  <Svg name="info_circle" />
                                </div>
                              }
                              TextAlign="center"
                              TooltipText={InfoTooltipMessage}
                              Html
                            />
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="toggle-switch-desc">{Description}</div>
                    </>
                    {ToggleVariation !== "WithDescription" && isChecked && (
                      <div className="expanded-image-box">
                        <p>{ExpandedText}</p>
                      </div>
                    )}
                  </label>
                </div>
              </>
            )}
          </>
        )}

        {ToggleVariation !== 'InputToggle' && (
          <>
            {ToggleVariation === 'Expanded' && (
              <>
                <div className="vg-toggle-switch">
                  <input
                    type="checkbox"
                    id={`switch-${ToggleId}`}
                    className={`vg-switch-input ${isChecked ? 'checked' : 'efwefwe'}`}
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={Disable}
                    name={Name}
                  />
                  <label htmlFor={`switch-${ToggleId}`} className="vg-switch-label">
                    <>
                      <div className="toggle-switch-title vg-toggle-lable-title">
                        {Title}
                        {InfoTooltipMessage && InfoTooltipMessage != '' ? (
                          <span className="vg-toggle-label-infochip">
                            <VgTooltip
                              BeakPoint="Up"
                              BeakPosition={BeakPosition}
                              Children={
                                <div className="vg-tooltiptext">
                                  <Svg name="info_circle" />
                                </div>
                              }
                              TextAlign="center"
                              TooltipText={InfoTooltipMessage}
                              Html
                            />
                          </span>
                        ) : (
                          ""
                        )}
                        </div>
                      <div className="toggle-switch-desc">{Description}</div>
                    </>
                    {isChecked && (
                      <div className="expanded-image-box">
                        <p>{ExpandedText}</p>
                      </div>
                    )}
                  </label>
                </div>
              </>
            )}
          </>
        )}
        <div className="vg-group">
          {ToggleVariation === 'InputToggle' && (
            <div className="input-toggle-wrapper">
              <input
                autoComplete="off"
                aria-label="Input-toggle"
                type="text"
                value={toggleOption === '$' ? `$${inputValue?.replace('$', '')}` : `${inputValue?.replace('%', '')}%`}
                className={`toggle-input-box vg-input-control ${Disable ? "cursor-not-allowed" : ""}`}
                disabled={Disable}
                onClick={handleInputClick}
                onChange={(e) => {
                  const updatedValue = e.target.value?.replace(/[^0-9.]/g, "");
                  if (updatedValue.length > 8) {
                    return;
                  }
                  setInputValue(updatedValue);
                  if(OnChange){
                    OnChange(updatedValue)
                  }
                }}
                onBlur={() => {
                  const numericValue = parseInt(inputValue, 10);
                  let newValue = inputValue;
                  if (!isNaN(numericValue)) {
                    if (numericValue >= 1000000 && toggleOption !== "$" && toggleOption !== '%') {
                      newValue = "1";
                      setInputValue("1");
                    } else if (toggleOption === "%") {
                      if (numericValue > 100) {
                        newValue = "100";
                        setInputValue("100");
                      } else {
                        setInputValue(inputValue);
                      }
                    } else if (toggleOption === "$") {
                      if (numericValue < 0) {
                        newValue = "0";
                        setInputValue("0");
                      } else {
                        setInputValue(inputValue);
                      }
                    }
                  } else {
                    newValue = "";
                    setInputValue("");
                  }
                  // Call OnBlur with value including $ or %
                  if (OnBlur) {
                    if (toggleOption === '$') {
                      OnBlur(`$${newValue?.replace('$', '')}`);
                    } else {
                      OnBlur(`${newValue?.replace('%', '')}%`);
                    }
                  }
                }}
                name={Name}
              />

              {showToggleSection && (
                <div ref={toggleSectionRef} className="input-toggle-list">
                  <div className="input-toggle">
                    <span
                      className={`toggle-btn ${
                        toggleOption === "$" ? "active" : ""
                        }`}
                      onClick={() => handleOptionClick("$")}
                    >
                      $
                    </span>
                    <span
                      className={`toggle-btn ${
                        toggleOption === "%" ? "active" : ""
                        }`}
                      onClick={() => handleOptionClick("%")}
                    >
                      %
                    </span>
                  </div>

                  <div className="arrow-copy">
                    {CustomButtonText  && (
                        <span 
                        className="arrow-btn"
                        onClick={(e) =>
                          handleCustomButtonTextClick(e)
                        }
                        >{CustomButtonText}</span>
                    )}
                    {CopyHorizontal && (
                      <span
                        className={`arrow-btn ${
                          activeButton === "arrow-copy-horizontal"
                            ? "active"
                            : ""
                          }`}
                        onClick={() =>
                          handleButtonClick("arrow-copy-horizontal")
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>
                        <span>Copy</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </span>
                    )}

                    {CopyVertical && (
                      <span
                        className={`arrow-btn ${
                          activeButton === "arrow-copy-vertical" ? "active" : ""
                          }`}
                        onClick={() => handleButtonClick("arrow-copy-vertical")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="currentColor"
                        >
                          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 370.7V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V370.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                        <span>Copy</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="currentColor"
                        >
                          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 141.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V141.3l114.6 114.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
);

export default VgToggle;