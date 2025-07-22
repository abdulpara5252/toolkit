import 'emoji-picker-element';
import React from 'react';
import './EmpojipickerComponent.css';
interface EmojiPickerProps {
    onEmojiClick: (evt: any) => void;
    setShowEmojiPicker: (value: React.SetStateAction<boolean>) => void;
    containerClass?: string;
}
declare const EmojiPickerComponent: React.FC<EmojiPickerProps>;
export default EmojiPickerComponent;
