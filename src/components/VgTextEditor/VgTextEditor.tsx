import { $createLinkNode } from '@lexical/link';
import { $createListItemNode, $createListNode } from '@lexical/list';
import { InitialEditorStateType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isTextNode,
  DOMConversionMap,
  TextNode
} from 'lexical';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FlashMessageContext } from './context/FlashMessageContext';
import { SettingsContext, useSettings } from './context/SettingsContext';
import { SharedAutocompleteContext } from './context/SharedAutocompleteContext';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import { ToolbarContext } from './context/ToolbarContext';
import Format from './Format';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import { TableContext } from './plugins/TablePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import { parseAllowedColor } from './ui/ColorPicker';
import './VgTextEditor.scss';
import { LexicalEditor } from "lexical";
import { useEffect } from 'react';

console.warn(
  'If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.',
);

function $prepopulatedRichText() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode('h1');
    heading.append($createTextNode('Welcome to the playground'));
    root.append(heading);
    const quote = $createQuoteNode();
    quote.append(
      $createTextNode(
        `In case you were wondering what the black box at the bottom is – it's the debug view, showing the current state of the editor. ` +
        `You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.`,
      ),
    );
    root.append(quote);
    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode('The playground is a demo environment built with '),
      $createTextNode('@lexical/react').toggleFormat('code'),
      $createTextNode('.'),
      $createTextNode(' Try typing in '),
      $createTextNode('some text').toggleFormat('bold'),
      $createTextNode(' with '),
      $createTextNode('different').toggleFormat('italic'),
      $createTextNode(' formats.'),
    );
    root.append(paragraph);
    const paragraph2 = $createParagraphNode();
    paragraph2.append(
      $createTextNode(
        'Make sure to check out the various plugins in the toolbar. You can also use #hashtags or @-mentions too!',
      ),
    );
    root.append(paragraph2);
    const paragraph3 = $createParagraphNode();
    paragraph3.append(
      $createTextNode(`If you'd like to find out more about Lexical, you can:`),
    );
    root.append(paragraph3);
    const list = $createListNode('bullet');
    list.append(
      $createListItemNode().append(
        $createTextNode(`Visit the `),
        $createLinkNode('https://lexical.dev/').append(
          $createTextNode('Lexical website'),
        ),
        $createTextNode(` for documentation and more information.`),
      ),
      $createListItemNode().append(
        $createTextNode(`Check out the code on our `),
        $createLinkNode('https://github.com/facebook/lexical').append(
          $createTextNode('GitHub repository'),
        ),
        $createTextNode(`.`),
      ),
      $createListItemNode().append(
        $createTextNode(`Playground code can be found `),
        $createLinkNode(
          'https://github.com/facebook/lexical/tree/main/packages/lexical-playground',
        ).append($createTextNode('here')),
        $createTextNode(`.`),
      ),
      $createListItemNode().append(
        $createTextNode(`Join our `),
        $createLinkNode('https://discord.com/invite/KmG4wQnnD9').append(
          $createTextNode('Discord Server'),
        ),
        $createTextNode(` and chat with the team.`),
      ),
    );
    root.append(list);
    const paragraph4 = $createParagraphNode();
    paragraph4.append(
      $createTextNode(
        `Lastly, we're constantly adding cool new features to this playground. So make sure you check back here when you next get a chance :).`,
      ),
    );
    root.append(paragraph4);
  }
}

function getExtraStyles(element: HTMLElement): string {
  let extraStyles = '';
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);

  if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== '' && color !== 'rgb(0, 0, 0)') {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
}

function buildImportMap(): DOMConversionMap {
  const importMap: DOMConversionMap = {};

  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
}
export interface VgTextEditorProps {
  Title?: string;
  Style?: boolean;
  PlaceHolder?: string;
  OnChange?: (e: any) => void;
  OnClickCancle?: () => void;
  OnClickClose?: () => void;
  OnClickUseThisText?: (e: any) => void;
  OnChangeRange?: (e: any) => void;
  OnChangeTone?: (e: any) => void;
  OnClickNext?: (e: any) => void;
  OnClickPrevious?: (e: any) => void;
  OnClickRegenerate?: (e: any) => void;
  AiControlPopup: boolean,
  MaximumLength?: number;
  MaximumLengthForAi?: number;
  ToolbarRawData?: {
    Fontfamily: boolean;
    Fontsize: boolean;
    Bold: boolean;
    Fontcolor: boolean;
    BackgroundColor: boolean;
    Link: boolean;
    Underline: boolean;
    Alignment: boolean;
    Italic: boolean;
    Strikethrough: boolean;
    Clear: boolean;
    InsertNames: boolean;
    Undo: boolean;
    Redo: boolean;
    NumberListButton: boolean;
    BulletListButton: boolean;
  };
  ToneMetadata?: any,
  RawData?: Array<{
    Index: number;
    InputDescription: string;
    Tone: string;
    Range: number;
  }>;
  SetValue?: string;
}

interface VgTextEditorRef {
  validate: () => any;
}

const Editor: React.FC<VgTextEditorProps> = ({ ToolbarRawData = {
  Fontfamily: true,
  Fontsize: true,
  Bold: true,
  Fontcolor: true,
  BackgroundColor: true,
  Link: true,
  Underline: true,
  Alignment: true,
  Strikethrough: true,
  Clear: true,
  Italic: true,
  InsertNames: true,
  Undo: false,
  Redo: false,
  NumberListButton: false,
  BulletListButton: false
},
  RawData,
  Title = 'Description',
  Style = true,
  PlaceHolder = '',
  MaximumLength,
  MaximumLengthForAi,
  OnChange,
  OnClickCancle,
  OnClickClose,
  OnClickUseThisText,
  OnChangeRange,
  OnChangeTone,
  OnClickNext,
  OnClickPrevious,
  OnClickRegenerate,
  AiControlPopup,
  SetValue = '',
  ToneMetadata
}) => {
  const {
    settings: { isCollab, emptyEditor, },
  } = useSettings();
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorData, setEditorData] = useState<InitialEditorStateType>(null)
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const initialConfig = {
    editorState: isCollab ? null : emptyEditor ? editorData : $prepopulatedRichText,
    html: { import: buildImportMap() },
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  const handleFocus = () => {
    setIsFocused(true);
    const editorElement = editorRef.current;

    if (editorElement) {
      editorElement.classList.add('show-tool');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const editorElement = editorRef.current;
    if (editorElement) {
      const spanElement = editorElement.querySelector('span[data-lexical-text="true"]');
      if (editorElement && spanElement) {
        editorElement.classList.add('show-tool');
      }
      else {
        editorElement.classList.remove('show-tool');
      }
    }
  }


useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("focus", handleFocus);
      editor.addEventListener("blur", handleBlur);
    }
    return () => {
      if (editor) {
        editor.removeEventListener("focus", handleFocus);
        editor.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <ToolbarContext>
                {Title?.length > 0 && (
                  <div className="vg-input-label">{Title}</div>
                )}
                <div
                  className="vg-texteditor-shell"
                  ref={editorRef}
                  tabIndex={0}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <Format
                    setSubmit={setSubmit}
                    isSubmit={isSubmit}
                    ToolbarRawData={ToolbarRawData}
                    MaximumLength={MaximumLength}
                    MaximumLengthForAi={MaximumLengthForAi}
                    RawData={RawData}
                    SetValue={SetValue}
                    Title={Title}
                    Style={Style}
                    PlaceHolder={PlaceHolder}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    AiControlPopup={AiControlPopup}
                    setEditorData={setEditorData}
                    editorData={editorData}
                    OnChange={OnChange}
                    OnClickUseThisText={OnClickUseThisText}
                    OnClickClose={OnClickClose}
                    OnClickCancle={OnClickCancle}
                    OnChangeTone={OnChangeTone}
                    OnChangeRange={OnChangeRange}
                    OnClickPrevious={OnClickPrevious}
                    OnClickNext={OnClickNext}
                    OnClickRegenerate={OnClickRegenerate}
                    ToneMetadata={ToneMetadata}
                  />
                </div>
                {errorMessage && (
                  <div className="info-ai-text">{errorMessage}</div>
                )}
              </ToolbarContext>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </>
  );
};
export const VgTextEditor = forwardRef<VgTextEditorRef, VgTextEditorProps>(
  ({
    Title,
    ToolbarRawData,
    MaximumLength,
    MaximumLengthForAi,
    RawData,
    SetValue,
    Style,
    OnChange,
    AiControlPopup,
    OnChangeTone,
    OnClickRegenerate,
    OnChangeRange,
    OnClickUseThisText,
    OnClickNext,
    OnClickPrevious,
    OnClickCancle,
    OnClickClose,
    PlaceHolder,
    ToneMetadata
  }, ref) => {
    const validation = () => ({
      isValid: true,
    });

    useImperativeHandle(ref, () => ({
      validate: validation,
    }));

    return (
      <SettingsContext>
        <FlashMessageContext>
          <Editor
            ToolbarRawData={ToolbarRawData}
            RawData={RawData}
            Title={Title}
            SetValue={SetValue}
            AiControlPopup={AiControlPopup} 
            OnChangeTone = {OnChangeTone}
            OnChangeRange={OnChangeRange}
            OnClickRegenerate={OnClickRegenerate}
            OnClickUseThisText={OnClickUseThisText}
            OnChange={OnChange}
            OnClickNext={OnClickNext}
            OnClickCancle={OnClickCancle}
            OnClickClose={OnClickClose}
            OnClickPrevious={OnClickPrevious}
            MaximumLength={MaximumLength}
            MaximumLengthForAi={MaximumLengthForAi}
            PlaceHolder={PlaceHolder}
            ToneMetadata={ToneMetadata}
            />
        </FlashMessageContext>
      </SettingsContext>
    );
  }
);
export default VgTextEditor;










