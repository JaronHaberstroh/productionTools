import Container from "../ui/Container";
import DroppableContainer from "../dragAndDrop/DroppableContaier";

import Header from "../ui/Header";
import { useState } from "react";

export default function EmployeeList(props) {
  return (
    <Container>
      <Header key={`Header_${props.title}`}>{props.title}</Header>

      <DroppableContainer
        id={props.id}
        containerId={props.containerId}
        title={props.title}
        items={props.items}
        empty={props.empty}
      />
    </Container>
  );
}
