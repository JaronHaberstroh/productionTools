import Container from "../ui/Container";
import DroppableContainer from "../dragAndDrop/DroppableContaier";
import { mapItemsOrRenderEmptyItems } from "../dragAndDrop/DraggableItem";
import Header from "../ui/Header";

export default function EmployeeList(props) {
  const { id, containerId, items, style, className, title, empty } = props;

  const args = {
    items: items,
    containerId: containerId,
    numOfEmptyItems: "1",
    empty: empty,
  };

  return (
    <Container style={style} className={className}>
      <Header key={`Header_${title}`}>{title}</Header>

      <DroppableContainer id={id} containerId={containerId}>
        {mapItemsOrRenderEmptyItems(args)}
      </DroppableContainer>
    </Container>
  );
}
