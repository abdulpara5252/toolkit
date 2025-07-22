import React, { useEffect, useRef } from 'react';
import { 
  useLexicalComposerContext 
} from '@lexical/react/LexicalComposerContext';
import { 
  $getRoot, 
  $createParagraphNode, 
  $createTextNode 
} from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

const SetDefaultValuePlugin = ({ 
  defaultValue, 
  onChange 
}: { 
  defaultValue: string, 
  // onChange?: (value: string) => void 
  onChange?: (data: { html: string; text: string }) => void; // Updated type
}) => {
  const [editor] = useLexicalComposerContext();
  const prevValueRef = useRef<string | null>(null);
  const isUserTyping = useRef(false);
  const initialRenderRef = useRef(true);

  // Track user typing
  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const textContent = root.getTextContent().trim();
        
        // Detect if user has typed something different from initial value
        if (
          textContent !== prevValueRef.current && 
          textContent.length > 0 && 
          !initialRenderRef.current
        ) {
          isUserTyping.current = true;
          
          // Optional: Call onChange if provided
          if (onChange) {
            // onChange(textContent);
            const html = $generateHtmlFromNodes(editor, null);
            const text = root.getTextContent();
            onChange({ html, text });
          }
        }
      });
    });

    return () => {
      removeUpdateListener();
    };
  }, [editor, onChange]);

  // Update editor when defaultValue changes
  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      
      // Only set default value if:
      // 1. It's the initial render, or
      // 2. User hasn't typed anything manually
      if (initialRenderRef.current || !isUserTyping.current) {
        root.clear();
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(defaultValue));
        root.append(paragraph);
        
        prevValueRef.current = defaultValue;
      }

      // Reset initial render flag
      if (initialRenderRef.current) {
        initialRenderRef.current = false;
      }
    });
  }, [editor, defaultValue]);

  return null;
};

export default SetDefaultValuePlugin;