import React, {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import CustomerSelect2 from "./CustomerSelect2";
import { utils } from "../../utils/utils";
import CustomerService from "./CustomerService";
import "../VgTextbox/VgTextbox.scss";
import "../VgCheckbox/VgCheckbox.scss";
import "../VgButton/VgButton.scss";
import "./VgCheckoutCustomerDropdown.scss";
import "../VgTooltip/VgTooltip.scss";

// Define Tab Types
export type CustomerTab = "In Today" | "All Customers" | "Save For Later";

// Define types for our customer data
export interface CustomerData {
  ID: string;
  FN: string;
  C?: string;
  D?: string;
  N?: string;
  E?: string;
  DName?: string;
  profileImage?: string;
  points?: number;
  SaveForLaterId?: string;
  customerData?: any;
}

export interface VgCheckoutCustomerDropdownProps {
  ApiUrlInToday?: string;
  ApiRequestParams?: any;
  ClassNamePrefix?: string;
  CustomClassNamePrefix?: string;
  ShowCheckBox?: boolean;
  OpenDropdown?: boolean;
  SearchPlaceholder?: string;
  CloseFromOutSide?: boolean;
  DropdownClosed?: () => void;
  DropdownName?: string;
  DropdownClosingName?: string;
  IsSelect2OpenCallback?: boolean;
  Select2OpenCallback?: () => void;
  ShowCustomMessage?: string;
  onChange?: (data: any) => void;
  OnScrollPagination?: (e: React.UIEvent<HTMLDivElement>) => void;
  OnSearch?: (params: { searchValue?: string; search?: string | boolean }) => void;
  RightSwipeEvent?: boolean;
  DropdownTitle?: string;
  DropdownId?: string;
  NativeActionValue?: number;
  ShowHideFooter?: number;
  CallBackTimeCount?: number;
  IsFullLength?: boolean;
  TabIndex?: number;
  // FocusBorder?: boolean;
  VagaroToolkit?: Number;
  // Loading?: boolean;
  OpenFromBody?: boolean;
  OnClickOutside?: (params: { event: any; isClickOutside: boolean }) => void;
  EnableTabs?: boolean;
  DropdownPlaceholder?: string;
  BusinessId: number;
  HasCustomerRight: boolean;
  LoginUserId?: number;
  DepositGroupID?: string;
  TransactionDate?: string;
  ShowCheckbox?: boolean;
  SelectedCustomer?: any;
  [key: string]: any;
}

// Option type for the dropdown
export interface DropdownOption {
  value: string;
  label: string;
  email?: string;
  profileImage?: string;
  points?: number;
  SaveForLaterId?: string;
}

// Define ref type
interface VgCheckoutDropdownRef {
  validate: () => any;
  CloseDropdown: () => void;
}

 const VgCheckoutCustomerDropdown: React.FC<VgCheckoutCustomerDropdownProps> = forwardRef<
  VgCheckoutDropdownRef,
  VgCheckoutCustomerDropdownProps
>(
  (
    {
      OpenFromBody = false,
      DropdownPlaceholder = "Select a Customer",
      ShowCheckbox = false,
      OpenDropdown = false,
      SearchPlaceholder = "Search customers...",
      CloseFromOutSide = false,
      DropdownClosed,
      DropdownName = "",
      DropdownClosingName = "",
      IsSelect2OpenCallback = false,
      Select2OpenCallback,
      ShowCustomMessage = "No Customers Found",
      onChange,
      OnSearch,
      OnScrollPagination,
      RightSwipeEvent = false,
      ClassNamePrefix = "vg-checkout-customer-dropdown",
      CustomClassNamePrefix = '',
      DropdownTitle = "",
      DropdownId = "",
      NativeActionValue = 0,
      ShowHideFooter = 0,
      CallBackTimeCount = 0,
      IsFullLength = false,
      TabIndex = 0,
      VagaroToolkit = 0,
      ApiRequestParams = {},
      OnClickOutside,
      EnableTabs = true,
      BusinessId,
      HasCustomerRight,
      LoginUserId = 0,
      DepositGroupID,
      TransactionDate,
      ApiUrlInToday,
      SelectedCustomer
    },
    ref
  ) => {
    const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(OpenDropdown);
    const [inputValue, setInputValue] = useState<string>("");
    const [isApplyOrNot, setIsApplyOrNot] = useState<DropdownOption[]>([]); // To store the selected options
    const [isStoreForBack, setIsStoreForBack] = useState<DropdownOption[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<CustomerTab>("In Today");
    const [customers, setCustomers] = useState<Record<CustomerTab, CustomerData[]>>({
      "In Today": [],
      "All Customers": [],
      "Save For Later": []
    });
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [totalCustomers, setTotalCustomers] = useState<Record<CustomerTab, number>>({
      "In Today": 0,
      "All Customers": 0,
      "Save For Later": 0
    });
    const [saveForLaterList, setSaveForLaterList] = useState<any[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
    const [liSelected, setLiSelected] = useState<HTMLLIElement | null>(null);
    const [groupCustomerIds, setGroupCustomerIds] = useState<string>("");
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const NoImage = 'https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com//Images/no-Image-150.png';
    const PageSize = 10;

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const customerService = useMemo(() => 
      CustomerService(BusinessId, LoginUserId, HasCustomerRight, DepositGroupID, ApiUrlInToday, ApiRequestParams, TransactionDate), 
      [BusinessId, LoginUserId, HasCustomerRight, DepositGroupID, ApiUrlInToday, ApiRequestParams, TransactionDate]
    );

    // Device detection
    const isAndroidiOSPro = utils.CheckIsFromProAppWithoutState();
    const isAndroidiOSProWithTablet = utils.CheckIsFromIpadAndroidTabWithoutParm();
    const isPaydesk = utils.CheckIsFromPaydeskWithoutParm();

    // Load customer data when tab changes or search input changes
    const loadCustomerData = useCallback(async () => {
      setLoading(true);
      
      try {
        switch (activeTab) {
          case "In Today": {
            const todayCustomers = await customerService.GetTodayCustomerList(inputValue);
            setCustomers(prev => ({ ...prev, "In Today": todayCustomers }));
            setTotalCustomers(prev => ({ ...prev, "In Today": todayCustomers.length }));
            break;
          }
          case "All Customers": {
            const response = await customerService.GetAllCustomers(
              inputValue,
              pageIndex,
              PageSize
            );
            const { customers: allCustomers = [], totalCount = 0 } = response || {};
            
            setCustomers(prev => ({ 
              ...prev, 
              "All Customers": pageIndex === 1 
                ? allCustomers 
                : [...prev["All Customers"], ...allCustomers]
            }));
            
            setTotalCustomers(prev => ({ ...prev, "All Customers": totalCount }));
            break;
          }
          case "Save For Later": {
            const saveForLaterCustomers = await customerService.GetSaveForLaterList();
            setSaveForLaterList(saveForLaterCustomers);
            
            const mappedCustomers = customerService.SearchCustomer(saveForLaterCustomers, inputValue);
            setCustomers(prev => ({ ...prev, "Save For Later": mappedCustomers }));
            setTotalCustomers(prev => ({ ...prev, "Save For Later": mappedCustomers.length }));
            break;
          }
        }
      } catch (error) {
        console.error(`Error loading ${activeTab} data:`, error);
      } finally {
        setLoading(false);
      }
    }, [activeTab, customerService, inputValue, pageIndex, PageSize]);

    // Load data when the component mounts, tab changes, or search term changes
    useEffect(() => {
      console.log("Loading customer data...");
      setPageIndex(1);
      loadCustomerData();
    }, [activeTab, inputValue]);

    // Load more data when the pageIndex changes (for All Customers tab)
    useEffect(() => {
      if (pageIndex > 1 && activeTab === "All Customers") {
        console.log("Loading more customer data...");
        loadCustomerData();
      }
    }, [pageIndex, activeTab, loadCustomerData]);

    // Load data when the dropdown opens
    useEffect(() => {
      if (!isOpen) {
        console.log("Dropdown state changed:", isOpen);
        // Reset "All Customers" data when closing dropdown
        // setCustomers(prev => ({ ...prev, "All Customers": [] }));
        setCustomers({ "In Today": [], "All Customers": [], "Save For Later": [] });
        setPageIndex(1);
      } else {
        console.log("Dropdown opened");
        // When dropdown opens, immediately load first page of data
        loadCustomerData();
      }
    }, [isOpen]);

    // Process data for dropdown
    const optionsFilter = useMemo(() => {
      const activeTabData = customers[activeTab] || [];
      console.log("Active Tab Data:", activeTabData);
      
      return activeTabData.map(customer => ({
        value: customer?.ID,
        label: customer?.DName || customer?.FN,
        email: customer?.E,
        profileImage: customer?.profileImage || NoImage,
        points: customer?.points || 0,
        SaveForLaterId: customer?.SaveForLaterId,
        // Use nullish coalescing for better handling of falsy values
        customerData: customer?.customerData ?? customer
      }));
    }, [activeTab, customers]);

    // Add this useEffect to handle SelectedCustomer prop
    useEffect(() => {
      if (SelectedCustomer && activeTab === "In Today") {
        // Check if the selected customer exists in the current options
        console.log("SelectedCustomer:", SelectedCustomer);
        
        const foundCustomer = optionsFilter.find(
          (option) => option.value === SelectedCustomer.value
        );

        if (foundCustomer) {
          setSelectedOptions([foundCustomer]);
        }
      }
    }, [SelectedCustomer, activeTab, optionsFilter]);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;
      setInputValue(searchValue);
      setPageIndex(1);

      if (OnSearch) {
        OnSearch({ searchValue, search: searchValue });
      }
    }, [OnSearch]);

    const handleScrollPagination = useCallback((event: React.UIEvent<HTMLDivElement>) => {
      if (loading) return;

      const target = event.target as HTMLDivElement;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const heightOffset = 1;
      // if (scrollHeight - (scrollTop + clientHeight) < heightOffset) {
      if (scrollTop + clientHeight >= scrollHeight - heightOffset && optionsFilter.length < totalCustomers[activeTab]) {  
  
        // if (activeTab === "All Customers") {
        //   setPageIndex(prev => prev + 1);
        // }
        
        if (typeof OnScrollPagination === "function") {
          try {
            OnScrollPagination(event);
          } catch (error) {
            console.error("Error in pagination handler:", error);
          }
        }
      }
    }, [loading, OnScrollPagination, activeTab]);

    const handleCheckboxChange = useCallback((option: DropdownOption, checked: boolean) => {
      setSelectedOptions(prev => {
        if (checked) {
          return [...prev, option];
        } else {
          return prev.filter(item => item.value !== option.value);
        }
      });
    }, []);

    const SelectOnChange = useCallback((data: DropdownOption | DropdownOption[]) => {
      const selectedData = Array.isArray(data) ? data : [data];
      
      setSelectedOptions(selectedData);
      setIsApplyOrNot(selectedData);
      setShowTooltip(false); // Hide tooltip when a customer is selected
      
      if (onChange) {
        onChange({ activeTab: activeTab, selectedOptions: selectedData });
        console.log({ activeTab: activeTab, selectedOptions: selectedData });
      }
      
      if (selectedData.length > 0) {
        setSelectedCustomerId(selectedData[0].value);
      }

    }, [onChange, activeTab, selectedOptions]);

    const SelectedApply = useCallback((e?: React.MouseEvent) => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      
      if (selectedOptions.length === 0) {
        setShowTooltip(true);
        return;
      }
      
      setIsStoreForBack(isApplyOrNot);
      
      if (onChange) {
        onChange(isApplyOrNot);
      }
      
      if (isAndroidiOSPro && CloseFromOutSide && DropdownClosed) {
        DropdownClosed();
      }

      if (selectedOptions.length > 0) {
        // Group customer selection
        if (onChange) {
          onChange({  activeTab: activeTab, selectedOptions: selectedOptions });
          console.log({ activeTab: activeTab, selectedOptions: selectedOptions });
        }
        setIsOpen(false);
      }
    }, [isApplyOrNot, onChange, isAndroidiOSPro, CloseFromOutSide, DropdownClosed, selectedOptions]);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && selectedOptions.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          const updatedOptions = [...selectedOptions];
          updatedOptions[0] = {
            ...updatedOptions[0],
            profileImage: reader.result as string
          };
          setSelectedOptions(updatedOptions);
          setShowImageUploader(false);
        };
        reader.readAsDataURL(file);
      }
    }, [selectedOptions]);

    const handleDeleteImage = useCallback(() => {
      if (selectedOptions.length > 0) {
        const updatedOptions = [...selectedOptions];
        updatedOptions[0] = {
          ...updatedOptions[0],
          profileImage: NoImage // Reset to NoImage
        };
        setSelectedOptions(updatedOptions);
      }
    }, [selectedOptions]);

    // Customer selection helper functions
    const selectedCustomer = useCallback((customerId: string) => {
      // If the customer exists in Save for Later
      const saveForLaterCustomer = saveForLaterList.find(
        item => item.ID === customerId
      );
      
      if (saveForLaterCustomer) {
        // Handle Save for Later customer selection logic
        // You would typically make an API call here to get detailed data
        console.log("Selected Save for Later customer:", saveForLaterCustomer);
        // You can trigger fetching save for later details from an API here
      }
      
      // Find the customer in the current tab's data
      const activeTabData = customers[activeTab];
      const selectedCustomerData = activeTabData.find(c => c.ID === customerId);
      
      if (selectedCustomerData) {
        const option: DropdownOption = {
          value: selectedCustomerData.ID,
          label: selectedCustomerData.DName || selectedCustomerData.FN,
          email: selectedCustomerData.E,
          profileImage: selectedCustomerData.profileImage || 'default-image-url',
          points: selectedCustomerData.points || 0
        };
        
        setSelectedOptions([option]);
        setSelectedCustomerId(customerId);
        setInputValue(option.label);
        setIsOpen(false);
        
        if (onChange) {
          onChange({ selectedOptions: [option] });
        }
      }
    }, [activeTab, customers, onChange, saveForLaterList]);

    // Group customer functions
    const isGroupCheckout = useCallback(() => {
      return groupCustomerIds !== "";
    }, [groupCustomerIds]);

    const addGroupProvider = useCallback((customerName: string, customerId: string) => {
      if (customerName.indexOf('(') >= 0) {
        customerName = customerName.substring(0, customerName.indexOf('(') - 1).trim();
        if (customerName[customerName.length - 1] === '-') {
          customerName = customerName.substring(0, customerName.length - 1);
        }
      }
      
      // Update groupCustomerIds
      const currentIds = groupCustomerIds ? groupCustomerIds.split(',') : [];
      if (!currentIds.includes(customerId)) {
        const updatedIds = [...currentIds, customerId].join(',');
        setGroupCustomerIds(updatedIds);
      }
    }, [groupCustomerIds]);

    const removeGroupProvider = useCallback((customerId: string) => {
      const currentIds = groupCustomerIds ? groupCustomerIds.split(',') : [];
      const updatedIds = currentIds.filter(id => id !== customerId).join(',');
      setGroupCustomerIds(updatedIds);
    }, [groupCustomerIds]);

    const clearGroupCustomers = useCallback(() => {
      setGroupCustomerIds("");
    }, []);

    // Mobile device interactions
    const Select2CloseHeaderCallback = useCallback(() => {
      if (isAndroidiOSPro) {
        const obj = {
          NativeAction: NativeActionValue,
          Footer: 1,
          callFromLocation: DropdownId,
          IsFullLength: IsFullLength,
          VagaroToolkit: VagaroToolkit,
        };

        const messageObj = {
          message: "",
          messageType: 0,
          screenTitle: DropdownClosingName,
          screenType: 0,
          navType: 0,
          action: "53|~|" + JSON.stringify(obj)
        };

        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }

      if (IsSelect2OpenCallback && Select2OpenCallback) {
        Select2OpenCallback();
      }
    }, [
      isAndroidiOSPro, NativeActionValue, DropdownId, 
      IsFullLength, VagaroToolkit, DropdownClosingName, 
      IsSelect2OpenCallback, Select2OpenCallback
    ]);

    const Select2OpenHeaderCallback = useCallback(() => {
      if (isAndroidiOSPro) {
        const obj = {
          NativeAction: NativeActionValue,
          Footer: ShowHideFooter,
          callFromLocation: DropdownId,
          IsFullLength: IsFullLength,
          VagaroToolkit: VagaroToolkit,
        };

        const messageObj = {
          message: "",
          messageType: 0,
          screenTitle: DropdownTitle,
          screenType: 0,
          navType: 0,
          action: "53|~|" + JSON.stringify(obj)
        };

        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }

      if (IsSelect2OpenCallback) {
        if (Select2OpenCallback !== undefined) {
          Select2OpenCallback();
        }
      }
    }, [
      isAndroidiOSPro, NativeActionValue, ShowHideFooter, 
      DropdownId, IsFullLength, VagaroToolkit, 
      DropdownTitle, IsSelect2OpenCallback, Select2OpenCallback
    ]);

    // Handle outside clicks to close dropdown
    useEffect(() => {
      if (isAndroidiOSPro) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest(".cmn-select-dropdown")
        ) {
          setIsOpen(false);
          setInputValue(""); // Reset input value
          
          if (CloseFromOutSide && DropdownClosed) {
            DropdownClosed();
          }
          
          if (OnClickOutside) {
            OnClickOutside({ 
              event, 
              isClickOutside: true 
            });
          }
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.querySelector("body")?.classList.add("selectControlOpen");
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.querySelector("body")?.classList.remove("selectControlOpen");
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.querySelector("body")?.classList.remove("selectControlOpen");
      };
    }, [isOpen, isAndroidiOSPro, CloseFromOutSide, DropdownClosed, OnClickOutside, selectedOptions]);

    const CloseDropdown = () => {
      if (isOpen) {
        setIsOpen(false);
        setSelectedOptions(isStoreForBack);
        Select2CloseHeaderCallback();

        setShowTooltip(false);
      }
    }

    // Keyboard navigation
    // const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    //   const keyCode = e.keyCode || e.which;
      
    //   // Enter key
    //   if (keyCode === 13) {
    //     if (liSelected) {
    //       const customerId = liSelected.getAttribute('data-custid');
    //       if (customerId) {
    //         console.log('customerId');
            
    //         selectedCustomer(customerId);
    //       }
    //     }
    //     return;
    //   }
      
    //   // Tab key
    //   if (keyCode === 9) {
    //     if (isOpen) {
    //       setIsOpen(false);
    //     }
    //     return;
    //   }
      
    //   // Up/Down arrow keys
    //   if (keyCode === 38 || keyCode === 40) {
    //     e.preventDefault();
        
    //     const options = listRef.current?.querySelectorAll('li');
    //     if (!options || options.length === 0) return;
        
    //     let nextSelected: HTMLLIElement | null = null;
        
    //     if (keyCode === 40) { // Down
    //       if (liSelected) {
    //         const currentIndex = Array.from(options).indexOf(liSelected);
    //         nextSelected = options[(currentIndex + 1) % options.length] as HTMLLIElement;
    //       } else {
    //         nextSelected = options[0] as HTMLLIElement;
    //       }
    //     } else { // Up
    //       if (liSelected) {
    //         const currentIndex = Array.from(options).indexOf(liSelected);
    //         nextSelected = options[(currentIndex - 1 + options.length) % options.length] as HTMLLIElement;
    //       } else {
    //         nextSelected = options[options.length - 1] as HTMLLIElement;
    //       }
    //     }
        
    //     if (liSelected) {
    //       liSelected.classList.remove('li-selected');
    //     }
        
    //     if (nextSelected) {
    //       nextSelected.classList.add('li-selected');
    //       setLiSelected(nextSelected);
          
    //       // Scroll into view
    //       const container = listRef.current;
    //       if (container) {
    //         const containerTop = container.scrollTop;
    //         const containerBottom = containerTop + container.clientHeight;
    //         const elementTop = nextSelected.offsetTop;
    //         const elementBottom = elementTop + nextSelected.clientHeight;
            
    //         if (elementBottom > containerBottom) {
    //           container.scrollTop = elementBottom - container.clientHeight;
    //         } else if (elementTop < containerTop) {
    //           container.scrollTop = elementTop;
    //         }
    //       }
    //     }
    //   }
    // }, [liSelected, isOpen, selectedCustomer]);

    // console.log("listref", listRef);
    
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      // Replace this:
      // const keyCode = e.keyCode || e.which;
      
      // With this:
      switch (e.key) {
        case 'Enter':
          console.log("Enter");
          
          if (liSelected) {
            console.log("liSelected");
            
            const customerId = liSelected.getAttribute('data-custid');
            if (customerId) {
              selectedCustomer(customerId);
            }
          }
          return;

        case 'Tab':
          console.log("Tab");
          
          if (isOpen) {
            setIsOpen(false);
          }
          return;

        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault();
          const options = listRef.current?.querySelectorAll('li');
          if (!options || options.length === 0) return;
          
          let nextSelected: HTMLLIElement | null = null;
          
          if (e.key === 'ArrowDown') {
            if (liSelected) {
              const currentIndex = Array.from(options).indexOf(liSelected);
              nextSelected = options[(currentIndex + 1) % options.length] as HTMLLIElement;
            } else {
              nextSelected = options[0] as HTMLLIElement;
            }
          } else {
            if (liSelected) {
              const currentIndex = Array.from(options).indexOf(liSelected);
              nextSelected = options[(currentIndex - 1 + options.length) % options.length] as HTMLLIElement;
            } else {
              nextSelected = options[options.length - 1] as HTMLLIElement;
            }
          }
          
          if (liSelected) {
            liSelected.classList.remove('li-selected');
          }
          
          if (nextSelected) {
            nextSelected.classList.add('li-selected');
            setLiSelected(nextSelected);
            
            // Scroll into view logic
            const container = listRef.current;
            if (container) {
              const containerTop = container.scrollTop;
              const containerBottom = containerTop + container.clientHeight;
              const elementTop = nextSelected.offsetTop;
              const elementBottom = elementTop + nextSelected.clientHeight;
              
              if (elementBottom > containerBottom) {
                container.scrollTop = elementBottom - container.clientHeight;
              } else if (elementTop < containerTop) {
                container.scrollTop = elementTop;
              }
            }
          }
          break;
      }
    }, [liSelected, isOpen, selectedCustomer]);

    // Toggle dropdown
    const toggleDropdown = useCallback((e?: React.MouseEvent) => {
      // Skip toggling if the click originated from avatar buttons
      if (e && (e.target as HTMLElement).closest('.vg-checkout-customer-avatar-option')) {
        return;
      }

      if(showTooltip) {
        setShowTooltip(false);
      }
      
      if (!isOpen) {
        setIsOpen(true);
        Select2OpenHeaderCallback();

        setSelectedOptions([]); // Clear selected options when opening dropdown
        setIsApplyOrNot([]); // Clear apply state
        setIsStoreForBack([]); // Clear store for back state
        setSelectedCustomerId(""); // Clear selected customer ID
        setInputValue(""); // Clear input value
      } else {
        setIsOpen(false);
        Select2CloseHeaderCallback();
      }
    }, [isOpen, Select2OpenHeaderCallback, Select2CloseHeaderCallback, showTooltip]);

    const handleFileClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowImageUploader(true);
      fileInputRef.current?.click();
    };

    const validateSelection = useCallback(() => {
      if (selectedOptions.length === 0) {
        setShowTooltip(true);
        return false; // Validation failed
      }
      return true; // Validation passed
    }, [selectedOptions]);

    useImperativeHandle(ref, () => ({
      validate: validateSelection,
      CloseDropdown: CloseDropdown,
    }));


    console.log("shoeTooltip", showTooltip);
    
    return (
      <Fragment>
      <div className="vg-checkout-customer-search">
        {/* Show the dropdown when it's open */}
        {isOpen ? (
          <div
            className={`vg-checkout-customer-dropdown`}
            ref={containerRef}
          >
            <CustomerSelect2
              optionsFilter={optionsFilter}
              OnScrollPagination={handleScrollPagination}
              IsOpenFromBody={OpenFromBody}
              DropdownPlaceholder={DropdownPlaceholder}
              selectedOptions= {selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
              SelectOnChange={SelectOnChange}
              ShowCheckbox={EnableTabs && ShowCheckbox ? activeTab === "In Today" : false}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSearchChange={handleSearchChange}
              isAndroidiOSPro={isAndroidiOSPro}
              isAndroidiOSProWithTablet={isAndroidiOSProWithTablet}
              isPaydesk={isPaydesk}
              SearchPlaceholder={SearchPlaceholder}
              IsShowCustomMessage={ShowCustomMessage}
              SelectedApply={SelectedApply}
              RightSwipeEvent={RightSwipeEvent}
              ClassNamePrefix={ClassNamePrefix}
              CustomClassNamePrefix={CustomClassNamePrefix}
              DropdownName={DropdownName}
              TabIndex={TabIndex}
              isLoading={loading}
              listRef={listRef}
              OnSearch={OnSearch}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              EnableTabs={EnableTabs}
              setPageIndex={setPageIndex}
              totalCount={{ 
                "In Today": totalCustomers["In Today"],
                "All Customers": totalCustomers["All Customers"], 
                "Save For Later": totalCustomers["Save For Later"]
              }}
              onKeyDown={handleKeyDown}
              pageIndex={pageIndex}
            />
          </div>
        ) : (
          // Show the selected option or "Select a Customer" when the dropdown is closed
          <div
            className="vg-checkout-customer-dropdown"
            onClick={toggleDropdown}
          >
            {selectedOptions.length > 0 ? (
              <>
                <div className="vg-checkout-customer-profile">
                <div 
                  className="vg-checkout-customer-avatar" 
                  style={{
                    backgroundImage: `url(${selectedOptions[0].profileImage})`
                  }}
                  onClick={(e) => {
                    // If NoImage is displayed, allow uploading by clicking anywhere on the avatar
                    if (selectedOptions[0].profileImage === NoImage) {
                     handleFileClick(e);
                    }
                  }}
                >
                  {selectedOptions[0].profileImage && selectedOptions[0].profileImage !== NoImage && (
                    <div className="vg-checkout-customer-avatar-option">
                      <div className="vg-checkout-customer-avatar-btn"
                        onClick={(e) => { handleFileClick(e) }}
                      >
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
                      </div>
                      <div className="vg-checkout-customer-avatar-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDeleteImage();
                        }}
                      >
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Name and Email */}
                <div className="vg-checkout-customer-info">
                  <div className="vg-checkout-customer-name">
                    {selectedOptions[0].label}
                  </div>
                  {selectedOptions[0].email && (
                    <div className="vg-checkout-customer-email">
                      <a
                        href={`mailto:${selectedOptions[0].email}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selectedOptions[0].email}
                      </a>
                    </div>
                  )}
                </div>

                {/* {selectedOptions[0].points && ( */}
                  <div className="vg-checkout-customer-points">
                    <span className="vg-checkout-customer-badge">{selectedOptions[0].points} pts</span>
                  </div>
                {/* )} */}
                </div>
              </>
            ) : (
              // Display "Select a Customer" if no option is selected
              <div className="vg-checkout-customer-dd-placeholder">Select a Customer</div>
            )}

            {showTooltip && (              
              <div className={`vg-tooltip vg-tooltip-bottom-center`} >
                <div className={`vg-tooltip-sms vg-text-right`} ref={tooltipRef}>
                  {"Select a Customer first."}
                </div>
              </div>
            )}
          </div>
        )}

        <input type="hidden" onClick={() => CloseDropdown()} id={DropdownId} />
      </div>
      </Fragment>
    );
  }
);

export default VgCheckoutCustomerDropdown;