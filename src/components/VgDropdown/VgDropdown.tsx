import React, {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import CustomSelect2 from "./CustomSelect2";
import { utils } from "../../utils/utils";
import "../VgTextbox/VgTextbox.scss";
import "../VgCheckbox/VgCheckbox.scss";
import "./VgDropdownNew.scss";
import VgTooltip from "../VgTooltip/VgTooltip";
import Svg from "../VgSvg/Svg";
import { SetDropdowndata } from "../../utils/SetDropdowndata";
import { useDebounceValue } from "../../utils/useDebounce";

export interface VgDropdownProps {
  Virtualization?: boolean;
  DropdownData?: any;
  ApiUrl?: string;
  ApiRequestParams?: any;
  ClassNamePrefix?: string;
  CustomClassNamePrefix?: string;
  Multi?: boolean;
  Expanded?: boolean;
  DropdownPlaceholder?:string 
  ShowCheckBoxInGroup?: boolean;
  ChildCheckbox?: boolean;
  GroupOptions?: boolean;
  OpenDropdown?: boolean;
  SearchPlaceholder?: string;
  ShowSelectAllSelectNone?: boolean;
  CloseFromOutSide?: boolean;
  DropdownClosed?: () => void;
  SetCustomPlaceholder?: boolean;
  CustomPlaceholderName?: string;
  Searchable?: boolean;
  MenuPlacement?: string;
  DropdownName?: string;
  DropdownClosingName?: string;
  IsSelect2OpenCallback?: boolean;
  Select2OpenCallback?: () => void;
  ShowCustomMessage?: string;
  onChange?: (data: any) => void;
  OnScrollPagination?: (e: React.UIEvent<HTMLDivElement>) => void;
  OnOptionButtonClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  OnSearchForApi?: (e: React.MouseEvent<HTMLInputElement>) => void;
  DefaultValue?: any;
  RightSwipeEvent?: boolean;
  VirtualDropdownHeight?: number;
  DropdownDisabled?: boolean;
  DropdownTitle?: string;
  [key: string]: any;
  Required?: boolean;
  RequiredMessage?: string;
  DropdownId?: string;
  NativeActionValue?: number;
  ShowHideFooter?: number;
  CallBackTimeCount?: number;
  IsFullLenght?: boolean;
  TabIndex?: number;
  SearchAutoFocus?: boolean
  AutoFocus?: boolean;
  FocusBorder?: boolean;
  VagaroToolkit?: Number;
  ShowRequiredFieldMark?: boolean;
  SetDefault?: boolean;
  AddOptionButtonText?: React.ReactNode;
  InfoTooltipMessage?: string;
  BeakPosition?: 'Left' | 'Middle' | 'Right';
  Loading?: boolean;
  RecordsPerPage?: number;
  SelectedIds?: (number | string)[];
  OpenFromBody?: boolean;
  SetBottomSheetDropdown?: boolean;
  OnClickOutside?: (e: React.MouseEvent) => void;
  OnValidation?: (isValid: boolean, errorMessage: string) => void;
  CloseCallback?: () => void;
  ClearSelection?: boolean;
}

interface DropdownOption {
  value: string | number;
  label: string | JSX.Element;
  key?: string;
}

interface DropdownGroup {
  label: string;
  options: DropdownOption[];
}

interface VgDropdownRef {
  validate: () => any;
  closeDropdown: () => any;
}


interface Option {
  label: string;
  value: string;
  groupFlag?: boolean;
  isGroupOptions?: boolean | null;
}

interface SelectProps {
  value: Option[];
  placeholder: string;
}

interface Props {
  selectProps: SelectProps;
}
 const VgDropdown: React.FC<VgDropdownProps> = forwardRef<
  VgDropdownRef,
  VgDropdownProps
>(
  (
    {
      Virtualization = false,
      ApiUrl = "",
      OpenFromBody = false,
      DropdownPlaceholder = "",
      Multi = false,
      Expanded = false,
      ShowCheckBoxInGroup = false,
      ChildCheckbox = false,
      GroupOptions = false,
      OpenDropdown = false,
      Searchable = false,
      SearchPlaceholder = "",
      ShowSelectAllSelectNone = true,
      CloseFromOutSide = false,
      DropdownClosed,
      SetCustomPlaceholder = false,
      CustomPlaceholderName = "Selected",
      MenuPlacement = "auto",
      DropdownName = "",
      DropdownClosingName = "",
      IsSelect2OpenCallback = false,
      Select2OpenCallback,
      ShowCustomMessage = "No results found. Please try another search.",
      onChange,
      OnSearchForApi,
      OnScrollPagination,
      OnOptionButtonClick,
      DefaultValue = [],
      RightSwipeEvent = false,
      VirtualDropdownHeight = 500,
      SearchAutoFocus= false,
      ClassNamePrefix = "vg-select2-dropdown",
      CustomClassNamePrefix = 'custom-class',
      DropdownDisabled = false,
      DropdownTitle = "",
      Required = false,
      RequiredMessage = "This field is required",
      DropdownId = "",
      NativeActionValue = 0,
      ShowHideFooter = 0,
      CallBackTimeCount = 0,
      IsFullLenght = false,
      TabIndex = 0,
      AutoFocus = true,
      FocusBorder,
      VagaroToolkit = 0,
      ShowRequiredFieldMark = false,
      SetDefault,
      AddOptionButtonText,
      InfoTooltipMessage = false,
      BeakPosition = "Middle",
      ScrollPagination = false,
      RecordsPerPage = 10,
      ApiRequestParams = {},
      DropdownData = [],
      SelectedIds,
      SetBottomSheetDropdown,
      OnClickOutside,
      OnValidation,
      CloseCallback,
      ClearSelection = false
    },
    ref
  ) => {
    const [resetvalue, Setresetvalue] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<any>(DefaultValue ?? []);
    const [isDefaultSelected, setDefaultSelected] = useState<any>(DefaultValue ?? []);
    const [isOpen, setIsOpen] = useState<boolean>(OpenDropdown);
    const [inputValue, setInputValue] = useState<string>("");
    const [isApplyOrNot, setIsApplyOrNot] = useState<any>();
    const [isStoreForBack, setIsStoreForBack] = useState<any>();  
    const [hasSelected, setHasSelected] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [filteredDropdownOptions, setFilteredDropdownOptions] = useState([]);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listRef = useRef<any>(null);
    const prevDefaultValueRef = useRef<any>(null);

    // Add this new state to track if all filtered items are selected
    const [allFilteredSelected, setAllFilteredSelected] = useState(false);
    const [hideDropdown , setHideDropdown] = useState(false);
    const isAndroidiOSPro = utils.CheckIsFromProAppWithoutState();
    const isAndroidiOSProWithTablet =
      utils.CheckIsFromIpadAndroidTabWithoutParm();
    const isPaydesk = utils.CheckIsFromPaydeskWithoutParm();

    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
    const [selectedChildValue, setSelectedChildValue] = useState<string>('');

    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(
      DefaultValue?.map((item: any) => item.value) ?? []
    );
    const [isGrouped, setIsGrouped] = useState(false);
    const [totalCount,setTotalCount] = useState()

    const [dropdownType, setDropdownType] = useState<string[]>([]);

    const [virtualizationOptions, setVirtualizationOptions] = useState(false);

    const [optionsFilter, setOptionsFilter] = useState([]);
    // Enhanced state to track paginated data across dropdown sessions
    const [dropdownPaginatedData, setDropdownPaginatedData] = useState<{
      items: any[];
      lastPage: number;
      selected: any[];
    }>({
      items: [],
      lastPage: 1,
      selected: DefaultValue ?? [],
    });
    const [dropdownData, setDropdownData] = useState<any>(DropdownData ?? []);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState("");
    const debouncedSearch = useDebounceValue(inputValue, 500);
    const [selectionState, setSelectionState] = useState({
      selectAll: false,
      selectedValues: [],
      unselectedValues: [],
    });
    const [IsSelectNone, setIsSelectNone] = useState<any>(null);
    const [lastSelectedPage, setLastSelectedPage] = useState(1);
    const [isInitialPageLoad, setIsInitialPageLoad] = useState(false);


    useEffect(() => {
      if (DropdownData.length > 0) {
        setDropdownData(DropdownData)
      }
    }, [DropdownData])

    const differentiateDropdownData = () => {
      const result = dropdownData?.map((item: any) => {
        if (item.hasOwnProperty("options")) {
          setIsGrouped(true);
          return "Group";
        } else if (item.hasOwnProperty("value") && item.hasOwnProperty("label")) {
          setIsGrouped(false);
          return "Option";
        } else {
          return "Unknown Dropdown Type";
        }
      });
      setDropdownType(result);
    };

    React.useEffect(() => {
      differentiateDropdownData();
    }, [dropdownData]);

    const loadData = async () => {
      try {
        setIsDataLoading(true);
      
        const result = await SetDropdowndata({
          isOpen,
          method: ApiRequestParams?.method,
          body: ApiRequestParams?.body,
          page,
          searchTerm: inputValue,
          apiUrl: ApiUrl,
          scrollPagination: ScrollPagination,
          recordsPerPage: RecordsPerPage,
          parentIdKey: ApiRequestParams?.parentIdKey,
          parentTitleKey: ApiRequestParams?.parentTitleKey,
          dataKey: ApiRequestParams?.dataKey,
          totalCountKey: ApiRequestParams?.totalCountKey,
          responseType: ApiRequestParams?.responseType,
          nestedChildObject: ApiRequestParams?.nestedChildObject,
          parentIdentifier: ApiRequestParams?.parentIdentifier,
          childIdKey: ApiRequestParams?.childIdKey,
          childTitleKey: ApiRequestParams?.childTitleKey,
          parentChildRelationshipName: ApiRequestParams?.parentChildRelationshipName,
          headers: ApiRequestParams?.headers
        });

        if (result) {
          setTotalCount(result.totalcountData);
          // If first page or new search, replace all; otherwise, merge pages
          if (page === 1 && isInitialPageLoad) {
            setDropdownData(result.formattedData);
            if (dropdownPaginatedData.items.length === 0) {
              setDropdownPaginatedData((prev) => ({
                ...prev,
                items: Array.isArray(result.formattedData)
                  ? result.formattedData
                  : [],
              }));
            } else {
              setDropdownPaginatedData((prev) => ({
                ...prev,
                items: Array.isArray(result.formattedData)
                  ? [...prev.items, ...result.formattedData]
                  : prev.items,
              }));

            }
            if(!resetvalue){
              setIsInitialPageLoad(false);
            }
          } else {
            // Merge with existing data for pagination
            setDropdownData((prev: DropdownGroup[]) => {
              // get all previous (already loaded pages) in state
              const stateItems = Array.isArray(dropdownPaginatedData.items)
                ? dropdownPaginatedData.items
                : [];
              const apiItems = Array.isArray(result.formattedData)
                ? result.formattedData
                : [];
              const merged = [
                ...stateItems,
                ...apiItems?.filter(
                  (item) =>
                    !stateItems?.some(
                      (prevItem) =>
                        JSON.stringify(prevItem.value) ===
                        JSON.stringify(item.value)
                      // If it's a group, you can enhance equality as needed
                    )
                ),
              ];
              // Update paginated state with merged data
              setDropdownPaginatedData((old) => ({
                ...old,
                items: merged,
                lastPage: page,
                selected:
                  selectedOptions?.length > 0
                    ? [...selectedOptions]
                    : Array.isArray(old.selected) ? [...old.selected] : [],
              }));

              return merged;
            });
          }
          setHasMore(result.hasMore);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load dropdown options");
        setDropdownData([]);
        setDropdownPaginatedData({
          items: [],
          lastPage: 1,
          selected: [],
        });
        setHasMore(false);
      } finally {
        setIsDataLoading(false);
      }
    };

    useEffect(() => {
      if (isOpen && debouncedSearch === inputValue) {
        handleSearchForAPI()
      }
    }, [debouncedSearch])

    const handleSearchForAPI = async () => {
      const searchValue = debouncedSearch.toLowerCase();
      const previousSelections = selectedOptions;
      const isSearchActive = searchValue.length > 0;

      // Split the search input into individual words and filter out empty strings
      const searchWords = searchValue.split(/\s+/)?.filter((word: string) => word.length > 0);

      // Smart filter function that checks if words start with search terms
      const smartFilter = (item: any) => {        
        // Handle both grouped and non-grouped options
        const label = item.label?.toLowerCase() || "";
        const wordsInLabel = label.split(/\s+/)?.filter((word: string) => word.length > 0);
                
        if (!label || searchWords.length === 0) return false;

        // First check for direct substring match (single-word shortcut)
        if (searchWords.length === 1 && label.includes(searchWords[0])) {
          return true;
        }

        // Check if all search words are present in the label, in any order
        return searchWords.every((searchWord: string) =>
          wordsInLabel?.some((labelWord: string) =>
            // Match both word starts and contained substrings
            labelWord.startsWith(searchWord) || labelWord.includes(searchWord) 
          )
        );
      };
      
      // Trigger API call only if OnSearchForApi is true
      if (ApiUrl) {
        if (ApiUrl && searchValue.length > 0) {
          setPage(1); // Only reset to page 1 if there is a search value
        }
        try {
          setIsDataLoading(true);

          // Call API only if searchValue has 3 or more characters or is empty
          if (searchValue.length >= 3) {
            const result = await SetDropdowndata({
              page: 1,
              searchTerm: searchValue,
              apiUrl: ApiUrl,
              method: ApiRequestParams?.method, // Set method to POST
              body: ApiRequestParams?.body,
              scrollPagination: ScrollPagination,
              recordsPerPage: RecordsPerPage,
              dataKey: ApiRequestParams?.dataKey,
              totalCountKey: ApiRequestParams?.totalCountKey,
              parentIdKey: ApiRequestParams?.parentIdKey,
              parentTitleKey: ApiRequestParams?.parentTitleKey,
              responseType: ApiRequestParams?.responseType,
              nestedChildObject: ApiRequestParams?.nestedChildObject,
              parentIdentifier: ApiRequestParams?.parentIdentifier,
              childIdKey: ApiRequestParams?.childIdKey,
              childTitleKey: ApiRequestParams?.childTitleKey,
              parentChildRelationshipName: ApiRequestParams?.parentChildRelationshipName,
              headers: {
                ...ApiRequestParams?.headers,
                'Content-Type': 'application/json'
              }
            });

            if (result) {
              setDropdownData(result.formattedData);
              setHasMore(result.hasMore);

              if(selectedAll) {
                
                const existingSelections = new Map(
                  selectedOptions?.map((option: any) => [option.value, option])
                );
                
                // Filter out duplicates from new data
                const newOptions = result.formattedData?.filter(
                  (option: any) => !existingSelections.has(option.value)
                );
            
                // Create merged array maintaining existing order
                const mergedOptions = [...selectedOptions, ...(newOptions || [])];
                
                setSelectedOptions(mergedOptions);
                setSelectedValues(mergedOptions?.map((option: any) => option.value));            
              }
              
              if (OnSearchForApi) {
                OnSearchForApi({ searchValue: searchValue, search: isSearchActive });
              }
            }
          }
        } catch (error) {
          console.error("Error searching users:", error);
          setError("Failed to search users");
        } finally {
          setIsDataLoading(false);
        }
      } else {
    
        if (Virtualization) {
          const filtered = optionsFilter?.filter((item: any) => {
            if (item.isGroupOptions) {
              return (
                smartFilter(item) ||
                item.childs?.some((child: any) => smartFilter(child))
              );
            }
            return smartFilter(item);
          });
          setFilteredDropdownOptions(filtered);
        } else {
          // Handle different data structures when Virtualization is false
          const filtered = dropdownData?.map((item: any) => {
            // Case 1: Simple array of options
            if (item.value !== undefined && item.label !== undefined) {
              return smartFilter(item) ? item : null;
            }

            // Case 2: Group with options array
            if (item.options) {
              const filteredOptions = item.options?.filter((option: any) =>
                smartFilter(option)
              );

              return filteredOptions.length > 0
                ? {
                    ...item, options: filteredOptions,
                  }
                : smartFilter(item)
                    ? item
                    : null;
            }

            // Case 3: Simple key-value pair without options
            if (item.label && item.value) {
              return smartFilter(item) ? item : null;
            }

            return null;
          })?.filter(Boolean); // Remove null entries

          setFilteredDropdownOptions(filtered);
        }

        // OnSearchForApi for local search
        if (OnSearchForApi) {
          OnSearchForApi({ searchValue: searchValue, search: isSearchActive });
        }
      }

      // If search is cleared
      if (!searchValue) {
        const combinedSelections = [
          ...new Map(
            [...previousSelections, ...selectedOptions]?.map((item) => [item.value, item])
          ).values(),
        ];

        setSelectedOptions(combinedSelections);
        setSelectedValues(combinedSelections?.map((option: any) => option.value));
        setIsApplyOrNot(combinedSelections);
        setIsStoreForBack(combinedSelections);
        SelectOnChangeCallback(combinedSelections);
        setFilteredDropdownOptions(optionsFilter);

        setSelectionState((prevState: any) => {
          return {
            ...prevState,
            selectAll: prevState.selectAll,
            selectedValues: prevState.selectedValues,
            unselectedValues: prevState.unselectedValues,
          };
        });

        // Reset search results by fetching initial data
        if (ApiUrl) {
          const result = await SetDropdowndata({
            page: !inputValue ? 1 : lastSelectedPage, // Reset to lastSelectedPage when search is cleared
            searchTerm: "",
            apiUrl: ApiUrl,
            method: ApiRequestParams?.method,
            body: ApiRequestParams?.body,
            scrollPagination: ScrollPagination,
            recordsPerPage: RecordsPerPage,
            parentIdKey: ApiRequestParams?.parentIdKey,
            dataKey: ApiRequestParams?.dataKey,
            totalCountKey: ApiRequestParams?.totalCountKey,
            parentTitleKey: ApiRequestParams?.parentTitleKey,
            responseType: ApiRequestParams?.responseType,
            nestedChildObject: ApiRequestParams?.nestedChildObject,
            parentIdentifier: ApiRequestParams?.parentIdentifier,
            childIdKey: ApiRequestParams?.childIdKey,
            childTitleKey: ApiRequestParams?.childTitleKey,
            parentChildRelationshipName: ApiRequestParams?.parentChildRelationshipName,
            headers: ApiRequestParams?.headers
          });

          if (result) {
            setDropdownData(result.formattedData);
            setHasMore(result.hasMore);

            if (OnSearchForApi) {
              OnSearchForApi({ searchValue: "", search: false });
            }
          }
        } else {
          setDropdownData(DropdownData);
        }
      }
    };

    useEffect(() => {
      if (isOpen && debouncedSearch === inputValue && ApiUrl) {
        if (inputValue && inputValue.length > 0) {
          handleSearchForAPI();
        }
      }
    }, [debouncedSearch, isOpen]);

    // Effect to handle search term changes - reset pagination state
    useEffect(() => {
      if (inputValue?.trim().length > 0) {
        setDropdownPaginatedData({
          items: [],
          lastPage: 1,
          selected: selectedOptions?.length > 0 ? [...selectedOptions] : [],
        });
      }
    }, [inputValue]);

    // Effect to load data when needed
    useEffect(() => {
      if (debouncedSearch !== inputValue) return;
      if (hasMore && ApiUrl && dropdownPaginatedData.items.length === 0) {
        loadData();
      }
    }, [isOpen, page, ScrollPagination, ApiUrl, RecordsPerPage, DefaultValue]);

    useEffect(() => {
      if (debouncedSearch !== inputValue) return;
      if (hasMore && ApiUrl) {
        loadData();
      }
    }, [hasMore,page, ScrollPagination, ApiUrl, RecordsPerPage]);
    
    useEffect(() => {
      if (!ApiUrl && Array.isArray(DropdownData) && DropdownData.length > 0) {
        // Compare by length and values/ids instead of full objects
        const currentIds = dropdownData.map((item: DropdownOption) => item.value);
        const newIds = DropdownData.map(item => item.value);
        const isSame = currentIds.length === newIds.length &&
          currentIds.every((id: any, index: any) => id === newIds[index]);
        if (!isSame) {
          setDropdownData([...DropdownData]);
        }
      }
    }, [isOpen, dropdownData, ApiUrl, DropdownData]);

    // // trigger `onChange` only when selectionState actually changes
    // useEffect(() => {
    //   // if (isOpen && onChange) {
    //   if (onChange) {
    //     onChange({ selectedOptions: selectedOptions, selectionState });
    //   }
    // }, [selectionState]);

    const isFirstRender = useRef(true);
    const prevSelectedOptions = useRef(selectedOptions);
 
    // trigger `onChange` only when selectionState actually changes
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        prevSelectedOptions.current = selectedOptions;
        return;
      } 
 
      if (onChange && JSON.stringify(
        utils?.safeClone(prevSelectedOptions.current)) !== JSON.stringify(utils?.safeClone(selectedOptions)
      )) {
        onChange({ selectedOptions: selectedOptions, selectionState });
        prevSelectedOptions.current = selectedOptions;
      }
    }, [selectedOptions, selectionState, onChange]);

    // Update selectedOptions and selectedValues when SelectedIds changes
    useEffect(() => {
      // Only run this effect when SelectedIds changes (not on every re-render)
      if (!SelectedIds || SelectedIds.length === 0 || Multi === false) return; // Exit early if there are no selected IDs

      if (SelectedIds && SelectedIds.length > 0) {
        const allOptions = getAllOptions(dropdownData); // Use the existing helper function to get all selectable options

        
        // Check if -1 is in SelectedIds to select all options
        if (SelectedIds.includes(-1) && selectionState.unselectedValues.length === 0 && !IsSelectNone) {

          if (JSON.stringify(selectedOptions) === JSON.stringify(allOptions)) {
            console.log("Skipping update: All options are already selected.");
            return;
          }

          setSelectedOptions(allOptions);
          setSelectedValues(allOptions?.map((option: any) => option.value));
          setSelectionState({
            selectAll: true,
            selectedValues: [],
            unselectedValues: [],
          });
        } else {
  
          let filteredOptions = [];
    
          if (SelectedIds.includes(-1)) {
            filteredOptions = dropdownData?.filter(
              (data: any) => !((selectionState.unselectedValues as string[]) || []).includes(data.value)
            );
          } else {
              const  filter = dropdownData?.filter(
                (data: any) => SelectedIds.includes(data.value) && 
                !((selectionState.unselectedValues as string[]) || []).includes(data.value)
              )
              const newSelectdId = (selectionState.selectedValues)?.filter(
                (data: any) => !((selectionState.unselectedValues as string[]) || []).includes(data.value)
              );
              filteredOptions = [...newSelectdId, ...filter ]
              // setSelectedOptions(filteredOptions)
              setSelectedValues(filteredOptions?.map((option: any) => option.value))
          }
          if (selectionState.selectAll || (selectionState.selectedValues.length > 0 && !ScrollPagination)) {
            setSelectedOptions(filteredOptions);
            setSelectedValues(filteredOptions?.map((option: any) => option.value));
          } else {
            if(IsSelectNone) {
              setSelectedOptions(selectionState.selectedValues);
              setSelectedValues(selectionState.selectedValues?.map((option: any) => option.value));
            } else {
            const preSelectedOptions = allOptions?.filter((option: any) =>
              SelectedIds.includes(option.value)
            );
    
            setSelectedOptions(preSelectedOptions);
            setSelectedValues(preSelectedOptions?.map((option: any) => option.value));
          }
          }
        }
      }
    }, [dropdownData]);

    // Update scroll handler to prevent unnecessary fetches
    const handleScrollPagination = async (e: React.UIEvent<HTMLDivElement>) => {
      e.preventDefault(); // Prevent default behavior

      const target = e.target as HTMLDivElement;
      const { scrollTop, scrollHeight, clientHeight } = target;

      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

      // Adjust threshold for iOS
      const threshold = isIOS ? 20 : 1; // More forgiving on iOS

      // Only fetch more if we're near the bottom and not already loading
      if (
        !isDataLoading &&
        hasMore &&
        scrollHeight - scrollTop <= clientHeight + threshold // 100px threshold
      ) {
        if (dropdownPaginatedData.items.length === totalCount) return; // Exit early if all data is already loaded

        if (dropdownPaginatedData.items.length !== totalCount) {
          // Use paginated state to track next page
          setPage(page + 1);

          // Handle automatic selection of new records when Select All is active
          if (ScrollPagination && selectionState?.selectAll && !IsSelectNone) {
            const allOptions = dropdownPaginatedData.items as DropdownOption[];
            // Filter out options that are in unselectedValues
            const unselectedSet = new Set<string | number>(
              selectionState.unselectedValues
            );
            const newSelections = allOptions?.filter(
              (opt: DropdownOption) => !unselectedSet.has(opt.value)
            );

            // Update selections
            setSelectedOptions(newSelections);
            setSelectedValues(newSelections?.map((option: any) => option.value));
            setIsApplyOrNot(newSelections);
            setIsStoreForBack(newSelections);

            // Notify about the change
            SelectOnChangeCallback(newSelections);
            if (Multi) {
              setIsOpen(true);
            }
          }
        }
      }

      if (OnScrollPagination) {
        OnScrollPagination(e);
      }
    };

    const processDropdownData = (data: any, isLargeGroup: boolean) => {
      if (!data || !Array.isArray(data)) return [];

      if (isLargeGroup) {
        let processed: any = [];
        data.forEach((element) => {
          if (element.options !== undefined && element.options !== null) {
            processed.push({
              ...element,
              label: element.label,
              value: element.label,
              options: [],
              isGroupOptions: true,
              childs: element.options,
              groupId: element?.label,
            });

            element.options.forEach((option: any) => {
              processed.push({
                label: option.label,
                value: option.value,
                isGroupOptions: false,
                groupId: element?.label,
                ...option,
              });
            });
          } else {
            processed.push(element);
          }
        });
        return processed;
      } else {
        return data?.map((item) => {
          if (item.options) {
            return {
              ...item,
              isGroupOptions: true,
              childs: item.options,
              groupId: item?.label,
              value: item?.label,
            };
          }
          return item;
        });
      }
    };

    useEffect(() => {
      const processed = processDropdownData(dropdownData, Virtualization);
      setOptionsFilter(processed);
      setFilteredDropdownOptions(processed);

      if (!Virtualization) {
        setVirtualizationOptions(true);
      } else {
        setVirtualizationOptions(false);
      }
    }, [dropdownData, Virtualization]);

    const toggleExpand = (groupId: string) => {
      setExpandedGroups((prevState: any) => ({
        ...prevState,
        [groupId]: !prevState[groupId],
      }));
    };

    const deepEqual = (obj1: any, obj2: any): boolean => {
      // If both references point to the same object, they are equal
      if (obj1 === obj2) return true;

      // If either value is not an object or is null, they can't be deeply equal
      if (
        typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 == null || 
        obj2 == null
      ) {
        return false;
      }

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      // If number of keys don't match, the objects aren't equal
      if (keys1.length !== keys2.length) return false;

      // Compare each key and corresponding value recursively
      for (const key of keys1) {
        // If a key in obj1 doesn't exist in obj2, objects aren't equal
        if (!keys2.includes(key)) return false;

        const val1 = obj1[key];
        const val2 = obj2[key];

        //  If both values are objects, recurse into them
        if (typeof val1 === "object" && typeof val2 === "object") {
          // Recursively compare nested objects/arrays
          if (!deepEqual(val1, val2)) return false;
        } else {
          //  If one or both are primitives, do a direct comparison
          // This avoids issues where values look the same but aren't (e.g., '1' vs 1)
          if (val1 !== val2) return false;
        }
      }

      // 🔍 All checks passed: objects are deeply equal
      return true;
    };

    useEffect(() => {
      const currentDefaultValue = DefaultValue ?? [];

      if (!deepEqual(prevDefaultValueRef.current, currentDefaultValue)) {
        setSelectedOptions(currentDefaultValue);
        prevDefaultValueRef.current = currentDefaultValue;
      }
    }, [DefaultValue]);

    const IsArrayOrObject = (value: any) => {
      if (Array.isArray(value)) {
        return "Array";
      } else if (value !== null && typeof value === "object") {
        return "Object";
      }
    };

    // const handleBlur = () => {
    //   let isValid: boolean;
    //   if (Required === true) {
    //     if (selectedOptions.length > 0 || selectionState.unselectedValues.length > 0 ) {
    //       setHasSelected(false);
    //       return true;
    //     } else {
    //       setHasSelected(true);
    //       return false;
    //     }
    //   } else {
    //     setHasSelected(false);
    //     if (OnValidation) {
    //       OnValidation(isValid, isValid ? undefined : "This field is required");
    //     }
    //     return true;
    //   }
      
    // };

    const handleBlur = () => {
      let isValid: boolean;

      if (Required === true) {
        isValid =
          selectedOptions?.length > 0 ||
          selectionState.unselectedValues.length > 0;
        setHasSelected(!isValid);
      } else {
        isValid = true;
        setHasSelected(false);
      }

      if (OnValidation) {
        OnValidation(isValid, isValid ? "" : "This field is required");
      }

      return isValid;
    };

    useEffect(() => {
      if(SetBottomSheetDropdown && OpenFromBody === true && isOpen && isAndroidiOSPro) {
        document.querySelector("body")?.classList.add("vg-dropdown-body-portal");
      } else {
        document.querySelector("body")?.classList.remove("vg-dropdown-body-portal");
      }

      if(SetBottomSheetDropdown && OpenFromBody === false && isOpen && isAndroidiOSPro) {
        document.querySelector("body")?.classList.add("vg-select-bottomsheet-parent");
      } else {
        document.querySelector("body")?.classList.remove("vg-select-bottomsheet-parent");
      }


      if (isOpen) {
        document.querySelector("body")?.classList.add("selectControlOpen");
        document.querySelector("html")?.classList.add("selectControlOpen");

      } else {
        document.querySelector("body")?.classList.remove("selectControlOpen");
        document.querySelector("html")?.classList.remove("selectControlOpen");
      }

      if (isAndroidiOSPro) {
        return;
      }

       const handleClickOutside = (event: any) => {
        if (
          isOpen &&
          containerRef.current &&
          !containerRef.current.contains(event.target) &&
          !event.target.closest(".vg-select-virtualiz") &&
          !event.target.closest(".cmn-select-dropdown")
        ) {
          // Setresetvalue(false);
          setIsOpen(false);
          if(isAndroidiOSPro && CloseCallback){
            CloseCallback();
          }
        }

        if (CloseFromOutSide) {
          if (DropdownClosed !== undefined) {
            DropdownClosed();
          }
        }
        
        if (OnClickOutside) {
          OnClickOutside({event, isClickOutside: true});
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        document.querySelector("body")?.classList.add("selectControlOpen");
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
        document.querySelector("body")?.classList.remove("selectControlOpen");
        if (isTouched) handleBlur();
      }


      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const Select2CloseHeaderCallback = () => {
      if (isAndroidiOSPro) {
        if (CloseCallback) {
          CloseCallback();
        }
      }

      if (IsSelect2OpenCallback) {
        if (Select2OpenCallback !== undefined) {
          Select2OpenCallback();
        }
      }
    };

    const Select2OpenHeaderCallback = () => {
      if (isAndroidiOSPro) {
        var obj: any = {
          NativeAction: NativeActionValue,
          Footer: ShowHideFooter,
          callFromLocation: DropdownId,
          IsFullLength: IsFullLenght,
          VagaroToolkit: VagaroToolkit,
        };

        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;
        messageObj.screenTitle = DropdownTitle;
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "53|~|" + JSON.stringify(obj);

        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }

      if (IsSelect2OpenCallback) {
        if (Select2OpenCallback !== undefined) {
          Select2OpenCallback();
        }
      }
    };

    const IsCheckNativeDevices = () => {
      if (
        isAndroidiOSPro === true ||
        isAndroidiOSProWithTablet === true ||
        isPaydesk === true
      ) {
        return true;
      } else {
        return false;
      }
    };

    const CloseDropdown = () => {
      if (isOpen === true) {
        setIsOpen(false);
        setDefaultSelected(isStoreForBack);
        setSelectedOptions(isStoreForBack);

        // Update paginated data with current selection before closing
        setDropdownPaginatedData((old) => ({
          ...old,
          selected: isStoreForBack || [],
        }));

        if (selectedOptions?.length > 0) {
          const allOptions = getAllOptions(dropdownData);
          const selectedIndex = allOptions.findIndex(
            (opt: any) => opt.value === selectedOptions[0]?.value
          );
          if (lastSelectedPage === 1) {
            const pageIndex = Math.floor(selectedIndex / RecordsPerPage) + 1;
            setLastSelectedPage(pageIndex);
          }
        }
        Select2CloseHeaderCallback();
      }
    };

    const OpenSelect2 = () => {
      setIsInitialPageLoad(true);
      setIsOpen(!isOpen);
      Select2OpenHeaderCallback();
      setIsTouched(!isOpen);
      // 4. RESTORE SELECTIONS FROM STATE IF ANY
      if (
        dropdownPaginatedData.selected &&
        dropdownPaginatedData.selected.length > 0
      ) {
        // setSelectedOptions([...dropdownPaginatedData.selected]);
        setSelectedValues(
          dropdownPaginatedData.selected?.map((opt: any) => opt.value)
        );
      }

      if (
        dropdownPaginatedData.items &&
        dropdownPaginatedData.items.length > 0
      ) {
        setDropdownData([...dropdownPaginatedData.items]);
      }
    };

    const SelectOnChangeCallback = (data: any, newCloseMenuValue?: any) => {
      // if (onChange !== undefined) {
      //   onChange({ selectedOptions: data, selectionState });
      // }

        // if (onChange !== undefined) {
        //   onChange({ selectedOptions: data, selectionState });
        // }

      if (data) {
        setHasSelected(false);
      } else {
        setHasSelected(true);
      }

      if (inputValue) {
        setSelectionState((prevState: any) => {
          const newSelectedValues = new Set(prevState.selectedValues);
          const newUnselectedValues = new Set(prevState.unselectedValues);
          
          // Get current selection as a Set for efficient lookup
          const currentSelectionValues = new Set(data?.map((opt: any) => opt.value));
          
          // Get all filtered options
          const filteredOptions = getFilteredValues((option: any) => true);
          
          filteredOptions.forEach((value: string) => {
            if (currentSelectionValues.has(value)) {
              if (prevState.selectAll) {
                // For selectAll, just remove from unselectedValues when selected
                newUnselectedValues.delete(value);
              } else {
                // For non-selectAll, add to selectedValues and remove from unselectedValues
                newSelectedValues.add(value);
                newUnselectedValues.delete(value);
              }
            } else {
              if (prevState.selectAll) {
                // For selectAll, add to unselectedValues when not selected
                newUnselectedValues.add(value);
              } else if (prevState.selectedValues.includes(value)) {
                // For non-selectAll, move from selectedValues to unselectedValues
                newSelectedValues.delete(value);
                newUnselectedValues.add(value);
              }
            }
          })  

          return {
            ...prevState,
            selectAll: prevState.selectAll,
            selectedValues: Array.from(newSelectedValues),
            unselectedValues: Array.from(newUnselectedValues)
          };
        });
      } else {

      // Case 1 & 2: When SelectAll is true, track unselected items
      if (selectionState?.selectAll) {
        // Get values that are NOT in the current selection
        const unselectedValues = getFilteredValues(
          (option: any) => !data?.some((selected: any) => selected.value === option.value)
        );
        
        setSelectionState((prevState: any) => {
          // Convert to Set for efficient operations
          const newUnselectedValues = new Set(prevState.unselectedValues);
          
          // Add all newly unselected values
          unselectedValues.forEach((val) => newUnselectedValues.add(val));
          
          // Remove any values that are now selected
          data.forEach((selected: any) => {
            if (newUnselectedValues.has(selected.value)) {
              newUnselectedValues.delete(selected.value);
            }
          });
          
          return {
            ...prevState,
            selectAll: true,
            unselectedValues: Array.from(newUnselectedValues),
            selectedValues: [], // Keep empty when selectAll is true
          };
        });
      }else if (SelectedIds?.length > 0) {
        const selectedValues = data;
      
        const unselectedValues = getFilteredValues(
          (option: any) => !data?.some((selected: any) => selected.value === option.value)
        );
      
        setSelectionState({
          selectAll: false,
          selectedValues: selectedValues as any,  // Store selected values
          unselectedValues: unselectedValues as any,  // Store unselected values
        });
      }
      // Case 3 & 4: When SelectAll is false, track selected items
      else {
        // Get values that ARE in the current selection
        const selectedValues = getFilteredValues(
          (option: any) => data?.some((selected: any) => selected.value === option.value)
        );
        
        setSelectionState((prevState: any) => {
          // Convert to Set for efficient operations
          const newSelectedValues = new Set(prevState.selectedValues);
          
          // Add all newly selected values
          selectedValues.forEach((val) => newSelectedValues.add(val));
          
          // Remove any values that are now unselected
          const currentSelectionValues = new Set(data?.map((opt: any) => opt.value));
          prevState.selectedValues.forEach((val: string) => {
            if (!currentSelectionValues.has(val)) {
              newSelectedValues.delete(val);
            }
          });
          
          return {
            ...prevState,
            selectAll: false,
            selectedValues: Array.from(newSelectedValues),
            unselectedValues: [], // Keep empty when selectAll is false
          };
        });
      }
      }
      //changes by AP 05/01/2025
      if (data && data.length > 0) {
        // Find the index of the first selected option in the full data
        const allOptions = getAllOptions(dropdownData);
        const selectedIndex = allOptions.findIndex(
          (opt: any) => opt.value === data[0].value
        );
        if (lastSelectedPage === 1) {
          const pageIndex = Math.floor(selectedIndex / RecordsPerPage) + 1;
          setLastSelectedPage(pageIndex);
        }
      }
      //chnages end by AP
    };

    // Helper function to get all selectable options from the data
    const getAllOptions = (data: any) => {
      if (!Array.isArray(data)) return [];
      let allOptions: any = [];

      if (Virtualization) {
        // For large group format, gather all options including nested ones
        data.forEach((element: any) => {
          if (element.options || element.childs) {
            const childOptions = element.options || element.childs;
            allOptions = [...allOptions, ...childOptions];
          } else {
            allOptions.push(element);
          }
        });
      } else {
        // For regular format
        let optionsWithoutGroup = data?.filter((d: any) => !d.options);
        let optionsWithGroup = data?.filter((d: any) => d.options).flatMap((group: any) => group.options);
        allOptions = [...optionsWithoutGroup, ...optionsWithGroup];
      }
      return allOptions;
    };

    const flattenedOptions: any = getAllOptions(inputValue ? filteredDropdownOptions : optionsFilter);

    // Helper function to determine selected/unselected values
    const getFilteredValues = (filterCondition: (option: any) => boolean): string[] => {
      if (!Array.isArray(flattenedOptions)) {
        console.error("flattenedOptions is not an array:", flattenedOptions);
        return [];
      }
      if (typeof filterCondition !== "function") {
        console.error("filterCondition is not a function:", filterCondition);
        return [];
      }

      return flattenedOptions?.filter(filterCondition)?.map((option: any) => option.value);
    };

    const SelectAll = (e: any) => {
      e.preventDefault(); // Prevent default behavior
      e.stopPropagation(); // Stop event propagation

      setSelectedAll(true);
      // Use filtered options if there's a search, otherwise use full dataset
      const optionsToProcess = (inputValue ? filteredDropdownOptions ?? [] : optionsFilter ?? []);
      const allOptions = getAllOptions(optionsToProcess);
      // Merge new selections with existing ones
      const existingSelections = new Set(selectedOptions?.map((opt: any) => opt.value));


      // Separate disabled and enabled options from the available options
      const disabledOptions = allOptions?.filter((opt: any) => opt.disable) ?? [];
      const enabledOptions = allOptions?.filter((opt: any) => !opt.disable) ?? [];

      // Get currently selected disabled options (these should remain exactly as they are)
      const currentlySelectedDisabled = selectedOptions?.filter((opt: any) =>
        opt.disable || disabledOptions.some((disabled: any) => disabled.value === opt.value)
      ) ?? [];

      // Get existing selections to avoid duplicates

      // Only get enabled options that aren't already selected
      const newEnabledSelections = enabledOptions?.filter((opt: any) => !existingSelections.has(opt.value)) ?? [];

      // Final selection: Keep disabled options + add new enabled options
      const combinedSelections = [
        ...currentlySelectedDisabled, // Preserve disabled options in their current state
        ...selectedOptions.filter((opt: any) => !opt.disable), // Keep existing enabled selections
        ...newEnabledSelections // Add only new enabled options that weren't already selected
      ];

      setSelectedOptions(combinedSelections);
      setSelectedValues(combinedSelections?.map((option: any) => option.value));
      setIsApplyOrNot(combinedSelections);
      setIsStoreForBack(combinedSelections);
      SelectOnChangeCallback(combinedSelections);

      // If we're selecting all filtered results, mark it
      if (inputValue) {
        setAllFilteredSelected(true);

        // Update state for "Select All"
        setSelectionState((prevState: any) => {
          const newSelectedValues = new Set(prevState.selectedValues);

          // Add newly unselected values
          const selectedValues = getFilteredValues(
            (option: any) => combinedSelections?.some((selected: any) => selected.value === option.value)
          );
          selectedValues.forEach((val) => newSelectedValues.add(val));

          return {
            ...prevState,
            selectAll: prevState.selectAll,
            unselectedValues: prevState.unselectedValues, // Convert back to array
            selectedValues: Array.from(newSelectedValues), // Keep empty when selectAll is true
          };
        });
      } else {
        // Update state for "Select All"
        setSelectionState({
          selectAll: true,
          selectedValues: [],
          unselectedValues: [],
        });
      }
    };

    const SelectNone = (e: any) => {
      e.preventDefault(); // Prevent default behavior
      e.stopPropagation(); // Stop event propagation
      setSelectedAll(false);
      setLastSelectedPage(1); // Reset to page 1 when selecting none
      if (selectionState?.selectAll) {
        setIsSelectNone(true);
      }
      // Helper function to check if an option is disabled
      const isOptionDisabled = (option: any) => {
        // Check if disabled by DefaultValue
        const isDisabledByDefault = DefaultValue?.some((defaultOption: any) =>
          defaultOption.value === option.value && defaultOption.disable === true
        );

        // Check if disabled by option's own disable property
        const isDisabledByProperty = option.disable === true;

        // Check if disabled in DropdownData
        const isDisabledInDropdownData = DropdownData?.some((dropdownOption: any) => {
          // Handle grouped options
          if (dropdownOption.options) {
            return dropdownOption.options.some((groupedOption: any) =>
              groupedOption.value === option.value && groupedOption.disable === true
            );
          }
          // Handle flat options
          return dropdownOption.value === option.value && dropdownOption.disable === true;
        });

        return isDisabledByProperty || isDisabledByDefault || isDisabledInDropdownData;
      };

      // Get all disabled options that are currently selected (these should be preserved)
      const disabledSelectedOptions = selectedOptions?.filter((option: any) =>
        isOptionDisabled(option)
      ) || [];

      // If search is cleared
      if (!inputValue) {
        // Only keep disabled options that were previously selected
        setSelectedOptions(disabledSelectedOptions);
        setSelectedValues(disabledSelectedOptions.map((option: any) => option.value));
        setDefaultSelected(disabledSelectedOptions);
        setIsApplyOrNot(disabledSelectedOptions);
        setIsStoreForBack(disabledSelectedOptions);
        SelectOnChangeCallback(disabledSelectedOptions);
        setAllFilteredSelected(false);

        // Reset state for "Select None"
        setSelectionState({
          selectAll: false,
          selectedValues: [],
          unselectedValues: [],
        });

        // Update paginated data with empty selection
        setDropdownPaginatedData((prev) => ({
          ...prev,
          selected: disabledSelectedOptions.map((option: any) => option.value),
        }));
      } else {
        // Get currently filtered options
        const filteredOptionsValues = filteredDropdownOptions.flatMap((item: any) => {
          if (item.options) {
            return item.options?.map((opt: any) => opt.value);
          }
          return item.value;
        });

        const filteredOptionsSet = new Set(filteredOptionsValues);

        // Keep selections that are either:
        // 1. Not in filtered results (outside current filter), OR
        // 2. Disabled options (should be preserved regardless of filter)
        const remainingSelections = selectedOptions?.filter((option: any) =>
          !filteredOptionsSet.has(option.value) || isOptionDisabled(option)
        );

        setSelectedOptions(remainingSelections);
        setSelectedValues(remainingSelections?.map((option: any) => option.value));
        setDefaultSelected(remainingSelections);
        setIsApplyOrNot(remainingSelections);
        setIsStoreForBack(remainingSelections);
        SelectOnChangeCallback(remainingSelections);
        setAllFilteredSelected(false);

        // Update state for "Select None"
        setSelectionState((prevState: any) => {
          const newUnSelectedValues = new Set(prevState.unselectedValues);

          // Add newly unselected values (excluding disabled options)
          const unSelectedValues = getFilteredValues(
            (option: any) =>
              !remainingSelections?.some((selected: any) => selected.value === option.value) &&
              !isOptionDisabled(option) // Don't add disabled options to unselected
          );
          unSelectedValues.forEach((val) => newUnSelectedValues.add(val));

          return {
            ...prevState,
            selectAll: prevState.selectAll,
            selectedValues: prevState.selectedValues, // Convert back to array
            unselectedValues: Array.from(newUnSelectedValues), // Keep empty when selectAll is false
          };
        });
      }
    };


    const SelectedApply = (e: any) => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault(); // Prevent default behavior
      }
    
      setIsStoreForBack(isApplyOrNot);
      
      // Don't call SetHideDropdown() directly here
      
      if (onChange !== undefined) {
        onChange(isApplyOrNot);
      }
    
      if (isAndroidiOSPro === true && Multi) {
        if (CloseFromOutSide) {
          if (DropdownClosed !== undefined) {
            DropdownClosed();
          }
        }
      }
      Select2CloseHeaderCallback();
      setHideDropdown(false);
      setIsOpen(false);
      if(isAndroidiOSPro && CloseCallback){
          CloseCallback();
      }
    };
    
    // Keep this function for other parts of your code that might need it
    const SetHideDropdown = () => {
      setHideDropdown(true);
      setTimeout(() => {
        Select2CloseHeaderCallback();
        setHideDropdown(false);
        setIsOpen(false);
        if(isAndroidiOSPro && CloseCallback){
          CloseCallback();
        }
      }, 500);
    }

    // useEffect(() => {
    //   if(!Multi && !isOpen) {
    //     setSelectionState({
    //       selectAll: false,
    //       selectedValues: [],
    //       unselectedValues: [],
    //     });
    //   }
    // },[Multi, selectedValues])

    const handleChildCheckboxChange = (child: any, checked: boolean, e: React.MouseEvent | React.ChangeEvent) => {
      e.stopPropagation();
      // Update selectedValues
      setSelectedValues((prev) => {
        if (checked) {
          return [...prev, child.value];
        } else {
          return prev?.filter((value) => value !== child.value);
        }
      });

      // Update selectedOptions
      const newSelectedOptions = checked
        ? Multi ? [...selectedOptions, child] : [child]
        : selectedOptions?.filter((option: any) => option.value !== child.value);

      handleOnChange(newSelectedOptions)
      setSelectedOptions(newSelectedOptions);
      SelectOnChangeCallback(newSelectedOptions);
      setIsApplyOrNot(newSelectedOptions);
    };

    const handleParentCheckboxChange = (parentOption: any, checked: boolean) => {
      const groupOptions = Virtualization ? parentOption.childs : parentOption.options;

      const enabledOptions = groupOptions?.filter((child: any) => {
        const isDisabledByDefault = DefaultValue?.some((defaultOption: any) =>
          defaultOption?.value === child?.value && defaultOption?.disable === true
        );
        const isChildDisabled = child.disable === true;
        return !isChildDisabled && !isDisabledByDefault;
      });

      if (!enabledOptions || enabledOptions.length === 0) {
        return; 
      }

      // Update selectedValues (only for enabled options)
      setSelectedValues(prevSelectedValues => {
        if (checked) {
          // Add all enabled child values that aren't already selected
          const enabledChildValues = enabledOptions?.map((child: any) => child.value);

          // Keep previously selected values and add new enabled values
          const newValues = [...new Set([...prevSelectedValues, ...enabledChildValues])];
          return newValues;
        } else {
          // Remove only enabled child values, keep disabled ones intact
          return prevSelectedValues?.filter(
            value => !enabledOptions?.some((child: any) => child.value === value)
          );
        }
      });

      // Update selectedOptions (only for enabled options)
      const newSelectedOptions = checked
        ? [
          // Keep all current selections that aren't in the enabled options
          ...selectedOptions?.filter((option: any) =>
            !enabledOptions?.some((child: any) => child.value === option.value)
          ),
          // Add all enabled options
          ...enabledOptions
        ]
        : selectedOptions?.filter((option: any) =>
          // Keep all options that aren't in the enabled options list
          !enabledOptions?.some((child: any) => child.value === option.value)
        );

      setSelectedOptions(newSelectedOptions);
      SelectOnChangeCallback(newSelectedOptions);
      setIsApplyOrNot(newSelectedOptions);
    };

    const handleOnChange = (options: any) => {
      setSelectedOptions(options);
      // Update paginated state with current selection
      setDropdownPaginatedData((old) => ({
        ...old,
        selected: options, // always keep up-to-date
      }));
      SelectOnChangeCallback(options);
      setIsApplyOrNot(options);

      if (options && options.length > 0) {
        // Find the index of the first selected option in the full data
        const allOptions = getAllOptions(dropdownData);
        const selectedIndex = allOptions.findIndex(
          (opt: any) => opt.value === options[0].value
        );
        if (lastSelectedPage === 1) {
          const pageIndex = Math.floor(selectedIndex / RecordsPerPage) + 1;
          setLastSelectedPage(pageIndex);
        }
      }

      if (Required === true) {
        if (options?.length > 0) {
          setHasSelected(false);
          return true;
        } else {
          setHasSelected(true);
          return false;
        }
      } else {
        setHasSelected(false);
        return true;
      }
    };

    const handleSearchChange = async (data: any) => {
      const searchValue = data.target.value.toLowerCase();
      setInputValue(searchValue);
      setPage(1); // Reset page when searching

     
      if (OnSearchForApi) {
        OnSearchForApi({ search: searchValue }); // Notify Product.jsx
      }
    };

    const CustomParentOption = (data: any, customProps: any) => {
      const groupLabel = data.data?.label || data.label;
      const groupOptions = Virtualization
        ? data.childs || []
        : data.data?.options || [];
    
      // Separate enabled and disabled options
      const enabledOptions = groupOptions?.filter((option: any) => !option.disable);
      // const disabledOptions = groupOptions?.filter((option: any) => option.disable);

      // Calculate selection state based on all options
      const enabledChildSelected = groupOptions?.some((option: any) =>
        selectedOptions?.some(
          (selectedOption: any) => selectedOption.value === option.value
        )
      );
    
      const allEnabledSelected = enabledOptions.length > 0 && enabledOptions.every((option: any) =>
        selectedOptions?.some(
          (selectedOption: any) => selectedOption.value === option.value
        )
      );
    
      const isExpanded = expandedGroups[groupLabel] || false;
    
      const handleGroupSelection = (e: React.MouseEvent) => {
        if (!Multi && !ChildCheckbox && !ShowCheckBoxInGroup && !Expanded) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
    
        // Call the main handleParentCheckboxChange - it will handle disabled options internally
        handleParentCheckboxChange(
          Virtualization ? data : data.data,
          !enabledChildSelected,
        );
      };
    
      const handleExpandClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleExpand(groupLabel);
      };

      const shouldDisableParent = useMemo(() => {
        if (!groupOptions || groupOptions?.length === 0) return false;

        if (groupOptions?.length === 1) {
          const singleChild = groupOptions[0];

            const isDisabledByDefault: boolean = DefaultValue?.some((defaultOption: { value: string | number; disable?: boolean }) =>
            defaultOption?.value === singleChild?.value && defaultOption?.disable === true
            );

          const isChildDisabled = singleChild?.disable === true || isDisabledByDefault;

          return isChildDisabled;
        }

        const allChildrenDisabled: boolean = groupOptions?.every((child: { value: string | number; disable?: boolean }) => {
          const isDisabledByDefault: boolean = DefaultValue?.some((defaultOption: { value: string | number; disable?: boolean }) =>
            defaultOption.value === child?.value && defaultOption?.disable === true
          );
          return child.disable === true || isDisabledByDefault;
        });

        return allChildrenDisabled;
      }, [groupOptions, DefaultValue]);
      
      return (
        <Fragment>
          <div className="vg-select2-dropdown__group-heading">
            <div
              className={`${Expanded && 'expand-arrow-container'}`}
              onClick={handleExpandClick} // Separate click handler for expand/collapse
            >
              <span className={`${Expanded && "expand-arrow"}`}>
                {Expanded && (
                  <>
                    {isExpanded ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path>
                      </svg>
                    )}
                  </>
                )}
              </span>
            </div>
            <div
              className={`group-header ${isExpanded ? "vg-expand-arrow" : "vg-collapse-arrow"
                } ${ShowCheckBoxInGroup === true
                  ? "vg-form-check"
                  : "vg-select2-group-heading"
                }`}
            >
              <div className="header-content">
                {ShowCheckBoxInGroup === true && (
                  <Fragment>
                    <input
                      className="vg-form-check-input"
                      type="checkbox"
                      // Base checkbox state only on enabled options
                      checked={enabledChildSelected}
                      disabled={shouldDisableParent}
                      // Style for indeterminate state (some but not all selected)
                      ref={el => {
                        if (el) {
                          el.indeterminate = enabledChildSelected && !allEnabledSelected;
                        }
                      }}
                      onChange={(e) => {
                        if (!shouldDisableParent) { // Add this check
                          e.stopPropagation();
                          handleParentCheckboxChange(
                            Virtualization ? data : data.data,
                            !enabledChildSelected,
                          );
                        }
                      }}
                      id={Virtualization ? groupLabel : data.id}
                      name={DropdownName}
                    />
                  </Fragment>
                )}
                <label
                  htmlFor={Virtualization ? groupLabel : data.id}
                  className={`vg-check-label ${enabledChildSelected && !allEnabledSelected
                    ? "multicheck-deselect-checkbox"
                    : ""
                    }${shouldDisableParent ? "disabled-label" : ""}`}
                  onClick={shouldDisableParent ? undefined : handleGroupSelection} // Add click handler here
                >
                  {groupLabel}
                </label>
              </div>
            </div>
          </div>
    
          {!isExpanded && virtualizationOptions && (
            <div className={`${!Multi ? "vg-expand-arrow-child" : ""}`}>
              {groupOptions?.map((child: any) => {
                // Check if this specific option is disabled based on DefaultValue
                const isOptionDisabledByDefault = DefaultValue?.some((defaultOption: any) =>
                  defaultOption.value === child.value && defaultOption.disable === true
                );

                // Also check if the option itself has disable property
                const isOptionDisabled = child.disable === true || isOptionDisabledByDefault;

                return (
                  <div
                    key={child.value}
                    className={`vg-select2-dropdown__option  ${ChildCheckbox ? "vg-form-check" : "vg-select2-child-option"} 
                      ${Expanded ? "vg-expand-option" : ""} ${isOptionDisabled ? "disabled-option" : ""}`}
                    onClick={(e) => {
                      if (!isOptionDisabled) {
                        setSelectedChildValue(child?.label);
                        e.stopPropagation();
                        if (!ChildCheckbox) {
                          handleChildCheckboxChange(child, !selectedValues.includes(child.value), e);
                        }
                        if(!Multi) {
                          setIsOpen(false)
                          if(isAndroidiOSPro && CloseCallback){
                            CloseCallback();
                          }
                        }
                      } else {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                      }
                    }}
                  >
                    <div className={`${ChildCheckbox && "vg-form-check"}`}>
                      {ChildCheckbox ? (
                        <input
                          className="vg-form-check-input"
                          type="checkbox"
                          value={child.value}
                          checked={selectedValues.includes(child.value)}
                          disabled={isOptionDisabled}
                          onChange={(e) => {
                            if (!isOptionDisabled) {
                              handleChildCheckboxChange(child, e.target.checked, e);
                            }
                          }}
                          id={`${DropdownName}-${child.value}`}
                        />) : null}
                      <label
                        className={`vg-check-label ${isOptionDisabled ? "disabled-label" : ""}`}
                        htmlFor={`${DropdownName}-${child.value}`}
                        onClick={(e) => {
                          if (isOptionDisabled) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                          }

                          if (ChildCheckbox) {
                            e.stopPropagation();
                          }
                        }}
                      >
                        {child.label || child.value}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Fragment>
      );
    };
    const SelectOnChange = (data: any) => {
      let selectedData:any[] = [];

      if (IsArrayOrObject(data) === "Object") {
        selectedData = [data];
      } else {
        selectedData = data;
      }

      handleOnChange(selectedData);

      // Update paginated data with current selection
      setDropdownPaginatedData((old) => ({
        ...old,
        selected: selectedData,
      }));

      SelectOnChangeCallback(selectedData);
      if(Multi) {
        setIsOpen(true)
      } else {
        if(isAndroidiOSPro && CloseCallback){
          CloseCallback();
        }
        setIsOpen(false)
      }
    };

    const CustomValueContainer = (customPlaceholderValue: any) => {
      let {
        selectProps: { value },
      } = customPlaceholderValue;

      if (DefaultValue?.length > 0) {
        value = DefaultValue;
      }

      let dropdownPlaceholder = DropdownPlaceholder;
      let selectedOptionsCount = 0;
      let defaultPlaceHolderName = SetCustomPlaceholder === true ? CustomPlaceholderName : "Selected";
      let totalOptionsCount = ApiUrl ? Number(totalCount) : GroupOptions
        ? dropdownData?.flatMap((group: any) => group?.options).length
        : dropdownData?.length;
      const disabledOptions = flattenedOptions?.filter((opt: any) => opt?.disable) ?? [];
      const WithOutDisableOptions = flattenedOptions?.filter((opt: any) => !opt?.disable) ?? [];
      const valueArray = Array.isArray(value) ? value : value ? [value] : [];
      // Matched disabled options (those in DefaultValue)
      const matchedDisabledOptions = disabledOptions?.filter((disabledOpt: any) =>
        valueArray?.some((val: any) => val?.value === disabledOpt?.value)
      );

      // Determine selected count based on selectionState
      if (selectionState?.selectAll) {
        // When "Select All" is active, subtract unselected items from total count
        if (selectionState?.selectAll && selectionState?.unselectedValues.length === 0) {
          selectedOptionsCount = totalOptionsCount;
        }
        // If an item is deselected, show total count - unselected
        else if (selectionState?.selectAll && selectionState?.unselectedValues.length > 0) {
          selectedOptionsCount = totalOptionsCount - selectionState?.unselectedValues?.length;
        }
      } else {
        // When not in "Select All" mode, use the length of selectedOptions
        if (valueArray?.length > 0) {
          if(valueArray?.length === 1) {
            selectedOptionsCount = valueArray?.length
          } else if (valueArray?.length > 1) {
          selectedOptionsCount = valueArray?.length;
          }
        } else {
          dropdownPlaceholder = DropdownPlaceholder;
        }
      }
      if (DefaultValue?.length === 1 && selectedOptionsCount === 1) {
        dropdownPlaceholder = React.isValidElement(valueArray[0]?.label)
          ? valueArray[0]?.inputRenderPlacehoder
          : valueArray[0]?.label;
      }
      else if (Multi && !Expanded && !ShowCheckBoxInGroup && !ChildCheckbox || (!Multi && !ShowCheckBoxInGroup && !ChildCheckbox)) {
        if (selectedChildValue) {
          if (React.isValidElement(selectedChildValue)) {
            dropdownPlaceholder = valueArray && valueArray[0]?.inputRenderPlacehoder;
          } else {
            dropdownPlaceholder = selectedChildValue;
          }
        }
      } else if (Multi === false && value?.value !== undefined) {
        dropdownPlaceholder = React.isValidElement(value?.label)
          ? value?.inputRenderPlacehoder
          : value?.label;
      } else if (selectedOptionsCount === 1) {
        dropdownPlaceholder = React.isValidElement(valueArray[0]?.label)
          ? valueArray[0]?.inputRenderPlacehoder
          : valueArray[0]?.label;
      }
      else if (!ChildCheckbox && !ShowCheckBoxInGroup && !Expanded) {
        if (selectedValues && selectedValues?.length > 0) {
          if (React.isValidElement(selectedChildValue)) {
            dropdownPlaceholder = valueArray && valueArray[0]?.inputRenderPlacehoder || selectedChildValue;
          } else {
            dropdownPlaceholder = selectedChildValue;
          }
        }
      } else if (selectedOptionsCount > 1 && selectedOptionsCount !== totalOptionsCount) {
        dropdownPlaceholder =
          Multi === false
            ? DropdownPlaceholder
            : selectedOptionsCount?.toString() + " " + defaultPlaceHolderName;
      } else if (selectedOptionsCount === totalOptionsCount) {
        if (inputValue && filteredDropdownOptions?.length > 0 && allFilteredSelected && selectedOptionsCount !== totalOptionsCount) {
          dropdownPlaceholder = Multi === false ? DropdownPlaceholder : SetCustomPlaceholder === true ? `${selectedOptionsCount} ${CustomPlaceholderName}` : `${selectedOptionsCount} Selected`;
        }
        else if (totalOptionsCount === WithOutDisableOptions?.length + matchedDisabledOptions?.length) {
          dropdownPlaceholder = "All Selected";
        } else if (matchedDisabledOptions?.length > 0) {
          dropdownPlaceholder = `${WithOutDisableOptions?.length + matchedDisabledOptions?.length} ${defaultPlaceHolderName}`;
        } else if (matchedDisabledOptions?.length === 0) {
          dropdownPlaceholder = `${WithOutDisableOptions?.length} ${defaultPlaceHolderName}`;
        }
        else {
          dropdownPlaceholder = Multi === false ? DropdownPlaceholder : SetCustomPlaceholder === true ? "All " + CustomPlaceholderName + " " : "All Selected";
        }
      }
      else {
        dropdownPlaceholder = dropdownPlaceholder;
      }

      if (DropdownDisabled) {
        return (
          <div className="vg-select2-dropdown-label">
            <div className="vg-select2-dropdown-label-inner">
              {dropdownPlaceholder}
            </div>
          </div>
        );
      }

      return (
        <div
          onClick={
            IsCheckNativeDevices() === false ? () => OpenSelect2() : () => { }
          }
          onTouchEnd={() => OpenSelect2()}
          className="vg-select2-dropdown-label"
        >
          <div className="vg-select2-dropdown-label-inner">
            {selectedOptionsCount && selectedOptionsCount > 0 ? dropdownPlaceholder : DropdownPlaceholder}
          </div>
        </div>
      );
    };
    
    const validation = () => {
      let validateObject = {
        [DropdownId]: selectedOptions,
        IsValidate: handleBlur(),
        Required: Required,
        selectionState: selectionState, 
      };
      if (OnValidation) {
      OnValidation(
        validateObject.IsValidate,
        validateObject.IsValidate ? '' : ""
      );
    }
      return validateObject;
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
      closeDropdown: () => CloseDropdown(),
    }));

    return (
      <Fragment>
        <>
        <div className="vg-dropdown-native-pro">
        <div className="vg-dropdown-title">
        {DropdownTitle?.length > 0 && (<label className="vg-input-label">{ShowRequiredFieldMark && Required ? <span className="required-input-mark">*</span> : ''}{DropdownTitle}</label>)}
          {InfoTooltipMessage && InfoTooltipMessage !== ''&& (
            <span className="vg-lbl-infochip">
              <VgTooltip
                BeakPoint="Up"
                BeakPosition={BeakPosition}
                Children={
                  <div className="vg-tooltiptext">
                    <Svg name="info_circle" />
                  </div>
                }
                TextAlign="center"
                TooltipText={InfoTooltipMessage}
                Html
              />
            </span>
          )}
        </div>
        <div
          className={`vg-react-select2-dropdown ${ClearSelection && selectedOptions?.length > 0   ? 'vg-clear' : '' } ${isOpen ? DropdownId : ""} ${Required === true && hasSelected === true
            ? "vg-select2-dropdown-error"
            : ""
            } ${DropdownDisabled === true ? "vg-select2-dropdown-disabled" : ""}
          ${FocusBorder ? "vg-select2-dropdown-focus" : ""}
          `}
          ref={containerRef}
        >
          <CustomSelect2
            optionsFilter={filteredDropdownOptions}
            virtualizationOptions={virtualizationOptions}
            selectedChildValue={selectedChildValue}
            setSelectedChildValue={setSelectedChildValue}
            OnScrollPagination={handleScrollPagination}
            OpenFromBody={OpenFromBody}
            Placeholder={DropdownPlaceholder}
            SelectAll={SelectAll}
            SelectNone={SelectNone}
            Virtualization={Virtualization}
            CustomParentOption={CustomParentOption}
            selectedOptions={selectedOptions}
            Multi={Multi}
            handleChildCheckboxChange={handleChildCheckboxChange}
            handleParentCheckboxChange={handleParentCheckboxChange} 
            SelectOnChange={SelectOnChange}
            CustomValueContainer={CustomValueContainer}
            isDefaultSelected={selectedOptions}
            ShowCheckBoxInGroup={ShowCheckBoxInGroup}
            ChildCheckbox={ChildCheckbox}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSearchChange={handleSearchChange}
            setFilteredDropdownOptions={setFilteredDropdownOptions}
            isAndroidiOSPro={isAndroidiOSPro}
            isAndroidiOSProWithTablet={isAndroidiOSProWithTablet}
            isPaydesk={isPaydesk}
            SearchPlaceholder={SearchPlaceholder}
            ShowSelectAllSelectNone={ShowSelectAllSelectNone}
            menuPlacement={MenuPlacement}
            IsShowCustomMessage={ShowCustomMessage}
            SelectedApply={SelectedApply}
            hideDropdown={hideDropdown}
            SetHideDropdown={SetHideDropdown}
            RightSwipeEvent={RightSwipeEvent}
            VirtualDropdownHeight={VirtualDropdownHeight}
            ClassNamePrefix={ClassNamePrefix}
            CustomClassNamePrefix={`${CustomClassNamePrefix}`}
            DropdownName={DropdownName}
            TabIndex={TabIndex}
            AutoFocus={AutoFocus}
            expandedGroups={expandedGroups}
            setExpandedGroups={setExpandedGroups}
            OptionsFilter={optionsFilter}
            DropdownData={dropdownPaginatedData}
            AddOptionButtonText={AddOptionButtonText}
            isGrouped={isGrouped}
            OnOptionButtonClick={OnOptionButtonClick}
            isLoading={isDataLoading && hasMore}
            ScrollPagination={ScrollPagination}
            listRef={listRef}
            Searchable={Searchable}
            SelectOnChangeCallback={SelectOnChangeCallback}
            allFilteredSelected={allFilteredSelected}
            getAllOptions={getAllOptions}
            setSelectedOptions={setSelectedOptions}
            setSelectedValues={setSelectedValues}
            setIsApplyOrNot={setIsApplyOrNot}
            setIsStoreForBack={setIsStoreForBack}
            RecordsPerPage={RecordsPerPage}
            OnSearchForApi={OnSearchForApi}
            SearchAutoFocus={SearchAutoFocus}
            SetBottomSheetDropdown={SetBottomSheetDropdown}
            Select2CloseHeaderCallback={Select2CloseHeaderCallback}
            OnClickOutside={OnClickOutside}
            setIsInitialPageLoad =  {setIsInitialPageLoad}
            Setresetvalue = {Setresetvalue}
            setDropdownPaginatedData={setDropdownPaginatedData}
            ClearSelection={ClearSelection}
          />
        </div>
        </div>
        </>
        {/* } */}
        {Required === true && hasSelected === true && (
          <Fragment>
            <div className="vg-input-control-error-msg">{RequiredMessage}</div>
          </Fragment>
        )}
        <input type="hidden" onClick={() => CloseDropdown()} id={DropdownId} />
      </Fragment>
    );
  }
);

export default VgDropdown;