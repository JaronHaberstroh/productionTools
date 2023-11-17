import styles from "./layout.module.css";

export default function Layout(props) {
  return <div className={styles.layout}>{props.children}</div>;
}
