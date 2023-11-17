import styles from "./header.module.css";

export default function Header(props) {
  return <div className={styles.title}>{props.children}</div>;
}
