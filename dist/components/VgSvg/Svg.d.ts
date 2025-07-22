import React from 'react';
export declare const svgIconNames: string[];
export interface SvgProps extends React.HTMLAttributes<HTMLSpanElement> {
    name: string;
    width?: number | string | null;
    height?: number;
}
declare const Svg: React.FC<SvgProps>;
export default Svg;
