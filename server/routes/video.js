import express from "express";
import { getallvideo, handlePoints, increasePoints, uploadvideo } from "../controllers/video.js";
import upload from "../filehelper/filehelper.js";


const routes = express.Router();

routes.post("/upload", upload.single("file"), uploadvideo);
routes.get("/getall", getallvideo);
routes.post("/increasePoints", increasePoints);
routes.post("/points", handlePoints);
export default routes;
