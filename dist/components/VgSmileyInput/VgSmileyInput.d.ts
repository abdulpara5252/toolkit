import React from 'react';
import './VgSmileyInput.scss';
export interface VgSmileyInputProps {
    Placeholder?: string;
    InputId?: string;
    OnBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    OnEmojiClick?: (e: any) => void;
    OnSendButtonClick?: (e: any, inputValue: string) => void;
    SetValue?: string;
    Name?: string;
    SmileyIcon?: boolean;
    [key: string]: any;
}
declare const VgSmileyInput: React.FC<VgSmileyInputProps>;
export default VgSmileyInput;
