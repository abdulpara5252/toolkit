import React, { useState, useRef, useEffect, useCallback } from "react";
import "./VgImageDropdown.scss";
import Svg from "../VgSvg/Svg";
import Portal from "../../common/Portal";

interface ImageDropdownOption {
  label: string;
  value: string;
  imageUrl: string;
  category?: string;
  source?: string;
  barcodeId?: string;
}

export interface VgImageDropdownProps {
  RawData: ImageDropdownOption[];
  Placeholder?: string;
  Searchable?: boolean;
  Multi?: boolean;
  Required?: boolean;
  OnChange?: (selected: ImageDropdownOption[]) => void;
  OnSearch?: (searchTerm: string) => void;
  OnScroll?: (page: number) => void;
  DropdownTitle?: string;
  Icon?: boolean;
  DropdownInnerTitle?: string;
  inputId?: string;
  OnFocus?: React.FocusEventHandler<HTMLInputElement>;
  OnBlur?: React.FocusEventHandler<HTMLInputElement>;
  OnKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  OnPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  AutoComplete?: boolean;
  AutoCorrect?: boolean;
  MaxLength?: number;
  DefaultBorderShow?: boolean;
  ActiveState?: boolean
}

const VgImageDropdown: React.FC<VgImageDropdownProps> = ({
  RawData = [],
  Placeholder = "Select & Search product",
  Searchable = true,
  Multi = false,
  Required = false,
  OnChange,
  OnSearch,
  OnScroll,
  DropdownTitle,
  Icon,
  DropdownInnerTitle,
  inputId,
  OnFocus,
  OnBlur,
  OnKeyDown,
  OnPaste,
  AutoComplete = false,
  AutoCorrect = false,
  MaxLength,
  DefaultBorderShow = false,
  ActiveState = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<ImageDropdownOption[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [imgDropdownWidth, setImgDropdownWidth] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isLoadingRef = useRef(false);
  const [InputBorderShow , setInputBorderShow] = useState(DefaultBorderShow);

  const validateSelection = () => {
    if (Required && selectedOptions.length === 0 && hasInteracted) {
      setIsValid(false);
      setErrorMessage("This field is required.");
      return false;
    }
    setIsValid(true);
    setErrorMessage("");
    return true;
  };

  useEffect(() => {
    if (hasInteracted && !isFocused) {
        validateSelection();
    }
  }, [selectedOptions, Required, isFocused, hasInteracted]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!event.currentTarget || isLoadingRef.current || isLoadingMore) return;

      const target = event.currentTarget;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

        if (scrollPercentage >= 0.8 && hasMoreData && !isLoadingRef.current) {
          isLoadingRef.current = true;
          setIsLoadingMore(true);
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);

          OnScroll?.(nextPage);

          setTimeout(() => {
            isLoadingRef.current = false;
            setIsLoadingMore(false);
          }, 100);
        }
      }, 150);
    },
    [currentPage, hasMoreData, isLoadingMore, OnScroll]
  );

  useEffect(() => {
    setCurrentPage(1);
    isLoadingRef.current = false;
    setIsLoadingMore(false);
  }, [searchTerm]);

  useEffect(() => {
    setHasMoreData(RawData?.length >= currentPage * 10);
  }, [RawData?.length, currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (searchTerm && Searchable) {
          setSelectedOptions([
            { label: searchTerm, value: searchTerm, imageUrl: "" },
          ]);
          OnChange?.([{ label: searchTerm, value: searchTerm, imageUrl: "" }]);
        }
        if(searchTerm === ""  || !Searchable) {
          setIsFocused(false);
          setHasInteracted(true);
          validateSelection();
        }
        if(InputBorderShow){
          setInputBorderShow(false)
        }
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, Searchable, searchTerm, OnChange, Required]);

  useEffect(() => {
    if (isOpen && Searchable && inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, [isOpen, Searchable]);

  const handleOptionClick = (option: ImageDropdownOption) => {
    setInputBorderShow(false)
    setHasInteracted(true);
    let newSelected: ImageDropdownOption[];

    if (Multi) {
      const isSelected = selectedOptions.some(
        (selected) => selected?.value === option?.value
      );
      if (isSelected) {
        newSelected = selectedOptions.filter(
          (selected) => selected?.value !== option?.value
        );
      } else {
        newSelected = [...selectedOptions, option];
      }
    } else {
      newSelected = [option];
      setIsOpen(false);
      setSearchTerm("");
    }
    setSelectedOptions(newSelected);
    OnChange?.(newSelected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") {
      setSelectedOptions([]);
      OnChange?.([]);
    }

    if (!isOpen) setIsOpen(true);
    OnSearch?.(newSearchTerm);
  };

  const displayValue = () => {
    if (Searchable) {
      if (isOpen) {
        return searchTerm;
      }
      if (selectedOptions?.length > 0) {
        return selectedOptions[0]?.label;
      }
      return searchTerm || "";
    }
    if (selectedOptions?.length === 0) return "";
    if (selectedOptions?.length === 1) return selectedOptions[0]?.label;
    return `${selectedOptions?.length} selected`;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputRef.current) {
        const width = inputRef.current.offsetWidth;
        setImgDropdownWidth(width);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="vg-image-dropdown">
      {DropdownTitle && (
        <label className="vg-input-label">{DropdownTitle}</label>
      )}
      <div
        className={`vg-image-dropdown__control  ${selectedOptions.length > 0 && !isOpen && ActiveState ? 'vg-search-scan' : ''} ${
          (isOpen || InputBorderShow) ? `vg-image-dropdown__control--open` : ""
        } ${
          !isValid && !isFocused ? "vg-input-control-error" : ""
        }`}
        ref={inputRef}
      >
        {Searchable ? (
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            className="vg-image-dropdown__control-input"
            value={displayValue()}
            placeholder={isOpen ? "" : Placeholder}
            onChange={handleInputChange}
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(true);
            }}
            onKeyDown={(event) => {
              handleKeyDown(event);
              if (OnKeyDown) OnKeyDown(event);
            }}
            onFocus={OnFocus}
            onBlur={OnBlur}
            onPaste={OnPaste}
            autoComplete={AutoComplete ? "on" : "off"}
            spellCheck={AutoCorrect ? true : false}
            maxLength={MaxLength}
            aria-label="Search and select options"
          />
        ) : (
          <span
            className="vg-image-dropdown__value"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {displayValue()}
          </span>
        )}
        {Icon && (
          <span className="vg-image-dropdown__icon">
            <Svg name={"barcode"} />
          </span>
        )}
      </div>

      {!isValid && !isFocused && (
        <span className="vg-input-control-error-msg">
          {errorMessage}
        </span>
      )}

      {isOpen && (
        <Portal
          wrapperElementId="dropdown-portal"
          wrapperElement="div"
          inputRef={inputRef}
        >
          <div
            className="vg-image-dropdown__menu"
            style={{
              width: imgDropdownWidth ? `${imgDropdownWidth}px` : "auto",
            }}
            ref={containerRef}
          >
            <div className="vg-image-dropdown__options" onScroll={handleScroll}>
              {DropdownInnerTitle && (
                <label className="vg-input-label_products">
                  {DropdownInnerTitle}
                </label>
              )}
              {RawData?.length > 0 ? (
                <>
                  {RawData.map((option) => (
                    <div
                      key={option?.value}
                      className={`vg-image-dropdown__option ${
                        selectedOptions.some(
                          (selected) => selected?.value === option?.value
                        )
                          ? "vg-image-dropdown__option--selected"
                          : ""
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      <img
                        src={option?.imageUrl}
                        alt={option?.label}
                        className="vg-image-dropdown__option-image"
                        loading="lazy"
                      />
                      <span className="vg-image-dropdown__option-label">
                        {option?.label}
                        {(option?.category || option?.source) && (
                          <span className="vg-image-dropdown__option-brand">
                            {option?.category && option?.source
                              ? `${option?.category} - ${option?.source}`
                              : option?.category || option?.source}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="vg-image-dropdown__no-results">
                  No results found
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default VgImageDropdown;