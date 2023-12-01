import styles from "./header.module.css";

export default function Header(props) {
  const { children } = props;

  return <div className={styles.title}>{children}</div>;
}
