import React, { useState, useRef, useEffect } from 'react';
import './VgAccordion.scss';

export interface VgAccordionProps {
  Title: string;
  Body: React.ReactNode | string;
  OpenIcon?: React.ReactNode | string;
  CloseIcon?: React.ReactNode | string;
  AccordionId?: string;
  IsOpen?: boolean;
  OnToggle?: (id: string) => void;
}

const VgAccordion: React.FC<VgAccordionProps> = ({
  Title,
  Body,
  OpenIcon,
  CloseIcon,
  AccordionId = Title.replace(/\s+/g, '-'),
  IsOpen: controlledIsOpen,
  OnToggle,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isControlled) {
      OnToggle?.(AccordionId);
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : '0px';
    }
  }, [isOpen]);

  return (
    <div className="vg-accordion-wrapper">
      <div className={`vg-accordion-header ${isOpen ? 'active' : ''}`}>
        <a
          className={`vg-accordion-title d-block w-100 ${isOpen ? '' : 'vg-accordion-collapsed'}`}
          href={`#vg-accordion-collapse-${AccordionId}`}
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          {Title}
          <span className="vg-accordion-icon">
            {typeof (isOpen ? OpenIcon : CloseIcon) === 'string' ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: isOpen ? (OpenIcon as string) : (CloseIcon as string),
                }}
              />
            ) : (
              isOpen ? OpenIcon : CloseIcon
            )}
          </span>
        </a>
      </div>
      <div
        id={`vg-accordion-collapse-${AccordionId}`}
        className={`${isOpen ? 'vg-accordion-show' : 'vg-accordion-hide'}`}
        ref={contentRef}
      >
        <div className="vg-accordion-body">
          {typeof Body === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: Body }} />
          ) : (
            Body
          )}
        </div>
      </div>
    </div>
  );
};

export default VgAccordion;
