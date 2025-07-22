import React, { useState, useEffect } from "react";
import "./VgBottomSheet.scss";
import "../VgButton/VgButton.scss";
import { utils } from "../../utils/utils";
import VgButton from "../VgButton/VgButton";
export interface VgBottomSheetProps {
  Id?: number;
  Description?: string;
  NativeAction?: number;
  Footer?: number;
  TimerCount?: number;
  IsFullLength?: boolean;
  CloseBackTitle?: string;
  BottomsheetData?: any;
  BottomSheetId?: string;
  OnClick?: (e: any, selectMenuList?: any) => void;
  OnClickPrimary?: (e: any) => void;
  OnClickSecondary?: (e: any) => void;
  VagaroToolkit?: Number;
  PopupTitle?: string;
}

const VgBottomSheet: React.FC<VgBottomSheetProps> = ({
  Id,
  Description,
  NativeAction = 0,
  Footer = 0,
  TimerCount = 0,
  IsFullLength = false,
  CloseBackTitle = "Form Control",
  BottomsheetData = [],
  BottomSheetId = "",
  OnClickPrimary = () => { },
  OnClickSecondary = () => { },
  OnClick = () => { },
  VagaroToolkit = 0,
  PopupTitle,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isandroidiospro = utils.CheckIsFromProAppWithoutState();
  const toggleVisibility = (actiontype: any) => {
    if (isandroidiospro) {
      var obj: any = {
        NativeAction: NativeAction,
        Footer: 1,
        callFromLocation: BottomSheetId,
        IsFullLength: IsFullLength,
        VagaroToolkit: VagaroToolkit,
      };
      var messageObj: any = {};
      messageObj.message = "";
      messageObj.messageType = 0;
      messageObj.screenType = 0;
      messageObj.navType = 0;
      messageObj.action = "53|~|" + JSON.stringify(obj);
      utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
    }
    setIsVisible(true);
  };

  const handleClose = (actiontype: any) => {
    if (isandroidiospro) {
      utils.CallBackGivenToMobileApp(
        NativeAction,
        actiontype,
        Footer,
        TimerCount,
        IsFullLength
      );
      var obj: any = {
        NativeAction: NativeAction,
        Footer: Footer,
        callFromLocation: BottomSheetId,
        TimerCount: TimerCount,
        IsFullLength: IsFullLength,
        VagaroToolkit: VagaroToolkit,
      };
      var messageObj: any = {};
      messageObj.message = "";
      messageObj.messageType = 0;
      messageObj.screenTitle = actiontype;
      messageObj.screenType = 0;
      messageObj.navType = 0;
      messageObj.action = "53|~|" + JSON.stringify(obj);
      utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("bottom-sheet-open");
    } else {
      document.body.classList.remove("bottom-sheet-open");
    }
    return () => {
      document.body.classList.remove("bottom-sheet-open");
    };
  }, [isVisible]);

  const handleActionMenu = (e: any, value: any) => {
    if (OnClick) {
      OnClick(e, value);
      handleClose(value)
    }
  }

  const handleActionMenuListWithIcon = (e: any, value: any) => {
    if (OnClick) {
      OnClick(e, value);
      handleClose(value)
    }
  }

  const handleSecondaryButton = (value: any, CloseBackTitle: string) => {
    if (OnClickSecondary) {
      OnClickSecondary(value);
      handleClose(CloseBackTitle); // Close the bottom sheet
    } else {
      handleClose(CloseBackTitle); // Close the bottom sheet if no secondary button action is provided
    } 
  }

  const handlePrimaryButton = (value: any, CloseBackTitle: string) => {
    if (OnClickPrimary) {   // If primary button action is provided
      OnClickPrimary(value);    // Call the primary button action function
      handleClose(CloseBackTitle);  // Close the bottom sheet after the action is performed
    } else {               // If primary button action is not provided
      handleClose(CloseBackTitle);  // Close the bottom sheet
    }
  }

  return (
    <>
      <div
        aria-label="Action menu"
        onClick={toggleVisibility}
        className={"vg-tk-btn"}
      >
        <VgButton
          ButtonIcon=""
          ButtonVariant="action"
          ButtononClick={() => { }}
          ButtononHover={() => { }}
          actionbutton="vertical"
        />
      </div>
      <div
        className={`vg-bottom-sheet ${isVisible ? "bottomsheet-show" : "bottomsheet-hide"
          }`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {Id === 4 && (
          <div className="bottomsheet-menu">
            {BottomsheetData.map((actionItem: any, index: number) => (
              <a
                key={index}
                className="dropdown-item"
                onClick={(e) => handleActionMenu(e, actionItem.action)}
              >
                <span>
                  {actionItem.name}
                </span>
              </a>
            ))}
          </div>
        )}

        {Id === 5 && (
          <div className="bottomsheet-menu">
            {BottomsheetData.map((actionItem: any, index: number) => (
              <a
                key={index}
                className="dropdown-item"
                onClick={(e) => handleActionMenuListWithIcon(e, actionItem.action)}
              >
                <span className="link-plus-svg">{actionItem.icon}</span>
                <span>{actionItem.name}</span>
              </a>
            ))}
          </div>
        )}

        <div className="vg-modal-dialog modal-lg modal-dialog-centered">
          <div className="vg-modal-content">
            {(Id === 1) && (
              <div
                className={`vg-modal-body ${Id === 1 ? "no-modal-footer" : ""}`}
              >
                <div className="bottomsheet-dummycontent">
                  <p>{Description}</p>
                </div>
              </div>
            )}
            {(Id === 3) && (
              <div
                className={`vg-modal-body}`}
              >
                <div className="vg-modal-dialog-bottom">
                  <div className="vg-modal-header-bottom">
                    {PopupTitle}
                  </div>
                  <div className="vg-modal-body-bottom">
                    <p>{Description}</p>
                  </div>
                </div>
              </div>
            )}
            {(Id === 2 || Id === 3) && (
              <div
                className={`vg-modal-footer ${Id === 2 ? "no-modal-body" : ""}`}
              >
                <button
                  className="vg-tk-btn vg-btn-secondary"
                  onClick={(e) => handleSecondaryButton(e, CloseBackTitle)}
                >
                  Secondary
                </button>
                <button
                  className={`vg-tk-btn vg-btn-primary`}
                  onClick={(e) => handlePrimaryButton(e, CloseBackTitle)}
                >
                  Primary
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isVisible && (
        <div
          className={`bottom-sheet-overlay `}
          onClick={() => handleClose(CloseBackTitle)}
        />
      )}
      <input type="hidden" onClick={() => handleClose} id={BottomSheetId} />
    </>
  );
};

export default VgBottomSheet;