import React from "react";
import "./VgThreeDotMenu.scss";
export interface VgThreeDotProps {
    OnClick?: (e: React.MouseEvent<HTMLInputElement> | string | MenuItem, event?: any) => void;
    OnThreeDotMenuClick?: (e: React.MouseEvent<HTMLInputElement> | string | MenuItem, isOpen: boolean) => void;
    Items?: MenuItem[];
    MenuOptions?: "Icon" | "ThreeDot" | "TextBox" | "TextBoxWithBorder" | "CustomMenu";
    IconSVG?: string | any;
    MenuButtonPosition?: string;
    ThreeDotMenuOpenPosition?: "Right" | "Left";
    TextValue?: string | number;
    TextboxPrefixValue?: string;
    Cursor?: boolean;
    OnTextClick?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any) => void;
    OnTextChange?: (value: string) => void;
    OnTextBlur?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any) => void;
    OnTextKeyUp?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any) => void;
    OnTextKeyDown?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any) => void;
    OnTextKeypress?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any) => void;
    OnTextFoucus?: (e: React.MouseEvent<HTMLInputElement> | string, value?: any) => void;
    TextMaxLength?: number;
    SelectedItem?: MenuItem;
    MenuOpen?: boolean;
    CustomMenuRender?: React.ReactNode | JSX.Element | (() => React.ReactNode);
    Disabled?: boolean;
}
interface MenuItem {
    id?: string;
    label?: string;
    icon?: string;
    disabled?: boolean;
    percentage?: string;
    [key: string]: any;
}
declare const VgThreeDotMenu: React.FC<VgThreeDotProps>;
export default VgThreeDotMenu;
