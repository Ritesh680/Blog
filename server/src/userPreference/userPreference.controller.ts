import { NextFunction, Request, Response } from "express";

class UserPreferenceController {
  createUserPreference(req: Request, res: Response, next: NextFunction) {}

  getAllUserPreferences(req: Request, res: Response, next: NextFunction) {}

  getUserPreferenceById(req: Request, res: Response, next: NextFunction) {}

  updateUserPreference(req: Request, res: Response, next: NextFunction) {}

  deleteUserPreference(req: Request, res: Response, next: NextFunction) {}
}

const userPreferenceController = new UserPreferenceController();

export default userPreferenceController;
