import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { validators } from "../../constants/constant";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const { registerSuccess, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    Object.keys(validators).forEach((field) => {
      for (let rule of validators[field]){
        if(!rule.test(formData[field])){
          errors[field] = rule.message
          break
        }
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(registerUser(formData));
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate("/");
    }
  }, [registerSuccess, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h1 className={styles.welcomeTitle}>Join Us Today 🚀</h1>
        <p className={styles.welcomeText}>
          Create an account and start managing your todos seamlessly. Stay productive, stay organized!
        </p>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <h2 className={styles.title}>Register</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {formErrors.username && <p className={styles.error}>{formErrors.username}</p>}

            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.footer}>
            Already have an account?{" "}
            <Link to="/" className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;