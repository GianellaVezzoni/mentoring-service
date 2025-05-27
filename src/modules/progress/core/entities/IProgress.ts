export default interface IProgress {
  userId: string;
  date: Date;
  description?: string;
  metrics?: Record<string, number>;
}
