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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploader_1 = require("./../utils/uploader");
const path_1 = __importDefault(require("path"));
const express = __importStar(require("express"));
const queries_1 = require("./../db/queries");
const router = express.Router();
const enrichScream = (scream) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield queries_1.getUserById([scream.userId]);
    user.img = path_1.default.join("/images", user.img);
    scream.user = user;
    const comments = yield queries_1.getCommentsByScream(scream.id);
    scream.comments = comments;
    return scream;
});
router.get(`/screams`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let screams = yield queries_1.getScreams();
        screams = yield Promise.all(screams.map((s) => __awaiter(void 0, void 0, void 0, function* () { return yield enrichScream(s); })));
        return res.json(screams);
    }
    catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}));
router.get(`/screams/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let scream = yield queries_1.getScream(req.params.id);
        scream = yield enrichScream(scream);
        return res.json(scream);
    }
    catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}));
router.put(`/screams`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const screamId = yield queries_1.insertScream([`${req.body.author}`, `${req.body.body}`]);
        res.json({ screamId });
    }
    catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}));
// router.post(`/users`, uploadAvatar.single("avatar"), async (req: any, res) => {
//     try {
//         Log.debug(JSON.stringify(req.body));
//         const userId = await insertUser([`${req.body.email}`, `${req.file.filename}`]);
//         res.json({ userId });
//     } catch (err) {
//         res.status(500).json({ error: err.message || err });
//     }
// });
router.post(`/users/:userid/updateAvatar`, uploader_1.uploadAvatar.single("avatar"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield queries_1.updateAvator(req.params.userId, `${req.file.filename}`);
        res.json({ message: "Avatar updated successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}));
router.post(`/screams/:screamId/comments`, (req, res) => {
    try {
        //
    }
    catch (err) {
        // tslint:disable-next-line: no-console
        console.log(err);
        res.status(500).json({ error: err.message || err });
    }
});
router.post(`/login`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield queries_1.getUserByEmailAndPassword(req.body.email, req.body.password);
        if (users && users.length > 0) {
            res.json({ user: users[0] });
        }
        else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}));
router.post(`/signup`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield queries_1.insertUser(req.body.email, req.body.password, "images/monkey.png");
        if (userId) {
            res.json(userId);
        }
        else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}));
router.get(`/users/:userId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield queries_1.getUserById([req.params.userId]);
        if (user) {
            res.json(user);
        }
        else {
            res.status(400).json({ message: "Invalid userId: " + req.params.userId });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message || err });
    }
}));
exports.default = router;
//# sourceMappingURL=api.js.map