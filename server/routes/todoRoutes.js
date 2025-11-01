import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-todo", protect, createTodo);
router.get("/get-todos", protect, getTodos);
router.put("/update-todo/:id", protect, updateTodo);
router.delete("/delete-todo/:id", protect, deleteTodo);

export default router;