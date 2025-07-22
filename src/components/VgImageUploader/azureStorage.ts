import { BlobServiceClient, BlockBlobClient, AnonymousCredential } from "@azure/storage-blob";

const sasToken = "sp=racwdli&st=2024-12-25T07:15:54Z&se=2024-12-25T15:15:54Z&sv=2022-11-02&sr=c&sig=h9wT4dRsE4bsK2FqVwIBtfE4C6ZrDjIziia3%2F0zzyMk%3D";
const containerName = "blobcontainer";
const accountName = "vagarotestaccount";
const getBlobClient = (blobName: string): typeof BlockBlobClient => {
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net?${sasToken}`
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);
  return containerClient.getBlockBlobClient(blobName);
};

const uploadChunkWithRetry = async (
  blockBlobClient: typeof BlockBlobClient,
  chunk: Blob,
  blockId: string,
  maxRetries: number = 3
): Promise<void> => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await blockBlobClient.stageBlock(blockId, chunk, chunk.size);
      return;
    } catch (error) {
      console.error(`Error uploading chunk (attempt ${retries + 1}):`, error);
      retries++;
      if (retries >= maxRetries) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff
    }
  }
};

const commitBlocks = async (
  blockBlobClient: typeof BlockBlobClient,
  blockIds: string[]
): Promise<void> => {
  await blockBlobClient.commitBlockList(blockIds);
};

const getExistingBlocks = async (
  blockBlobClient: typeof BlockBlobClient
): Promise<string[]> => {
  const response = await blockBlobClient.getBlockList("uncommitted");
  return response.uncommittedBlocks.map((block: any) => block.name);
};

export default { getBlobClient, uploadChunkWithRetry, commitBlocks, getExistingBlocks };

