  import React, { useEffect, useRef, useState } from "react";
  import { createPortal } from "react-dom";
  import { PortalEnum } from "../utils/utils";

  const createWrapperAndAppendToBody = (
    wrapper: string,
    wrapperElementId: string
  ) => {
    const wrapperElement = document.createElement(wrapper);
    wrapperElement.setAttribute("id", wrapperElementId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  };

  interface PortalProps {
    children: React.ReactNode;
    wrapperElement?: string;
    wrapperElementId?: string;
    inputRef?: React.RefObject<HTMLElement> | any ;
    type?: any;
  }

  const Portal: React.FC<PortalProps> = ({
    children,
    wrapperElement = "div",
    wrapperElementId = "divId",
    inputRef,
    type,
  }) => {
    const [wrapper, setWrapper] = useState<HTMLElement | null>(null);
    const [dropdownHeight, setHeight] = useState(0);
    const [dropdownWidth, setWidth] = useState(0);
    const wrapperRef = useRef<HTMLElement | null>(null);
    const [position, setPosition] = useState<{ top: number; left?: number; right?: number }>({
      top: 0,
      left: 0,
  });
    const calculatePosition = () => {
      if (!inputRef?.current) {
          return { top: 0, left: 0 };
      }

      const rect = inputRef.current.getBoundingClientRect();
      if (!rect || (!rect.width && !rect.height)) {
          return { top: 0, left: 0 };
      }

  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const defaultHeight = wrapperElementId === "ColorPicker" ? 420 : 258;

  const calculatedHeight = dropdownHeight || defaultHeight;

      const leftSpace = rect.left;
      const rightSpace = window.innerWidth - rect.right;
      const effectiveDropdownWidth = dropdownWidth || 700;

    let top: number;
    let left: number | undefined = rect.left + window.scrollX;
    let right: number | undefined;

    // New logic for address suggestions dropdown
    if (type === PortalEnum.addressSuggestions) {
      const windowHeight = window.innerHeight;
      const topThird = windowHeight / 3;
      const bottomThird = 2 * windowHeight / 3;
      const isInTopThird = rect.top < topThird;
      const isInMiddleThird = rect.top >= topThird && rect.top <= bottomThird;
      const isInBottomThird = rect.top > bottomThird;

      if (isInBottomThird) {
        top = rect.top + window.scrollY - calculatedHeight;
      } else if (isInMiddleThird || isInTopThird) {
        top = rect.bottom + window.scrollY;
      } else {
        if (spaceBelow >= calculatedHeight) {
          top = rect.bottom + window.scrollY;
      } else if (spaceAbove >= calculatedHeight) {
          top = rect.top + window.scrollY - calculatedHeight;
      } else {
          top = rect.bottom + window.scrollY;
        
      }
    }
  } else if (type === PortalEnum.timePickerRight) {
    if (spaceBelow < calculatedHeight && spaceAbove >= calculatedHeight ) {
      top = rect.top + window.scrollY - calculatedHeight 
    } else {
      top = rect.bottom + window.scrollY 
    }
  }else {
      if (spaceBelow >= calculatedHeight) {
        top = rect.bottom + window.scrollY;
      } else if (spaceAbove >= calculatedHeight) {
        top = rect.top + window.scrollY - calculatedHeight;
      } else {
        top = rect.bottom + window.scrollY;
      }
    }
    // logic for daterangepicker
    if (wrapperElementId === "daterangepicker" && type === PortalEnum.dateRangePickerAutoPosition) {
      if (rightSpace + rect.width >= effectiveDropdownWidth) {
        left = rect.left + window.scrollX;
        right = undefined;
      } else if (leftSpace + rect.width >= effectiveDropdownWidth) {
        right = window.innerWidth - (rect.right + window.scrollX);
        left = undefined;
      } else {
        const windowWidth = window.innerWidth;
        const centerPoint = windowWidth / 2;
        if (rect.left < centerPoint) {
          left = window.scrollX;
          right = undefined;
        } else {
          right = 0;
          left = undefined;
        }
      }
    } else {
      switch (type) {
        case PortalEnum.action:
          if (leftSpace < rightSpace) {
            left = rect.left + window.scrollX;
          } else {
            left = window.innerWidth - rightSpace - (rect.width || 328);
          }
          break;

      case PortalEnum.timePickerRight:
        const inputWidth = rect.width;
        const windowWidth = window.innerWidth;
        const offset = 10;
        right = windowWidth - (rect.right + window.scrollX + offset);
        break;

      case PortalEnum.smileyPicker:
          left = rect.right + window.scrollX - 240;
          break;

       case PortalEnum.dateRangePickerRight:
        right = window.innerWidth - (rect.right + window.scrollX);
        break;
          
        default:
          left = rect.left + window.scrollX;
      }
    }

    return right !== undefined ? { top, right } : { top, left };
  }

     useEffect(() => {
  setPosition(calculatePosition());
 
  setTimeout(() => {
    const element = wrapperRef.current;
   if (!element || !element.firstElementChild) return;
    const daterangepickerelement = element.firstElementChild as HTMLElement;
    const rect = daterangepickerelement.getBoundingClientRect();
    let calculatedHeight = 0;
    const childrenElements = element.children;
    for (let i = 0; i < childrenElements.length; i++) {
      const child = childrenElements[i] as HTMLElement;
      calculatedHeight += child.scrollHeight;
    }
    setHeight(calculatedHeight);
    setWidth(rect.width || 700);
  }, 0); 
}, [inputRef, dropdownHeight, type, wrapperElementId, children]);
 

    useEffect(() => {
      const element = wrapperRef.current;
       if (!element || !element.firstElementChild) return;

      const updateHeight = () => {
        const daterangepickerelement = element.firstElementChild as HTMLElement;
        const rect = daterangepickerelement.getBoundingClientRect();
        let calculatedHeight = 0;
        const childrenElements = element.children;
        for (let i = 0; i < childrenElements.length; i++) {
          const child = childrenElements[i] as HTMLElement;
          calculatedHeight += child.offsetHeight;
        }
        setHeight(calculatedHeight);
        setWidth(rect.width || 700); 
      };

      updateHeight();

      const resizeObserver = new ResizeObserver(updateHeight);
      const mutationObserver = new MutationObserver(updateHeight);

      resizeObserver.observe(element);
      mutationObserver.observe(element, { childList: true, subtree: true });

      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }, [children, wrapperElementId, type]);


    useEffect(() => {
      let element = document.getElementById(wrapperElementId) as HTMLElement | null;
      if (!element) {
        element = createWrapperAndAppendToBody(wrapperElement, wrapperElementId);
      }
      wrapperRef.current = element;
      setWrapper(element);

      // return () => {
      //   if (element && document.body.contains(element)) {
      //     document.body.removeChild(element);
      //   }
      // };
    }, [wrapperElementId, wrapperElement]);

    if (wrapper === null) return null;

    return createPortal(
      <div style={{
      position: "absolute",
      ...position,
      ...(wrapperElementId === 'dropdownmenu' ? { zIndex: 99 } : {}),
    }}>{children}</div>,
      wrapper
    );
  };

  export default Portal;