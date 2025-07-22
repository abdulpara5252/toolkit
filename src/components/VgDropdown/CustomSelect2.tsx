import React, { Fragment, useState } from "react";
import Select, { components } from "react-select";
import SelectCustomMenuList from "./SelectCustomMenuList";

const CustomSelect2 = (props: any) => {
  const isOptionDisabled = (optionData: any) => {
    const isDisabledByDefault = props.selectedOptions?.some((defaultOption: any) =>
      defaultOption.value === optionData.value && defaultOption.disable === true
    );
    const isDisabledByProperty = optionData.disable === true;
    return isDisabledByProperty || isDisabledByDefault;
  };
  
  const CustomOption = (customData: any) => {
    
    if (props.isGrouped && customData.data.groupId !== undefined) {
      return null; 
    }
    
    const isWithinGroup = customData.options && 
      customData.selectProps.optionsFilter?.some(
        (opt: any) => opt.options?.some(
          (groupOpt: any) => groupOpt.value === customData.data.value
        )
      );

    if (isWithinGroup) {
      return null; 
    }
 
    // Check if option is disabled using the helper function
    const isDisabled = isOptionDisabled(customData.data);
    
    return (  
      <components.Option {...customData} isDisabled={isDisabled}>
        <div
          className={`${
            props.Multi && props.ShowCheckBoxInGroup ? "vg-form-check" : "vg-select2-child-option"
          } ${isDisabled ? "disabled-option" : ""}`}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          }}
        >
          {props.Multi && props.ShowCheckBoxInGroup && (
            <input
              className="vg-form-check-input"
              type="checkbox"
              value={customData.data.value}
              checked={
                props?.isDefaultSelected?.filter(
                  (item: any) => item.value === customData.data.value
                ).length > 0
                  ? true
                  : customData.isSelected
              }
              disabled={isDisabled}
              onChange={(e) => {
                if (!isDisabled) {
                  props.handleChildCheckboxChange(
                    customData.data,
                    !customData.isSelected
                  );
                }
              }}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }
              }}
            />
          )}
          
          <label 
            className={`vg-check-label ${isDisabled ? "disabled-label" : ""}`}
            onClick={(e:React.MouseEvent) => {
              if (!isDisabled) {
                props.setSelectedChildValue(customData.label);
              } else {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }}
          >   
            {customData.data.label}
          </label>
           
        </div>
      </components.Option>
    );
  };

  const CustomVirtualizationOptions = (customData: any, props: any) => {
    const { onMouseMove, onMouseOver, ...rest } = customData.innerProps;
    const customProps = {
      ...customData,
      innerProps: "",
      customData: customData,
    };

    // Check if option is disabled using the helper function
    const isDisabled = isOptionDisabled(customProps.data);

    return (
      <Fragment>
        <components.Option {...customProps} className="" isDisabled={isDisabled}>
          <div
            className={`${
               props.ChildCheckbox ? "vg-form-check" : "vg-select2-child-option"
            } ${isDisabled ? "disabled-option" : ""}`}
            onClick={(e) => {
              if (!isDisabled) {
                e.stopPropagation();
                props.setSelectedChildValue(customProps.label);
              } else {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }}>
              
            {props.ChildCheckbox && (
              <input
                className="vg-form-check-input"
                type="checkbox"
                value={customProps.value}
                checked={
                  props?.isDefaultSelected?.filter(
                    (item: any) => item.value === customProps.data.value
                  ).length > 0
                    ? true
                    : customProps.isSelected
                }
                disabled={isDisabled}
                onChange={(e) => {
                  if (!isDisabled) {
                    props.handleChildCheckboxChange(
                      customProps.data,
                      !customProps.isSelected, e
                    );
                  }
                }}
                style={{ marginRight: "8px" }}
                id={"childOptions_" + customProps.value}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double triggering
                  if (isDisabled) {
                    e.preventDefault();
                    return false;
                  }
                }}
              />
            )}
            <label
              htmlFor={"childOptions_" + customProps.value.toString()}
              className={`vg-check-label ${isDisabled ? "disabled-label" : ""}`}
              onClick={(e: React.MouseEvent) => {
                if (!isDisabled) {
                  if(!props.ShowCheckBoxInGroup){
                    props.setSelectedChildValue(customProps.label);
                  }
                  e.stopPropagation();
                  if (!props.Multi) {
                    props.handleChildCheckboxChange(
                      customProps.data,
                      !customProps.isSelected,
                      e
                    );
                  }
                } else {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }
              }}
            >
              {customProps.label}
            </label>
            </div>
         
        </components.Option>
      </Fragment>
    );
  };

  const CustomFilter = (option: any, inputValue: any) => {
    // Rest of the code unchanged
    if (inputValue.length < 3) {
      return true; // Show all options if input value length is 3 or less
    }

    if (props.isLargeGroup) {
      const words = inputValue?.split(" ")?.filter((word: any) => word);

      return words.every(
        (word: any) =>
          (option.label !== undefined &&
            option.label.toLowerCase().includes(word.toLowerCase())) ||
          (option.data !== undefined &&
            option.data.groupId !== undefined &&
            option.data.groupId.toLowerCase().includes(word.toLowerCase()))
      );
    } else {
      const words = inputValue?.split(" ")?.filter((word: any) => word);

      return words.every(
        (word: any) =>
          option.label !== undefined &&
          option.label.toLowerCase().includes(word.toLowerCase())
      );
    }
  };

  // Rest of the component unchanged
  const handleKeyDown = (event: any) => {
    if (
      (event.key === "Backspace" ||
        event.key === "Enter" ||
        event.key === "Tab") &&
      props.inputValue.length === 0
    ) {
      event.preventDefault();
    }
    if (
      (event.key === "Enter" || event.key === "Tab") &&
      props.inputValue.length > 0
    ) {
      event.preventDefault();
    }
  };

  const CustomNoOptionsMessage = () => {
    return <div className="no-data-text">{props.IsShowCustomMessage}</div>;
  };

  const CustomClearIndicator = (props: any) => {
    return (
      <components.ClearIndicator {...props}>
        {/* Your custom SVG for the close icon */}
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
  
  return (
    <Fragment>
      <Select
        {...props}
        options={props.optionsFilter}
        // menuPortalTarget={ document.body}
        menuPortalTarget={props.OpenFromBody === true ? document.body : null}
        placeholder={props.DropdownPlaceholder}
        isSearchable={true}
        components={{
          Option: (data: any) =>
            props.Virtualization
              ? CustomVirtualizationOptions(data, props)
              : CustomOption(data),
          MenuList: SelectCustomMenuList,
          GroupHeading: (data: any) => props.CustomParentOption(data, props),
          ValueContainer: props.CustomValueContainer,
          NoOptionsMessage: () => CustomNoOptionsMessage(),
          ClearIndicator: CustomClearIndicator,
        }}
        styles={{
          multiValue: (base) => ({
            ...base,
            backgroundColor: "lightblue",
            marginRight: "5px",
          }),
          groupHeading: (base) => ({ ...base, fontWeight: "bold" }),
          option: (base, state) => ({ 
            ...base, 
            paddingLeft: "20px",
            // Add styles for disabled options
            cursor: state.isDisabled ? 'not-allowed' : 'default',
            color: state.isDisabled ? '#ccc' : base.color,
            backgroundColor: state.isDisabled ? '#f9f9f9' : base.backgroundColor,
            pointerEvents: state.isDisabled ? 'none' : 'auto', // This helps prevent clicks
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuIsOpen={props.isOpen}
        isMulti={props.Multi}
        Searchable={props.Searchable}
        hideSelectedOptions={false}
        value={props.selectedOptions}
        onChange={(data) => props.SelectOnChange(data)}
        inputValue={props.inputValue}
        onKeyDown={handleKeyDown}
        filterOption={CustomFilter}
        defaultValue={props.isDefaultSelected}
        classNamePrefix={`${props.CustomClassNamePrefix || ''} ${props.ClassNamePrefix || ''}`.trim()}
        name={props.DropdownName}
        tabIndex={props.TabIndex}
        autoFocus={props.AutoFocus}
        SearchAutoFocus={props.SearchAutoFocus}
        // menuPosition={'absolute'}
        menuPosition={props.isAndroidiOSProWithTablet ? 'absolute' : 'fixed'}
        menuPlacement="auto"
        // minMenuHeight={400}
        minMenuHeight={550} // Even smaller to maximize downward opening
        maxMenuHeight={400} // Cap to fit typical popup/viewport
        isClearable={props.ClearSelection}
      />
    </Fragment>
  );
};

export default CustomSelect2;