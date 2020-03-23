"use strict";
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
const config_1 = __importDefault(require("./config"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = __importDefault(require("uuid"));
const multer_1 = __importDefault(require("multer"));
exports.getUploadDir = () => {
    return path_1.default.join("/tmp", config_1.default.IMAGES_DIR);
};
const dir = exports.getUploadDir();
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}
const avatarStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, exports.getUploadDir()),
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".")[file.originalname.split(".").length - 1];
        const filename = uuid_1.default() + "." + ext;
        // tslint:disable-next-line: no-console
        console.log(filename);
        cb(null, filename);
    }
});
exports.uploadAvatar = multer_1.default({ storage: avatarStorage });
//# sourceMappingURL=uploader.js.map