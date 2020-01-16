import express from "express";
import api from "./routes/api";
import env from "./utils/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

// tslint:disable-next-line: no-console
app.listen(env.SERVER_PORT, () => console.log(`Server listening on port: ${env.SERVER_PORT}`));
