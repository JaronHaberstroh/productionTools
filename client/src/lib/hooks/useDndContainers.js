import { useState } from "react";

export default function useDndContainers(employeeList) {
  const coldEndGroup = ["2", "3", "4", "6", "8", "7", "9", "10", "11", "12"];
  const hotEndGroup = ["1", "3", "9", "11"];

  const initialState = {
    employeeList: [],
    coldEnds: createGroupInitialState(coldEndGroup),
    hotEnds: createGroupInitialState(hotEndGroup),
  };

  const [containers, setContainers] = useState(initialState);

  function handleDragEnd(e) {
    const { active, over } = e;

    // Check if drop target exists
    if (!over) return;

    // Find the dragged item in list
    const draggedEmployee = employeeList.find(
      (employee) => employee.id === active.id
    );

    // Get source and destination info
    const sourceInfo = getSourceInfo(active.data);
    const destinationInfo = getSourceInfo(over.data);

    // Check if source and destination are the same
    if (
      sourceInfo.containerId === destinationInfo.containerId &&
      sourceInfo.lineNumber === destinationInfo.lineNumber
    ) {
      return;
    }

    // Update containers based on drag operation
    setContainers((prevContainers) => {
      const updatedContainers = { ...prevContainers };

      // Call function to update containers
      callUpdateContainers(
        updatedContainers,
        sourceInfo,
        destinationInfo,
        draggedEmployee
      );

      return updatedContainers;
    });
  }

  function createGroupInitialState(groupList) {
    return groupList.reduce((acc, line) => {
      return { ...acc, [line]: [] };
    }, {});
  }

  function getSourceInfo(data) {
    return {
      containerId: data.current.containerId,
      lineNumber: data.current.lineNumber,
    };
  }

  function callUpdateContainers(
    updatedContainers,
    sourceInfo,
    destinationInfo,
    draggedEmployee
  ) {
    // Function to update containers
    function updateContainer(
      updatedContainers,
      containerId,
      lineNumber,
      operation
    ) {
      const container = updatedContainers[containerId];

      updatedContainers[containerId] =
        containerId === "employeeList"
          ? operation(container)
          : {
              ...container,
              [lineNumber]: operation(container[lineNumber], lineNumber),
            };

      return updatedContainers;
    }

    // Remove the dragged employee from the source container
    updateContainer(
      updatedContainers,
      sourceInfo.containerId,
      sourceInfo.lineNumber,
      (container) =>
        container.filter((employee) => employee.id !== draggedEmployee.id)
    );

    // Add the dragged employee to the destination container
    updateContainer(
      updatedContainers,
      destinationInfo.containerId,
      destinationInfo.lineNumber,
      (container) => [...container, draggedEmployee]
    );
  }

  return [containers, setContainers, handleDragEnd];
}
