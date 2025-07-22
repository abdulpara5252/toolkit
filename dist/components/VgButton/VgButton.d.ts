import React from "react";
import "./VgButton.scss";
export interface PillTabLabel {
    id: string;
    name: string;
    pillColor?: "primary" | "secondary" | "theme" | "leave";
    isCloseOtherPills?: boolean;
}
export interface PillButtonDataProps {
    LeftLabel?: PillTabLabel;
    RightLabel?: PillTabLabel;
    SquareLabel?: PillTabLabel[];
}
export interface VgButtonProps {
    actionbutton?: "vertical" | "horizontal";
    ButtonDisabled?: boolean;
    ButtonVariant?: "primary" | "secondary" | "ai" | "icon" | "close" | "tutorial" | "action" | "cross" | "AiWithIcon" | "selector" | "theme" | "ghost" | "Social" | "link" | "Red" | "Black" | "Pill" | "PillTab" | "RedGhost" | "Dropdown" | "DropdownMenu";
    ButtonIcon?: "plus" | "pencil" | "map" | "refund" | "receipt" | "link" | "preview" | "download" | "filter" | "connect" | "video";
    IconPlacement?: "prefix" | "suffix";
    CheckFormValidation?: boolean;
    ButtononClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, ValidData?: any) => void;
    [key: string]: any;
    ButtononHover?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, ValidData?: any) => void;
    FormValidations?: {};
    ValidForm?: Boolean;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
    SocialButton?: string;
    IconList?: "preview" | "download" | 'heart' | 'print';
    Size?: "regular" | "small" | "large" | "full-width";
    PillTabData?: PillButtonDataProps;
    DropdownMenuOptions?: {
        label: string;
        value: string;
        imageUrl?: string;
    }[];
    DropdownClick?: (e: {
        label: string;
        value: string;
    }) => void;
    ColorVariant?: "primary" | "secondary" | "theme" | "leave" | "black";
    TextAlign?: "left" | "center" | "right";
    MobileView?: Boolean;
    SelectedIds?: string[];
    OnChange?: (selectedIds: string[], clickedId?: string) => void;
    Width?: string;
    DropdownAlign?: "left" | "right";
    ToggleMode?: boolean;
}
export interface Validatable {
    validate: () => boolean;
}
declare const VgButton: React.ForwardRefExoticComponent<Omit<VgButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export default VgButton;
