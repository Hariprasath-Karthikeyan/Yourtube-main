import express from "express";
import multer from "multer";
import {
  getallvideo,
  handlePoints,
  increasePoints,
  uploadvideo,
} from "../controllers/video.js";

const router = express.Router();

// Multer storage config (if not moved to separate filehelper.js)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadvideo);
router.get("/getall", getallvideo);
router.post("/increasePoints", increasePoints);
router.post("/points", handlePoints);

export default router;
