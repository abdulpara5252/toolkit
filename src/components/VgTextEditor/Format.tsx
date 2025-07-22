import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $generateNodesFromDOM } from '@lexical/html';


import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useSettings } from './context/SettingsContext';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import AutocompletePlugin from './plugins/AutocompletePlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import LinkPlugin from './plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import ContentEditable from './ui/ContentEditable';
import './VgTextEditor.scss';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import VgAiPopup from '../VgAiPopup/VgAiPopup';
import { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import VgButton from '../VgButton/VgButton';
import { use } from 'video.js/dist/types/tech/middleware';
import SetDefaultValuePlugin from './SetDefaultValuePlugin';

interface FormatProps {
  Title: string,
  Style: boolean,
  PlaceHolder: string,
  OnChange?: (e: any) => void;
  OnClickCancle?: () => void;
  OnClickClose?: () => void;
  OnClickUseThisText?: (e: any) => void;
  OnChangeRange?: (e: any) => void;
  OnChangeTone?: (e: any) => void;
  OnClickNext?: (e: any) => void;
  OnClickPrevious?: (e: any) => void;
  OnClickRegenerate?: (e: any) => void;
  SetValue: string,
  AiControlPopup: boolean,
  isSubmit?: boolean;
  setSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
  ToolbarRawData: {
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
    Redo: boolean,
    NumberListButton: boolean;
    BulletListButton: boolean;
  };
  RawData?: Array<{
    Index: number;
    InputDescription: string;
    Tone: string;
    Range: number;
  }>,
  ToneMetadata?: [],
  setEditorData: React.Dispatch<React.SetStateAction<InitialEditorStateType>>
  editorData: InitialEditorStateType,
  AutoFocus?: boolean,
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  MaximumLength?: number;
  MaximumLengthForAi?: number;
}

function MyOnChangePlugin({ onChange }: any) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export default function Format({
  Title,
  Style,
  PlaceHolder,
  AiControlPopup = false,
  OnChange,
  OnChangeTone,
  OnClickRegenerate,
  OnChangeRange,
  OnClickUseThisText,
  OnClickCancle,
  OnClickClose,
  OnClickNext,
  OnClickPrevious,
  SetValue,
  ToolbarRawData = {
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
  }, setEditorData,
  RawData,
  errorMessage,
  setErrorMessage,
  MaximumLength,
  MaximumLengthForAi,
  ToneMetadata,
  isSubmit = false,
  setSubmit,
  editorData, AutoFocus }: FormatProps): JSX.Element {
  const { historyState } = useSharedHistoryContext();
  const {
    settings: {
      isCollab,
      isAutocomplete,
      isMaxLength,
      hasLinkAttributes,
      isRichText,
      showTreeView,
      showTableOfContents,
      tableCellMerge,
      tableCellBackgroundColor,
    },
  } = useSettings();
  const placeholder: any = isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
      ? <>
        {/* <Svg name="vagaroai" /> */}
        {PlaceHolder}
      </>
      : <>
        {/* <Svg name="vagaroai" /> */}
        {'Enter description'}
      </>
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState<any>(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'text' | 'style'>('text');
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  const [defaultValue, setDefaultValue] = useState('Initial default text');

  useEffect(() => {
    setDefaultValue(SetValue)
  },[SetValue])
  const handleEditorChange = (editorState: any) => {
    // let text = '';
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
  
    //   if (text.length > MaximumLength) {
    //     const truncatedText = text.slice(0, MaximumLength);
  
    //     editor.update(() => {
    //       const newRoot = $getRoot();
    //       newRoot.clear();
  
    //       const paragraphNode = $createParagraphNode();
    //       const textNode = $createTextNode(truncatedText);
    //       paragraphNode.append(textNode);
    //       newRoot.append(paragraphNode);
    //     });
    //   }
    });
  };

  const [hovered, setHovered] = useState<boolean>(false);
  const [aiPopup, setAiPopup] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setAiPopup(true);
    // const editorElement = editorRef.current;
    // if (editorElement) {
      const spanElement = document.querySelector('span[data-lexical-text="true"]');
      if (!spanElement) {
        setAiPopup(false);
        setErrorMessage("In this instance, we need more details before Vagaro AI can generate text for you.");
        console.log('formatttttttt')
        console.log(spanElement, 'span')
      }
    // }
  }


  const onChangeRange = (e: any) => {
    if (OnChangeRange) {
      OnChangeRange(e)
    }
  }
  
  const onClickCancle = () => {
    setAiPopup(false);
    if (OnClickCancle) {
      OnClickCancle()
    }
  }

  const onClickClose = () => {
    setAiPopup(false);
    if (OnClickClose) {
      OnClickClose()
    }
  }

  const onChangeTone = (e: any) => {
    if (OnChangeTone) {
      OnChangeTone(e)
    }
  }

  const onClickRegenerate = (e: any) => {
    if (OnClickRegenerate) {
      OnClickRegenerate(e)
    }
  }

  const onClickUseThisText = (e: any) => {
    setAiPopup(false);
    if (OnClickUseThisText) {
      OnClickUseThisText(e)
    }
  }

  const onClickPrevious = (e: any) => {
    if (OnClickPrevious) {
      OnClickPrevious(e)
    }
  }

  const onClickNext = (e: any) => {
    if (OnClickNext) {
      OnClickNext(e)
    }
  }

  const handleChange = (e: any) => {
    if (errorMessage) { setErrorMessage(""); }
    if(OnChange){
      OnChange(e);
    }
    // const spanElement = document.querySelector('span[data-lexical-text="true"]');
    // if (spanElement) {
    //   const currentText = spanElement.textContent || ""; // Get the text content
    //   if (currentText.length > MaximumLength) {
    //     spanElement.textContent = currentText.slice(0, MaximumLength); // Truncate the text
    //   }
    // }
  }

  useEffect(() => {
    if (!SetValue) return;

    editor.update(() => {
      const root = $getRoot();
      root.clear();

      const isHtml = /<\/?[a-z][\s\S]*>/i.test(SetValue);

      if (isHtml) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(SetValue, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        root.append(...nodes);
      } else {
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(SetValue));
        root.append(paragraph);
      }
    });
  }, [SetValue]);

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (rootElement && AutoFocus) {
      rootElement.focus();
      rootElement.scrollIntoView()
    }
  }, [])


  // const SetDefaultValuePlugin = ({ defaultValue }: { defaultValue: string }) => {
  //   const [editor] = useLexicalComposerContext();
  //   const prevValueRef = useRef<string | null>(null); // Store previous default value
  //   const isUserTyping = useRef(false); // Track user input
  
  //   // Track if the user has typed
  //   useEffect(() => {
  //     return editor.registerUpdateListener(({ editorState }) => {
  //       editorState.read(() => {
  //         const root = $getRoot();
  //         const textContent = root.getTextContent().trim();
          
  //         // If content is different from defaultValue, user has typed
  //         if (textContent !== prevValueRef.current && textContent.length > 0) {
  //           isUserTyping.current = true;
  //         }
  //       });
  //     });
  //   }, [editor]);
  
  //   // Update editor when defaultValue changes, but don't overwrite user input
  //   useEffect(() => {
  //     editor.update(() => {
  //       const root = $getRoot();
        
  //       // If the user has typed, do NOT override content
  //       if (isUserTyping.current) return;
  
  //       root.clear();
  //       const paragraph = $createParagraphNode();
  //       paragraph.append($createTextNode(defaultValue));
  //       root.append(paragraph);
  //       prevValueRef.current = defaultValue; // Store last applied defaultValue
  //     });
  //   }, [editor, defaultValue]);
  
  //   return null;
  // };
  
  return (
    <>
      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''} ${!isRichText ? 'plain-text' : ''
          }`}>
        {MaximumLength && <MaxLengthPlugin maxLength={MaximumLength} />}
        <AutoFocusPlugin />
        <AutoLinkPlugin />
        {isRichText ? (
          <>
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className={`editor ${hovered ? "vg-active-ai-button" : ""}`}
                    ref={onRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <ContentEditable placeholder={placeholder}  />
                    <div className='vg-texteditor-Ai-icon'>

                      {AiControlPopup &&
                        <VgButton
                          ButtonVariant="AiWithIcon"
                          ButtononClick={handleClick}
                          ButtononHover={() => { }}
                        >
                          Button
                        </VgButton>
                      }

                      {aiPopup &&
                        <VgAiPopup
                          setSubmit={setSubmit}
                          isSubmit={isSubmit}
                          AiControlId="AiControlId"
                          CloseBackTitle="From Control"
                          Footer={2}
                          Name=""
                          NativeAction={13}
                          MaximumLength={MaximumLengthForAi}
                          OnClickCancle={onClickCancle}
                          OnChangeRange={(e) => onChangeRange(e)}
                          OnChangeTone={(e) => onChangeTone(e)}
                          OnClickClose={onClickClose}
                          OnClickNext={(e) => onClickNext(e)}
                          OnClickPrevious={(e) => onClickPrevious(e)}
                          OnClickRegenerate={(e) => onClickRegenerate(e)}
                          OnClickUseThisText={(e) => onClickUseThisText(e)}
                          RawData={[
                            {
                              Index: 0,
                              InputDescription: 'I am salon professional Nikunj sir',
                              Range: 100,
                              Tone: "energetic",
                            },
                            {
                              Index: 1,
                              InputDescription: 'I am salon professional Sagar Battul',
                              Range: 75,
                              Tone: 'trendy'
                            },
                            {
                              Index: 2,
                              InputDescription: 'I am salon professional The issue arises from the fact that when you\'re updating the history in your',
                              Range: 25,
                              Tone: 'casual'
                            },
                            {
                              Index: 3,
                              InputDescription: 'I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.',
                              Range: 50,
                              Tone: 'motivational'
                            },
                            {
                              Index: 4,
                              InputDescription: 'I am salon professional Sagar Battul',
                              Range: 0,
                              Tone: 'professional'
                            }
                          ]}
                          TimerCount={0}
                          ToneMetadata={ToneMetadata}
                          VagaroToolkit={1} Disable={false} />
                      }

                    </div>
                  </div>
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
             
            <OnChangePlugin onChange={handleEditorChange} />
            <SetDefaultValuePlugin
              defaultValue={defaultValue}
              onChange={handleChange}
            />
            <CodeHighlightPlugin />
            <ListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <TablePlugin
              hasCellMerge={tableCellMerge}
              hasCellBackgroundColor={tableCellBackgroundColor}
            />
            <LinkPlugin hasLinkAttributes={hasLinkAttributes} />
            <CollapsiblePlugin />
            <MyOnChangePlugin onChange={((editor: any) => {
              setEditorData(JSON.stringify(editor.toJSON()));
            })} />
            <HistoryPlugin externalHistoryState={historyState} />
          </>

        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable placeholder={placeholder} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {floatingAnchorElem && (
          <>
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          </>
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
      </div>

      {isRichText && (
        <ToolbarPlugin
          editor={editor}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          setIsLinkEditMode={setIsLinkEditMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          RawData={RawData}
          ToolbarRawData={ToolbarRawData} isEditable={false} floatingAnchorElem={null} setFloatingAnchorElem={function (value: SetStateAction<HTMLDivElement | null>): void {
            throw new Error('Function not implemented.');
          }} isSmallWidthViewport={false} setIsSmallWidthViewport={function (value: SetStateAction<boolean>): void {
            throw new Error('Function not implemented.');
          }} />
      )}

      <div className='insert-formobile-section'>
        <div>Insert First Name</div>
        <div>Insert First & Last</div>
        <span className='insert-formobile-icon'>
          {AiControlPopup &&
            <VgButton
              ButtonVariant="AiWithIcon"
              ButtononClick={handleClick}
              ButtononHover={() => { }}
            >
              Button
            </VgButton>
          }
          {aiPopup &&
            <VgAiPopup
              setSubmit={setSubmit}
              isSubmit={isSubmit}
              AiControlId="AiControlId"
              CloseBackTitle="From Control"
              Footer={2}
              Name=""
              MaximumLength={MaximumLengthForAi}
              NativeAction={13}
              OnClickCancle={onClickCancle}
              OnChangeRange={(e) => onChangeRange(e)}
              OnChangeTone={(e) => onChangeTone(e)}
              OnClickClose={onClickClose}
              OnClickNext={(e) => onClickNext(e)}
              OnClickPrevious={(e) => onClickPrevious(e)}
              OnClickRegenerate={(e) => onClickRegenerate(e)}
              OnClickUseThisText={(e) => onClickUseThisText(e)}
              RawData={[
                {
                  Index: 0,
                  InputDescription: 'I am salon professional Nikunj sir',
                  Range: 100,
                  Tone: 'energetic'
                },
                {
                  Index: 1,
                  InputDescription: 'I am salon professional Sagar Battul',
                  Range: 75,
                  Tone: 'trendy'
                },
                {
                  Index: 2,
                  InputDescription: 'I am salon professional The issue arises from the fact that when you\'re updating the history in your',
                  Range: 25,
                  Tone: 'casual'
                },
                {
                  Index: 3,
                  InputDescription: 'I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.',
                  Range: 50,
                  Tone: 'motivational'
                },
                {
                  Index: 4,
                  InputDescription: 'I am salon professional Sagar Battul',
                  Range: 0,
                  Tone: 'professional'
                }
              ]}
              TimerCount={0}
              ToneMetadata={ToneMetadata}
              VagaroToolkit={1} Disable={false} />
          }
        </span>
      </div>
    </>
  );
}