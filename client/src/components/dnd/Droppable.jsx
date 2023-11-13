import { useDroppable } from "@dnd-kit/core";

const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      containerId: props.containerId,
      lineNumber: props.lineNumber,
    },
  });

  const style = { color: isOver ? "green" : undefined };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Droppable;
