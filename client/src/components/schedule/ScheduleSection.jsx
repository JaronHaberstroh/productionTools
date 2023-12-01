import Header from "../ui/Header";
import Card from "../ui/Card";
import ScheduleSectionCard from "./ScheduleSectionCard";

import splitStringAndCapitalizeFirstWord from "@/lib/utils/splitStringAndCapitalizeFirstWord";

import styles from "./scheduleSection.module.css";

export default function ScheduleSection(props) {
  const { items, containerId } = props;

  return (
    <div className={styles.section}>
      {Object.entries(items).map(([key, values]) => {
        const args = {
          containerId: containerId,
          lineNumber: key,
          items: values,
        };
        const extraArgs = {
          repeatEmptyItem: 3,
          className: "hotEndCard",
        };

        return (
          <Card key={`Card_${containerId}_${key}`}>
            <Header key={`lineHeader_${containerId}_${key}`}>
              {`${splitStringAndCapitalizeFirstWord(containerId)} ${key}`}
            </Header>

            {/* Render Cold End Cards */}
            {containerId === "coldEnds" && renderSectionCard(args)}

            {/* Render Hot End Cards */}
            {containerId === "hotEnds" && renderSectionCard(args, extraArgs)}
          </Card>
        );
      })}
    </div>
  );
}

function renderSectionCard(args, extraArgs = {}) {
  const { containerId, lineNumber, items } = args;
  const { repeatOperItem, repeatEmptyItem, className } = extraArgs;

  return (
    <ScheduleSectionCard
      key={`${containerId}${lineNumber}`}
      id={`${containerId}${lineNumber}`}
      containerId={containerId}
      lineNumber={lineNumber}
      items={items}
      repeatOperItem={repeatOperItem || "1"}
      repeatEmptyItem={repeatEmptyItem || "1"}
      className={className}
    />
  );
}
