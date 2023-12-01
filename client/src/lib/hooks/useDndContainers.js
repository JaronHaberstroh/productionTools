import { useState } from "react";

export default function useDndContainers(employeeList) {
  const coldEndGroup = ["2", "3", "4", "6", "8", "7", "9", "10", "11", "12"];
  const coldEndLinePositions = ["Oper", "Insp"];
  const hotEndGroup = ["1", "3", "9", "11"];
  const hotEndLinePositions = ["Oper", "Util", "SSR-Oper", "Insp"];

  const initialState = {
    supervisorList: [],
    employeeList: [],
    absentList: [],
    coldEnds: createGroupInitialState(coldEndGroup, coldEndLinePositions),
    hotEnds: createGroupInitialState(hotEndGroup, hotEndLinePositions),
  };

  const [containers, setContainers] = useState(initialState);

  function handleDragEnd(e) {
    const { active, over } = e;

    // Check if drop target exists
    if (!over) return;

    // Find the dragged item in list
    const draggedEmployee = findEmployee(employeeList, active);

    // Get source and destination info
    const sourceInfo = getSourceInfo(active.data);
    const destinationInfo = getSourceInfo(over.data);

    // Check if source and destination are the same
    if (
      sourceInfo.containerId === destinationInfo.containerId &&
      sourceInfo.lineNumber === destinationInfo.lineNumber &&
      sourceInfo.position === destinationInfo.position
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

  return [containers, setContainers, handleDragEnd];
}

export function findEmployee(employeeList, active) {
  return employeeList.find((employee) => employee.id === active.id);
}

export function getSourceInfo(data) {
  return {
    containerId: data.current.containerId,
    lineNumber: data.current.lineNumber,
    position: data.current.position,
  };
}

export function createGroupInitialState(groupList, linePositions) {
  return groupList.reduce((acc, line) => {
    const positionsObject = linePositions.reduce((positionsAcc, position) => {
      return { ...positionsAcc, [position]: [] };
    }, {});
    return { ...acc, [line]: positionsObject };
  }, {});
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
    position,
    operation
  ) {
    const container = updatedContainers[containerId];

    updatedContainers[containerId] =
      containerId === "employeeList" ||
      containerId === "absentList" ||
      containerId === "supervisorList"
        ? operation(container)
        : {
            ...container,
            [lineNumber]: {
              ...container[lineNumber],
              [position]: operation(container[lineNumber][position], position),
            },
          };

    return updatedContainers;
  }

  // Remove the dragged employee from the source container
  updateContainer(
    updatedContainers,
    sourceInfo.containerId,
    sourceInfo.lineNumber,
    sourceInfo.position,
    (container) =>
      container.filter((employee) => employee.id !== draggedEmployee.id)
  );

  // Add the dragged employee to the destination container
  updateContainer(
    updatedContainers,
    destinationInfo.containerId,
    destinationInfo.lineNumber,
    destinationInfo.position,
    (container) => [...container, draggedEmployee]
  );
  return updatedContainers;
}
