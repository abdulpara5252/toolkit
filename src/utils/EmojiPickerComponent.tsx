import 'emoji-picker-element';
import React, { useEffect } from 'react';
import './EmpojipickerComponent.css';

interface EmojiPickerProps {
  onEmojiClick: (evt: any) => void;
  setShowEmojiPicker: (value: React.SetStateAction<boolean>) => void
  containerClass?: string
}

const Picker = React.forwardRef<any, any>(({ onEmojiSelect }, ref: any) => {

  React.useEffect(() => {
    if (!ref || !(ref as React.MutableRefObject<any>).current) return
    ref?.current.addEventListener('emoji-click', (event: any) => {
      onEmojiSelect(event)
    })
    ref.current.skinToneEmoji = '👍'
  }, [ref])

  return React.createElement('emoji-picker', { ref, class: "dark" })

})

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({ onEmojiClick, setShowEmojiPicker, containerClass }) => {
  const emojiRef = React.useRef<any>(null);
  const pickerRef = React.useRef<any>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `

          .picker {
            --background: var(--bkg_neutral_default);
            z-index: 999999;
          }
          button.emoji:hover,
          div.nav-emoji:hover{
            // background: transparent
          }
          .search-row,
          .pad-top {
            display: none;
          }
`
    emojiRef?.current?.shadowRoot.appendChild(style);
    function handleClickOutside(event: any) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={pickerRef}
      className={containerClass ?? ''}
    >
      <Picker ref={emojiRef} onEmojiSelect={onEmojiClick} />
    </div>
  )
}

export default EmojiPickerComponent;

// const EmojiPickerComponent = ({ onEmojiSelect }: { onEmojiSelect: (emoji: string) => void }) => {
//   const pickerRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     if (!pickerRef.current) {
//       const picker = document.createElement('emoji-picker');
//       picker.addEventListener('emoji-click', (event: any) => {
//         event?.stopPropagation()
//         onEmojiSelect(event.detail.unicode);
//       });
//       document.body.appendChild(picker);
//       pickerRef.current = picker;
//     }
//     return () => {
//       if (pickerRef.current) {
//         pickerRef.current.remove();
//       }
//     };
//   }, [onEmojiSelect]);

//   return null; // Since the picker is appended to the body, we don't need to return JSX
// };
