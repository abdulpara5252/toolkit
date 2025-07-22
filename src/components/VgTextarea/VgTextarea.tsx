import React, { useState, useEffect, forwardRef, useImperativeHandle, ChangeEvent, useRef } from "react";
import VgPassiveNotification from "../VgPassiveNotification/VgPassiveNotification";
import "./VgTextarea.scss";
import Svg from "../VgSvg/Svg";
import { handleAutoFocus, initializeSetMobileDataVagaroAI, PortalEnum } from "../../utils/utils";
import "../../App.css"
import VgAiPopup from "../VgAiPopup/VgAiPopup";
import VgButton from "../VgButton/VgButton";
import 'emoji-picker-element';
import EmojiPickerComponent from "../../utils/EmojiPickerComponent";
import Portal from "../../common/Portal";

export interface VgTextareaProps {
  TextareaVariant?: "Default" | "RequiredText" | "FileUploader";
  SetValue?: string;
  LabelText?: string;
  TextAreaDisable?: boolean;
  PlaceHolder?: string;
  FocusBorder?: boolean;
  AiClickEvent?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  Error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  OnBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  AlertPassiveMessage?: boolean;
  MaximumLength?: number;
  TextareaLength?: number;
  MinimumLength?: number;
  AiControlPopup?: boolean;
  ReviewPopup?: boolean;
  RawData?: Array<{
    Index: number;
    InputDescription: string;
    Tone: string;
    Range: number;
  }>;
  VagaroToolkit?: number;
  NativeAction?: number;
  Footer?: number;
  TimerCount?: number;
  FullLength?: boolean;
  CloseBackTitle?: string;
  AiControlId?: string;
  CharacterCountEnableForAi?: boolean;
  MaximumLengthForAi?: number;
  ToneMetadata?: any;
  OnClickCancle?: () => void;
  OnClickClose?: () => void;
  OnClickUseThisText?: (e: any, data : any) => void;
  OnChangeRange?: (e: any) => void;
  OnChangeTone?: (e: any , data : any) => void;
  OnClickNext?: (e: any) => void;
  OnClickPrevious?: (e: any) => void;
  OnClickRegenerate?: (e: any) => void;
  Name?: string
  CharacterCountEnable?: boolean
  [key: string]: any;
  DialogShowHide?: boolean;
  AutoFocus?: boolean
  ReviewSection?: boolean;
  ReviewSectionBody?: any;
  EmojiButton?: boolean;
  CrossButton?: boolean;
  TickButton?: boolean;
  OnEmojiClick?: (e: any) => void;
  OnCrossClick?: (e: any) => void;
  OnTickClick?: (e: any, inputValue: string) => void;
  IsHtml?: boolean;
  ShowRequiredFieldMark?: boolean;
  AutoHeight?: boolean;
}
interface VgTextareaRef {
  validate: () => any;
}


declare global {
  interface Window {
    setMobileDataVagaroAI?: (sJSON: string) => void;
  }
}

const VgTextarea: React.FC<VgTextareaProps> = forwardRef<
  VgTextareaRef,
  VgTextareaProps
>(
  (
    {
      AiPopupSetValue,
      TextareaVariant = "Default",
      SetValue,
      TextAreaDisable,
      PlaceHolder = "Type here...",
      FocusBorder,
      LabelText = "",
      Error = false,
      onChange,
      CharacterCountEnableForAi,
      MaximumLengthForAi,
      OnBlur,
      TextareaLength = 5,
      AlertPassiveMessage,
      MaximumLength,
      MinimumLength,
      TextAreaId = "",
      AiControlPopup = false,
      ReviewPopup = false,
      Name = "vg-textarea",
      AiClickEvent,
      OnChangeTone,
      OnClickRegenerate,
      OnChangeRange,
      OnClickUseThisText,
      OnClickNext,
      OnClickPrevious,
      OnClickClose,
      OnClickCancle,
      CharacterCountEnable,
      DialogShowHide,
      RawData,
      ToneMetadata,
      AsyncClickEvent,
      AutoFocus,
      ReviewSection,
      ReviewSectionBody,
      EmojiButton = false,
      CrossButton = false,
      TickButton = false,
      OnEmojiClick,
      OnCrossClick,
      OnTickClick,
      IsHtml = false,
      ShowRequiredFieldMark = false,
      AutoHeight = false,
    },
    ref


  ) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [passiveAlert, setPassiveAlert] = useState<boolean>(false);
    const [minLengthAlert, setMinLengthAlert] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [aiPopup, setAiPopup] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isSubmit, setSubmit] = useState<boolean>(false);
    useEffect(() => {
      setInputValue(SetValue!);
    }, [SetValue]);

    useEffect(() => {
      if (AsyncClickEvent) {
        if (inputValue.length > 0) {
          setAiPopup(DialogShowHide)
        }
      }
    }, [DialogShowHide, AsyncClickEvent])

    const adjustHeight = () => {
      if (textareaRef.current) {
        if (AutoHeight) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
        } else {
          textareaRef.current.style.height = "";
        }
      }
    };

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.value = inputValue;
        adjustHeight()
      }
    }, [inputValue, AutoHeight]);
 
      useEffect(() => {
      if(AutoHeight){
        window.addEventListener("resize", adjustHeight);
        return () => window.removeEventListener("resize", adjustHeight);
      }
      }, []);

    useEffect(() => {
      initializeSetMobileDataVagaroAI((callFromLocation: any, message: string) => {
        if (textareaRef.current && callFromLocation === TextAreaId) {
          textareaRef.current.value = message;
          setInputValue(message);
        }
      });
    }, [TextAreaId]);

    useEffect(() => {
      handleAutoFocus(AutoFocus, textareaRef);
    }, [AutoFocus])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
     let trimmedValue = e.target.value;
     const value = e.target.value;
      if(IsHtml){
         setInputValue(e.target.value);
      }else{
         if (errorMessage) { setErrorMessage(""); }
      const { value } = e.target;
      const filteredValue = value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");

      trimmedValue = MaximumLength
        ? filteredValue.slice(0, MaximumLength)
        : filteredValue;
      setInputValue(trimmedValue);
      }
      if (onChange) onChange(e);
      setIsError(false);

      if (MinimumLength && trimmedValue.length >= MinimumLength) {
        setMinLengthAlert("");
      }
      if (MaximumLength && value.length >= MaximumLength) {
        setPassiveAlert(true);
      } else {
        setPassiveAlert(false);
      }

      if (MaximumLength < 0 || MinimumLength < 0) {
        setInputValue("");
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (OnBlur) {
        OnBlur(e);
      }
      let errorMessage = "";
      if (Error && !inputValue) {
        errorMessage = "This field is required.";
      } else if (
        MinimumLength &&
        inputValue &&
        inputValue.length < MinimumLength
      ) {
        errorMessage = `Minimum ${MinimumLength} characters required for Description`;
      }
      setIsError(!!errorMessage);
      setMinLengthAlert(errorMessage);
    };

    const validation = () => {
      const Event = {
        target: { value: inputValue },
      } as ChangeEvent<HTMLTextAreaElement>;
      handleBlur(Event);
      handleAutoFocus(AutoFocus && isError, textareaRef)
      return {
        [TextAreaId]: inputValue,
        IsValidate: !isError,
        IsRequired: Error,
        id: TextAreaId
      };
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));

    const handleClick = (e: any) => {
      if (ReviewPopup && !inputValue) {
        setAiPopup(true);
      }
      else if (!inputValue) {
        setAiPopup(false);
        setErrorMessage("In this instance, we need more details before Vagaro AI can generate text for you.");
      } else if (DialogShowHide) {
        setErrorMessage("");
        setAiPopup(true);
      }
      if (AiClickEvent) {
        AiClickEvent(e)
      }
    }

    const handleCloseAiPopup = (e: any) => {
      setAiPopup(false);
      if (OnClickClose) {
        OnClickClose(e);
      }
    }

    const handleCancleAiPopup = (e: any) => {
      setAiPopup(false);
      if (OnClickCancle) {
        OnClickCancle(e);
      }
    }

    const handleRegenerate = (e: any, data: any) => {
      if (OnClickRegenerate) {
        OnClickRegenerate(e, data)
      }
    }

    const handleUseThisText = (e: any, data: any) => {
      setAiPopup(false);
      setInputValue(data?.InputDescription);
      if (OnClickUseThisText) {
        OnClickUseThisText(e, data)
      }
    }

    const onEmojiClick = (e: any) => {
      const emoji = e?.detail?.unicode;
      const cursorPosition = textareaRef.current?.selectionStart || 0;
      const textBeforeCursor = inputValue.slice(0, cursorPosition);
      const textAfterCursor = inputValue.slice(cursorPosition);

      setInputValue(textBeforeCursor + emoji + textAfterCursor);
      textareaRef.current?.focus()
    };

    const handleEmojiClick = (e: any) => {
      e.preventDefault();
      setShowEmojiPicker(!showEmojiPicker);
      if (OnEmojiClick) {
        OnEmojiClick(e);
      }
    }

    const handleCrossClick = (e: any) => {
      e.preventDefault();
      setInputValue("");
      if (OnCrossClick) {
        OnCrossClick(e);
      }
    }

    const handleTickClick = (e: any) => {
      e.preventDefault();
      if (OnTickClick) {
        OnTickClick(e, inputValue);
        setInputValue("");
      }
    }

    useEffect(() => {
      const picker = document.querySelector('emoji-picker');
      if (picker) {
        picker.addEventListener('emoji-click', onEmojiClick);
        return () => picker.removeEventListener('emoji-click', onEmojiClick);
      }
    }, [inputValue]);

    return (
      <div className={`vg-group vg-textarea-group ${passiveAlert ? "vg-blur-background" : ""}`} >
        <div className="textarea-count-set">

          {LabelText?.length > 0 && (
            <label className="vg-input-label" htmlFor="exampleFormControlTextarea1">
              {ShowRequiredFieldMark ? (
                <span className="required-input-mark">*</span>
              ) : (
                ""
              )}
             <>{LabelText}</>
            </label>
          )}
         
          {MaximumLength && (
            <span className={` ${CharacterCountEnable ? "character-count" : "vg-charector-count-hide"}`}>
              {inputValue ? inputValue?.length : 0}/{MaximumLength}
            </span>
          )}
        </div>
        <div
          className={`vg-ai-button-parentWrap vg-input-control-group ${errorMessage && "vg-active-focus-button"}
                ${(EmojiButton || CrossButton || TickButton) ? "vg-textarea-emoji-view" : ""}
                ${TextareaVariant === "RequiredText" ? "vg-textarea-upload" : ""}
                ${TextareaVariant === "FileUploader" ? "vg-textarea-upload vg-upload-icon" : ""}
                ${TextareaVariant !== "Default" ? isError ? "vg-input-control-group-error" : "" : ""}
                ${TextareaVariant !== "Default" ? FocusBorder ? "vg-input-control-group-focus" : "" : ""}
                ${TextareaVariant !== "Default" ? TextAreaDisable ? "vg-input-control-group-disabled" : "" : ""}
                ${isHovered ? "vg-active-ai-button" : ""}`}
        >
          {TextareaVariant === "RequiredText" && (
            <div className="vg-uneditable-text">
              <div className="vg-uneditable-text-content">
                This is required, uneditable text that the user cannot edit.
              </div>
            </div>
          )}

          <textarea
            className={`vg-input-control ${isError ? "vg-input-control-error" : ""
              }  ${FocusBorder ? "vg-input-control-focus" : ""} ${TextAreaDisable ? "vg-input-control-disabled" : ""
              }  `}
            id={TextAreaId}
            rows={!AutoHeight && TextareaLength}
            value={inputValue}
            ref={textareaRef}
            placeholder={PlaceHolder}
            onChange={handleChange}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            name={Name}
            autoComplete="off"
            autoFocus={AutoFocus}
            disabled={TextAreaDisable}
            maxLength={MaximumLength}
          />

          {AiControlPopup &&
            <VgButton
              ButtonVariant="AiWithIcon"
              ButtononClick={(e: any) => handleClick(e)}
              ButtononHover={() => { }}
            >
              Button
            </VgButton>
          }
          {aiPopup &&
            <VgAiPopup
              AiPopupSetValue={AiPopupSetValue}
              setSubmit={setSubmit}
              isSubmit={isSubmit}
              AiControlId="AiControlId"
              CloseBackTitle="From Control"
              Footer={2}
              Name=""
              NativeAction={13}
              OnChangeRange={(e, data) => OnChangeRange(e, data)}
              OnChangeTone={(e, data) => OnChangeTone(e, data)}
              OnClickClose={(e) => handleCloseAiPopup(e)}
              OnClickCancle={(e) => handleCancleAiPopup(e)}
              OnClickNext={(e, data) => OnClickNext(e, data)}
              OnClickPrevious={(e, data) => OnClickPrevious(e, data)}
              OnClickRegenerate={(e, data) => handleRegenerate(e, data)}
              OnClickUseThisText={(e, data) => handleUseThisText(e, data)}
              RawData={RawData}
              TimerCount={0}
              CharacterCountEnable={CharacterCountEnableForAi}
              MaximumLength={MaximumLengthForAi}
              ToneMetadata={ToneMetadata}
              VagaroToolkit={1}
              Disable={false}
              ReviewSection={ReviewSection}
              ReviewSectionBody={ReviewSectionBody}
            />
          }

          {TextareaVariant === "FileUploader" && (
            <div className="vg-upload-drop">
              <input type="file" id="fileupload" className="vg-input-file" />
              <div className="vg-upload-icon">
                <Svg name="upload_cloud" />
              </div>
              <div className="vg-upload-decs">
                <p>Drag and drop files here or</p>
                <a href="false" className="vg-choose-file">
                  Choose File
                </a>
              </div>
            </div>
          )}
          {(EmojiButton || CrossButton || TickButton) && (
            <div className="vg-textarea-emoji-actions-btn">
              {EmojiButton && (
                <div className="vg-emoji-picker-container">
                  <button
                  ref={btnRef}
                    className="vg-action-btn"
                    onClick={(e) => { handleEmojiClick(e) }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" />
                      <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" />
                      <path d="M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" />
                    </svg>
                  </button>
                  {showEmojiPicker && (
                    <Portal inputRef={btnRef} type={PortalEnum.smileyPicker}>
                      <EmojiPickerComponent onEmojiClick={onEmojiClick} setShowEmojiPicker={setShowEmojiPicker} />
                    </Portal>
                  )}
                </div>
              )}
              <div className="vg-emoji-chatcloseright">
                {CrossButton && (
                  <button
                    className="vg-action-btn"
                    onClick={(e) => { handleCrossClick(e) }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentcolor"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                  </button>
                )}
                {TickButton && (
                  <button
                    className="vg-action-btn"
                    onClick={(e) => { handleTickClick(e) }}
                  >
                    <Svg name="check" />

                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {isError && (
          <span className="vg-input-control-error-msg">
            {minLengthAlert || ""}
          </span>
        )}
        {AlertPassiveMessage && passiveAlert && (
          <VgPassiveNotification
            Duration={1000}
            NotificationTitle="Maximum length reached."
            types="error"
          />
        )}
        {errorMessage && <div className="info-ai-text">{errorMessage}</div>}
      </div>
    );
  }
);

export default VgTextarea;
