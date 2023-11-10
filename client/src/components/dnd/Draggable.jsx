import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Draggable = (props) => {
  const Element = props.element || "div";

  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: props.id,
      data: {
        containerId: props.containerId,
      },
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        transition,
      }
    : undefined;

  return (
    <Element ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </Element>
  );
};

export default Draggable;
