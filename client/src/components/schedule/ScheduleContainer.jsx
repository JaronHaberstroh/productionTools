import ScheduleSection from "./ScheduleSection";
import styles from "@/components/schedule/schedule.module.css";

const ScheduleContainer = (props) => {
  return (
    <div className={styles.schedule}>
      <div className={styles.section}>
        <h2>SHIFT: {props.shift} SHIFT SCHEDULE</h2>
        <h2>TIME: {props.time}</h2>
        <h2>PAY PERIOD ENDING: {props.dateRange}</h2>
      </div>
      {Object.entries(props.sections).map(
        ([key, values]) =>
          key !== "employeeList" && (
            <ScheduleSection
              key={key}
              id={`${key}_Container`}
              title={
                key === "coldEnds"
                  ? "Cold End"
                  : key === "hotEnds"
                  ? "Hot End"
                  : "undefined"
              }
              containerId={key}
            >
              {values}
            </ScheduleSection>
          )
      )}
    </div>
  );
};

export default ScheduleContainer;
