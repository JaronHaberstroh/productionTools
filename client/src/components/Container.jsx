const Container = (props) => {
  const style = {
    border: "1px solid var(--border-color)",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    width: "200px",
    borderRadius: "10px",
    padding: "5px",
  };
  return <div style={style}>{props.children}</div>;
};

export default Container;
