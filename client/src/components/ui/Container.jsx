import styles from "./container.module.css";

export default function Container(props) {
  const { className, style, children } = props;

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {children}
    </div>
  );
}
