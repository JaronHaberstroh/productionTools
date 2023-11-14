import LineContainer from "./LineContainer";

import styles from "@/components/schedule/schedule.module.css";

const ScheduleSection = (props) => {
  return (
    <div className={styles.section}>
      {Object.entries(props.children).map(([key, values]) => (
        <LineContainer
          key={`${props.containerId}${key}`}
          id={`${props.containerId}${key}`}
          title={`${props.title} ${key}`}
          containerId={props.containerId}
          lineNumber={key}
        >
          {values}
        </LineContainer>
      ))}
    </div>
  );
};

export default ScheduleSection;
