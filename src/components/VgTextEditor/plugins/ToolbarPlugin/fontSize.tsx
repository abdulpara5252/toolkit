import React, { useCallback } from 'react';
import { LexicalEditor, $getSelection } from 'lexical';
import { $patchStyleText } from '@lexical/selection';
import DropDown, { DropDownItem } from '../../ui/DropDown';

function FontSize({
  editor,
  value,
  style,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
  disabled?: boolean;
}): JSX.Element {
  const handleClick = useCallback(
    (option: number) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          // Applying the font size with 'px' appended
          $patchStyleText(selection, {
            [style]: `${option}px`,
          });
        }
      });
    },
    [editor, style],
  );

  const FONT_SIZE_OPTIONS: [number, string][] = [
    [8, '8'],
    [9, '9'],
    [10, '10'],
    [11, '11'],
    [12, '12'],
    [14, '14'],
    [16, '16'],
    [18, '18'],
    [20, '20'],
    [22, '22'],
    [24, '24'],
    [26, '26'],
    [28, '28'],
    [36, '36'],
    [48, '48'],
    [72, '72'],
  ];

  const buttonAriaLabel =
    style === 'font-family'
      ? 'Formatting options for font family'
      : 'Formatting options for font size';

  // Render the dropdown with the correct options based on font-family or font-size style
  const options = FONT_SIZE_OPTIONS;

  return (
    <DropDown
      disabled={disabled}
      buttonClassName={'toolbar-item ' + style}
      buttonLabel={value.replace('px', '')} 
      buttonIconClassName={'font-size'} // This could be a more specific icon based on style
      buttonAriaLabel={buttonAriaLabel}
    >
      {options.map(([option, text]) => (
        <DropDownItem
          className={`item ${value === `${option}px` ? 'active' : ''} ${
            style === 'font-size' ? 'fontsize-item' : ''
          }`}
          onClick={() => handleClick(option)}
          key={option}
        >
          <span className="text"  style={{ fontSize: style === 'font-size' ? option : '14px' }}>
{text}
          </span>
          
        </DropDownItem>
      ))}
    </DropDown>
  );
}

export default FontSize;
