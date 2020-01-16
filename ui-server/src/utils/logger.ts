import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const dailyRotateFile = new (DailyRotateFile)({
    filename: "application-%DATE%.log",
    // tslint:disable-next-line: object-literal-sort-keys
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
});

export const Log = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console(),
        dailyRotateFile
    ]
});
