
declare module "*.jpg" {
    const value: string;
     export default value; // Only declare once
  }
  declare module '@azure/storage-blob'