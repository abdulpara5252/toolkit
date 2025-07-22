import React, { useEffect, useRef, useState, ReactNode } from "react";
import "./VgTooltip.scss";
import { utils } from "../../utils/utils";

export interface VgTooltipProps {
  TooltipText?: string;
  ScreenTitleForMobile?: string
  Children?: ReactNode;
  Html?: boolean;
  TextAlign?: 'left' | 'center' | 'right';
  BeakPoint?: 'Up' | 'Down';
  BeakPosition?: 'Left' | 'Middle' | 'Right';
}

const VgTooltip: React.FC<VgTooltipProps> = ({
  TooltipText,
  Children,
  ScreenTitleForMobile,
  Html = true,
  TextAlign = "center",
  BeakPoint = 'Down',
  BeakPosition = 'Middle'
}) => {
  const [position, setPosition] = useState<'top-center' | 'bottom-center' | 'left' | 'right'| 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' >('top-center');
  const [isVisible, setIsVisible] = useState(false);
  
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isandroidiospro = utils.CheckIsFromProAppWithoutState();
  const isandroidiosTab = utils.CheckIsFromIpadAndroidTabWithoutParm();

  useEffect(() => {
    if (isVisible && tooltipRef.current && targetRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const canShowAbove = targetRect.top >= tooltipRect.height;
      const canShowBelow = viewportHeight - targetRect.bottom >= tooltipRect.height;
      const canShowLeft = targetRect.left >= tooltipRect.width;
      const canShowRight = viewportWidth - targetRect.right >= tooltipRect.width;

      if (canShowAbove) setPosition('top-center');
      else if (canShowBelow) setPosition('bottom-center');
      else if (canShowLeft) setPosition('left');
      else if (canShowRight) setPosition('right');
      
      else setPosition('bottom-center'); 
    }
  }, [isVisible] );

  useEffect(() => {
    if(BeakPoint === 'Down' && BeakPosition === 'Middle'){
      setPosition('bottom-center');
    }
    else if(BeakPoint === 'Down' && BeakPosition === 'Left'){
      setPosition('bottom-left');
    }
    else if(BeakPoint === 'Down' && BeakPosition === 'Right'){
      setPosition('bottom-right');
    }
    else if(BeakPoint === 'Up' && BeakPosition === 'Left'){
      setPosition('top-left');
    }
    else if(BeakPoint === 'Up' && BeakPosition === 'Right'){
      setPosition('top-right');
    }
  }, [BeakPoint, BeakPosition, position])
  

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleTooltipClick = (event: React.MouseEvent) => {  
    event.preventDefault();
    event.stopPropagation();
    
    if (isandroidiosTab && !isandroidiospro) {
      setIsVisible(true);
    }
    
    if(isandroidiospro) {
        var messageObj: any = {};
        messageObj.message = TooltipText;
        messageObj.messageType = 0;
        messageObj.screenTitle = isReactElement(Children) ? ScreenTitleForMobile ? ScreenTitleForMobile: "Info" : Children;
        messageObj.screenType = 0;
        messageObj.navType = 51;
        messageObj.action = "";
        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
    }
  };

  const isReactElement = (input: any): boolean => {
    return React.isValidElement(input);
  };

  // Add click outside handler to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isandroidiosTab && targetRef.current && !targetRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isandroidiosTab) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isandroidiosTab]);
  
  return (
    <div className={`vg-group vg-tooltip-group`}>
      <div
        className={`vg-tooltip vg-tooltip-${position}`}
        ref={targetRef}
        onMouseEnter={() => !isandroidiosTab && setIsVisible(true)}
        onMouseLeave={() => !isandroidiosTab && setIsVisible(false)}
        onClick={handleTooltipClick}
      >
       
        {isVisible && (
          <div className={`vg-tooltip-sms vg-text-${TextAlign}`} ref={tooltipRef}>
           
            {Html ? (
              
              <div dangerouslySetInnerHTML={{ __html: TooltipText || "" }} />
            ) : (
              
              TooltipText && stripHtmlTags(TooltipText)
            )}
          </div>
        )}

      {Children}
        </div>
      </div>
  );
};

export default VgTooltip;
