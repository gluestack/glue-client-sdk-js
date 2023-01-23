export interface IStorage {
  upload(file: any): Promise<any>;
  getPublicUrl(path: string): Promise<string>;
}
