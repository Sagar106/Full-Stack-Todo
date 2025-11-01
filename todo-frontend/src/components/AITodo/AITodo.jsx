import { useState } from "react";
import styles from "./AITodo.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { aiTodo } from "../../store/todoSlice";
import Snackbar from "../../utils/Snackbar/Snackbar";

const AITodo = ({ onClose }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(aiTodo({ input: input }));
    onClose();
    setSnackBarOpen(true)
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.dialog}>
          <div className={styles.headingContainer}>
            <h2 className={styles.dialogHeading}>Create Todo With AI</h2>
            <IoMdCloseCircle
              size={28}
              className={styles.closeIcon}
              onClick={onClose}
            />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="enter your task..."
            />
            <button className={styles.button}>Create Todo</button>
          </form>
        </div>
      </div>
      {snackBarOpen === true ? (
        <Snackbar message="Todo added successfully" type="success" />
      ) : (
        <></>
      )}
    </>
  );
};

export default AITodo;
