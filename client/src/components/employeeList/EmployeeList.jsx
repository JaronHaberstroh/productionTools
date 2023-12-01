import Container from "../ui/Container";
import DroppableContainer from "../dragAndDrop/DroppableContaier";
import DraggableItem, { EmptyItem } from "../dragAndDrop/DraggableItem";
import Header from "../ui/Header";

export default function EmployeeList(props) {
  const { id, containerId, style, className, title } = props;

  return (
    <Container style={style} className={className}>
      <Header key={`Header_${title}`}>{title}</Header>

      <DroppableContainer id={id} containerId={containerId}>
        {mapItemsOrRenderEmptyItems(props)}
      </DroppableContainer>
    </Container>
  );
}

function mapItemsOrRenderEmptyItems(props) {
  const { items, containerId, empty } = props;
  return items.length > 0 ? (
    items.map((item) => (
      <DraggableItem key={item.id} id={item.id} containerId={containerId}>
        {item.fullName}
      </DraggableItem>
    ))
  ) : (
    <EmptyItem>{empty}</EmptyItem>
  );
}
