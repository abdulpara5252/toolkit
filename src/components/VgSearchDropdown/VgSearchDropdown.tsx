import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import './VgSearchDropdown.scss';
import VgSvg from '../VgSvg/VgSvg';

export interface VgSearchDropdownProps {
  Placeholder?: string;
  InputId?: string;
  OnBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  OnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  OnKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  OnClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  OnSearch?: (searchText: string) => void;
  OnSelectedItem?: (option: { label: string | React.ReactNode; value: string; inputplaceholder?: string }) => void;
  OnScroll?: (page: number) => void;
  SetValue?: string;
  Name?: string;
  Options?: Array<
    | { key?: string; group: string | React.ReactNode; options: Array<{ label: string | React.ReactNode; value: string; inputplaceholder?: string }> }
    | { label: string | React.ReactNode; value: string; inputplaceholder?: string }
  >;
  Disabled?: boolean;
  Icon?: React.ReactNode;
  IconPosition?: 'prefix' | 'suffix';
  MenuListWidth?: string | number;
  CurrentLocation?: string;
  Searching?: boolean;
  Loading?: boolean; // Reintroduced to handle "Loading more results"
  OnScrollApiCall?: boolean; // Toggle API call on scroll
  Pagination?: boolean; // Enable/disable Pagination in footer
}

interface Option {
  label: string | React.ReactNode;
  value: string;
  inputplaceholder?: string;
}

interface GroupedOption {
  key?: string;
  group: string | React.ReactNode;
  options: Option[];
}

interface VgSearchDropdownRef {
  validate: () => void;
}

const VgSearchDropdown = forwardRef<VgSearchDropdownRef, VgSearchDropdownProps>(
  (
    {
      Placeholder = 'Search...',
      InputId,
      OnBlur,
      OnChange,
      OnFocus,
      OnKeyUp,
      OnKeyDown,
      OnClick,
      OnSearch,
      OnSelectedItem,
      OnScroll,
      SetValue = '',
      Name,
      Options = [],
      Disabled = false,
      Icon,
      IconPosition = 'prefix',
      MenuListWidth,
      CurrentLocation,
      Searching,
      Loading = false,
      OnScrollApiCall = false,
      Pagination = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [isLoadingMoreInternal, setIsLoadingMoreInternal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout>();
    const isLoadingRef = useRef(false);
    const [isSearching, setIsSearching] = useState<boolean | null | undefined>(false);

    useEffect(() => {
      setIsSearching(Searching);
    }, [Searching]);

    useEffect(() => {
      setIsLoadingMoreInternal(Loading); // Sync internal state with prop
    }, [Loading]);

    useEffect(() => {
      // Reset scroll state when OnScrollApiCall or Pagination changes
      setCurrentPage(1);
      isLoadingRef.current = false;
      setIsLoadingMoreInternal(false);
    }, [OnScrollApiCall, Pagination]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionClick = (option: Option): void => {
      setSelectedOption(option);
      const newSearchText =
        typeof option?.inputplaceholder === 'string'
          ? option?.inputplaceholder
          : typeof option?.label === 'string'
          ? option?.label
          : '';
      setSearchText(newSearchText);
      OnSelectedItem?.(option);
      OnSearch?.(newSearchText);
      setIsOpen(false);
    };

    // Highlight matching text in group or option labels with proper spacing
    const highlightMatch = (text: string): React.ReactNode => {
      if (!searchText?.trim()) return text;
      let lastIndex = 0;
      const result: React.ReactNode[] = [];
      const regex = new RegExp(`(${searchText})`, 'gi');
      let match;

      while ((match = regex.exec(text)) !== null) {
        const matchStart = match.index;
        const matchEnd = regex.lastIndex;
        const matchText = match[0];

        // Add text before the match
        if (matchStart > lastIndex) {
          result.push(text.slice(lastIndex, matchStart));
        }

        // Add the matched text in bold with black color
        result.push(<span key={matchStart} style={{ fontWeight: '700' }}>{matchText}</span>);

        // Check for space or punctuation after the match
        const nextChar = text[matchEnd];
        if (nextChar && /\s/.test(nextChar)) {
          result.push(' '); // Add space if the next character is a space
        }

        lastIndex = matchEnd;
      }

      // Add remaining text after the last match
      if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
      }

      return result.length > 1 ? result : text;
    };

    // Check if an option is valid (has value as string and label as string or ReactNode)
    const isValidOption = (option: unknown, index: number, groupName?: string): option is Option => {
      if (!option || typeof option !== 'object' || !('value' in option)) {
        console.warn(`Invalid option at ${groupName ? `group "${groupName}" index ${index}` : `index ${index}`}:`, option);
        return false;
      }
      return typeof option?.value === 'string';
    };

    // Check if the Options array is in grouped format
    const isGroupedOptions = (
      options: Array<unknown>
    ): options is Array<GroupedOption> => {
      return options.some((item) => item && typeof item === 'object' && 'group' in item && Array.isArray((item as GroupedOption).options));
    };

    // Filter grouped or flat options
    const filterOptions = () => {
      if (!Array.isArray(Options)) {
        console.warn('Options prop is not an array:', Options);
        return [];
      }

      if (isGroupedOptions(Options)) {
        // Handle grouped options
        const filteredGroups: GroupedOption[] = [];
        const usedKeys = new Set<string>();
        Options.forEach((group, index) => {
          if (
            !group ||
            typeof group !== 'object' ||
            !('group' in group) ||
            !Array.isArray(group.options)
          ) {
            console.warn(`Invalid group at index ${index}:`, group);
            return;
          }

          const filteredOptions = group.options
            .filter((option, optionIndex) =>
              isValidOption(option, optionIndex, typeof group.group === 'string' ? group.group : `group-${index}`)
            )
            .filter((option) => {
              const textToFilter = option?.inputplaceholder ?? (typeof option?.label === 'string' ? option?.label : '');
              return textToFilter.toLowerCase().includes(searchText.toLowerCase());
            });

          if (filteredOptions.length > 0) {
            const groupKey = group.key ?? (typeof group.group === 'string' ? group.group : `group-${index}`);
            if (usedKeys.has(groupKey)) {
              console.warn(`Duplicate group key found: ${groupKey}. Consider providing a unique 'key' property for the group.`);
            } else {
              usedKeys.add(groupKey);
              filteredGroups.push({ ...group, options: filteredOptions });
            }
          }
        });
        return filteredGroups;
      } else {
        // Handle flat options
        return Options
          .filter((option, index) => isValidOption(option, index))
          .filter((option) => {
            const textToFilter = option?.inputplaceholder ?? (typeof option?.label === 'string' ? option?.label : '');
            return textToFilter.toLowerCase().includes(searchText.toLowerCase());
          });
      }
    };

    const handleScroll = useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        if (!OnScrollApiCall || !event.currentTarget || isLoadingRef.current || isLoadingMoreInternal) return;

        const target = event.currentTarget;
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

          if (scrollPercentage >= 0.9 && hasMoreData && !isLoadingRef.current && OnScroll) {
            isLoadingRef.current = true;
            setIsLoadingMoreInternal(true);
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);

            OnScroll(nextPage);

            setTimeout(() => {
              isLoadingRef.current = false;
              setIsLoadingMoreInternal(false);
            }, 100);
          }
        }, 150);
      },
      [currentPage, hasMoreData, isLoadingMoreInternal, OnScroll, OnScrollApiCall]
    );

    useEffect(() => {
      setCurrentPage(1);
      isLoadingRef.current = false;
      setIsLoadingMoreInternal(false);
    }, [searchText, OnScrollApiCall, Pagination]);

    useEffect(() => {
      setHasMoreData(Options?.length >= currentPage * 10);
    }, [Options?.length, currentPage]);

    useImperativeHandle(ref, () => ({
      validate: () => {
        console.log('Validating select dropdown...');
      },
    }));

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (Disabled) { 
        e.preventDefault();
        return;
      } 
      if(CurrentLocation) {
        setIsOpen(true);
      }
      OnClick?.(e);
    }

    return (
      <div className="vg-search-dropdown" ref={dropdownRef}>
        {/* Input with optional prefix/suffix icon */}
        <div className="vg-search-dropdown-input-wrapper">
          {Icon && IconPosition === 'prefix' && (
            <span className="vg-search-dropdown-icon vg-search-dropdown-prefix">
              {Icon}
            </span>
          )}

          <input
            id={InputId}
            type="text"
            name={Name}
            placeholder={Placeholder}
            value={searchText || SetValue || ''}
            onChange={(e) => {
              const newValue = e.target.value;
              setSearchText(newValue);
              setIsOpen(true);
              OnChange?.(e);
              OnSearch?.(newValue);
            }}
            onFocus={(e) => {
              setIsOpen(true);
              OnFocus?.(e);
            }}
            onBlur={OnBlur}
            onKeyUp={OnKeyUp}
            onKeyDown={OnKeyDown}
            onClick={handleInputClick}
            disabled={Disabled}
            className={`vg-search-dropdown-input ${Icon && IconPosition === 'prefix' ? 'has-prefix' : ''} ${Icon && IconPosition === 'suffix' ? 'has-suffix' : ''}`}
          />

          {Icon && IconPosition === 'suffix' && (
            <span className="vg-search-dropdown-icon vg-search-dropdown-suffix">
              {Icon}
            </span>
          )}
        </div>
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="vg-search-dropdown-menu" style={{ width: MenuListWidth }}>
            {isSearching && (
              <div className="vg-search-dropdown-searching">Searching...</div>
            )}
            <>
              {CurrentLocation && !isSearching && (
                <div className="vg-search-dropdown-location">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8l176 0 0 176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" /></svg>
                  <span className="vg-search-dropdown-location-text">{CurrentLocation}</span>
                </div>
              )}
              {searchText?.trim() && (
                <div className="vg-search-dropdown-list" onScroll={handleScroll}>
                  {isGroupedOptions(filterOptions()) ? (
                    (filterOptions() as GroupedOption[])?.map((group) => (
                      <div
                        key={group?.key ?? (typeof group?.group === 'string' ? group?.group : `group-${Math?.random()}`)}
                        className="vg-search-dropdown-group"
                      >
                        <div className="vg-search-dropdown-group-label">
                          {typeof group?.group === 'string' ? highlightMatch(group?.group) : group?.group}
                        </div>
                        {group?.options?.map((option) => (
                          <div
                            key={option?.value}
                            className={`vg-search-dropdown-item`}
                            onClick={() => handleOptionClick(option)}
                          >
                            {typeof option?.label === 'string' ? highlightMatch(option?.label) : option?.label}
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    (filterOptions() as Option[])?.map((option) => (
                      <div
                        key={option?.value}
                        className={`vg-search-dropdown-single-item`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {typeof option?.label === 'string' ? highlightMatch(option?.label) : option?.label}
                      </div>
                    ))
                  )}
                  {isLoadingMoreInternal && (
                    <div className="vg-search-dropdown-footer-loading">Loading more results...</div>
                  )}
                </div>
              )}
              {searchText.length > 0 && !isSearching && Pagination && (
                <div className="vg-search-dropdown-footer">
                
                  {Pagination  && Options?.length === 0 && (
                    "No Matches"
                  )}
                  {Pagination  && Options?.length > 0 && (
                    `Items 1-${Math.min(10, Options?.length)} out of ${Options?.length}`
                  )}
                </div>
              )}
            </>
          </div>
        )}
      </div>
    );
  }
);

export default VgSearchDropdown;