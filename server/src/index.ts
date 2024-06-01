import express, { Express } from "express";
import db from "./db/connection";
import cors from "cors";
import Config from "./config/config";
const config = Config(process.env.NODE_ENV);

const app: Express = express();
const port = config.port || 3000;

const corsOptions = {
	origin: "*",
	methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
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
