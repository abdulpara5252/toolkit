import { BlockBlobClient } from "@azure/storage-blob";
declare const _default: {
    getBlobClient: (blobName: string) => typeof BlockBlobClient;
    uploadChunkWithRetry: (blockBlobClient: typeof BlockBlobClient, chunk: Blob, blockId: string, maxRetries?: number) => Promise<void>;
    commitBlocks: (blockBlobClient: typeof BlockBlobClient, blockIds: string[]) => Promise<void>;
    getExistingBlocks: (blockBlobClient: typeof BlockBlobClient) => Promise<string[]>;
};
export default _default;
