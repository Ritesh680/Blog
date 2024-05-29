import { Request } from "express";

export {};
declare global{
  interface RequestWithUser extends Request {
  user: any;
}
};