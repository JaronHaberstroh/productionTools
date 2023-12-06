import { useState } from "react";

const coldEndGroup = ["2", "3", "4", "6", "8", "7", "9", "10", "11", "12"];
const coldEndLinePositions = ["Oper", "Insp"];
const hotEndGroup = ["1", "3", "9", "11"];
const hotEndLinePositions = ["Oper", "Util", "SSR-Oper", "Insp"];
const listContainers = ["supervisorList", "employeeList", "absentList"];

export default function useDndContainers(employeeList) {
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
    const props = ["containerId", "lineNumber", "position"];
    if (props.every((prop) => sourceInfo[prop] === destinationInfo[prop])) {
      return;
    }

    // Update containers based on drag operation
    setContainers((prevContainers) => {
      const updatedContainers = { ...prevContainers };

      // Call function to update containers
      const params = { sourceInfo, destinationInfo, draggedEmployee };
      callUpdateContainers(updatedContainers, params);

      return updatedContainers;
    });
  }

  return [containers, setContainers, handleDragEnd];
}

export function findEmployee(employeeList, active) {
  return employeeList.find((employee) => employee.id === active.id);
}

export function getSourceInfo(data) {
  const { containerId, lineNumber, position } = data.current;

  return { containerId, lineNumber, position };
}

export function createGroupInitialState(groupList, linePositions) {
  const lineObj = Object.fromEntries(
    linePositions.map((position) => [position, []])
  );

  return Object.fromEntries(groupList.map((line) => [line, { ...lineObj }]));
}

function callUpdateContainers(updatedContainers, params) {
  const { sourceInfo, destinationInfo, draggedEmployee } = params;

  // Function to update containers
  function updateContainer(containerInfo, operation) {
    const { containerId } = containerInfo;
    const container = updatedContainers[containerId];

    const params = { container, draggedEmployee };
    updatedContainers[containerId] = listContainers.includes(containerId)
      ? operation(params)
      : updateNestedContainer(params, containerInfo, operation);
  }

  // Remove the dragged employee from the source container
  updateContainer(sourceInfo, removeEmployeeFromContainer);

  // Add the dragged employee to the destination container
  updateContainer(destinationInfo, addEmployeeToContainer);
}

// Add employee operation
function addEmployeeToContainer({ container, draggedEmployee }) {
  return [...container, draggedEmployee];
}

// Remove employee operation
function removeEmployeeFromContainer({ container, draggedEmployee }) {
  return container.filter((employee) => employee.id !== draggedEmployee.id);
}

// Function for updating nested containers
function updateNestedContainer(params, containerInfo, operation) {
  const { container, draggedEmployee } = params;
  const { lineNumber, position } = containerInfo;
  return {
    ...container,
    [lineNumber]: {
      ...container[lineNumber],
      [position]: operation({
        container: container[lineNumber][position],
        draggedEmployee,
      }),
    },
  };
}
