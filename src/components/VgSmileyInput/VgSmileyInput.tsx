import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react'
import './VgSmileyInput.scss'
import EmojiPickerComponent from "../../utils/EmojiPickerComponent";
import Portal from '../../common/Portal';
import { PortalEnum } from '../../utils/utils';

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

interface VgSmileyInputRef {
    validate: () => any;
}

const VgSmileyInput: React.FC<VgSmileyInputProps> = forwardRef<
    VgSmileyInputRef,
    VgSmileyInputProps
>(
    (
        {
            Placeholder="Type a message...",
            InputId,
            OnBlur,
            OnChange,
            OnFocus,
            OnKeyUp,
            SetValue,
            Name,
            OnEmojiClick,
            OnSendButtonClick,
            SmileyIcon
        },
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const btnRef = React.useRef<HTMLButtonElement>(null);

        const [inputValue, setInputValue] = useState<string>(SetValue ?? "");
        const [showEmojiPicker, setShowEmojiPicker] = useState(false);
        const handleChange = (e: ChangeEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>) => {
            setShowEmojiPicker(false);
            let value: string = (e.target as HTMLInputElement).value;
            setInputValue(value);
            if (OnChange) {
                OnChange(e as ChangeEvent<HTMLInputElement>)
            }
        }
        const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (OnKeyUp) {
                OnKeyUp(e)
            } if (e.key === 'Enter') {
                handleSend(e)
                setShowEmojiPicker(false);
            }
        }

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            if (OnBlur) {
                OnBlur(e)
            }
        }
        const handleDropIn = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (OnFocus) {
                OnFocus(e)
            }
        };

        const onEmojiClick = (emojiData: any) => {
            const emoji = emojiData?.detail?.unicode;
            const input = inputRef.current;
            if (!input || !emoji) return;
            const selectionStart = input.selectionStart || 0;
            const selectionEnd = input.selectionEnd || 0;
            const textBefore = inputValue.slice(0, selectionStart);
            const textAfter = inputValue.slice(selectionEnd);
            const newValue = textBefore + emoji + textAfter;
            setInputValue(newValue);
            const cursorPos = textBefore.length + emoji.length;
            setTimeout(() => {
                input.focus();
                input.setSelectionRange(cursorPos, cursorPos);
            }, 0);
        };

        const handleSend = (e: any) => {
            if (OnSendButtonClick) {
                OnSendButtonClick(e, inputValue)
            }
            setInputValue("")
        }

        useEffect(() => {
            const picker = document.querySelector('emoji-picker');
            if(picker){
                picker.addEventListener("emoji-click", onEmojiClick);
            }
              return () => {
                if(picker){

                    picker.removeEventListener("emoji-click", onEmojiClick);
                }
              };

          }, [inputValue]);

        useEffect(() => {
            setInputValue(SetValue ?? '');
        }, [SetValue]);

        return (
            <div
                className={`vg-smiley-input-control-group`}
            >
                <div className='vg-smiley-input-container'>
                    <div className='vg-smiley-input'>
                        <input
                            type={"text"}
                            placeholder={Placeholder}
                            value={inputValue}
                            className={`vg-smiley-input-control`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={Name}
                            onFocus={handleDropIn}
                            autoComplete="off"
                            onKeyUp={handleKeyUp}
                            ref={inputRef}
                            id={InputId}
                        />
                        <div className="vg-smiley-input-emoji-picker-container">
                            {SmileyIcon &&  
                            <button
                                className="vg-smiley-input-action-btn"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e?.stopPropagation()
                                    setShowEmojiPicker(!showEmojiPicker);
                                    if (OnEmojiClick) {
                                        OnEmojiClick(e)
                                    }
                                }}
                                onKeyUp={() => setShowEmojiPicker(!showEmojiPicker)}
                                ref={btnRef}
                            >
                                <svg viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" />
                                    <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" />
                                    <path d="M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z" />
                                </svg>
                            </button>
                            }
                            {showEmojiPicker && (
                                <Portal inputRef={inputRef} type={PortalEnum.smileyPicker}>
                                    
                                <EmojiPickerComponent onEmojiClick={onEmojiClick} setShowEmojiPicker={setShowEmojiPicker}/>

                              </Portal>
                            )}
                        </div>
                    </div>
                    <div className='vg-smiley-input-send-btn' onClick={handleSend} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='#3e8438'><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM297 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L120 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l214.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L409 239c9.4 9.4 9.4 24.6 0 33.9L297 385z"/></svg>
                    </div>
                </div>
            </div>
        )
    }
);

export default VgSmileyInput