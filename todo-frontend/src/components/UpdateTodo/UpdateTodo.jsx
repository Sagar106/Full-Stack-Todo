import { useState } from "react";
import styles from "./UpdateTodo.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../store/todoSlice";
import Snackbar from "../../utils/Snackbar/Snackbar";

const UpdateTodo = ({ todo, onClose }) => {
    const [title, setTitle] = useState(todo.title);
    const [dueDate, setDueDate] = useState(todo.dueDate);
    const [status, setStatus] = useState(todo.status);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTodo({ id: todo._id, title, dueDate, status }));
        onClose();
        setSnackBarOpen(true)
    }

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.dialog}>
                    <div className={styles.headingContainer}>
                        <h2 className={styles.dialogHeading}>Update Todo</h2>
                        <IoMdCloseCircle size={28} className={styles.closeIcon} onClick={onClose} />
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input className={styles.input} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input className={styles.input} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        <select
                            className={styles.select}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option className={styles.option}>Not Started</option>
                            <option className={styles.option}>In Progress</option>
                            <option className={styles.option}>Completed</option>
                        </select>
                        <button className={styles.button}>Save Changes</button>
                    </form>
                </div>
            </div>
            {
                snackBarOpen === true ? (
                    <Snackbar message="Todo updated successfully" type="success" />
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default UpdateTodo