import styles from "@/components/schedule/schedule.module.css";
import Card from "../Card";
import Draggable from "../dnd/Draggable";
import Droppable from "../dnd/Droppable";

const ScheduleContainer = (props) => {
  return (
    <div className={styles.schedule}>
      <div className={styles.section}>
        <h2>SHIFT: {props.shift} SHIFT SCHEDULE</h2>
        <h2>TIME: {props.time}</h2>
        <h2>PAY PERIOD ENDING: {props.dateRange}</h2>
      </div>
      <div className={styles.section}>{props.coldEnds}</div>
      <div className={styles.section}>{props.hotEnds}</div>
      <div className={styles.section}></div>
    </div>
  );
};

export default ScheduleContainer;
