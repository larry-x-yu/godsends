"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const dailyRotateFile = new (winston_daily_rotate_file_1.default)({
    filename: "application-%DATE%.log",
    // tslint:disable-next-line: object-literal-sort-keys
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
});
exports.Log = winston_1.default.createLogger({
    level: "debug",
    transports: [
        new winston_1.default.transports.Console(),
        dailyRotateFile
    ]
});
//# sourceMappingURL=logger.js.map