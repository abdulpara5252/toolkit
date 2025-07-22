import { SerializedDocument } from '@lexical/file';
export declare function docToHash(doc: SerializedDocument): Promise<string>;
export declare function docFromHash(hash: string): Promise<SerializedDocument | null>;
