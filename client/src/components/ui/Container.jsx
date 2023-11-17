import styles from "./container.module.css";

const Container = (props) => {
  const containerClassName = props.className
    ? `${styles.container} ${props.className}`
    : styles.container;

  return <div className={containerClassName}>{props.children}</div>;
};

export default Container;
