export interface IProgressRepository {
  save: (progress: any) => Promise<any>;
  edit: (progress: any, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  get: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
  getByUser: (userId: string) => Promise<any>;
}
