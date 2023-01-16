export interface IStorage {
  storageBaseUrl: string;

  upload(file: any): Promise<any>;
  getPresignedUrl(path: string): Promise<string>;
}
