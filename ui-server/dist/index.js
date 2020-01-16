"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const config_1 = __importDefault(require("./utils/config"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", api_1.default);
// tslint:disable-next-line: no-console
app.listen(config_1.default.SERVER_PORT, () => console.log(`Server listening on port: ${config_1.default.SERVER_PORT}`));
//# sourceMappingURL=index.js.map