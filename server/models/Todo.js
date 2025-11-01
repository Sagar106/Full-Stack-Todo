import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        dueDate: { type: String, required: true },
        status: {
            type: String,
            enum: ["Not started", "In Progress", "Completed"],
            default: "Not started"
        }
    }, { timestamps: true }
)

export default mongoose.model("Todo", todoSchema)