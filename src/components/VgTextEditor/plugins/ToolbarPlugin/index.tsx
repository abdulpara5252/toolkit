import {
	$isCodeNode,
	CODE_LANGUAGE_FRIENDLY_NAME_MAP,
	CODE_LANGUAGE_MAP,
	getLanguageFriendlyName,
} from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import VgColorPicker from "../../../VgColorPicker/VgColorPicker";
import VgInput from "../../../VgTextbox/VgTextbox";

import {
	$getSelectionStyleValueForProperty,
	$isParentElementRTL,
	$patchStyleText,
} from "@lexical/selection";
import { $isTableNode, $isTableSelection } from "@lexical/table";
import {
	$findMatchingParent,
	$getNearestNodeOfType,
	$isEditorIsNestedEditor,
	mergeRegister,
} from "@lexical/utils";
import {
	$getNodeByKey,
	$getSelection,
	$isElementNode,
	$isRangeSelection,
	$isRootOrShadowRoot,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	COMMAND_PRIORITY_CRITICAL,
	ElementFormatType,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	LexicalEditor,
	NodeKey,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
	REDO_COMMAND,
	OUTDENT_CONTENT_COMMAND,
	TextNode,
	$isTextNode,
	SELECTION_INSERT_CLIPBOARD_NODES_COMMAND,
	DELETE_LINE_COMMAND
} from "lexical";
import { $createTextNode, $insertNodes } from 'lexical';
import { Dispatch, useCallback, useEffect, useState } from "react";
import {
	blockTypeToBlockName,
	useToolbarState,
} from "../../context/ToolbarContext";
import useModal from "../../hooks/useModal";
import DropDown, { DropDownItem } from "../../ui/DropDown";
import DropdownColorPicker from "../../ui/DropdownColorPicker";
import { getSelectedNode } from "../../utils/getSelectedNode";
import { sanitizeUrl } from "../../utils/url";
import FontSize from "./fontSize";
import {
	clearFormatting,
	formatBulletList,
	formatHeading,
	formatNumberedList,
	formatParagraph,
} from "./utils";

const rootTypeToRootName = {
	root: "Root",
	table: "Table",
};


function getCodeLanguageOptions(): [string, string][] {
	const options: [any, any][] = [];

	for (const [lang, friendlyName] of Object.entries(
		CODE_LANGUAGE_FRIENDLY_NAME_MAP
	)) {
		options.push([lang, friendlyName]);
	}

	return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

const FONT_FAMILY_OPTIONS: [string, string][] = [
	["Arial", "Arial"],
	["Courier New", "Courier New"],
	["Georgia", "Georgia"],
	["Lucida Sans Unicode", "lucida sans unicode"],
	["Tahoma", "tahoma"],
	["Times New Roman", "Times New Roman"],
	["Trebuchet MS", "Trebuchet MS"],
	["Verdana", "Verdana"],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
	["10px", "10px"],
	["11px", "11px"],
	["12px", "12px"],
	["13px", "13px"],
	["14px", "14px"],
	["15px", "15px"],
	["16px", "16px"],
	["17px", "17px"],
	["18px", "18px"],
	["19px", "19px"],
	["20px", "20px"],
];

const INSERT_NAMES = [
	"First Name",
	"First Name and Last Name"
]

const options = [
	{
		label: 'Left Align',
		value: 'left',
		icon: <i className="icon left-align drop-svg no-space" />
	},
	{
		label: 'Center Align',
		value: 'center',
		icon: <i className="icon center-align drop-svg no-space" />
	},
	{
		label: 'Right Align',
		value: 'right',
		icon: <i className="icon right-align drop-svg no-space" />
	},
	{
		label: 'Justify Align',
		value: 'justify',
		icon: <i className="icon justify-align drop-svg no-space" />
	}
];

const formatOptions = [
	{ label: 'Bold', value: <i className="format drop-svg bold" /> },
	{ label: 'Italic', value: <i className="format drop-svg italic" /> },
	{ label: 'Underline', value: <i className="format drop-svg underline" /> },
	{ label: 'Strikethrough', value: <i className="icon drop-svg strikethrough" /> },
];

const INSERT_NAMES_OPTIONS: [string, string][] = INSERT_NAMES.map(name => [name, name]);

const ELEMENT_FORMAT_OPTIONS: {
	[key in Exclude<ElementFormatType, "">]: {
		icon: string;
		iconRTL: string;
		name: string;
	};
} = {
	center: {
		icon: "center-align",
		iconRTL: "center-align",
		name: "Center Align",
	},
	end: {
		icon: "right-align",
		iconRTL: "left-align",
		name: "End Align",
	},
	justify: {
		icon: "justify-align",
		iconRTL: "justify-align",
		name: "Justify Align",
	},
	left: {
		icon: "left-align",
		iconRTL: "left-align",
		name: "Left Align",
	},
	right: {
		icon: "right-align",
		iconRTL: "right-align",
		name: "Right Align",
	},
	start: {
		icon: "left-align",
		iconRTL: "right-align",
		name: "Start Align",
	},
};

function dropDownActiveClass(active: boolean) {
	if (active) {
		return "active dropdown-item-active";
	} else {
		return "";
	}
}

function BlockFormatDropDown({
	editor,
	blockType,
	disabled = false,
}: {
	blockType: keyof typeof blockTypeToBlockName;
	rootType: keyof typeof rootTypeToRootName;
	editor: LexicalEditor;
	disabled?: boolean;
}): JSX.Element {
	return (
		<DropDown
			disabled={disabled}
			buttonClassName="toolbar-item block-controls vg-textformatter-hide"
			buttonLabel={blockTypeToBlockName[blockType]}
			buttonAriaLabel="Formatting options for text style"
		>
			<DropDownItem
				className={
					"item wide " + dropDownActiveClass(blockType === "paragraph")
				}
				onClick={() => formatParagraph(editor)}
			>
				<div className="icon-text-container">
					<span className="text">Normal</span>
				</div>
			</DropDownItem>
			<DropDownItem
				className={"item wide " + dropDownActiveClass(blockType === "h1")}
				onClick={() => formatHeading(editor, blockType, "h1")}
			>
				<div className="icon-text-container">
					<h1 className="text">Heading 1</h1>
				</div>
			</DropDownItem>
			<DropDownItem
				className={"item wide " + dropDownActiveClass(blockType === "h2")}
				onClick={() => formatHeading(editor, blockType, "h2")}
			>
				<div className="icon-text-container">
					<h2 className="text">Heading 2</h2>
				</div>
			</DropDownItem>
			<DropDownItem
				className={"item wide " + dropDownActiveClass(blockType === "h3")}
				onClick={() => formatHeading(editor, blockType, "h3")}
			>
				<div className="icon-text-container">
					<h3 className="text">Heading 3</h3>
				</div>
			</DropDownItem>
		</DropDown>
	);
}

function Divider(): JSX.Element {
	return <div className="divider-line" />;
}

function FontDropDown({
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
		(option: string) => {
			editor.update(() => {
				const selection = $getSelection();
				if (selection !== null) {
					$patchStyleText(selection, {
						[style]: option,
					});
				}
			});
		},
		[editor, style]
	);

	const buttonAriaLabel =
		style === "font-family"
			? "Formatting options for font family"
			: "Formatting options for font size";

	return (
		<>
			<DropDown
				disabled={disabled}
				buttonClassName={"toolbar-item vg-textformatter-hide " + style}
				buttonLabel={value}
				buttonIconClassName={"font-family"}
				buttonAriaLabel={buttonAriaLabel}

			>
				{(style === "font-family" ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
					([option, text]) => (
						<>
							<DropDownItem
								className={`item ${dropDownActiveClass(value === option)} ${style === "font-size" ? "fontsize-item" : ""
									}`}
								onClick={() => handleClick(option)}
								key={option}
							>
								<span
									className="text"
									style={{
										fontFamily: style === "font-family" ? option : "inherit",
									}}
								>
									{text}
								</span>
							</DropDownItem>
						</>
					)
				)}
			</DropDown>
		</>
	);
}

function NumberListButton({
	editor,
	blockType,
	disabled = false,
}: {
	blockType: keyof typeof blockTypeToBlockName;
	editor: LexicalEditor;
	disabled?: boolean;
}): JSX.Element {
	return (
		<button
			onClick={() => formatNumberedList(editor, blockType)}
			type="button"
			aria-label="Toggle number list"
			className={
				"toolbar-item spacing " + (blockType === "number" ? "active" : "")
			}
			disabled={disabled}
		>
			<div className="icon-text-container">
				<i className="icon numbered-list no-space" />
			</div>
		</button>
	);
}
function BulletListButton({
	editor,
	blockType,
	disabled = false,
}: {
	blockType: keyof typeof blockTypeToBlockName;
	editor: LexicalEditor;
	disabled?: boolean;
}): JSX.Element {
	return (
		<button
			onClick={() => formatBulletList(editor, blockType)}
			type="button"
			aria-label="Toggle bullet list"
			className={
				"toolbar-item spacing " + (blockType === "bullet" ? "active" : "")
			}
			disabled={disabled}
		>
			<div className="icon-text-container">
				<i className="icon bullet-list no-space" />
			</div>
		</button>
	);
}

function ElementFormatDropdown({
	editor,
	value,
	isRTL,
	disabled,
}: {
	editor: LexicalEditor;
	value: ElementFormatType;
	isRTL: boolean;
	disabled: boolean;
}) {
	const { toolbarState, updateToolbarState } = useToolbarState();
	const [activeAlignment, setActiveAlignment] = useState<string | null>(null);

	const handleAlignmentChange = (alignment: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end', event: React.MouseEvent) => {
		editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
		updateToolbarState('alignment', alignment);

		if (activeAlignment === alignment) {
		  setActiveAlignment(null); 
		} else {
		  setActiveAlignment(alignment); 
		}
	};
	
	return (
		<div className="vg-texteditor-icon-group">
			<button
				onClick={(e) => handleAlignmentChange('left', e)}
				className={`item wide toolbar-item ${activeAlignment === 'left' ? 'active' : ''} `}
				aria-label="left"
				disabled={disabled}
			>
				<div className="icon-text-container">
					<i className="icon left-align no-space" />
				</div>
			</button>
			<button
				onClick={(e) => handleAlignmentChange('center', e)}
				className={`item wide toolbar-item ${activeAlignment === 'center' ? 'active' : ''} `}
				aria-label="center"
				disabled={disabled}
			>
				<div className="icon-text-container">
					<i className="icon center-align no-space" />
				</div>
			</button>
			<button
				onClick={(e) => handleAlignmentChange('right', e)}
				className={`item wide toolbar-item  ${activeAlignment === 'right' ? 'active' : ''}`}
				aria-label="right"
				disabled={disabled}
			>
				<div className="icon-text-container">
					<i className="icon right-align no-space" />
				</div>
			</button>
			{/* <button
				onClick={() => handleAlignmentChange('justify')}
				className={`item wide toolbar-item ${toolbarState.alignment === 'justify' ? 'active' : ''}`}
				aria-label="justify"
				disabled={disabled}
			>
				<div className="icon-text-container">
					<i className="icon justify-align no-space " />
				</div>
			</button> */}
			<button
				onClick={(e) => handleAlignmentChange('end', e)}
				className={`item wide toolbar-item  ${activeAlignment === 'end' ? 'active' : ''}`}
				aria-label="end"
				disabled={disabled}
			>
				<div className="icon-text-container">
					<i className="icon indent no-space" />
				</div>
			</button>
			<button
				onClick={(e) => handleAlignmentChange('start', e)}
				className={`item wide toolbar-item ${activeAlignment === 'start' ? 'active' : ''} `}
				aria-label="start"
				disabled={disabled}
			>
				<div className="icon-text-container">
					<i className="icon outdent no-space" />
				</div>
			</button>
		</div>
	);
}


// function CutButton({
// 	editor,
// 	disabled = false,
// }: {
// 	editor: LexicalEditor;
// 	disabled?: boolean;
// }): JSX.Element {
// 	const handleCut = () => {
// 		const selection = $getSelection();
// 		if ($isRangeSelection(selection)) {
// 			const selectedContent = selection
// 				.getNodes()
// 				.filter((node): node is TextNode => $isTextNode(node))
// 				.map((node) => node.getTextContent())
// 				.join('\n');
// 			navigator.clipboard.writeText(selectedContent);
// 			editor.dispatchCommand(DELETE_LINE_COMMAND, false);
// 		}
// 	};
// 	return (
// 		<button
// 			onClick={handleCut}
// 			type="button"
// 			aria-label="Cut selected content"
// 			className="toolbar-item spacing"
// 			disabled={disabled}
// 		>
// 			<div className="icon-text-container">
// 				<i className="icon cut no-space" />
// 			</div>
// 		</button>
// 	);
// }

interface ToolbarPluginProps {
	editor: LexicalEditor;
	activeEditor: LexicalEditor;
	setActiveEditor: Dispatch<LexicalEditor>;
	setIsLinkEditMode: Dispatch<boolean>;
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
		Redo: boolean;
		NumberListButton: boolean;
		BulletListButton: boolean;
	};
	RawData?: Array<{
		Index: number;
		InputDescription: string;
		Tone: string;
		Range: number;
	  }>;
	isEditable: boolean;
	floatingAnchorElem: HTMLDivElement | null;
	setFloatingAnchorElem: Dispatch<React.SetStateAction<HTMLDivElement | null>>;
	isSmallWidthViewport: boolean;
	setIsSmallWidthViewport: Dispatch<React.SetStateAction<boolean>>;
	activeTab: 'text' | 'style';
	setActiveTab: (tab: 'text' | 'style') => void
}
export default function ToolbarPlugin({
	editor,
	activeEditor,
	setActiveEditor,
	setIsLinkEditMode,
	ToolbarRawData,
	RawData,
	activeTab,
	setActiveTab,
	floatingAnchorElem,
	setFloatingAnchorElem,
	isSmallWidthViewport,
	setIsSmallWidthViewport,
}: ToolbarPluginProps): JSX.Element {
	const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
		null
	);
	const [modal, showModal] = useModal();
	const [isEditable, setIsEditable] = useState(() => editor.isEditable());
	const [selectedFormat, setSelectedFormat] = useState<any>(formatOptions[0].value);
	const [selectedAlignment, setSelectedAlignment] = useState<any>(options[0].icon);
	const { toolbarState, updateToolbarState } = useToolbarState();

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
				const rootElement = activeEditor.getRootElement();
				updateToolbarState(
					"isImageCaption",
					!!rootElement?.parentElement?.classList.contains(
						"image-caption-container"
					)
				);
			} else {
				updateToolbarState("isImageCaption", false);
			}

			const anchorNode = selection.anchor.getNode();
			let element =
				anchorNode.getKey() === "root"
					? anchorNode
					: $findMatchingParent(anchorNode, (e) => {
						const parent = e.getParent();
						return parent !== null && $isRootOrShadowRoot(parent);
					});

			if (element === null) {
				element = anchorNode.getTopLevelElementOrThrow();
			}

			const elementKey = element.getKey();
			const elementDOM = activeEditor.getElementByKey(elementKey);

			updateToolbarState("isRTL", $isParentElementRTL(selection));

			const node = getSelectedNode(selection);
			const parent = node.getParent();
			const isLink = $isLinkNode(parent) || $isLinkNode(node);
			updateToolbarState("isLink", isLink);

			const tableNode = $findMatchingParent(node, $isTableNode);
			if ($isTableNode(tableNode)) {
				updateToolbarState("rootType", "table");
			} else {
				updateToolbarState("rootType", "root");
			}

			if (elementDOM !== null) {
				setSelectedElementKey(elementKey);
				if ($isListNode(element)) {
					const parentList = $getNearestNodeOfType<ListNode>(
						anchorNode,
						ListNode
					);
					const type = parentList
						? parentList.getListType()
						: element.getListType();

					updateToolbarState("blockType", type);
				} else {
					const type = $isHeadingNode(element)
						? element.getTag()
						: element.getType();
					if (type in blockTypeToBlockName) {
						updateToolbarState(
							"blockType",
							type as keyof typeof blockTypeToBlockName
						);
					}
					if ($isCodeNode(element)) {
						const language =
							element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
						updateToolbarState(
							"codeLanguage",
							language ? CODE_LANGUAGE_MAP[language] || language : ""
						);
						return;
					}
				}
			}
			// Handle buttons
			updateToolbarState(
				"fontColor",
				$getSelectionStyleValueForProperty(selection, "color", "#000")
			);
			updateToolbarState(
				"bgColor",
				$getSelectionStyleValueForProperty(
					selection,
					"background-color",
					"#fff"
				)
			);
			updateToolbarState(
				"fontFamily",
				$getSelectionStyleValueForProperty(selection, "font-family", "Arial")
			);
			let matchingParent;
			if ($isLinkNode(parent)) {
				matchingParent = $findMatchingParent(
					node,
					(parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
				);
			}
			updateToolbarState(
				"elementFormat",
				$isElementNode(matchingParent)
					? matchingParent.getFormatType()
					: $isElementNode(node)
						? node.getFormatType()
						: parent?.getFormatType() || "left"
			);
		}
		if ($isRangeSelection(selection) || $isTableSelection(selection)) {
			// Update text format
			updateToolbarState("isBold", selection.hasFormat("bold"));
			updateToolbarState("isItalic", selection.hasFormat("italic"));
			updateToolbarState("isUnderline", selection.hasFormat("underline"));
			updateToolbarState(
				"isStrikethrough",
				selection.hasFormat("strikethrough")
			);
			updateToolbarState("isSubscript", selection.hasFormat("subscript"));
			updateToolbarState("isSuperscript", selection.hasFormat("superscript"));
			updateToolbarState("isCode", selection.hasFormat("code"));
			updateToolbarState(
				"fontSize",
				$getSelectionStyleValueForProperty(selection, "font-size", "15px")
			);
		}
	}, [activeEditor, editor, updateToolbarState]);

	useEffect(() => {
		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			(_payload, newEditor) => {
				setActiveEditor(newEditor);
				$updateToolbar();
				return false;
			},
			COMMAND_PRIORITY_CRITICAL
		);
	}, [editor, $updateToolbar, setActiveEditor]);

	useEffect(() => {
		activeEditor.getEditorState().read(() => {
			$updateToolbar();
		});
	}, [activeEditor, $updateToolbar]);

	useEffect(() => {
		return mergeRegister(
			editor.registerEditableListener((editable) => {
				setIsEditable(editable);
			}),
			activeEditor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					$updateToolbar();
				});
			}),
			activeEditor.registerCommand<boolean>(
				CAN_UNDO_COMMAND,
				(payload) => {
					updateToolbarState("canUndo", payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL
			),
			activeEditor.registerCommand<boolean>(
				CAN_REDO_COMMAND,
				(payload) => {
					updateToolbarState("canRedo", payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL
			)
		);
	}, [$updateToolbar, activeEditor, editor, updateToolbarState]);

	const applyStyleText = useCallback(
		(styles: Record<string, string>, skipHistoryStack?: boolean) => {
			activeEditor.update(
				() => {
					const selection = $getSelection();
					if (selection !== null) {
						$patchStyleText(selection, styles);
					}
				},
				skipHistoryStack ? { tag: "historic" } : {}
			);
		},
		[activeEditor]
	);

	const onFontColorSelect = useCallback(
		(value: string, skipHistoryStack: boolean) => {
			applyStyleText({ color: value }, skipHistoryStack);
		},
		[applyStyleText]
	);

	const onBgColorSelect = useCallback(
		(value: string, skipHistoryStack: boolean) => {
			applyStyleText({ "background-color": value }, skipHistoryStack);
		},
		[applyStyleText]
	);
	const insertLink = useCallback(() => {
		if (!toolbarState.isLink) {
			setIsLinkEditMode(true);
			activeEditor.dispatchCommand(
				TOGGLE_LINK_COMMAND,
				sanitizeUrl("https://")
			);
		} else {
			setIsLinkEditMode(false);
			activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
		}
	}, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);

	const onCodeLanguageSelect = useCallback(
		(value: string) => {
			activeEditor.update(() => {
				if (selectedElementKey !== null) {
					const node = $getNodeByKey(selectedElementKey);
					if ($isCodeNode(node)) {
						node.setLanguage(value);
					}
				}
			});
		},
		[activeEditor, selectedElementKey]
	);

	const onInsertNameSelect = useCallback(
		(value: string) => {
			editor.update(() => {
				const selection = $getSelection();

				if (!$isRangeSelection(selection)) return;

				let placeholderText = '';
				switch (value) {
					case "First Name":
						placeholderText = "{first_name}";
						break;
					case "First Name and Last Name":
						placeholderText = "{first_name} {last_name}";
						break;
					default:
						return;
				}


				const textNode = $createTextNode(placeholderText);
				$insertNodes([textNode]);
			});
		},
		[editor]
	);

	// const handleAlignmentChange = useCallback(
	// 	(alignment: any) => {
	// 		return editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
	// 	},
	// 	[editor]
	// )


	const handleAlignmentChange = useCallback(
		(option: any) => {
			editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, option.value);
			setSelectedAlignment(option.icon);
		},
		[editor]
	);

	const handleFormatChange = useCallback(
		(option: { label: string; value: any }) => {
			editor.dispatchCommand(FORMAT_TEXT_COMMAND, option.value);
			setSelectedFormat(option.value);
		},
		[editor]
	);

	const isFormatActive = useCallback(
		(formatValue: any) => {
			return editor.getEditorState().read(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					return selection.hasFormat(formatValue);
				}
				return false;
			});
		},
		[editor]
	);
	return (
		<>
			{activeTab == 'text' &&
				<div className="toolbar">
					{toolbarState.blockType in blockTypeToBlockName && activeEditor === editor && (
						<>
							<BlockFormatDropDown
								disabled={!isEditable}
								blockType={toolbarState.blockType}
								rootType={toolbarState.rootType}
								editor={activeEditor}
							/>
							<Divider />
						</>
					)}
					{toolbarState.blockType === "code" ? (
						<DropDown
							disabled={!isEditable}
							buttonClassName="toolbar-item code-language"
							buttonLabel={getLanguageFriendlyName(toolbarState.codeLanguage)}
							buttonAriaLabel="Select language"
						>
							{CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
								return (
									<DropDownItem
										className={`item ${dropDownActiveClass(
											value === toolbarState.codeLanguage
										)}`}
										onClick={() => onCodeLanguageSelect(value)}
										key={value}
									>
										<span className="text">{name}</span>
									</DropDownItem>
								);
							})}
						</DropDown>
					) : (
						<>
							{ToolbarRawData?.Fontfamily && (
								<>
									<FontDropDown
										disabled={!isEditable}
										style={`font-family`}
										value={toolbarState.fontFamily}
										editor={activeEditor}
									/>
									<Divider />
								</>
							)}
							{ToolbarRawData?.Fontsize && (
								<>
									<FontSize
										disabled={!isEditable}
										style={`font-size`}
										value={toolbarState.fontSize}
										editor={activeEditor}
									/>

									<Divider />
								</>
							)}
							{ToolbarRawData?.Fontcolor && (
								<DropdownColorPicker
									disabled={!isEditable}
									buttonClassName="toolbar-item color-picker vg-textformatter-hide"
									buttonAriaLabel="Formatting text color"
									buttonIconClassName="icon font-color"
									color={toolbarState.fontColor}
									onChange={onFontColorSelect}
									title="text color"
								/>
							)}
							{ToolbarRawData?.BackgroundColor && (
								<DropdownColorPicker
									disabled={!isEditable}
									buttonClassName="toolbar-item color-picker background vg-textformatter-hide"
									buttonAriaLabel="Formatting background color"
									buttonIconClassName="icon bg-color"
									color={toolbarState.bgColor}
									onChange={onBgColorSelect}
									title="bg color"
								/>
							)}
							<div className="vg-texteditor-icon-group">
								{ToolbarRawData?.Bold && (
									<button
										disabled={!isEditable}
										onClick={() => {
											activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
										}}
										className={
											"toolbar-item spaced " + (toolbarState.isBold ? "active" : "")
										}
										title={`Bold `}
										type="button"
										aria-label={`Format text as bold.`}
									>
										<i className="format bold" />
									</button>
								)}
								{ToolbarRawData?.Italic && (
									<button
										disabled={!isEditable}
										onClick={() => {
											activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
										}}
										className={
											"toolbar-item spaced " +
											(toolbarState.isItalic ? "active" : "")
										}
										title={`Italic `}
										type="button"
										aria-label={`Format text as italics.`}
									>
										<i className="format italic" />
									</button>
								)}
								{ToolbarRawData?.Underline && (
									<button
										disabled={!isEditable}
										onClick={() => {
											activeEditor.dispatchCommand(
												FORMAT_TEXT_COMMAND,
												"underline"
											);
										}}
										className={
											"toolbar-item spaced " +
											(toolbarState.isUnderline ? "active" : "")
										}
										title={`Underline `}
										type="button"
										aria-label={`Format text to underlined.`}
									>
										<i className="format underline" />
									</button>
								)}
								{ToolbarRawData?.Strikethrough && (
									<button
										onClick={() => {
											activeEditor.dispatchCommand(
												FORMAT_TEXT_COMMAND,
												"strikethrough"
											);
										}}
										className={
											"toolbar-item spaced vg-textformatter-hide " +
											(toolbarState.isUnderline ? "active" : "")
										}
										type="button"
										aria-label="Formatting clear format"
									>
										<i className="icon strikethrough" />
									</button>
								)}
							</div>
						</>
					)}
					<Divider />
					{/* <CutButton editor={editor} disabled={false} /> */}

					{ToolbarRawData?.Clear && (
						<button
							onClick={() => clearFormatting(activeEditor)}
							type="button"
							aria-label="Formatting clear format"
							className="toolbar-item clear formatting vg-textformatter-hide"
						>
							<span className="icon clear no-space"></span>
						</button>
					)}

					{ToolbarRawData?.Alignment && (
						<ElementFormatDropdown
							disabled={!isEditable}
							value={toolbarState.elementFormat}
							editor={activeEditor}
							isRTL={toolbarState.isRTL}
						/>
					)}
					{toolbarState.blockType in blockTypeToBlockName &&
						activeEditor === editor && ToolbarRawData?.NumberListButton && (
							<>
								<NumberListButton
									disabled={!isEditable}
									blockType={toolbarState.blockType}
									editor={activeEditor}
								/>
								<Divider />
							</>
						)}
					{toolbarState.blockType in blockTypeToBlockName &&
						activeEditor === editor && ToolbarRawData?.BulletListButton && (
							<>
								<BulletListButton
									disabled={!isEditable}
									blockType={toolbarState.blockType}
									editor={activeEditor}
								/>
								<Divider />
							</>
						)}
					{ToolbarRawData?.Link && (
						<button
							disabled={!isEditable}
							onClick={insertLink}
							className={ `toolbar-item spaced ${toolbarState.isLink ? "active" : ""}` }
							aria-label="Insert link"
							type="button"

						>
							<i className="format link" style={{"transform" : "rotateZ(135deg)"}}/>
						</button>
					)}
					{ToolbarRawData?.Alignment && (
						<DropDown
							buttonClassName="toolbar-item aligndrop-formobile"
							buttonLabel={selectedAlignment}
							buttonAriaLabel="Select name to insert"
						>
							{options.map((option) => (
								<DropDownItem
									className="item"
									onClick={() => handleAlignmentChange(option)}
								>
									{option.icon}
								</DropDownItem>
							))}
						</DropDown>
					)}

					<DropDown
						buttonClassName="toolbar-item format formatdrop-formobile"
						buttonLabel={selectedFormat}
						buttonAriaLabel="Formatting options"
					>
						{formatOptions.map((option) => (
							<DropDownItem
								key={option.label}
								className={`item ${isFormatActive(option.value) ? 'active' : ''}`}
								onClick={() => handleFormatChange(option)}
							>
								{option.value}
							</DropDownItem>
						))}
					</DropDown>
					{ToolbarRawData?.InsertNames &&
						<DropDown
							buttonClassName="toolbar-item insert-names vg-textformatter-hide"
							buttonLabel="Insert Name"
							buttonAriaLabel="Select name to insert"
						>
							{INSERT_NAMES.map((name) => (
								<DropDownItem
									className="item"
									onClick={() => onInsertNameSelect(name)}
									key={name}
								>
									<span className="text">{name}</span>
								</DropDownItem>
							))}
						</DropDown>
					}
					{ToolbarRawData?.Undo &&
						<button
							disabled={!toolbarState.canUndo || !isEditable}
							onClick={() => {
								activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
							}}
							type="button"
							className="toolbar-item spaced"
							aria-label="Undo">
							<i className="format undo" />
						</button>
					}
					{ToolbarRawData?.Redo &&
						<button
							disabled={!toolbarState.canRedo || !isEditable}
							onClick={() => {
								activeEditor.dispatchCommand(REDO_COMMAND, undefined);
							}}
							// title={IS_APPLE ? 'Redo (⇧⌘Z)' : 'Redo (Ctrl+Y)'}
							type="button"
							className="toolbar-item"
							aria-label="Redo">
							<i className="format redo" />
						</button>
					}
				</div>
			}
			{activeTab == 'style' &&
				<div className="toolbar">
					<div className="toolbar-style-tab">
						<VgColorPicker
							CloseBackTitle=""
							ColorPickerId=""
							Footer={2}
							NativeActionVal={13}
							OnChange={() => { }}
							TimerCount={0}
							Title="Color Picker"
							VagaroToolkit={1}
						/>
						<div>Background Color</div>
					</div>
					<div className="toolbar-style-tab">
						<VgColorPicker
							CloseBackTitle=""
							ColorPickerId=""
							Footer={2}
							NativeActionVal={13}
							OnChange={() => { }}
							TimerCount={0}
							Title="Color Picker"
							VagaroToolkit={1}
						/>
						<div>Border Color</div>
					</div>
					<div className="toolbar-style-tab">
						<VgInput
							InputId=""
							InputTitle=""
							OnBlur={() => { }}
							OnChange={() => { }}
							PlaceHolder=""
							SetValue=""
							UrlPrefix=""
							MaximumLength={2}
							Validation="numeric"
							numericValidation
						/>
						<div>Border Size</div>
					</div>
					<div className="toolbar-style-tab">
						<VgInput
							InputId=""
							InputTitle=""
							OnBlur={() => { }}
							OnChange={() => { }}
							PlaceHolder=""
							SetValue=""
							UrlPrefix=""
							MaximumLength={2}
							Validation="numeric"
							numericValidation
						/>
						<div>Vertical Padding</div>
					</div>
					<div className="toolbar-style-tab">
						<VgInput
							InputId=""
							InputTitle=""
							OnBlur={() => { }}
							OnChange={() => { }}
							PlaceHolder=""
							SetValue=""
							UrlPrefix=""
							MaximumLength={2}
							Validation="numeric"
							numericValidation
						/>
						<div>Horizontal Padding</div>
					</div>
				</div>
			}
			{modal}
		</>
	);
}