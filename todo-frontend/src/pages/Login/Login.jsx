import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      {/* Left side */}
      <div className={styles.leftPanel}>
        <h1 className={styles.welcomeTitle}>Welcome to Todo App</h1>
        <p className={styles.welcomeText}>
          Do not just aim, track them down and hunt.
        </p>
        <p>
          Set goals, update timely and see your productivity level
        </p>
      </div>

      {/* Right side login form */}
      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <h2 className={styles.title}>User Login</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.footer}>
            Don’t have an account?{" "}
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;