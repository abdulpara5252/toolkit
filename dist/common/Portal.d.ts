import React from "react";
interface PortalProps {
    children: React.ReactNode;
    wrapperElement?: string;
    wrapperElementId?: string;
    inputRef?: React.RefObject<HTMLElement> | any;
    type?: any;
}
declare const Portal: React.FC<PortalProps>;
export default Portal;
