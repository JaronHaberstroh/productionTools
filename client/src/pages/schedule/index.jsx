import { useEffect, useState } from "react";
import useDndContainers from "@/lib/hooks/useDndContainers";

import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import EmployeeList from "@/components/employeeList/EmployeeList";
import Layout from "@/components/layout/layout";
import { Item } from "@/components/dragAndDrop/DraggableItem";

import { DndContext, DragOverlay } from "@dnd-kit/core";

import { fetchData } from "@/lib/api/userApi";

export default function HomePage() {
  const [activeId, setActiveId] = useState(null);
  const [scheduleDate, updateStartDate] = useManageTime();

  const [employeeList, setEmployeeList] = useState([]);
  const [containers, setContainers, handleDragEnd] = useDndContainers(
    employeeList,
    setActiveId
  );

  useEffect(() => {
    fetchDataFromServer(setEmployeeList, setContainers);
  }, []);

  return (
    <Layout>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={(e) => handleDragStart(e, setActiveId)}
      >
        <EmployeeList
          key="employeeList"
          id="employeeList"
          containerId="employeeList"
          title="Employee List"
          items={containers.employeeList}
          empty="ALL EMPLOYEES ASSIGNED"
        />

        <ScheduleContainer
          key="scheduleContainer"
          id="scheduleContainer"
          shift="B"
          time="6PM to 6AM"
          dateRange={`${scheduleDate.startDate.toLocaleDateString()} - ${scheduleDate.endDate.toLocaleDateString()}`}
          sections={filterObjectByKey(containers, "employeeList")}
          empty="Operator: Unassigned"
        />
        {/* TODO: Fix Broken DragOverlay */}
        <DragOverlay>
          {activeId ? (
            <Item
              key={`DragOverlay_${activeId}`}
              id={`DragOverlay_${activeId}`}
            >
              {employeeList.fullName}
            </Item>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Layout>
  );
}

function handleDragStart(e, setActiveId) {
  setActiveId(e.active.id);
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

function filterObjectByKey(obj, excludedKey) {
  const { [excludedKey]: omit, ...result } = obj;
  return result;
}

function useManageTime() {
  const [scheduleDate, setScheduleDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    const newEndDate = new Date(scheduleDate.startDate);
    newEndDate.setDate(scheduleDate.startDate.getDate() + 13);

    setScheduleDate((prevDate) => ({
      ...prevDate,
      endDate: newEndDate,
    }));
  }, [scheduleDate.startDate]);

  function updateStartDate() {
    const newStartDate = new Date();
    const newEndDate = new Date(scheduleDate.startDate);
    newEndDate.setDate(scheduleDate.startDate.getDate() + 13);

    setScheduleDate({ startDate: newStartDate, endDate: newEndDate });
  }

  return [scheduleDate, updateStartDate];
}
