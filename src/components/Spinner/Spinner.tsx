import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <span className={styles.container}>
      <span className={styles.spinner}></span>
    </span>
  );
}
