import { Response } from "express";

class ApiResponse {
  constructor(private res: Response) {}
  success(data: any, message?: string, statusCode = 200) {
    this.res.send({ data, message, statusCode });
  }

  failed(message: string, statusCode = 400) {
    this.res.send({ message, statusCode });
  }
}

export default ApiResponse;
