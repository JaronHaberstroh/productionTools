const Card = (props) => {
  const style = {
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    padding: "5px",
  };

  return (
    <div style={style}>
      <div>{props.title}</div>
      {props.children}
    </div>
  );
};

export default Card;
