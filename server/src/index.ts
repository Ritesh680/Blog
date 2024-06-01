import express, { Express } from "express";
import db from "./db/connection";
import cacheControl from "express-cache-controller";

// your routes here
import cors, { CorsOptions } from "cors";
import Config from "./config/config";
const config = Config(process.env.NODE_ENV);

const app: Express = express();
const port = config.port || 3000;
app.use(
	cacheControl({
		maxAge: 0,
	})
);

const corsOptions: CorsOptions = {
	origin: ["https://blog-ritesh.netlify.app", "http://localhost:5173", "*"],
	methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	maxAge: 0,
	preflightContinue: true,
	optionsSuccessStatus: 204,
	exposedHeaders: ["Authorization"],
};
app.use(express.json());
app.use(cors(corsOptions));

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log(" ");
	console.log("------> +++++ COnnected MongoDB server +++++ <------");
	console.log(" ");

	app.use("/", require("./routes"));

	app.listen(port, () => {
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
});
