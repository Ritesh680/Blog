import serverless from "serverless-http";
import app from "../dist/index";

export const handler = serverless(app);
