import * as dotenv from "dotenv";

export default (_env: any) => {
  const ENV_VARS = dotenv.config();

  const envVars = {
    database_URI: process.env.MONGO_URL,
    port: process.env.PORT,
    jwtToken: process.env.JWT_TOKEN || "",
  };
  return envVars;
};
