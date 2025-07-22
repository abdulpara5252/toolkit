import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect
} from "react";
import "./VgNestedDropdown.scss";
import Portal from "../../common/Portal";

// Define interfaces for our option types
interface OptionType {
  label: string;
  value: string;
  hasSubmenu?: boolean;
  children?: Array<{ label: string; value: string }>; // Optional nested children
}

interface SelectedValueType {
  label: string;
  value: string | number;
  subOption?: string | boolean;
}
export interface VgNestedDropdownProps {
  VariantType?: "Default" | "NestedDropDown" | "NestedButton" ;
  ButtonText?: string;
  ButtonVariant?: "primary" | "secondary" | "theme" | "default";
  DefaultValue?: SelectedValueType | SelectedValueType[];
  OnChange?: (value: SelectedValueType) => void;
  OnClick?: (event: React.MouseEvent, value: SelectedValueType) => void;
  OnClickOutside?: () => void;
  Width?: string;
  RowData?: OptionType[]; // Optional prop to pass custom options
  SubmenuOptionPosition?: "Right" | "Left"; // Add this new prop
}

interface VgNestedDropdownRef {
  validate: () => boolean;
  getValue: () => SelectedValueType;
}

const VgNestedDropdown = forwardRef<
VgNestedDropdownRef,
VgNestedDropdownProps
>(
  (
    {
      VariantType = "Default",
      ButtonText = "Select Option",
      ButtonVariant = "primary",
      DefaultValue = { label: "Allow", value: "1" },
      OnChange,
      OnClick,
      OnClickOutside,
      RowData,
      Width = "",
      SubmenuOptionPosition = "Right" // Add this with default value
    },
    ref
  ) => {
    // Convert the defaultValue to SelectedValueType if it's an array
    const initialValue: SelectedValueType = Array.isArray(DefaultValue) 
      ? DefaultValue[0] 
      : DefaultValue;
    
    const [selectedValue, setSelectedValue] = useState<SelectedValueType>(initialValue);
    const [selectedSubOption, setSelectedSubOption] = useState<string | undefined>(
      typeof initialValue.subOption === 'string' ? initialValue.subOption : undefined
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuRect, setMenuRect] = useState<DOMRect | null>(null);

    const [hoveredOption, setHoveredOption] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
      const getElementRectById = (id: string): DOMRect | null => {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect() : null;
      };

      const updateMenuRect = () => {
        const rect = getElementRectById("vg-nested");
        if (rect) {
          setMenuRect(rect); // <- assuming setMenuRect is your state setter
        }
      };

      // Call once on mount or dropdown open
      updateMenuRect();

      // Attach resize listener
      window.addEventListener("resize", updateMenuRect);

      return () => {
        window.removeEventListener("resize", updateMenuRect);
      };
    }, []);

    
    const options: OptionType[] = RowData || [
      { label: "Allow", value: "1", hasSubmenu: true },
      { label: "Require Acceptance", value: "2", hasSubmenu: true },
      { label: "Block", value: "3", hasSubmenu: true }
    ];

// Submenu options can be made dynamic too, or left as is for now
const subOptions = ["At this Location", "At all Locations"];

    // Function to get button variant class
    const getButtonVariantClass = (variant: string): string => {
      switch (variant) {
        case "primary":
          return "vg-btn-primary";
        case "secondary":
          return "vg-btn-secondary";
        case "theme":
          return "vg-btn-theme";
        case "default":
          return "vg-btn-default";
        default:
          return "vg-btn-primary"; // fallback to primary
      }
    };

    // Expose methods through ref
    useImperativeHandle(ref, () => ({
      validate: () => !!selectedValue, // Simple validation to check if value is selected
      getValue: () => ({
        ...selectedValue,
        subOption: selectedSubOption
      }) // Returns the complete selected value object
    }));

    // Handle option selection
    const handleOptionSelect = (event: React.MouseEvent, option: OptionType) => {
      const newSelectedValue: SelectedValueType = {
        label: option.label,
        value: option.value
      };
      
      setSelectedValue(newSelectedValue);
      
      // Call the onClick handler with the current event and selected value
      if (OnClick) {
        OnClick(event, {
          ...newSelectedValue,
          subOption: selectedSubOption
        });
      }
      
      // If there's no submenu or multiLocation is false, close dropdown and trigger onChange
      if (!option.hasSubmenu) {
        setIsDropdownOpen(false);
        OnChange?.(newSelectedValue);
      }
    };

    // Handle submenu option selection
    // Replace your handleSubOptionSelect function with this updated version:

    const handleSubOptionSelect = (event: React.MouseEvent, subOption: string) => {
      // Find the currently hovered option to set as the main selected value
      const hoveredMainOption = options.find(option => option.value === hoveredOption);

      let newSelectedValue: SelectedValueType;

      if (hoveredMainOption) {
        // If there's a hovered option, use it as the main selection
        newSelectedValue = {
          label: hoveredMainOption.label,
          value: hoveredMainOption.value,
          subOption: subOption
        };

        // Update the selectedValue to the hovered option
        setSelectedValue({
          label: hoveredMainOption.label,
          value: hoveredMainOption.value
        });
      } else {
        // Fallback: keep the current selectedValue if no hover state
        newSelectedValue = {
          ...selectedValue,
          subOption: subOption
        };
      }

      // Update the sub-option
      setSelectedSubOption(subOption);

      // Trigger onChange with both main and sub option
      OnChange?.(newSelectedValue);

      // Call the onClick handler with the updated values
      if (OnClick) {
        OnClick(event, newSelectedValue);
      }

      // Close dropdown and reset hover state
      setIsDropdownOpen(false);
      setHoveredOption(null);
    };

    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
          if (OnClickOutside) OnClickOutside();
        }
      };

      // Only add listener when dropdown is open
      if (isDropdownOpen) {
        // Use 'click' instead of 'mousedown' to match your menu item handlers
        document.addEventListener('click', handleClickOutside);
      }

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [OnClickOutside, isDropdownOpen]);

    const getSubmenuPositionClass = (position: string): string => {
      return position === "Left" ? "submenu-left" : "submenu-right";
    };

    return (
      <div className="vg-nested-dropdown-wapper" id="vg-nested" ref={dropdownRef}>
        {VariantType === "NestedButton" ? (
          <div className="vg-nested-button-container">
            {/* Main text button */}
            <button
              className={`vg-tk-btn vg-main-button ${getButtonVariantClass(ButtonVariant)}`}
              onClick={(e) => {
                e.stopPropagation();
                if (OnClick) {
                  OnClick(e, {
                    ...selectedValue,
                    subOption: selectedSubOption
                  });
                }
              }}  
            >
              {ButtonText}
            </button>

            {/* Dropdown arrow button */}
            <a
              className={`vg-tk-btn vg-drop-arrow vg-dropdown-arrow-button ${getButtonVariantClass(ButtonVariant)}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                setIsDropdownOpen(!isDropdownOpen);
                if (OnClick) {
                  OnClick(e, {
                    ...selectedValue,
                    subOption: selectedSubOption
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
                width="16"
                height="16"
                fill="currentColor"
                style={{
                  transform: 'rotate(90deg)',
                }}
              >
                <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path>
              </svg>
            </a>
          </div>
        ) : (<div
          className="dropdown-toggle"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>
            {selectedValue.label}
            {selectedSubOption ? ` - ${selectedSubOption}` : ''}
          </span>
          {/* <div className="select-arrow">▼</div> */}
        </div>)}
        
        {isDropdownOpen && (
          <Portal
            wrapperElementId="NestedDropdownPortal"
            wrapperElement="div"
            inputRef={dropdownRef}
            type={1}
          >
            <div className="dropdown-menu" style={{ width: Width ? Width: menuRect?.width }}>
              {options.map((option) => {
                const hasChildren = Array.isArray(option.children) && option.children.length > 0;

                return (
                  <div
                    key={option.value}
                    className={`dropdown-item ${selectedValue.value === option.value ? 'selected' : ''}`}
                    onClick={(event) => {
                      event.preventDefault(); // Add this
                      event.stopPropagation(); // Keep this
                      handleOptionSelect(event, option);
                    }}
                    onMouseEnter={() => hasChildren && setHoveredOption(option.value)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <div className="option-content">
                      <span>{option.label}</span>
                      {/* Only show arrow if this item has children */}
                      {hasChildren && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 512"
                          width="16"
                          height="16"
                          fill="currentColor"
                        >
                          <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path>
                        </svg>
                      )}
                    </div>

                    {/* Render submenu if it has children */}
                    {hasChildren && hoveredOption === option.value && (
                      <div className={`submenu-popup ${getSubmenuPositionClass(SubmenuOptionPosition)}`}>
                        {option.children?.map((child: any) => (
                          <div
                            key={child.value || child.label}
                            className="submenu-item"
                            onClick={(e) => {
                              e.preventDefault(); // Add this
                              e.stopPropagation(); // Keep this
                              handleSubOptionSelect(e, child.label);
                            }}
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Portal>
        )}
      </div>
    );
  }
);

export default VgNestedDropdown;