import { useState } from "react";
import styles from "./TodoCard.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdateTodo from "../UpdateTodo/UpdateTodo";

const TodoCard = ({ todo, handleDelete }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false)

  const overdueDays =
    todo.status !== "Completed" && new Date(todo.dueDate) < new Date()
      ? Math.ceil((new Date() - new Date(todo.dueDate)) / (1000 * 60 * 60 * 24))
      : 0;

  const handleDialogOpening = () => {
    setOpenEditDialog(true)
  }

  return (
    <>
      <div className={styles.todoCard}>
        <div className={styles.todoHeader}>
          <h3>{todo.title}</h3>
          <span
            className={`${styles.badge} ${
              todo.status === "Completed"
                ? styles.completed
                : todo.status === "In progress"
                ? styles.inProgress
                : styles.notStarted
            }`}
          >
            {todo.status}
          </span>
        </div>
        <div className={styles.todoFooter}>
          <p className={styles.dueDate}>
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </p>
          {overdueDays > 0 && (
            <p className={styles.overdue}>
              ⚠️ Overdue by {overdueDays} day{overdueDays > 1 ? "s" : ""}
            </p>
          )}
          <span className={styles.footerButton}>
            <FaEdit onClick={handleDialogOpening} className={styles.footerIcons} size={24} />
            <MdDelete onClick={handleDelete} className={styles.footerIcons} size={24} />
          </span>
        </div>
      </div>
      {
        openEditDialog ? (
          <UpdateTodo todo={todo} onClose={() => setOpenEditDialog(false)} />
        ) : (
          <></>
        )
      }
    </>
  );
};

export default TodoCard;