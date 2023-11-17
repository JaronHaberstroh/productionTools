import Card from "../ui/Card";
import DroppableContainer from "../dragAndDrop/DroppableContaier";
import styles from "./scheduleContainer.module.css";
import Container from "../ui/Container";
import Header from "../ui/Header";

export default function ScheduleContainer(props) {
  return (
    <Container>
      <div className={styles.section}>
        <h2>SHIFT: {props.shift} SHIFT SCHEDULE</h2>
        <h2>TIME: {props.time}</h2>
        <h2>PAY PERIOD ENDING: {props.dateRange}</h2>
      </div>
      {Object.entries(props.sections).map(([key, values]) => (
        <ScheduleSection
          key={key}
          id={`${key}_Container`}
          containerId={key}
          values={values}
          empty={props.empty}
        />
      ))}
    </Container>
  );
}

export function ScheduleSection(props) {
  return (
    <div className={styles.section}>
      {Object.entries(props.values).map(([key, values]) => (
        <Card key={`Card_${props.containerId}_${key}`}>
          <Header key={`lineHeader_${props.containerId}_${key}`}>
            {`${splitStringAndCapitalizeFirstWord(props.containerId)} ${key}`}
          </Header>
          <DroppableContainer
            key={`${props.containerId}${key}`}
            id={`${props.containerId}${key}`}
            containerId={props.containerId}
            lineNumber={key}
            items={values}
            empty={props.empty}
          />
        </Card>
      ))}
    </div>
  );
}

function splitStringAndCapitalizeFirstWord(inputString) {
  return (
    inputString
      // Split on capital letters
      .split(/(?=[A-Z])/)
      // .map word capitalizing first letter and removing trailing s
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).replace(/s$/, "");
      })
      // rejoin words
      .join(" ")
  );
}
