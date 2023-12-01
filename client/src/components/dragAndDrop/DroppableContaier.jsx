import { useDroppable } from "@dnd-kit/core";
import styles from "./droppableContainer.module.css";

export default function DroppableContainer(props) {
  const { id, containerId, lineNumber, position, className } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: { containerId, lineNumber, position },
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <>
      <div
        key={generateKey(props)}
        id={generateKey(props)}
        className={`${styles.itemsContainer} ${className}`}
        style={style}
        ref={setNodeRef}
      >
        {props.children}
      </div>
    </>
  );
}

function generateKey(props) {
  const { containerId, lineNumber, position } = props;

  return `${containerId}_${lineNumber}_${position}`;
}
