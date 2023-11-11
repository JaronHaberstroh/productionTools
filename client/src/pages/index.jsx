import { useEffect, useState } from "react";

import Card from "@/components/Card";
import Draggable from "@/components/dnd/Draggable";
import Droppable from "@/components/dnd/Droppable";

import { DndContext } from "@dnd-kit/core";

import { fetchData } from "@/lib/api/userApi";
import Container from "@/components/Container";

const containerKeys = [
  "employeeList",
  "CE2",
  "CE3",
  "CE4",
  "CE6",
  "CE8",
  "CE7",
  "CE9",
  "CE10",
  "CE11",
  "CE12",
  "HE1",
  "HE3",
  "HE9",
  "HE11",
];

export default function HomePage() {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeContainers, setEmployeeContainers] = useState(
    containerKeys.reduce((acc, key) => ({ ...acc, [key]: [] }), {})
  );

  useEffect(() => {
    async function fetchDataFromServer() {
      try {
        const response = await fetchData("user/find");
        const data = response.data;

        const updatedEmployeeList = data.map((employee) => ({
          id: employee._id,
          fullName: `${employee.lName}, ${employee.fName}`,
        }));

        setEmployeeList(updatedEmployeeList);

        setEmployeeContainers((prevContainers) => ({
          ...prevContainers,
          employeeList: updatedEmployeeList,
        }));
      } catch (err) {
        console.error(err);
      }
    }
    fetchDataFromServer();
  }, []);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (!over) return;

    const sourceContainer = active.data.current.containerId;

    const destinationContainer = over.id;

    if (sourceContainer === destinationContainer) return;

    const draggedEmployee = employeeList.find(
      (employee) => employee.fullName === active.id
    );

    setEmployeeContainers((prevContainers) => {
      return {
        ...prevContainers,
        [sourceContainer]: prevContainers[sourceContainer].filter(
          (employee) => employee.id !== draggedEmployee.id
        ),
        [destinationContainer]: [
          ...prevContainers[destinationContainer],
          draggedEmployee,
        ],
      };
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {containerKeys.map((key) => (
        <Container key={`container_${key}`}>
          <Droppable key={key} id={key}>
            <div>{key}</div>
            {employeeContainers[key].map((employee) => (
              <Draggable
                key={employee.id}
                id={employee.fullName}
                containerId={key}
              >
                <Card>{employee.fullName}</Card>
              </Draggable>
            ))}
          </Droppable>
        </Container>
      ))}
    </DndContext>
  );
}
