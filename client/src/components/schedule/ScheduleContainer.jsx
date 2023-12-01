import Container from "../ui/Container";
import ScheduleSection from "./ScheduleSection";
import ScheduleHeader from "./ScheduleHeader";

export default function ScheduleContainer(props) {
  const { style, shift, time, dateRange, empty } = props;
  const { sections, supervisorList } = props;

  return (
    <Container style={style}>
      <ScheduleHeader
        shift={shift}
        time={time}
        dateRange={dateRange}
        items={supervisorList}
      />
      {Object.entries(sections).map(([key, values]) => (
        <ScheduleSection
          key={`${key}_Container`}
          id={`${key}_Container`}
          containerId={key}
          items={values}
          empty={empty}
        />
      ))}
    </Container>
  );
}
