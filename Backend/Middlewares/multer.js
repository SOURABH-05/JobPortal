import multer from "multer";

const storage = multer.memoryStorage(); // Memory storage configuration
export const singleUpload = multer({ storage }).single("file");
