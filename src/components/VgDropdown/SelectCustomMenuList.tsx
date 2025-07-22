import React, { Fragment, useEffect, useRef, useState } from "react";
import { VariableSizeList as List,ListChildComponentProps } from "react-window";
import { components } from 'react-select';
import { useSwipeable } from "react-swipeable";
import { utils } from "../../utils/utils";
import "./VgDropdownNew.scss";
import  VgButton from "../VgButton/VgButton";
import { useDebouncedCallback } from "../../utils/useDebounce";

const SelectCustomMenuList = (props: any) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { options, children, maxHeight, getValue, isLoading } = props;
  const {
    Virtualization,
    SelectAll,
    SelectNone,
    CustomParentOption,
    handleSearchChange,
    OnScrollPagination,
    setFilteredDropdownOptions,
    OptionsFilter,
    DropdownData,
    isAndroidiOSPro,
    isAndroidiOSProWithTablet,
    isPaydesk,
    SearchPlaceholder,
    Multi,
    Searchable,
    ShowSelectAllSelectNone,
    inputValue,
    setInputValue,
    SelectedApply,
    RightSwipeEvent,
    VirtualDropdownHeight,
    IsShowCustomMessage,
    AddOptionButtonText,
    OnOptionButtonClick,
    isOpen,
    setIsOpen,
    SelectOnChangeCallback,
    allFilteredSelected,
    getAllOptions,
    setSelectedOptions,
    setSelectedValues,
    setIsApplyOrNot,
    selectedOptions,
    OnSearchForApi,
    setIsStoreForBack,
    ScrollPagination,
    RecordsPerPage,
    IsApplyButtonOn,
    SetBottomSheetDropdown,
    Select2CloseHeaderCallback,
    OnClickOutside,
    SearchAutoFocus,
    hideDropdown,
    SetHideDropdown,
    setIsInitialPageLoad,
    Setresetvalue,
    setDropdownPaginatedData
  } = props.selectProps;

  const [value] = getValue();
  const initialOffset = options.indexOf(value) * 55;
  const searchFocus = useRef<any>();
  const listRef = useRef<any>();

  const handlerRightSwipedEvent = (e: any) => {

    if (utils.CheckIsIphoneIosproWithoutState() && RightSwipeEvent === true && !AddOptionButtonText) {
            utils.CallBackGivenToMobileApp(10, '', 2, 300, false);
        }
    }

  const handlers = useSwipeable({
    onSwipedRight: (eventData) => { handlerRightSwipedEvent(eventData) },
    trackTouch: true,
    trackMouse: true,
  });

  const resetAfterIndex = (index: any) => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
    }
  }

  const AutoFocus = () => {
    if (searchFocus.current) {
      searchFocus.current.focus();
    }
  }

  const handleClearClick = () => {
    setInputValue("");
    Setresetvalue(true);
    setIsInitialPageLoad(true);
    setDropdownPaginatedData((prev : any) => ({
      ...prev,
      items : []
    }))
    if (allFilteredSelected) {
      setFilteredDropdownOptions(OptionsFilter);
      setSelectedOptions(selectedOptions);
      setSelectedValues(selectedOptions.map((option: any) => option.value));
      setIsApplyOrNot(selectedOptions);
      setIsStoreForBack(selectedOptions);
      SelectOnChangeCallback(selectedOptions);
    } else {
      // Otherwise, restore current selection state
      setFilteredDropdownOptions(OptionsFilter);
      setSelectedOptions(selectedOptions);
      setSelectedValues(selectedOptions.map((option: any) => option.value));
    }
    
    if (OnSearchForApi) {
      OnSearchForApi({ searchValue: "", search: false });
    }
  }


  const handleScrollOffset = (event: any) => {
    if (isLoading || !ScrollPagination) return;
    
    const target = event.target;
    const scrollTop = target?.scrollTop;
    const scrollHeight = target?.scrollHeight;
    const clientHeight = target?.clientHeight;
    

    // Define height offset (e.g., 100px from the bottom)
    const heightOffset = 1;
    
    // Check if we've scrolled to within heightOffset pixels of the bottom
    if (scrollHeight - (scrollTop + clientHeight) < heightOffset) {
      // Check if OnScrollPagination exists and is a function before calling it
      if (typeof OnScrollPagination === 'function') {
        try {
          OnScrollPagination(event);
        } catch (error) {
          console.error('Error in pagination handler:', error);
        }
      } else {
        console.warn('OnScrollPagination is not defined or is not a function');
      }
    }
  };

  const debouncedHandleScroll = useDebouncedCallback(handleScrollOffset, 300);
    useEffect(() => {
    if (!Virtualization && dropdownRef.current) {
      let selectedOption = null;
      selectedOption = dropdownRef.current.querySelector(
        '[aria-selected="true"]'
      );
      if (!selectedOption) {
        const children = dropdownRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const ariaSelected = child.getAttribute("aria-selected");
          if (ariaSelected === "true") {
            selectedOption = child;
            break;
          }
        }
      }

      if (!selectedOption) {
        selectedOption = dropdownRef.current.querySelector(
          ".vg-select2-dropdown__option--is-selected"
        );
      }
      if (!selectedOption) {
        const allOptions = Array.from(
          dropdownRef.current.querySelectorAll('[role="option"]')
        );
        selectedOption = allOptions.find((option) => {
          return (
            option.getAttribute("aria-selected") === "true" ||
            option.classList.contains(
              "vg-select2-dropdown__option--is-selected"
            ) ||
            option.querySelector("input[checked]") !== null
          );
        });
      }

      if (selectedOption) {
        selectedOption.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }
    }
  }, [Virtualization, isOpen]);
  useEffect(() => {
    const currentRef = dropdownRef.current?.firstChild;
    
    if (!currentRef || !ScrollPagination) return;

    if (typeof OnScrollPagination === 'function') {
      currentRef.addEventListener('scroll', debouncedHandleScroll);
      
      return () => {
        currentRef.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [isOpen, OnScrollPagination, ScrollPagination]); 
 
  const BottomSheetClick = (e: any) => {
    SetHideDropdown()
    if(OnClickOutside){
        OnClickOutside({e, isClickOutside: true});
      }
  };

  if (Virtualization) {

    let filteredOptions: any[] = [];

        if (inputValue !== undefined && inputValue !== '') {

      const lowerInputValue = inputValue.toLowerCase();
      const groupMap = new Map();
      const seenGroups = new Set();
      const seenElements = new Set();

      options.forEach((element: any) => {

        if (element.label) {

          const lowerLabel = element.label.toLowerCase();
                    const groupId = element.groupId ? element.groupId.toLowerCase() : null;

                    if (lowerLabel.includes(lowerInputValue) || (groupId && groupId.includes(lowerInputValue))) {

            if (element.isGroupOptions === false) {

              if (groupId && !seenGroups.has(groupId)) {

                if (!groupMap.has(groupId)) {
                                    groupMap.set(groupId, options.find((d: any) => d.groupId && d.groupId.toLowerCase() === groupId));
                }

                const groupName = groupMap.get(groupId);

                if (groupName && !seenElements.has(groupName)) {
                  filteredOptions.push(groupName);
                  seenGroups.add(groupId);
                  seenElements.add(groupName);
                }
              }

              if (!seenElements.has(element)) {
                filteredOptions.push(element);
                seenElements.add(element);
              }
            } else {

              if (!seenElements.has(element)) {
                filteredOptions.push(element);
                seenElements.add(element);
              }
            }
          }
        }
      });
    } else {
      filteredOptions = options;
    }

    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }

    const GetItemSize = (index: any) => {

      const item = filteredOptions[index];
            let label = document.createElement('label');

      if (isAndroidiOSPro) {

                label.style.width = "100%"

        if (item.isGroupOptions) {

          label.style.padding = "8px 16px 8px 20px";
          label.style.fontWeight = "700";
        } else {

          label.style.padding = "12px 36px 13px 36px";
          label.style.fontWeight = "500";
        }
      } else {

        if (item.isGroupOptions) {

                    label.style.width = "321px"
          label.style.fontWeight = "700";
        } else {

                    label.style.width = "293px"
          label.style.fontWeight = "400";
        }

        label.style.padding = "8px 0px 8px 30px";
      }

      label.textContent = item.label;
            label.style.position = 'absolute';
            label.style.visibility = 'hidden';
      label.style.fontSize = "15px";
      label.style.lineHeight = "20px";
      document.body.appendChild(label);

      let height = label.clientHeight;

      if (label.parentNode !== null) {
        label.parentNode.removeChild(label);
      }

      return height;
    };

    const DropdownTotalHeight = () => {

      const maximumHeight = maxHeight;
            const minimumHeight = (filteredOptions.length * (36 + 16));

      if (isAndroidiOSPro === true) {

        return window.innerHeight - 200;
      } else {

        if (filteredOptions.length > 9) {
          return maximumHeight;
        } else {

          if (minimumHeight >= VirtualDropdownHeight) {
            return maximumHeight;
          } else {
            return minimumHeight;
          }
        }
      }
        }

    return (
      <Fragment>
        {isAndroidiOSPro && SetBottomSheetDropdown && (
          <div className="vg-select-bottomsheet-overlay" onClick={(e) => BottomSheetClick(e)}></div>
        )}
        <div className={`vg-select-virtualiz ${AddOptionButtonText ? "vg-footer-withghost-btn" : ""}`} {...handlers} 
        >
          <div className="vg-select-filter">
                        {(Multi === true && ShowSelectAllSelectNone === true && isAndroidiOSPro === false) && (
                <Fragment>
                  <div className="vg-select2-dropdown-selection">
                                    <button onClick={(e) => SelectAll(e)} className="select-btn">Select All</button>
                                    <button onClick={(e) => SelectNone(e)} className="select-btn">Select None</button>
                  </div>
                </Fragment>
              )}
            {Searchable && (
              <Fragment>
                <div className="vg-select-search-control">
                  <input
                    autoComplete="off"
                    ref={searchFocus}
                    type="text"
                    onChange={(e) => handleSearchChange(e)}
                    className="vg-input-control"
                    onClick={() => AutoFocus()}
                    value={inputValue}
                    autoFocus={SearchAutoFocus}
                    placeholder={SearchPlaceholder}
                  />
                  <div className="vg-search-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2656 14.6748C15.5586 14.9678 15.5586 15.4072 15.2656 15.6709C15.1484 15.8174 14.9727 15.876 14.7969 15.876C14.5918 15.876 14.416 15.8174 14.2695 15.6709L10.3438 11.7451C9.28906 12.5947 7.9707 13.0635 6.56445 13.0635C3.22461 13.0635 0.5 10.3389 0.5 6.96973C0.5 3.62988 3.19531 0.875977 6.56445 0.875977C9.9043 0.875977 12.6582 3.62988 12.6582 6.96973C12.6582 8.40527 12.1895 9.72363 11.3398 10.749L15.2656 14.6748ZM1.90625 6.96973C1.90625 9.57715 3.98633 11.6572 6.59375 11.6572C9.17188 11.6572 11.2812 9.57715 11.2812 6.96973C11.2812 4.3916 9.17188 2.28223 6.59375 2.28223C3.98633 2.28223 1.90625 4.3916 1.90625 6.96973Z"></path>
                    </svg>
                  </div>
                  {inputValue!== '' && (
            <span className="vg-input-control-postfix  vg-clearsearch-input-control" onClick={handleClearClick}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 8.00098C0 3.59473 3.5625 0.000976562 8 0.000976562C12.4062 0.000976562 16 3.59473 16 8.00098C16 12.4385 12.4062 16.001 8 16.001C3.5625 16.001 0 12.4385 0 8.00098ZM5.46875 6.53223L6.9375 8.00098L5.46875 9.46973C5.15625 9.78223 5.15625 10.251 5.46875 10.5322C5.75 10.8447 6.21875 10.8447 6.5 10.5322L7.96875 9.06348L9.46875 10.5322C9.75 10.8447 10.2188 10.8447 10.5 10.5322C10.8125 10.251 10.8125 9.78223 10.5 9.46973L9.03125 8.00098L10.5 6.53223C10.8125 6.25098 10.8125 5.78223 10.5 5.46973C10.2188 5.18848 9.75 5.18848 9.46875 5.46973L7.96875 6.96973L6.5 5.46973C6.21875 5.18848 5.75 5.18848 5.46875 5.46973C5.15625 5.78223 5.15625 6.25098 5.46875 6.53223Z"></path></svg>
            </span>
          )} 
                </div>
              </Fragment>
             )}
                        {(Multi === true && ShowSelectAllSelectNone === true && isAndroidiOSPro === true) && (
                <Fragment>
                  <div className="vg-select2-dropdown-selection">
                                    <button onClick={(e) => SelectAll(e)} className="select-btn">Select All</button>
                                    <button onClick={(e) => SelectNone(e)} className="select-btn">Select None</button>
                  </div>
                </Fragment>
              )}
          </div>
                    {(filteredOptions.length > 0) ?
                        (
            <Fragment>
              <List
                ref={listRef}
                height={DropdownTotalHeight()}
                itemCount={filteredOptions.length}
                onScroll={handleScrollOffset}
                style={{ maxHeight: '300px', overflowY: 'auto' }}
                width="100%"
                itemSize={GetItemSize}
                initialScrollOffset={initialOffset}
                                    onItemsRendered={({ visibleStartIndex }) => resetAfterIndex(visibleStartIndex)}
              >
                {({ index, style }:ListChildComponentProps) => {

                  let item = filteredOptions[index];

                  if (item.isGroup || item.isGroupOptions) {

                    return (
                      <div style={{ ...style }} className="" key={item.label}>
                        {CustomParentOption(item, props)}
                      </div>
                    );
                  } else if (item.isGroupOptions === false) {

                                            const childIndex = filteredOptions.slice(0, index).filter((i: any) => !i.isGroupOptions).length;

                    if (children[childIndex]) {

                      return (
                        <Fragment>
                                                        <div style={style} className="vg-select-control__group-option-virtual" key={item.value}>
                            {children[childIndex]}
                          </div>
                        </Fragment>
                      );
                    } else {
                      return null;
                    }
                                        }
                                        else {
                                            const childIndex = filteredOptions.slice(0, index).filter((i: any) => !i.isGroupOptions).length;
                    if (children[childIndex]) {

                      return (
                        <div style={style} key={item.value}>
                          {children[childIndex]}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  }
                }}
              </List>
            </Fragment>
          ) : (
            <Fragment>
               <div className='no-data-text'>{IsShowCustomMessage}</div>
            </Fragment>
                        )
                    }
          {isAndroidiOSPro === true && Multi === true && (
            <Fragment>
                            <div className='vg-select-bottom-btn'>
                                <button className='vg-tk-btn vg-btn-primary' onClick={() => { SelectedApply() }} >Apply</button>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {isAndroidiOSPro && SetBottomSheetDropdown && (
          <div className={`vg-select-bottomsheet-overlay `} onClick={(e) => BottomSheetClick(e)}></div>
        )}
        <div className={`vg-select-virtualiz ${hideDropdown ? 'dropdownhide' : ''} ${AddOptionButtonText ? "vg-footer-withghost-btn" : ""}`} {...handlers} 
        >
          <div className="vg-select-filter">
                        {(Multi === true && ShowSelectAllSelectNone === true && isAndroidiOSPro === false) && (
                <Fragment>
                  <div className="vg-select2-dropdown-selection">
                                    <button onClick={(e) => SelectAll(e)} className="select-btn">Select All</button>
                                    <button onClick={(e) => SelectNone(e)} className="select-btn">Select None</button>
                  </div>
                </Fragment>
              )}
            {Searchable && (
              <Fragment>
                <div className="vg-select-search-control">
                  <input
                    autoComplete="off"
                    ref={searchFocus}
                    type="text"
                    onChange={(e) => handleSearchChange(e)}
                    className="vg-input-control"
                    onClick={() => AutoFocus()}
                    value={inputValue}
                    autoFocus={SearchAutoFocus}
                    placeholder={SearchPlaceholder}
                  />
                  <div className="vg-search-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2656 14.6748C15.5586 14.9678 15.5586 15.4072 15.2656 15.6709C15.1484 15.8174 14.9727 15.876 14.7969 15.876C14.5918 15.876 14.416 15.8174 14.2695 15.6709L10.3438 11.7451C9.28906 12.5947 7.9707 13.0635 6.56445 13.0635C3.22461 13.0635 0.5 10.3389 0.5 6.96973C0.5 3.62988 3.19531 0.875977 6.56445 0.875977C9.9043 0.875977 12.6582 3.62988 12.6582 6.96973C12.6582 8.40527 12.1895 9.72363 11.3398 10.749L15.2656 14.6748ZM1.90625 6.96973C1.90625 9.57715 3.98633 11.6572 6.59375 11.6572C9.17188 11.6572 11.2812 9.57715 11.2812 6.96973C11.2812 4.3916 9.17188 2.28223 6.59375 2.28223C3.98633 2.28223 1.90625 4.3916 1.90625 6.96973Z"></path>
                    </svg>
                  </div>
                  <span className="vg-input-control-postfix vg-clearsearch-input-control" onClick={handleClearClick}>
                    {inputValue!== '' &&
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 8.00098C0 3.59473 3.5625 0.000976562 8 0.000976562C12.4062 0.000976562 16 3.59473 16 8.00098C16 12.4385 12.4062 16.001 8 16.001C3.5625 16.001 0 12.4385 0 8.00098ZM5.46875 6.53223L6.9375 8.00098L5.46875 9.46973C5.15625 9.78223 5.15625 10.251 5.46875 10.5322C5.75 10.8447 6.21875 10.8447 6.5 10.5322L7.96875 9.06348L9.46875 10.5322C9.75 10.8447 10.2188 10.8447 10.5 10.5322C10.8125 10.251 10.8125 9.78223 10.5 9.46973L9.03125 8.00098L10.5 6.53223C10.8125 6.25098 10.8125 5.78223 10.5 5.46973C10.2188 5.18848 9.75 5.18848 9.46875 5.46973L7.96875 6.96973L6.5 5.46973C6.21875 5.18848 5.75 5.18848 5.46875 5.46973C5.15625 5.78223 5.15625 6.25098 5.46875 6.53223Z"></path></svg>
            } 
            </span>
            
                </div>
              </Fragment>
            )}
                        {(Multi === true && ShowSelectAllSelectNone === true && isAndroidiOSPro === true) && (
                <Fragment>
                  <div className="vg-select2-dropdown-selection">
                                    <button onClick={(e) => SelectAll(e)} className="select-btn">Select All</button>
                                    <button onClick={(e) => SelectNone(e)} className="select-btn">Select None</button>
                  </div>
                </Fragment>
              )}
          </div> 

          <components.MenuList {...props} 
            id="scroll" 
            innerRef={dropdownRef}
            innerProps={{
              onScroll: (e: React.UIEvent<HTMLDivElement>) => {
                handleScrollOffset(e); // Call your scroll handler here
              },
            }}
            className={`${ScrollPagination && RecordsPerPage <= 4  ? "vg-select2-dropdown-scrollpagination__menu-list" : "vg-select2-dropdown__menu-list"}`}
          >
            {props.children}
            {isLoading && <div className="load-more-result">Loading More Results..</div>}
          </components.MenuList>
          <div className="vg-drop-sticky-btnformobile">    
          {AddOptionButtonText && (
            <div className="vg-add-resource-btn">
            <VgButton
              ButtonIcon="plus"
              ButtonVariant="ghost"
              ButtononClick={(e: any) => {
                 OnOptionButtonClick?.(e);
                if(isOpen){
                  setIsOpen(false)
                }
              }}
              ButtononHover={() => {}}
              IconPlacement="prefix"
            >
              {AddOptionButtonText}
            </VgButton>
            </div>
          )}

          {isAndroidiOSPro === true && Multi === true  && (
            <Fragment>
                            <div className='vg-select-bottom-btn'>
                                <button className='vg-tk-btn vg-btn-primary' onClick={() => { SelectedApply() }} >Apply</button>
              </div>
            </Fragment>
          )}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default SelectCustomMenuList;
