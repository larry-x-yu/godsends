import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { Log } from "../utils/logger";

dotenv.config();

const port = parseInt(process.env.PGPORT || "5432", 10);
const config = {
    database: process.env.PGDATABASE || "postgres",
    host: process.env.PGHOST || "localhost",
    port,
    user: process.env.PGUSER || "postgres"
};

const pgp = pgPromise();
const db = pgp(config);

const queryAll = async (q: string, params: any[] = []) => {
    try {
        return await db.any(q, params);
    } catch (err) {
        Log.error(JSON.stringify(err));
        throw err;
    }
};

const queryOne = async (q: string, params: any[] = []) => {
    try {
        return await db.one(q, params);
    } catch (err) {
        Log.error(JSON.stringify(err));
        throw err;
    }
};

const insert = async (q: string, params: any[] = []) => {
    try {
        return db.one(q, params);
    } catch (err) {
        Log.error(JSON.stringify(err));
        throw err;
    }
};

// Gets all screams
const qScreams = `
SELECT *
FROM screams
`;
export const getScreams = () => queryAll(qScreams);

// Gets one scream by id
const qScream = `
SELECT *
FROM screams
WHERE id = $1
`;
export const getScream = (id: string) => queryOne(qScream, [id]);

// Gets all comments by scream id
const qCommentsByScream = `
SELECT *
FROM comments
WHERE screamId = $1
ORDER BY createdAt
`;
export const getCommentsByScream = (id: string) => queryAll(qScream, [id]);

// Inserts a scream
const qInsertScream = `
INSERT INTO screams (author, body) VALUES ($1, $2)
RETURNING id;
`;
export const insertScream = (scream: any[]) => insert(qInsertScream, scream);

// Inserts a user
const qInsertUser = `
INSERT INTO users (email, password, img) VALUES ($1, $2, $3)
RETURNING id;
`;
export const insertUser =
    (email: string, password: string, avatar: string) => insert(qInsertUser, [email, password, avatar]);

// Inserts a user
const qGetUserById = `
SELECT * from USERS WHERE id=$1;
`;
export const getUserById = (userId: any[]) => queryOne(qGetUserById, userId);

// Inserts a comment
const qInsertComment = `
INSERT INTO comments (userId, screamId, comment)
VALUES ($1, $2, $3)
RETURNING id;
`;
export const insertComment = (...args: any[]) => insert(qInsertComment, args);

// Gets a user by email and password
const qGetUserByEmailAndPassword = `
SELECT * FROM users WHERE email=$1 AND password=$2
`;
export const getUserByEmailAndPassword =
    (email: string, password: string) => queryAll(qGetUserByEmailAndPassword, [email, password]);
