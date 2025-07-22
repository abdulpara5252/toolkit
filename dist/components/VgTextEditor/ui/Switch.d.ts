import * as React from 'react';
export default function Switch({ checked, onClick, text, id, }: Readonly<{
    checked: boolean;
    id?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    text: string;
}>): JSX.Element;
