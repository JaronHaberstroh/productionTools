import { useDroppable } from "@dnd-kit/core";
import styles from "@/components/employeeList/employeeList.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const EmployeeList = (props) => {
  const { items, empty } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      containerId: props.containerId,
    },
  });

  const style = { backgroundColor: isOver ? "green" : undefined };

  return (
    <div className={styles.employeeList} style={style}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.itemsContainer} ref={setNodeRef}>
        {items.length !== 0 ? (
          items.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              containerId={props.containerId}
            >
              {item.fullName}
            </ListItem>
          ))
        ) : (
          <div className={styles.empty}>{empty}</div>
        )}
      </div>
    </div>
  );
};

const ListItem = (props) => {
  const Element = props.element || "div";

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      containerId: props.containerId,
    },
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        display: "flex",
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

export default EmployeeList;
