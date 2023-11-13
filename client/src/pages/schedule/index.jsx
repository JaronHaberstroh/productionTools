import { useEffect, useState } from "react";
import useDndContainers from "@/lib/hooks/useDndContainers";

import Draggable from "@/components/dnd/Draggable";
import Droppable from "@/components/dnd/Droppable";
import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import EmployeeList from "@/components/employeeList/EmployeeList";

import { DndContext } from "@dnd-kit/core";

import { fetchData } from "@/lib/api/userApi";
import Container from "@/components/Container";

export default function HomePage() {
  const [employeeList, setEmployeeList] = useState([]);
  const [containers, setContainers, handleDragEnd] =
    useDndContainers(employeeList);

  const wrapperStyle = {
    display: "grid",
    gridTemplate: "1fr / 200px auto",
    margin: "8px",
    gap: "10px",
  };

  useEffect(() => {
    fetchDataFromServer(setEmployeeList, setContainers);
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={wrapperStyle}>
        <EmployeeList
          key="employeeList"
          id="employeeList"
          containerId="employeeList"
          title="Employee List"
          items={containers.employeeList}
          empty="ALL EMPLOYEES ASSIGNED"
        />

        <ScheduleContainer
          shift="B"
          time="6PM to 6AM"
          dateRange="5/1/23 - 5/14/23"
          coldEnds={Object.entries(containers.coldEnds).map(([key, values]) => (
            <Container key={`container_${key}`}>
              <Droppable
                key={key}
                id={`coldEnd${key}`}
                containerId="coldEnds"
                lineNumber={key}
              >
                <div>{key}</div>
                {values.map((employee) => (
                  <Draggable
                    key={employee.id}
                    id={employee.id}
                    containerId={"coldEnds"}
                    lineNumber={key}
                  >
                    {employee.fullName}
                  </Draggable>
                ))}
              </Droppable>
            </Container>
          ))}
        ></ScheduleContainer>
      </div>
    </DndContext>
  );
}

async function fetchDataFromServer(setEmployeeList, setContainers) {
  try {
    const response = await fetchData("user/find");
    const data = response.data;

    const updatedEmployeeList = data.map((employee) => ({
      id: employee._id,
      fullName: `${employee.lName}, ${employee.fName}`,
    }));

    setEmployeeList(updatedEmployeeList);
    setContainers((prevContainers) => ({
      ...prevContainers,
      employeeList: updatedEmployeeList,
    }));
  } catch (err) {
    console.error(err);
  }
}
