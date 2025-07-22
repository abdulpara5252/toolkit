import React, { useState, useRef, ReactNode, useEffect, Fragment } from "react";
import "./VgPopup.scss";
import VgButton from "../VgButton/VgButton";
import { utils } from "../../utils/utils";
import Portal from "../../common/Portal";
import VgCheckbox from "../VgCheckbox/VgCheckbox";

export interface VgPopupProps {
  Popupopen?: boolean;
  EnableBody?: boolean
  PopupTitle?: string;
  PopupSubTitle?: string;
  TextDescription?: React.ReactNode;
  PopupBody?: any;
  FooterButton?: string;
  CloseButton?: boolean;
  VagaroToolkit?: Number;
  NativeAction?: number;
  Footer?: number;
  TimerCount?: number;
  IsFullLength?: boolean;
  CloseBackTitle?: string;
  ButtonPrimary?: string;
  PrimaryButtonVariant?: string
  ButtonSecondary?: string;
  SecondaryButtonVariant?: string;
  ButtonThird?: string;
  ThirdButtonVariant?: string;
  FormValid?: boolean;
  FormValidation?: {};
  PopupId?: string;
  Size?: "small" | "medium" | "large" | "extralarge" | "full-body-popup";
  CloseOnOutsideClick?: boolean;
  OnClickPrimary?: () => void;
  OnClickSecondary?: () => void;
  OnClickThird?: () => void
  onClose: () => void;
  [key: string]: any;
  customClassName?: string;
  CheckboxVisible?: boolean;
  MobileView?: boolean;
  FooterLeft?: boolean;
  FooterLeftBody?: any;
  TitleIsShow?: boolean;
  PopupImage?: string;
  DescriptionType?: "plain" | "bullet" | "number";
  FullWidthButtons?: boolean;
  BottomSheet?: boolean;
  PopupType?: "default" | "custom" | "premium";
  IsCallBack?: boolean;
}

const VgPopup: React.FC<VgPopupProps> = ({
  PopupTitle,
  PopupSubTitle,
  EnableBody,
  Popupopen = false,
  TextDescription,
  PopupBody,
  CloseButton = true,
  NativeAction = 0,
  Footer = 0,
  TimerCount = 0,
  IsFullLength = false,
  Size = "medium",
  CloseOnOutsideClick = false,
  PopupId = "",
  FooterButton = "none",
  ButtonPrimary,
  ButtonSecondary,
  ButtonThird,
  FormValid,
  FormValidation = {},
  CloseBackTitle,
  OnClickPrimary = (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>, allElement?:any) => { },
  OnClickSecondary = () => { },
  OnClickThird = () => { },
  onClose = () => { },
  VagaroToolkit = 0,
  customClassName = "",
  SecondaryButtonVariant = "secondary",
  PrimaryButtonVariant = "primary",
  ThirdButtonVariant = "primary",
  CheckboxVisible = false,
  MobileView = false,
  FooterLeft = false,
  FooterLeftBody,
  TitleIsShow = true,
  PopupImage,
  DescriptionType = "plain",
  FullWidthButtons = true,
  BottomSheet = false,
  PopupType = "default",
  IsCallBack = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(Popupopen);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const isandroidiospro = utils.CheckIsFromProAppWithoutState();

    const sendMobileCloseCallback = () => {
      if (isandroidiospro  && IsCallBack  ) {
        utils.CallBackGivenToMobileApp(
          NativeAction,
          CloseBackTitle,
          Footer,
          TimerCount,
          IsFullLength
        );
        var obj: any = {
          NativeAction: NativeAction,
          Footer: Footer,
          TimerCount: TimerCount,
          callFromLocation: PopupId,
          VagaroToolkit: VagaroToolkit,
          IsFullLength: IsFullLength,
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

  const isMobileView = typeof window !== "undefined" && window.innerWidth < 768
  if(BottomSheet && isMobileView){
    CloseOnOutsideClick = true
    CloseButton = false
  }

  const handleClose = () => {
    const shouldDelay = BottomSheet && isMobileView;
    if (shouldDelay) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        sendMobileCloseCallback();
        onClose()
      }, 800)
    } else {
      setIsClosing(true);
      setIsOpen(false);
      sendMobileCloseCallback();
      onClose()
    }
  };

  const handlePrimary = (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>, allElement?:any) => {
    if (isandroidiospro && IsCallBack) {
      utils.CallBackGivenToMobileApp(
        NativeAction,
        CloseBackTitle,
        Footer,
        TimerCount,
        IsFullLength
      );
      var obj: any = {
        NativeAction: NativeAction,
        Footer: Footer,
        TimerCount: TimerCount,
        callFromLocation: PopupId,
        VagaroToolkit: VagaroToolkit,
        IsFullLength: IsFullLength,
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
    if (OnClickPrimary) {
      OnClickPrimary(e, allElement)
    }
  }


  const handleSecondary = () => {
    if (isandroidiospro && IsCallBack) {
      utils.CallBackGivenToMobileApp(
        NativeAction,
        CloseBackTitle,
        Footer,
        TimerCount,
        IsFullLength
      );
      var obj: any = {
        NativeAction: NativeAction,
        Footer: Footer,
        TimerCount: TimerCount,
        callFromLocation: PopupId,
        VagaroToolkit: VagaroToolkit,
        IsFullLength: IsFullLength,
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
    if (OnClickSecondary) {
      OnClickSecondary()
    }
  }

  const handleClickThird = () => {
    if (isandroidiospro && IsCallBack) {
      utils.CallBackGivenToMobileApp(
        NativeAction,
        CloseBackTitle,
        Footer,
        TimerCount,
        IsFullLength
      );
      var obj: any = {
        NativeAction: NativeAction,
        Footer: Footer,
        TimerCount: TimerCount,
        callFromLocation: PopupId,
        VagaroToolkit: VagaroToolkit,
        IsFullLength: IsFullLength,
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
    if (OnClickThird) {
      OnClickThird()
    }
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      CloseOnOutsideClick &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    setIsOpen(Popupopen);
  }, [Popupopen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      if (isandroidiospro && IsCallBack) {
        var obj: any = {
          NativeAction: NativeAction,
          Footer: 1,
          IsFullLength: IsFullLength,
          callFromLocation: PopupId,
          VagaroToolkit: VagaroToolkit,
        };
        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;
        messageObj.screenTitle = PopupTitle;
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "53|~|" + JSON.stringify(obj);
        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, CloseOnOutsideClick]);

  return (
    <Fragment>
      <>
        {isOpen && (
          <Portal wrapperElementId={`Popup-${PopupId}`}>
            {PopupType === "default" && (
              <div className={`modal-overlay ${isClosing ? "closing" : ""}`} data-popup-id={PopupId}>
                <div
                  className={`vg-modal-dialog ${isMobileView && BottomSheet ? 'vg-popup-bottomsheet' : ''} ${MobileView ? 'mobilefullScreen' : ''} vg-modalsummary modal-dialog-scrollable modal-dialog-centered ${Size} 
                  ${customClassName}`}
                >
                  <div className="vg-modal-content" ref={modalRef}>
                    <div className="vg-modal-header">
                      {PopupTitle && (
                        <div className="vg-modal-title">{PopupTitle}</div>
                      )}
                      {PopupSubTitle && (
                        <div className="vg-modal-subtitle">{PopupSubTitle}</div>
                      )}
                      {CloseButton && (
                        <div className="vg-btn-close" onClick={handleClose} id="close">
                          <svg
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12.3945 11.4805C12.7754 11.832 12.7754 12.4473 12.3945 12.7988C12.2188 12.9746 11.9844 13.0625 11.75 13.0625C11.4863 13.0625 11.252 12.9746 11.0762 12.7988L8 9.72266L4.89453 12.7988C4.71875 12.9746 4.48438 13.0625 4.25 13.0625C3.98633 13.0625 3.75195 12.9746 3.57617 12.7988C3.19531 12.4473 3.19531 11.832 3.57617 11.4805L6.65234 8.375L3.57617 5.29883C3.19531 4.94727 3.19531 4.33203 3.57617 3.98047C3.92773 3.59961 4.54297 3.59961 4.89453 3.98047L8 7.05664L11.0762 3.98047C11.4277 3.59961 12.043 3.59961 12.3945 3.98047C12.7754 4.33203 12.7754 4.94727 12.3945 5.29883L9.31836 8.4043L12.3945 11.4805Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="vg-modal-body">
                      {PopupBody ? PopupBody() : null}
                      {TextDescription}
                    </div>

                    {FooterButton !== "none" && (
                      <div className="vg-modal-footer">
                        
                        {CheckboxVisible && (
                          <div className="vg-mr-auto">
                            <VgCheckbox
                              CheckBoxId={`PopupCheckbox-${PopupId}`}
                              CheckboxLabel="Checkbox"
                              CheckboxVariation="Checkbox-Simple"
                              OnChange={() => { }}
                              OnHover={() => { }}
                            />
                          </div>
                        )}
                        {
                          FooterLeft && FooterLeftBody()
                        }
                        {(FooterButton === "thirdButton") && (
                          <VgButton
                            ButtonVariant={ThirdButtonVariant}
                            ButtononClick={handleClickThird}
                            IconPlacement="prefix"
                            ValidForm={FormValid}
                            FormValidations={FormValidation}
                          >
                            {ButtonThird}
                          </VgButton>
                        )}
                        {(FooterButton === "secondaryButton" ||
                          FooterButton === "both" || FooterButton === "thirdButton") && (
                            <VgButton
                              ButtonVariant={SecondaryButtonVariant}
                              ButtononClick={handleSecondary}
                              IconPlacement="prefix"
                            >
                              {ButtonSecondary}
                            </VgButton>
                          )}
                        {(FooterButton === "primaryButton" ||
                          FooterButton === "both" || FooterButton === "thirdButton") && (
                            <VgButton
                              ButtonVariant={PrimaryButtonVariant}
                              ButtononClick={handlePrimary}
                              IconPlacement="prefix"
                              ValidForm={FormValid}
                              FormValidations={FormValidation}
                            >
                              {ButtonPrimary}
                            </VgButton>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {PopupType === "custom" && (
              <div className={`modal-overlay`} data-popup-id={PopupId}>
                <div
                  className={`vg-modal-dialog  vg-custom-dialog ${MobileView ? 'mobilefullScreen' : ''} vg-modalsummary modal-dialog-scrollable modal-dialog-centered ${Size} 
                  ${customClassName}`}
                >
                  <div className="vg-modal-content" ref={modalRef}>
                    {CloseButton && (
                      <div className="custom-close" onClick={handleClose}>
                        <svg
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.3945 11.4805C12.7754 11.832 12.7754 12.4473 12.3945 12.7988C12.2188 12.9746 11.9844 13.0625 11.75 13.0625C11.4863 13.0625 11.252 12.9746 11.0762 12.7988L8 9.72266L4.89453 12.7988C4.71875 12.9746 4.48438 13.0625 4.25 13.0625C3.98633 13.0625 3.75195 12.9746 3.57617 12.7988C3.19531 12.4473 3.19531 11.832 3.57617 11.4805L6.65234 8.375L3.57617 5.29883C3.19531 4.94727 3.19531 4.33203 3.57617 3.98047C3.92773 3.59961 4.54297 3.59961 4.89453 3.98047L8 7.05664L11.0762 3.98047C11.4277 3.59961 12.043 3.59961 12.3945 3.98047C12.7754 4.33203 12.7754 4.94727 12.3945 5.29883L9.31836 8.4043L12.3945 11.4805Z" />
                        </svg>
                    </div>
                    )}
                    <div className="vg-modal-body">
                      {PopupBody ? PopupBody() : null}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {PopupType === "premium" && (
              <div className={`modal-overlay`} data-popup-id={PopupId}>
                <div
                  className={`vg-modal-dialog vg-modalsummary vg-premium-dialog vg-modalsummary modal-dialog-scrollable modal-dialog-centered ${customClassName}`}
                >
                  <div className="vg-modal-content" ref={modalRef}>
                    {PopupImage && (
                      <div className="popup-image">
                        <img
                          src={PopupImage}
                          alt="Gift card"
                          className="popup-image"
                        />
                        {/* {PopupImage} */}
                      </div>
                    )}
                    {CloseButton && (
                      <div className="vg-btn-close" onClick={handleClose}>
                        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.3945 11.4805C12.7754 11.832 12.7754 12.4473 12.3945 12.7988C12.2188 12.9746 11.9844 13.0625 11.75 13.0625C11.4863 13.0625 11.252 12.9746 11.0762 12.7988L8 9.72266L4.89453 12.7988C4.71875 12.9746 4.48438 13.0625 4.25 13.0625C3.98633 13.0625 3.75195 12.9746 3.57617 12.7988C3.19531 12.4473 3.19531 11.832 3.57617 11.4805L6.65234 8.375L3.57617 5.29883C3.19531 4.94727 3.19531 4.33203 3.57617 3.98047C3.92773 3.59961 4.54297 3.59961 4.89453 3.98047L8 7.05664L11.0762 3.98047C11.4277 3.59961 12.043 3.59961 12.3945 3.98047C12.7754 4.33203 12.7754 4.94727 12.3945 5.29883L9.31836 8.4043L12.3945 11.4805Z" />
                        </svg>
                      </div>
                    )}
                    <div className="vg-modal-body ">
                      {/* Header (optional) */}
                      {TitleIsShow && (
                        <div className="vg-modal-header">
                          {PopupTitle && <div className="vg-modal-title">{PopupTitle}</div>}
                        </div>
                      )}

                      {/* Description */}
                      {TextDescription && (
                        <div className={`popup-description ${DescriptionType}`}>
                          {DescriptionType === "bullet" && typeof TextDescription === "string" ? (
                            <ul>
                              {TextDescription.split("\n").map((item, index) => (
                                <li key={index}>{item.trim()}</li>
                              ))}
                            </ul>
                          ) : DescriptionType === "number" && typeof TextDescription === "string" ? (
                            <ol>
                              {TextDescription.split("\n").map((item, index) => (
                                <li key={index}>{item.trim()}</li>
                              ))}
                            </ol>
                          ) : typeof TextDescription === "string" ? (
                            <div dangerouslySetInnerHTML={{ __html: TextDescription }} />
                          ) : (
                            <div>{TextDescription}</div>
                          )}
                        </div>
                      )}

                    </div>

                    {FooterButton !== "none" && (
                      <div className={`vg-modal-footer ${FullWidthButtons ? "full-width-buttons" : "auto-width-buttons"}`}>
                        {FooterButton === "primaryButton" || FooterButton === "both" ? (
                          <VgButton ButtonVariant={PrimaryButtonVariant} ButtononClick={OnClickPrimary}>
                            {ButtonPrimary}
                          </VgButton>
                        ) : null}
                        {FooterButton === "secondaryButton" || FooterButton === "both" ? (
                          <VgButton ButtonVariant={SecondaryButtonVariant} ButtononClick={OnClickSecondary}>
                            {ButtonSecondary}
                          </VgButton>
                        ) : null}
                        {FooterButton === "thirdButton" ? (
                          <VgButton ButtonVariant={ThirdButtonVariant} ButtononClick={OnClickThird}>
                            {ButtonThird}
                          </VgButton>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Portal>
        )}
      </>

      <input type="hidden" onClick={() => handleClose()} id={`close-${PopupId}`} /> {/* Using PopupId in hidden input */}
    </Fragment>
  );
};

export default VgPopup;