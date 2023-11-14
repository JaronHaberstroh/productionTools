import ListItem from "../employeeList/ListItem";
import { useDroppable } from "@dnd-kit/core";

import styles from "@/components/schedule/schedule.module.css";

const LineContainer = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      containerId: props.containerId,
      lineNumber: props.lineNumber,
    },
  });

  const style = { color: isOver ? "green" : undefined };

  return (
    <div
      ref={setNodeRef}
      key={`${props.containerId}_${props.lineNumber}`}
      id={`${props.containerId}_${props.lineNumber}`}
      className={styles.lineContainer}
      style={style}
    >
      <div>{props.title}</div>
      {props.children.map((employee) =>
        props.children.length !== 0 ? (
          <ListItem
            key={employee.id}
            id={employee.id}
            containerId={props.containerId}
            lineNumber={props.lineNumber}
          >
            {employee.fullName}
          </ListItem>
        ) : (
          <div>Empty</div>
        )
      )}
    </div>
  );
};

export default LineContainer;
