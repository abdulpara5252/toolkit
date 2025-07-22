import * as React from 'react';
import { ReactNode } from 'react';
export declare function DropDownItem({ children, className, onClick, title, }: {
    children: React.ReactNode;
    className: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
}): import("react/jsx-runtime").JSX.Element;
export default function DropDown({ disabled, buttonLabel, buttonAriaLabel, buttonClassName, buttonIconClassName, children, stopCloseOnClickSelf, }: {
    disabled?: boolean;
    buttonAriaLabel?: string;
    buttonClassName: string;
    buttonIconClassName?: string;
    buttonLabel?: string;
    children: ReactNode;
    stopCloseOnClickSelf?: boolean;
}): JSX.Element;
