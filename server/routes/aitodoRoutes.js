import express from "express"
import { createAITodo } from "../controllers/aitodoController.js"

const router = express.Router();

router.post("/parse-todo", createAITodo)

export default router