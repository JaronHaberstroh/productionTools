import styles from "./card.module.css";

export default function Card(props) {
  const { style, children } = props;

  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}
