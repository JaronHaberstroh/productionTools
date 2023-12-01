import styles from "./layout.module.css";

export default function Layout(props) {
  const { children } = props;

  return <div className={styles.layout}>{children}</div>;
}
