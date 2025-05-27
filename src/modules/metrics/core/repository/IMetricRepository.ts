export interface IMetricRepository {
  save: (metric: any) => Promise<any>;
  edit: (metric: any, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  get: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
  countMetrics: () => Promise<any>;
}
