import styles from "./draggableItem.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DroppableItem(props) {
  const Element = props.element || "div";

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
      data: {
        containerId: props.containerId,
        lineNumber: props.lineNumber,
        fullName: props.children,
      },
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        opacity: "0.7",
        cursor: isDragging ? "grabbing" : "grab",
      }
    : undefined;

  return (
    <Element ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Item>{props.children}</Item>
    </Element>
  );
}

export function Item(props) {
  return <div className={styles.item}>{props.children}</div>;
}
