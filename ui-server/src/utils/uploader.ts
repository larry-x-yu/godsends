import env from "./config";
import Busboy from "busboy";
import * as fs from "fs";
import * as os from "os";
import path from "path";
import uuid from "uuid";
import multer from "multer";

export const getUploadDir = () => {
    return path.join("/tmp", env.IMAGES_DIR);
};

const dir = getUploadDir();
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, getUploadDir()),
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".")[file.originalname.split(".").length - 1];
        const filename = uuid() + "." + ext;
        cb(null, filename);
    }
});

export const uploadAvatar = multer({ storage: avatarStorage });

// export const upload = (req: any, res: any) => {
//     const busboy = new Busboy({ headers: req.headers });
//     let targetFilename = "default_image.png";
//     busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
//         const ext = filename.split(".")[filename.split(".").length - 1];
//         targetFilename = uuid() + "." + ext;
//         // tslint:disable-next-line: no-console
//         file.pipe(fs.createWriteStream(path.join(getUploadDir(), targetFilename)));
//     });
//     busboy.on("finish", () => {
//         res.json({ message: "File uploaded successfully" });
//         res.end();
//     });
//     req.pipe(busboy);
//     return targetFilename;
// };
