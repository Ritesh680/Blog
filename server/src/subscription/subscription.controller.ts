import { NextFunction, Request, Response } from "express";

class SubscriptionController {
  createSubscription(req: Request, res: Response, next: NextFunction) {}

  getAllSubscriptions(req: Request, res: Response, next: NextFunction) {}

  getSubscriptionById(req: Request, res: Response, next: NextFunction) {}

  updateSubscription(req: Request, res: Response, next: NextFunction) {}

  deleteSubscription(req: Request, res: Response, next: NextFunction) {}
}

const subscriptionController = new SubscriptionController();

export default subscriptionController;
