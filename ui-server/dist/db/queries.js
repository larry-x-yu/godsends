"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const logger_1 = require("../utils/logger");
dotenv_1.default.config();
const port = parseInt(process.env.PGPORT || "5432", 10);
const config = {
    database: process.env.PGDATABASE || "postgres",
    host: process.env.PGHOST || "localhost",
    port,
    user: process.env.PGUSER || "postgres"
};
const pgp = pg_promise_1.default();
const db = pgp(config);
const queryAll = (q, params = []) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db.any(q, params);
    }
    catch (err) {
        logger_1.Log.error(JSON.stringify(err));
        throw err;
    }
});
const queryOne = (q, params = []) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db.one(q, params);
    }
    catch (err) {
        logger_1.Log.error(JSON.stringify(err));
        throw err;
    }
});
const insert = (q, params = []) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return db.one(q, params);
    }
    catch (err) {
        logger_1.Log.error(JSON.stringify(err));
        throw err;
    }
});
// Gets all screams
const qScreams = `
SELECT *
FROM screams
`;
exports.getScreams = () => queryAll(qScreams);
// Gets one scream by id
const qScream = `
SELECT *
FROM screams
WHERE id = $1
`;
exports.getScream = (id) => queryOne(qScream, [id]);
// Gets all comments by scream id
const qCommentsByScream = `
SELECT *
FROM comments
WHERE screamId = $1
ORDER BY createdAt
`;
exports.getCommentsByScream = (id) => queryAll(qScream, [id]);
// Inserts a scream
const qInsertScream = `
INSERT INTO screams (author, body) VALUES ($1, $2)
RETURNING id;
`;
exports.insertScream = (scream) => insert(qInsertScream, scream);
// Inserts a user
const qInsertUser = `
INSERT INTO users (email, img) VALUES ($1, $2)
RETURNING id;
`;
exports.insertUser = (email, password) => insert(qInsertUser, [email, password]);
// Inserts a user
const qGetUserById = `
SELECT * from USERS WHERE id=$1;
`;
exports.getUserById = (userId) => queryOne(qGetUserById, userId);
// Inserts a comment
const qInsertComment = `
INSERT INTO comments (userId, screamId, comment)
VALUES ($1, $2, $3)
RETURNING id;
`;
exports.insertComment = (...args) => insert(qInsertComment, args);
// Gets a user by email and password
const qGetUserByEmailAndPassword = `
SELECT * FROM users WHERE email=$1 AND password=$2
`;
exports.getUserByEmailAndPassword = (email, password) => queryAll(qGetUserByEmailAndPassword, [email, password]);
//# sourceMappingURL=queries.js.map