import styles from "@/components/employeeList/employeeList.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const ListItem = (props) => {
  const Element = props.element || "div";

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      containerId: props.containerId,
      lineNumber: props.lineNumber,
    },
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        opacity: "0.7",
      }
    : undefined;

  return (
    <Element
      className={styles.item}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Item>{props.children}</Item>
    </Element>
  );
};

const Item = (props) => {
  return <div>{props.children}</div>;
};

export default ListItem;
