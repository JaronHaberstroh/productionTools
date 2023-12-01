import Container from "../ui/Container";
import ScheduleSection from "./ScheduleSection";
import ScheduleHeader from "./ScheduleHeader";

export default function ScheduleContainer(props) {
  const { sections, supervisorList } = props;

  return (
    <Container style={props.style}>
      <ScheduleHeader
        shift={props.shift}
        time={props.time}
        dateRange={props.dateRange}
        items={supervisorList}
      />
      {Object.entries(sections).map(([key, values]) => (
        <ScheduleSection
          key={`${key}_Container`}
          id={`${key}_Container`}
          containerId={key}
          items={values}
          empty={props.empty}
        />
      ))}
    </Container>
  );
}
