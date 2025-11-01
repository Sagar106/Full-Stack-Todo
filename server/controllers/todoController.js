import Todo from "../models/Todo.js";

//Create todo
export const createTodo = async (req, res) => {
    try {
        const { title, dueDate } = req.body;
        const todo = await Todo.create({ user: req.user.id, title, dueDate })
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get Todos
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id })
        res.json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Update Todos
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndUpdate({
            _id: id,
            user: req.user.id
        },
        req.body,
        { new: true }
        )

        if (!todo) return res.status(404).json({ message: "Todo not found" })
        res.json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Delete Todo
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id })
        
        if (!todo) return res.status(404).json({ message: "Todo not found" })
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}