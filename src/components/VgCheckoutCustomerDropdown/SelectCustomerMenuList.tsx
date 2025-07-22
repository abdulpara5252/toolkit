import React, { Fragment, useEffect, useRef, memo, useState } from "react";
import { components } from "react-select";
import { useSwipeable } from "react-swipeable";
import { utils } from "../../utils/utils";
import "./VgCheckoutCustomerDropdown.scss";
import { useDebouncedCallback } from "../../utils/useDebounce";
import VgTab from "../VgTab/VgTab";

const SelectCustomMenuList = memo((props: any) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { options, children, maxHeight, getValue, isLoading } = props;
  const {
    OnScrollPagination,
    isAndroidiOSPro,
    isAndroidiOSProWithTablet,
    isPaydesk,
    SearchPlaceholder,
    inputValue,
    setInputValue,
    SelectedApply,
    RightSwipeEvent,
    AddOptionButtonText,
    isOpen,
    OnSearch,
    handleSearchChange,
    activeTab,
    setActiveTab,
    EnableTabs,
    selectedOptions = [],
    optionsFilter = [],
    setPageIndex,
    totalCount = { "In Today": 0, "All Customers": 0, "Save For Later": 0 },
  } = props.selectProps;

  const [value] = getValue();
  const initialOffset = options.indexOf(value) * 55;
  const searchFocus = useRef<any>();
  const listRef = useRef<any>();

  // Setup right swipe handler for mobile
  const handlerRightSwipedEvent = (e: any) => {
    if (utils.CheckIsIphoneIosproWithoutState() && RightSwipeEvent) {
      utils.CallBackGivenToMobileApp(10, "", 2, 300, false);
    }
  };

  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      handlerRightSwipedEvent(eventData);
    },
    trackTouch: true,
    trackMouse: true,
  });

  // Auto-focus the search input
  const AutoFocus = () => {
    if (searchFocus.current) {
      searchFocus.current.focus();
    }
  };

  // Clear search input
  const handleClearClick = () => {
    if (setInputValue) {
      setInputValue("");
    }
   
    if (OnSearch) {
      OnSearch({ searchValue: "", search: false });
    }
  };

  // Check if auto-focus should be enabled
  const IsCheckAutoFocus = () => {
    if (
      isAndroidiOSPro === true ||
      isAndroidiOSProWithTablet === true ||
      isPaydesk === true
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleScrollOffset = (event: any) => {
    if (activeTab === "All Customers") {
      if (isLoading) return;

      const target = event.target;
      const scrollTop = target?.scrollTop;
      const scrollHeight = target?.scrollHeight;
      const clientHeight = target?.clientHeight;

      // Define height offset (e.g., 100px from the bottom)
      const heightOffset = 1;

      // Check if we've scrolled to within heightOffset pixels of the bottom
      if (scrollTop + clientHeight >= scrollHeight - heightOffset && options.length < totalCount["All Customers"]) {  
        if (setPageIndex) {
          setPageIndex((prev: number) => prev + 1);
        }

        if (typeof OnScrollPagination === "function") {
          try {
            OnScrollPagination(event);
          } catch (error) {
            console.error("Error in pagination handler:", error);
          }
        } else {
          console.warn("OnScrollPagination is not defined or is not a function");
        }
      }
    }
  };

  const debouncedHandleScroll = useDebouncedCallback(handleScrollOffset, 300);

  useEffect(() => {
    const currentRef = dropdownRef.current?.firstChild;

    if (!currentRef) return;

    if (typeof OnScrollPagination === "function") {
      currentRef.addEventListener("scroll", (event) => debouncedHandleScroll(event as unknown as React.UIEvent<HTMLDivElement>));

      return () => {
        currentRef.removeEventListener("scroll", (event) => debouncedHandleScroll(event as unknown as React.UIEvent<HTMLDivElement>));
      };
    }
  }, [isOpen, OnScrollPagination]);

  // Forward listRef
  useEffect(() => {
    if (listRef && dropdownRef.current) {
      // @ts-ignore - ref assignment
      listRef.current = dropdownRef.current;
    }
  }, [listRef, dropdownRef]);

  // Handle tab click
  const handleTabClick = (tabName: string) => {
    if (setActiveTab) {
      setPageIndex(1)
      setActiveTab(tabName);
    }
  };

  return (
    <Fragment>
      <div
        className={`vg-select-virtualiz ${
          AddOptionButtonText ? "vg-footer-withghost-btn" : ""
        }`}
        {...handlers}
      >
        <div className="vg-select-filter">
          {/* Tabs section */}
          {EnableTabs && (
            <Fragment>
              <VgTab
                ActiveTab={activeTab === "In Today" ? 0 : activeTab === "All Customers" ? 1 : 2}
                Name={[
                  {
                    id: 0,
                    name: "In Today",
                  },
                  {
                    id: 1,
                    name: "All Customers",
                  },
                  {
                    id: 2,
                    name: "Save For Later",
                  },
                ]}
                NoOfTab="3"
                TabPosition="left"
                TabVariant="horizontal"
                onClick={(tabId: number, tabName: string) => handleTabClick(tabName)}
              />
            </Fragment>
          )}

          {/* Search input for mobile */}
          {isAndroidiOSPro && (
            <Fragment>
              <div className="vg-select-search-control">
                <input
                  autoComplete="off"
                  ref={searchFocus}
                  type="text"
                  onChange={(e) => handleSearchChange && handleSearchChange(e)}
                  className="vg-input-control"
                  onClick={AutoFocus}
                  value={inputValue}
                  autoFocus={IsCheckAutoFocus()}
                  placeholder={SearchPlaceholder}
                />
                <div className="vg-search-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.2656 14.6748C15.5586 14.9678 15.5586 15.4072 15.2656 15.6709C15.1484 15.8174 14.9727 15.876 14.7969 15.876C14.5918 15.876 14.416 15.8174 14.2695 15.6709L10.3438 11.7451C9.28906 12.5947 7.9707 13.0635 6.56445 13.0635C3.22461 13.0635 0.5 10.3389 0.5 6.96973C0.5 3.62988 3.19531 0.875977 6.56445 0.875977C9.9043 0.875977 12.6582 3.62988 12.6582 6.96973C12.6582 8.40527 12.1895 9.72363 11.3398 10.749L15.2656 14.6748ZM1.90625 6.96973C1.90625 9.57715 3.98633 11.6572 6.59375 11.6572C9.17188 11.6572 11.2812 9.57715 11.2812 6.96973C11.2812 4.3916 9.17188 2.28223 6.59375 2.28223C3.98633 2.28223 1.90625 4.3916 1.90625 6.96973Z"></path>
                  </svg>
                </div>
                <span 
                  className="vg-input-control-postfix vg-clearsearch-input-control" 
                  onClick={handleClearClick}
                >
                  {inputValue !== '' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 8.00098C0 3.59473 3.5625 0.000976562 8 0.000976562C12.4062 0.000976562 16 3.59473 16 8.00098C16 12.4385 12.4062 16.001 8 16.001C3.5625 16.001 0 12.4385 0 8.00098ZM5.46875 6.53223L6.9375 8.00098L5.46875 9.46973C5.15625 9.78223 5.15625 10.251 5.46875 10.5322C5.75 10.8447 6.21875 10.8447 6.5 10.5322L7.96875 9.06348L9.46875 10.5322C9.75 10.8447 10.2188 10.8447 10.5 10.5322C10.8125 10.251 10.8125 9.78223 10.5 9.46973L9.03125 8.00098L10.5 6.53223C10.8125 6.25098 10.8125 5.78223 10.5 5.46973C10.2188 5.18848 9.75 5.18848 9.46875 5.46973L7.96875 6.96973L6.5 5.46973C6.21875 5.18848 5.75 5.18848 5.46875 5.46973C5.15625 5.78223 5.15625 6.25098 5.46875 6.53223Z"></path>
                    </svg>
                  )} 
                </span>
              </div>
            </Fragment>
          )}
        </div>

        {/* Menu list with options */}
        <components.MenuList
          {...props}
          id="scroll"
          ref={dropdownRef}
          innerProps={{
            onScroll: (e: React.UIEvent<HTMLDivElement>) => {
              handleScrollOffset(e); // Call your scroll handler here
            },
          }}
        >
          {isLoading && (
            <div className="load-more-result">Loading...</div>
          )}
          {props.children}
        </components.MenuList>
        
        {/* Footer section with apply button and item counts */}
        {EnableTabs && activeTab === "In Today" && selectedOptions.length > 0 && (
          <Fragment>
            <div className="vg-checkout-customer-dd-btn">
              <button
                className="vg-tk-btn vg-btn-primary"
                onClick={() => {
                  if (SelectedApply) SelectedApply();
                }}
              >
                {selectedOptions.length > 1 
                  ? `Group ${selectedOptions.length} Customers` 
                  : `Continue`
                }
              </button>
            </div>
          </Fragment>
        )}
        <div className="vg-checkout-customer-count">
          <div className="vg-add-resource-btn">
            {optionsFilter.length > 0 ? (
              <span>
                {/* Show item count based on active tab */}
                {activeTab === "In Today" ? (
                  <>Items <span className="fontweightbold">1-{Math.min(optionsFilter.length, totalCount["In Today"])}</span> out of <span className="fontweightbold">{totalCount["In Today"]}</span></>
                ) : activeTab === "All Customers" ? (
                  <>Items <span className="fontweightbold">1-{Math.min(optionsFilter.length, totalCount["All Customers"])}</span> out of <span className="fontweightbold">{totalCount["All Customers"]}</span></>
                ) : (
                  <>Items <span className="fontweightbold">1-{Math.min(optionsFilter.length, totalCount["Save For Later"])}</span> out of <span className="fontweightbold">{totalCount["Save For Later"]}</span></>
                )}
              </span>
            ) : (
              <span className="vg-add-resource-btn-text">No Matches</span>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default SelectCustomMenuList;