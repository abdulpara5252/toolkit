import React from 'react';
import './VgRadio.scss';
interface RadioData {
    id?: number;
    title?: string;
    description?: string;
    icon?: any;
    htmlRender?: React.ReactNode;
}
export interface VgRadioProps {
    RowData: RadioData[];
    RadioId: string;
    Variants: 'Normal' | 'SquareBlock';
    OnChange?: (selectedIndex: number, selectedData: RadioData) => void;
    Title: string;
    selectedIndex?: number | null;
    RadioVariant?: 'horizontal' | 'vertical';
    RadioTickMark?: 'dot' | 'tickMark';
    Required?: boolean;
    CustomErrorMessage?: string;
}
interface VgRadioRef {
    validate: () => any;
}
declare const VgRadio: React.ForwardRefExoticComponent<VgRadioProps & React.RefAttributes<VgRadioRef>>;
export default VgRadio;
