export class MetricNotExistException extends Error {
  constructor(message?: string) {
    super(message || "Metrica inexistente");
    this.name = "MetricNotExistException";
  }
}
