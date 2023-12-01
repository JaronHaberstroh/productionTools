import Header from "../ui/Header";
import Card from "../ui/Card";
import ScheduleSectionCard from "./ScheduleSectionCard";

import splitStringAndCapitalizeFirstWord from "@/lib/utils/splitStringAndCapitalizeFirstWord";

import styles from "./scheduleSection.module.css";

export default function ScheduleSection(props) {
  const { items, containerId } = props;

  return (
    <div className={styles.section}>
      {Object.entries(items).map(([key, values]) => (
        <Card key={`Card_${containerId}_${key}`}>
          <Header key={`lineHeader_${containerId}_${key}`}>
            {`${splitStringAndCapitalizeFirstWord(containerId)} ${key}`}
          </Header>

          {/* Render Cold End Cards */}
          {containerId === "coldEnds" && renderSecctionCard(props, key, values)}

          {/* Render Hot End Cards */}
          {containerId === "hotEnds" &&
            renderSecctionCard(props, key, values, {
              repeatEmptyItem: 3,
              className: "hotEndCard",
            })}
        </Card>
      ))}
    </div>
  );
}

function renderSecctionCard(props, key, items, extraProps = {}) {
  const { containerId } = props;
  const { repeatOperItem, repeatEmptyItem, className } = extraProps;

  return (
    <ScheduleSectionCard
      key={`${containerId}${key}`}
      id={`${containerId}${key}`}
      containerId={containerId}
      lineNumber={key}
      items={items}
      repeatOperItem={repeatOperItem || "1"}
      repeatEmptyItem={repeatEmptyItem || "1"}
      className={className}
    />
  );
}
