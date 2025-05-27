export class ReportNotExistException extends Error {
  constructor(message?: string) {
    super(message || "Reporte inexistente");
    this.name = "ReportNotExistException";
  }
}
