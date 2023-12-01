import { useDraggable } from "@dnd-kit/core";
import styles from "./draggableItem.module.css";

export default function DraggableItem(props) {
  const { id, containerId, lineNumber, position, children, element } = props;

  return (
    <DraggableContainer
      key={id}
      id={id}
      containerId={containerId}
      lineNumber={lineNumber}
      position={position}
      element={element}
    >
      <Item>{children}</Item>
    </DraggableContainer>
  );
}

export function DraggableContainer(props) {
  const {
    id,
    containerId,
    lineNumber,
    position,
    children,
    element: Element = "div",
  } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { containerId, lineNumber, position },
  });

  return (
    <Element key={id} id={id} ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </Element>
  );
}

export function Item(props) {
  const { children } = props;

  return <div className={styles.item}>{children}</div>;
}

export function EmptyItem(props) {
  const { children } = props;

  return <div className={styles.empty}>{children}</div>;
}

export function mapItemsOrRenderEmptyItems(
  items,
  containerId,
  lineNumber = "",
  position = "",
  numOfEmptyItems
) {
  return (
    <>
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          containerId={containerId}
          lineNumber={lineNumber}
          position={position}
        >
          {position ? `${position}:` : null} {item.fullName}
        </DraggableItem>
      ))}
      {Array.from({ length: Math.max(0, numOfEmptyItems - items.length) }).map(
        (_, idx) => (
          <EmptyItem key={`${position}_${idx}`}>
            {position ? `${position}: ` : null}Unassigned
          </EmptyItem>
        )
      )}
    </>
  );
}

// Add for defualt styling from @dnd-kit
// import { CSS } from "@dnd-kit/utilities";
// const style = transform
//   ? {
//       transform: CSS.Translate.toString(transform),
//     }
//   : undefined;
