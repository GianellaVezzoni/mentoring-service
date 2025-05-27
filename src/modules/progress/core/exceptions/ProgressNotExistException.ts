export class ProgressNotExistException extends Error {
  constructor(message?: string) {
    super(message || "Progreso inexistente");
    this.name = "ProgressNotExistException";
  }
}
