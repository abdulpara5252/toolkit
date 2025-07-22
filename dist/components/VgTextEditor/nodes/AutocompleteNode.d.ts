/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { EditorConfig, LexicalEditor, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
declare global {
    interface Navigator {
        userAgentData?: {
            mobile: boolean;
        };
    }
}
export type SerializedAutocompleteNode = Spread<{
    uuid: string;
}, SerializedLexicalNode>;
export declare class AutocompleteNode extends DecoratorNode<JSX.Element | null> {
    /**
     * A unique uuid is generated for each session and assigned to the instance.
     * This helps to:
     * - Ensures max one Autocomplete node per session.
     * - Ensure that when collaboration is enabled, this node is not shown in
     *   other sessions.
     * See https://github.com/facebook/lexical/blob/master/packages/lexical-playground/src/plugins/AutocompletePlugin/index.tsx#L39
     */
    __uuid: string;
    static clone(node: AutocompleteNode): AutocompleteNode;
    static getType(): 'autocomplete';
    static importJSON(serializedNode: SerializedAutocompleteNode): AutocompleteNode;
    exportJSON(): SerializedAutocompleteNode;
    constructor(uuid: string, key?: NodeKey);
    updateDOM(prevNode: unknown, dom: HTMLElement, config: EditorConfig): boolean;
    createDOM(config: EditorConfig): HTMLElement;
    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element | null;
}
export declare function $createAutocompleteNode(uuid: string): AutocompleteNode;
