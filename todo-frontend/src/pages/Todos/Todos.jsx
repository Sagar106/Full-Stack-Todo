import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useState, useEffect, useMemo } from "react";
import { fetchTodos, addTodo, deleteTodo } from "../../store/todoSlice";
import styles from "./Todos.module.css";
import TodoCard from "../../components/TodoCard/TodoCard";
import TodoShimmer from "../../components/TodoShimmer/TodoShimmer";
import Snackbar from "../../utils/Snackbar/Snackbar";
import useDebounce from "../../utils/useDebounce";
import Filter from "../../components/Filter/Filter";
import { BsStars } from "react-icons/bs";
import AITodo from "../../components/AITodo/AITodo";

const Todos = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [openTodoDialog, setOpenTodoDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 700)
  const { list, loading } = useSelector((state) => state.todos);
  const [snackBar, setSnackBar] = useState({ open: false, message: "", type: "" })
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    dispatch(addTodo({ title, dueDate }))
        .unwrap()
        .then(() => {
            setSnackBar({ open: true, message: "Todo added successfully!", type: "success" })
        })
        .catch(() => {
            setSnackBar({ open: true, message: "Failed to Add Todo", type: "error" })
        })
    
    setTitle("");
    setDueDate("");
  };

  const handleDelete = (_id) => {
    dispatch(deleteTodo(_id))
    .unwrap()
    .then(() => {
        setSnackBar({ open: true, message: "Todo deleted successfully!", type: "success" })
    })
    .catch(() => {
        setSnackBar({ open: true, message: "Failed to delete todo", type: "error" })
    })
  }

  const handleDialogOpening = () => {
    setOpenTodoDialog(true)
  }

  const filteredTodos = useMemo(() => {
    const searchText = debouncedSearch.toLowerCase().trim();

    return list.filter((todo) => {
        // Search filter
        const matchesSearch = !searchText || todo.title.toLowerCase().includes(searchText);

        // Status filter
        const matchesStatus = selectedStatus.length === 0 || todo.status.includes(selectedStatus);

        // Date filter
        const matchesDate = !selectedDate || todo.dueDate === selectedDate;

        return matchesSearch && matchesStatus && matchesDate;
    });
  }, [list, selectedStatus, selectedDate, debouncedSearch]);


  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>📋 Todo List</h1>
        {user && (
          <div className={styles.userDisplay}>
            <button onClick={handleDialogOpening} className={styles.addBtn}>
              <BsStars />
              Create todo with AI
            </button>
            <span>
              Welcome, <strong>{user.username}</strong>
            </span>
            <button
              className={styles.logoutBtn}
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Form */}
      <section className={styles.formSection}>
        <h2>Add a new Todo</h2>
        <form onSubmit={handleAddTodo} className={styles.form}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title..."
            className={styles.input}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.addBtn}>
            Add
          </button>
        </form>
      </section>

      {/*Search & Filters*/}
      <section className={styles.searchBar}>
        <div className={styles.filterContainer}>
            <Filter 
                selectedDate={selectedDate}
                selectedStatus={selectedStatus}
                setSelectedDate={setSelectedDate}
                setSelectedStatus={setSelectedStatus}
            />
        </div>
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search your todo"
            />
        </div>
      </section>

      {/* Todo List */}
      <section className={styles.todoList}>
        {loading ? (
          <>
            <TodoShimmer />
            <TodoShimmer />
            <TodoShimmer />
          </>
        ) : list.length === 0 ? (
          <p className={styles.empty}>No todos yet. Start adding!</p>
        ) : filteredTodos.length === 0 ? (
          <p className={styles.empty}>No todos found</p>
        ) : (
          filteredTodos.map((todo) => <TodoCard key={todo._id} todo={todo} handleDelete={() => handleDelete(todo._id)} />)
        )}
      </section>
      {
        openTodoDialog ? (
          <AITodo onClose={() => setOpenTodoDialog(false)} />
        ) : (
          <></>
        )
      }
      {
        snackBar.open === true ? (
            <Snackbar 
                message={snackBar.message} 
                type={snackBar.type}
                onClose={() => setSnackBar({ ...snackBar, open: false })}
            />
        ) : (
            <></>
        )
      }
    </div>
  );
};

export default Todos;