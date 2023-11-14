import { useDroppable } from "@dnd-kit/core";
import styles from "@/components/employeeList/employeeList.module.css";
import ListItem from "./ListItem";

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

export default EmployeeList;
