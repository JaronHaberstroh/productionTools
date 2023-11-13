const Card = (props) => {
  const style = {
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    padding: "5px",
    display: "flex",
    gap: "5px",
    justifyContents: "center",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <h3>{props.title}</h3>
      <p>{props.children}</p>
    </div>
  );
};

export default Card;
