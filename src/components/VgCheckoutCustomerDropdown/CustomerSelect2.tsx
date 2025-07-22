import React, { Fragment, memo, useCallback } from "react";
import Select, { components } from "react-select";
import SelectCustomerMenuList from "./SelectCustomerMenuList";

const CustomSelect2 = memo((props: any) => {
  
  // Option component with checkbox support
  const CustomOption = useCallback(({ children, ...customProps }: { children: React.ReactNode; [key: string]: any }) => {    
    const { selectProps } = customProps;
   
    // Handle checkbox click
    const handleCheckboxClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation(); // Prevent triggering the parent div's click handler
      if (props.handleCheckboxChange) {
        props.handleCheckboxChange(customProps.data, !customProps.isSelected);
      }
      // Do not call selectOption here to avoid closing the dropdown
    };

    // Handle label click
    const handleLabelClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation(); // Prevent triggering the parent div's click handler
      // Set only this option as selected (single select mode)
      selectProps.onChange([customProps.data], { action: "select-option" });
      props.setIsOpen(false); // Close the dropdown
    };
    
    return (
      <div className="vg-checkout-customer-checkbox-dd" data-custid={customProps.data.value}>
        {props.ShowCheckbox && (
          <div className="vg-checkout-customer-checkbox-input vg-form-check" onClick={handleCheckboxClick}>
            <div className="vg-checkbox">
              <input 
                type="checkbox" 
                className="vg-form-check-input"
                value={customProps.data.value}
                checked={customProps.isSelected}
                onChange={() => {}} // Prevent React warning; handled by onClick
              />
              <label className="vg-check-label"></label>
            </div>
          </div>
        )}
        <div className="vg-checkout-customer-checkbox-label" onClick={handleLabelClick}>{children}</div>
      </div>
      );
    }, [props.handleCheckboxChange, props.ShowCheckbox]);

  // Custom filter function for better search
  const CustomFilter = useCallback((option: any, inputValue: string) => {
    if (!inputValue) return true;

    const words = inputValue.split(" ").filter(word => word);

    return words.every(word => 
      option.label !== undefined && 
      option.label.toLowerCase().includes(word.toLowerCase())
    );
  }, []);

  // Handle keyboard events
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    // Call parent's onKeyDown handler if provided
    if (props.onKeyDown) {
      props.onKeyDown(event);
    }
    
    if (
      (event.key === "Backspace" || event.key === "Enter" || event.key === "Tab") && 
      props.inputValue.length === 0
    ) {
      event.preventDefault();
    }
    
    if ((event.key === "Enter" || event.key === "Tab") && props.inputValue.length > 0) {
      event.preventDefault();
    }
  }, [props.inputValue, props.onKeyDown]);

  // Custom components for react-select
  const CustomNoOptionsMessage = useCallback(() => {
    return <div className="no-data-text">{props.IsShowCustomMessage || "No options available"}</div>;
  }, [props.IsShowCustomMessage]);

  const CustomClearIndicator = (props: any) => {
    return (
      <components.ClearIndicator {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
        </svg>
      </components.ClearIndicator>
    );
  };

  const CustomValueContainer = useCallback(({ children, ...valueContainerProps }: any) => {
    const { selectProps } = valueContainerProps;
    const { inputValue, placeholder } = selectProps;

    // Always render the placeholder unless the user is typing
    const placeholderElement = (
      <div className="vg-checkout-customer-dd-placeholder">
        {placeholder || "Select..."}
      </div>
    );

    const handleClearClick = () => {
      if (props.setInputValue) {
        props.setInputValue("");
      }
    };
    
    return (
      <components.ValueContainer {...valueContainerProps}>
        {!inputValue && placeholderElement}
        {React.Children.map(children, (child) =>
          // Only render the Input component to maintain search functionality
          child && child.type === components.Input ? child : null
        )}
        {inputValue && (
          <div
            onClick={handleClearClick}
            style={{
              cursor: "pointer",
              padding: "0 8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CustomClearIndicator {...valueContainerProps} />
          </div>
        )}
      </components.ValueContainer>
    );
  }, []);

  return (
    <Fragment>
      <Select
        {...props}
        ref={props.listRef}
        options={props.optionsFilter}
        menuPortalTarget={props.IsOpenFromBody ? document.body : null}
        placeholder={props.DropdownPlaceholder}
        isSearchable={true}
        components={{
          Option: (data: any) => CustomOption(data),  
          MenuList: SelectCustomerMenuList,
          ValueContainer: CustomValueContainer,
          NoOptionsMessage: CustomNoOptionsMessage,
          ClearIndicator: CustomClearIndicator,
        }}
        styles={{
          multiValue: (base) => ({ ...base, display: "none" }),
          singleValue: (base) => ({ ...base, display: "none" }),
          groupHeading: (base) => ({ ...base, fontWeight: "bold" }),
          option: (base) => ({
            ...base, 
            paddingLeft: "20px",
            cursor: "pointer",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "#f6f6f6"
            }
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (base) => ({
            ...base,
            minHeight: '40px',
            boxShadow: 'none',
            borderColor: '#ccc',
            '&:hover': {
              borderColor: '#aaa'
            }
          }),
          menu: (base) => ({
            ...base,
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }),
          input: (base) => ({
            ...base,
            margin: "0",
            padding: "0",
            // Ensure the input field takes up the full space to align cursor with placeholder
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }),
          placeholder: (base) => ({
            ...base,
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10px",
            color: "#aaa",
          }),
        }}
        menuIsOpen={props.isOpen}
        isMulti={props.EnableTabs && props.activeTab === "In Today"}
        hideSelectedOptions={false}
        value={props.selectedOptions}
        onChange={(data) => props.SelectOnChange(data)}
        inputValue={props.inputValue}
        onInputChange={(value) => props.setInputValue(value)}
        onKeyDown={handleKeyDown}
        filterOption={CustomFilter}
        classNamePrefix={`${props.CustomClassNamePrefix || ''} ${props.ClassNamePrefix || ''}`.trim()}
        name={props.DropdownName}
        tabIndex={props.TabIndex}
        autoFocus={true}
        menuPlacement={"auto"}
        isClearable={false}
        closeMenuOnSelect={true}
      />
    </Fragment>
  );
});

export default CustomSelect2;
