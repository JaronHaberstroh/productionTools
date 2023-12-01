import { mapItemsOrRenderEmptyItems } from "../dragAndDrop/DraggableItem";
import DroppableContainer from "../dragAndDrop/DroppableContaier";

import styles from "./scheduleHeader.module.css";

export default function ScheduleHeader(props) {
  const { shift, time, dateRange, items } = props;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <p>{`SHIFT: '${shift}' SHIFT SCHEDULE`}</p>
        <p>{`TIME: ${time}`}</p>
        <p>{`PAY PERIOD ENDING: ${dateRange}`}</p>
      </div>
      {renderSupervisorContainer(items)}
    </div>
  );
}

function renderSupervisorContainer(items) {
  const containerId = "supervisorList";

  const args = {
    items: items,
    containerId: containerId,
    numOfEmptyItems: "2",
  };

  return (
    <div className={styles.super}>
      <p>Supervisors:</p>
      <DroppableContainer
        key={containerId}
        id={containerId}
        containerId={containerId}
        className={styles.super}
      >
        {mapItemsOrRenderEmptyItems(args)}
      </DroppableContainer>
    </div>
  );
}
