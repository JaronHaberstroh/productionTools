import { useDroppable, DragOverlay } from "@dnd-kit/core";
import DraggableItem from "@/components/dragAndDrop/DraggableItem";
import styles from "./droppableContainer.module.css";

export default function DroppableContainer(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      containerId: props.containerId,
      lineNumber: props.lineNumber,
    },
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <>
      <div
        key={`${props.containerId}_${props.lineNumber}`}
        id={`${props.containerId}_${props.lineNumber}`}
        className={styles.itemsContainer}
        style={style}
        ref={setNodeRef}
      >
        {props.items.length !== 0 ? (
          props.items.map((item) => (
            <>
              <DraggableItem
                key={item.id}
                id={item.id}
                containerId={props.containerId}
                lineNumber={props.lineNumber}
              >
                {item.fullName}
              </DraggableItem>
            </>
          ))
        ) : (
          <div className={styles.empty}>{props.empty}</div>
        )}
      </div>
    </>
  );
}
