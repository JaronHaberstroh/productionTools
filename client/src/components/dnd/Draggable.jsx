import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";

const Draggable = (props) => {
  const Element = props.element || "div";

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      containerId: props.containerId,
      lineNumber: props.lineNumber,
    },
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        display: "flex",
      }
    : undefined;

  return (
    <Element ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Item>{props.children}</Item>
    </Element>
  );
};

const Item = (props) => {
  return <div>{props.children}</div>;
};

export default Draggable;
