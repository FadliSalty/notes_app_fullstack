import express from "express";
import { helloHandler } from "../handlers/helloHandler.js";

const router = express.Router();

router.get("/", helloHandler);

export default router;
