import DroppableContainer from "../dragAndDrop/DroppableContaier";
import { mapItemsOrRenderEmptyItems } from "../dragAndDrop/DraggableItem";

import styles from "./scheduleSectionCard.module.css";

export default function ScheduleSectionCard(props) {
  const { className, repeatOperItem, repeatEmptyItem } = props;

  return (
    <div className={styles[className]}>
      {renderContainerGroup(props, false, repeatOperItem)}
      {renderContainerGroup(props, true, repeatEmptyItem)}
    </div>
  );
}

function renderContainerGroup(props, isInspector, repeatEmptyItem) {
  const { items } = props;

  return (
    <div>
      {Object.entries(items).map(([key, value]) =>
        (isInspector && key === "Insp") || (!isInspector && key !== "Insp")
          ? renderDroppableContainer(props, key, value, repeatEmptyItem)
          : null
      )}
    </div>
  );
}

function renderDroppableContainer(props, key, items, numOfEmptyItems) {
  const { containerId, lineNumber } = props;
  return (
    <DroppableContainer
      key={generateKey(props, key)}
      id={generateKey(props, key)}
      containerId={containerId}
      lineNumber={lineNumber}
      position={key}
    >
      {mapItemsOrRenderEmptyItems(
        items,
        containerId,
        lineNumber,
        key,
        numOfEmptyItems
      )}
    </DroppableContainer>
  );
}

function generateKey(props, key) {
  return `${props.containerId}_${props.lineNumber}_${key}`;
}
