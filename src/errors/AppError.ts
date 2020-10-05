class AppError {
  public readonly message: string;

  public readonly statusCode: number; // erro do código http

  constructor(message: string, statusCode = 400){
    this.message = message;
    this.statusCode = statusCode
  }
}

export default AppError;