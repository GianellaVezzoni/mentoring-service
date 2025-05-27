export interface IReportRepository {
  save: (report: any) => Promise<any>;
  edit: (report: any, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  get: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
  getByUser: (userId: string) => Promise<any>;
}
