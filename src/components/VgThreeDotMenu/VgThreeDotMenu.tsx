import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./VgThreeDotMenu.scss";
import VgButton from "../VgButton/VgButton";
import Portal from "../../common/Portal";
import { PortalEnum, utils } from "../../utils/utils";
import Svg from "../VgSvg/Svg";
import { number } from "prop-types";

export interface VgThreeDotProps {
  OnClick?: (e: React.MouseEvent<HTMLInputElement> | string | MenuItem, event?: any) => void;
  OnThreeDotMenuClick?: (e: React.MouseEvent<HTMLInputElement> | string | MenuItem, isOpen: boolean) => void;
  Items?: MenuItem[];
  MenuOptions?: "Icon" | "ThreeDot" | "TextBox" | "TextBoxWithBorder" | "CustomMenu";
  IconSVG?: string | any;
  MenuButtonPosition?: string;
  ThreeDotMenuOpenPosition?: "Right" | "Left";
  TextValue?: string | number;
  TextboxPrefixValue?: string;
  Cursor?: boolean;
  OnTextClick?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any ) => void;
  OnTextChange?: (value: string) => void;
  OnTextBlur?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any ) => void;
  OnTextKeyUp?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any ) => void;
  OnTextKeyDown?: (e: React.MouseEvent<HTMLInputElement> | string , value?: any) => void;
  OnTextKeypress?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any ) => void;
  OnTextFoucus?: (e : React.MouseEvent<HTMLInputElement> | string,  value?: any ) => void;
  TextMaxLength?: number;
  SelectedItem?: MenuItem; // New prop for selecting a specific row
  MenuOpen?: boolean; // New prop to control the menu open state
  CustomMenuRender?: React.ReactNode | JSX.Element | (() => React.ReactNode); // Custom HTML/JSX render prop
  Disabled?: boolean; // New prop to disable the menu
}

interface MenuItem {
  id?: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
  percentage?: string;
  [key: string]: any; // Allow arbitrary string keys
}

const VgThreeDotMenu: React.FC<VgThreeDotProps> = forwardRef<
  HTMLDivElement,
  VgThreeDotProps
>(({ 
  OnClick, 
  Items = [], 
  MenuButtonPosition, 
  OnThreeDotMenuClick, 
  MenuOptions = "ThreeDot", 
  IconSVG, 
  Cursor = true,
  ThreeDotMenuOpenPosition,
  TextValue = "",
  TextboxPrefixValue = "$",
  OnTextClick,
  OnTextChange,
  OnTextBlur, 
  OnTextKeyUp,
  OnTextKeyDown,
  OnTextKeypress,
  OnTextFoucus,
  TextMaxLength,
  SelectedItem,
  MenuOpen = true,
  Disabled = false, // Default to false if not provided
  CustomMenuRender 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForTextBox, setIsOpenForTextBox] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>(TextValue !== undefined && TextValue !== null ? String(TextValue) : "");
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLInputElement>(null);
  const textBoxDropdownRef = useRef<HTMLDivElement>(null); // Added new ref for TextBox dropdown

  const isAndroidiOSPro = utils.CheckIsFromProAppWithoutState();

  useEffect(() => {
    if (isVisible && isAndroidiOSPro) {
      document.body.classList.add("bottom-sheet-open");
    } else {
      document.body.classList.remove("bottom-sheet-open");
    }
    return () => {
      document.body.classList.remove("bottom-sheet-open");
    };
  }, [isVisible]);

  useEffect(() => {
  const handleScroll = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsVisible(false); // Also hide mobile bottom sheet if visible
    }
  };

  window.addEventListener("scroll", handleScroll, true); // useCapture for early interception

  return () => {
    window.removeEventListener("scroll", handleScroll, true);
  };
}, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if clicked outside all relevant elements
      const isOutsideMenu = menuRef.current && !menuRef.current.contains(event.target as Node);
      const isOutsideButton = buttonRef.current && !buttonRef.current.contains(event.target as Node);
      const isOutsideTextBox = textBoxRef.current && !textBoxRef.current.contains(event.target as Node);
      const isOutsideTextBoxDropdown = textBoxDropdownRef.current && !textBoxDropdownRef.current.contains(event.target as Node);
      
      // For textbox mode, check both the textbox and its dropdown
      if (MenuOptions === "TextBox" || MenuOptions === "TextBoxWithBorder") {
        if (isOutsideTextBox && isOutsideTextBoxDropdown) {
          setIsOpenForTextBox(false);
          setIsVisible(false);
        }
      } else {
        // For other modes, check regular conditions
        if (isOutsideMenu && isOutsideButton) {
          setIsOpen(false);
          setIsVisible(false);
        }
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [MenuOptions]);
  
  // Update inputValue when TextValue prop changes
  useEffect(() => {
    setInputValue(TextValue !== undefined && TextValue !== null ? String(TextValue) : "");
  }, [TextValue]);

  const handleSelect = (item: MenuItem , e?: any) => {
    if (!item.disabled) {
      if (MenuOptions === "TextBox" || MenuOptions === "TextBoxWithBorder") {
        // For TextBox, keep the $ prefix
        if (MenuOptions === "TextBox") {
          setInputValue(item?.label);
        } 
        // For TextBoxWithBorder, remove the $ prefix since it's shown separately
        else {
          setInputValue(item?.label?.startsWith('$') ? item.label.substring(1) : item.label);
        }
        setIsOpenForTextBox(false);
      } else {
        setIsOpen(false);
      }
      setIsVisible(false);

      if (OnClick) {
        OnClick(item, e);
      }
    }
  };

  const handleClose = (actiontype: any) => {
    setIsVisible(false);
    setIsOpen(false);
    setIsOpenForTextBox(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!MenuOpen) {
      setIsOpen(false)
    } else {
      setIsOpen((prevIsOpen) => {
        const newIsOpen = !prevIsOpen;
        setIsVisible(newIsOpen);
        if (isAndroidiOSPro) {
          setIsVisible(newIsOpen);
        }
        if (OnThreeDotMenuClick) {
          OnThreeDotMenuClick(e, newIsOpen);
        }
        if( OnClick ) {
          OnClick(e );  
        }
        return newIsOpen;
      });
    }

  };

  const handleTextBoxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if(OnTextClick) {
      OnTextClick(e);
    }
   if(!MenuOpen) {
    setIsOpenForTextBox(false)
   } else {
    setIsOpenForTextBox((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      setIsVisible(newIsOpen);
      if (isAndroidiOSPro) {
        setIsVisible(newIsOpen);
      }
      if (OnThreeDotMenuClick) {
        OnThreeDotMenuClick(e, newIsOpen);
      }
      return newIsOpen;
    });
   }
  };

const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (MenuOptions === "TextBox") {
    const input = e.target;
    let value = input.value;

    // Escape special characters in prefix for regex
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixEscaped = escapeRegex(TextboxPrefixValue);

    // Remove only the prefix at the beginning
    const inputText = value.replace(new RegExp(`^${prefixEscaped}`), '');

    // Allow only digits and one decimal point
    const numericValue = inputText
      .replace(/[^0-9.]/g, '')              // Allow digits and dot
      .replace(/(\..*)\./g, '$1')           // Only one dot allowed
      .replace(/^0+(?=\d)/, '');            // Remove leading zeros

    // Add prefix back
    const newValue = numericValue ? `${TextboxPrefixValue}${numericValue}` : TextboxPrefixValue;

    // Save current cursor position before setting new value
    const cursorStart = input.selectionStart;
    const cursorEnd = input.selectionEnd;

    // Update input value
    setInputValue(newValue);

    // Optional: Adjust cursor position (without setTimeout)
    if (input && document.activeElement === input) {
      // Recalculate cursor offset based on prefix length
      const prefixLength = TextboxPrefixValue.length;
      const adjustedCursor = Math.max(cursorStart || prefixLength, prefixLength);

      // Set cursor after the prefix unless user is editing within number part
      requestAnimationFrame(() => {
        input.setSelectionRange(adjustedCursor, adjustedCursor);
      });
    }

    // Trigger callback without prefix
    if (OnTextChange) {
      OnTextChange(numericValue);
    }
  } else if (MenuOptions === "TextBoxWithBorder") {
    // TextBoxWithBorder logic remains unchanged
    const numericValue = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1')
      .replace(/^0+(?=\d)/, '');

    setInputValue(numericValue);

    if (OnTextChange) {
      OnTextChange(numericValue);
    }
  }
};

  const handleTextBlur = (e: any) => {
    const currentValue = inputValue || "";
    if (MenuOptions === "TextBox") {
      if (String(currentValue).startsWith(TextboxPrefixValue) === false) {
        setInputValue(`${TextboxPrefixValue}${currentValue}`);
      }
    }
    if (OnTextBlur) {
      OnTextBlur(e, currentValue);
    }
  };


  const handleTextKeyDown = (e: any) => {
    // For TextBox, prevent deleting the $ prefix
    if (MenuOptions === "TextBox") {
      if (e.target.selectionStart <= 1 && e.key === 'Backspace') {
        e.preventDefault();
      }
    }
    
    if (OnTextKeyDown) {
      OnTextKeyDown(e);
    }
  }

  const handleTexKeyUp = (e: any) => {
    if (OnTextKeyUp) {
      OnTextKeyUp(e);
    }
  }

  const handleTextKeypress = (e: any) => {
    // Only allow numeric input (0-9) and decimal point
    if (MenuOptions === "TextBox" || MenuOptions === "TextBoxWithBorder") {
      const isNumeric = /^[0-9.]$/.test(e.key);
      if (!isNumeric) {
        e.preventDefault();
      }
    }
    
    if (OnTextKeypress) {
      OnTextKeypress(e);
    }
  }

 const handleTextFocus = (e: any) => {
  // Ensure $ prefix exists when focused (TextBox only)
  const currentValue = inputValue || "";
  if (MenuOptions === "TextBox") {
    if (String(currentValue).startsWith(TextboxPrefixValue) === false) {
      setInputValue(`${TextboxPrefixValue}${currentValue}`);
    }
  }
  if (OnTextFoucus) {
    OnTextFoucus(e, currentValue);
  }
};

  // Helper function to check if an item is selected
  const isItemSelected = (item: MenuItem) => {
    if (!SelectedItem) return false;
    
    // Check if the item matches the SelectedItem
    if (SelectedItem.id && item.id) {
      return SelectedItem.id === item.id;
    }
    
    if (SelectedItem.label && item.label) {
      return SelectedItem.label === item.label;
    }
    
    return false;
  };

  const renderMenuTrigger = () => {
    switch (MenuOptions) {
      case "Icon":
        return (
          <div
          ref={
              MenuOptions === "Icon" && !Disabled
                ? (buttonRef as unknown as React.RefObject<HTMLDivElement>)
                : undefined
            }
            onClick={(e) => {
              if (Disabled) return; // Prevent click action if disabled
              e.stopPropagation();
              handleClick(e as unknown as React.MouseEvent<HTMLInputElement>);
            }}
            className={`vg-threedot-icon-wrapper ${Disabled ? "vg-threedot-disabled" : ""}`}
            style={{ cursor: Disabled ? "not-allowed" : Cursor ? "" : "pointer" }}
          >
            {IconSVG}
          </div>
        );
      case "TextBox":
        // Initialize with $ prefix if not present
       const displayValue = inputValue && inputValue.toString()?.startsWith(TextboxPrefixValue) 
          ? inputValue 
          : inputValue !== undefined && inputValue !== "" 
            ? `${TextboxPrefixValue}${inputValue}` 
            : TextboxPrefixValue;
            
        return (
          <div className="vg-threedot-textbox-wrapper threedot-textbox">
            <input
              type="text"
              className={`vg-threedot-textbox ${Disabled ? "vg-threedot-disabled" : ""} ${Cursor ? "vg-threedot-cursor" : ""}`}
              value={displayValue}
              disabled={Disabled}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              onClick={(e) => handleTextBoxClick(e as unknown as React.MouseEvent<HTMLInputElement>)}
              ref={textBoxRef}
              onKeyUp={(e) => { handleTexKeyUp(e)}}
              onKeyDown={(e) => {handleTextKeyDown(e)}}
              onKeyPress={(e) => {handleTextKeypress(e)}}
              onFocus={(e) => {handleTextFocus(e)}}
              maxLength={TextMaxLength} // +1 for $ prefix
            />
            {
              isOpenForTextBox && (
                <div 
                  className={`vg-threedot-dropdown-action`} 
                  ref={textBoxDropdownRef} 
                  style={{ display: isAndroidiOSPro ? "none" : "block" }}
                >
                  {Items?.map((item) => (
                    <a
                      key={item.id}
                      className={`vg-threedot-dropdown-list ${
                        SelectedItem ? (isItemSelected(item) ? "active" : "") : displayValue === item.label ? "active" : ""
                      } ${item.disabled ? "vg-threedot-disabled-link" : ""}`}
                      onClick={() => handleSelect(item)}
                    >
                      {item.icon && (
                        <span className="vg-threedot-dropdown-item-icon">
                          <Svg name={item.icon} />
                        </span>
                      )}
                      {item.percentage && (
                        <span className="vg-threedot-dropdown-percentage">
                          {item.percentage}
                        </span>
                      )}
                      <span className="vg-threedot-dropdown-price">{item.label}</span>
                    </a>
                  ))}
                </div>
              )
            }
          </div>
        );

      case "TextBoxWithBorder":
        // Don't include $ in the value since it's shown separately in the UI
        return (
          <div className="vg-threedot-textbox-wrapper threedot-with-border-textbox">
            <span className="vg-input-control-prefix">{TextboxPrefixValue}</span>
            <input
              type="text"
              className={`vg-threedot-textbox-with-border vg-input-control-prefix-left-padding ${Cursor ? "vg-threedot-cursor" : ""} ${Disabled ? "vg-threedot-disabled" : ""}`}
              value={inputValue || ""}
              disabled={Disabled}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              onClick={(e) => handleTextBoxClick(e as unknown as React.MouseEvent<HTMLInputElement>)}
              ref={textBoxRef}
              onKeyUp={(e) => { handleTexKeyUp(e)}}
              onKeyDown={(e) => {handleTextKeyDown(e)}}
              onKeyPress={(e) => {handleTextKeypress(e)}}
              onFocus={(e) => {handleTextFocus(e)}}
              maxLength={TextMaxLength ? TextMaxLength + TextboxPrefixValue.length : undefined} // Add prefix length
            />
            {
              isOpenForTextBox && (
                <div 
                  className={`vg-threedot-dropdown-action`} 
                  ref={textBoxDropdownRef} 
                  style={{ display: isAndroidiOSPro ? "none" : "block" }}
                >
                  {Items?.map((item) => {
                    // For comparing selected Items in TextBoxWithBorder, we need to handle the $ prefix
                    const itemLabelWithoutPrefix = item.label?.startsWith('$') ? item.label.substring(1) : item.label;
                    const isSelected = SelectedItem
                      ? isItemSelected(item)
                      : String(inputValue) === itemLabelWithoutPrefix || `$${inputValue}` === item.label;
                      
                    return (
                      <a
                        key={item.id}
                        className={`vg-threedot-dropdown-list ${
                          isSelected ? "active" : ""
                        } ${item.disabled ? "vg-threedot-disabled-link" : ""}`}
                        onClick={() => handleSelect(item)}
                      >
                        {item.icon && (
                          <span className="vg-threedot-dropdown-item-icon">
                            <Svg name={item.icon} />
                          </span>
                        )}
                        {item.percentage && (
                          <span className="vg-threedot-dropdown-percentage">
                            {item.percentage}
                          </span>
                        )}
                        <span className="vg-threedot-dropdown-price">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              )
            }
          </div>
        );
      
      case "CustomMenu":
        return (
          <div
            ref={
              MenuOptions === "CustomMenu" && !Disabled
                ? (buttonRef as unknown as React.RefObject<HTMLDivElement>)
                : undefined
            }
            onClick={(e) => {
              if (Disabled) return; // Prevent click action if disabled
              e.stopPropagation();
              handleClick(e as unknown as React.MouseEvent<HTMLInputElement>);
            }}
            className={`${Cursor ? "vg-threedot-cursor" : ""}`}
            style={{ cursor: Disabled ? "not-allowed" : "pointer"  }}
          >
            {CustomMenuRender &&
              (typeof CustomMenuRender === "function"
                ? CustomMenuRender()
                : CustomMenuRender)}
          </div>
        );


      default: // "ThreeDot"
        return (
          <VgButton
            ButtonIcon=""
            ButtonDisabled={Disabled}
            ButtonVariant="action"
            ButtononClick={(e: React.MouseEvent<HTMLInputElement>) => {
              handleClick(e);
            }}
            ButtononHover={() => { }}
            actionbutton={MenuButtonPosition}
            onClick={() => { }}
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
          />
        );
    }
  };

  return (
    <div className={`${ MenuOptions != "TextBox" && MenuOptions != "TextBoxWithBorder" ? "vg-threedot-dropdown-menu vg-tk-btn": ""}`}>
      {renderMenuTrigger()}

      {isOpen && Items && (
        <Portal
          wrapperElementId="threedotmenu"
          wrapperElement="div"
          inputRef={buttonRef}
          type={ThreeDotMenuOpenPosition === 'Right' ? PortalEnum.timePickerRight : null}
        >
          <div className="vg-threedot-dropdown-action" ref={menuRef} style={{ display: isAndroidiOSPro ? "none" : "block" }}>
            {Items?.map((item) => (
              <div
                key={item.id}
                className={`vg-threedot-dropdown-link ${item.disabled ? "vg-threedot-disabled-link" : ""
                  }`}
                onClick={(e) => handleSelect(item, e)}
              >
                {/* Check for custom HTML content */}
                {Object.keys(item).some(
                  (key) =>
                    key !== "id" &&
                    key !== "label" &&
                    key !== "icon" &&
                    key !== "disabled" &&
                    key !== "percentage" &&
                    typeof item[key] === "object" &&
                    item[key] !== null
                ) ? (
                  // Render custom HTML content
                  Object.values(item).find(
                    (value) =>
                      typeof value === "object" &&
                      value !== null &&
                      value.type // Check if it's a ReactNode
                  )
                ) : (
                  // Fallback to default rendering
                  <>
                    {item.icon && (
                      <span className="vg-threedot-dropdown-item-icon">
                        <Svg name={item.icon} />
                      </span>
                    )}
                    {item.label}
                  </>
                )}
              </div>
            ))}
          </div>
         </Portal>
      )}

      {isAndroidiOSPro && (
        <>
          <div
            className={`vg-threedot-dropdown-action-bottom-sheet ${isVisible ? "vg-threedot-dropdown-action-bottomsheet-show" : "vg-threedot-dropdown-action-bottomsheet-hide"}`}
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
            }}
          >
            <div className="vg-threedot-dropdown-action-bottomsheet-menu">
              {Items.map((item: any, index: number) => (
                <div className="vg-threedot-dropdown-action-bottomsheet-item" key={index}>
                  <a
                    key={item.id}
                    className={`vg-threedot-dropdown-bottomsheet-link ${isItemSelected(item) ? "active" : ""
                      } ${item.disabled ? "vg-threedot-bottomsheet-disabled-link" : ""}`}
                    onClick={() => handleSelect(item)}
                  >
                    {Object.keys(item).some(
                      (key) =>
                        key !== "id" &&
                        key !== "label" &&
                        key !== "icon" &&
                        key !== "disabled" &&
                        key !== "percentage" &&
                        typeof item[key] === "object" &&
                        item[key] !== null
                    ) ? (
                      <>
                        {Object.values(item).find(
                          (value) =>
                            typeof value === "object" &&
                            value !== null &&
                            React.isValidElement(value)
                        )}
                      </>
                    ) : (
                      <>
                        {item.icon && (
                          <span className="vg-threedot-dropdown-item-icon">
                            <Svg name={item.icon} />
                          </span>
                        )}
                        {item.label}
                      </>)}
                  </a>
                </div>
              ))}
            </div>
          </div>
          {isVisible && (
            <div
              className={`vg-threedot-dropdown-action-bottomsheet-overlay`}
              onClick={() => handleClose('overlay')}
            />
          )}
          <input type="hidden" onClick={() => handleClose} />
        </>
      )}
    </div>
  );
});

export default VgThreeDotMenu;