export interface ICsvFileGenerationService {
  generateCsvFile: (users: any[]) => Promise<Buffer>;
}
