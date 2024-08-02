import express from "express";
import { sendMessage} from "../controllers/messageControllers/sendMessage.js";
import { getMessages } from "../controllers/messageControllers/getMessages.js";

const router = express.Router();

router.post("/send/:id", sendMessage);
router.get("/:id", getMessages);

export default router;
