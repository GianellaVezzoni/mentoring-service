export interface IMetric {
  id?: string;
  name: string;
  range: {
    min: number;
    max: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
