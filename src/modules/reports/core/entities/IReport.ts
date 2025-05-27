export interface IReport {
  title: string;
  description: string;
  content: string;
  type: string;
  status: string;
  metrics: {
    name: string;
    value: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
