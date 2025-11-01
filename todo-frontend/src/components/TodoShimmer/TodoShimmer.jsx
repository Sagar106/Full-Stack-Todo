import styles from "./TodoShimmer.module.css";

const TodoShimmer = () => {
  return (
    <div className={styles.shimmerCard}>
      <div className={styles.shimmerTitle}></div>
      <div className={styles.shimmerStatus}></div>
      <div className={styles.shimmerLine}></div>
    </div>
  );
};

export default TodoShimmer;