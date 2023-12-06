import { useEffect, useState } from "react";
import useDndContainers, { findEmployee } from "@/lib/hooks/useDndContainers";

import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import EmployeeList from "@/components/employeeList/EmployeeList";
import Layout from "@/components/layout/Layout";
import { Item } from "@/components/dragAndDrop/DraggableItem";

import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";

import { fetchData } from "@/lib/api/userApi";
import filterObjByKey from "@/lib/utils/filterObjByKey";

import styles from "./index.module.css";

export default function HomePage() {
  const [active, setActive] = useState(null);
  const [scheduleDate, updateStartDate] = useManageTime();

  const [employeeList, setEmployeeList] = useState([]);
  const [containers, setContainers, handleDragEnd] = useDndContainers(
    employeeList,
    setActive
  );

  useEffect(() => {
    fetchDataFromServer(setEmployeeList, setContainers);
  }, []);

  return (
    <Layout>
      <DndContext
        onDragStart={(e) => {
          handleDragStart(e, setActive, employeeList);
        }}
        onDragEnd={(e) => {
          handleDragEnd(e);
          setActive(null);
        }}
        collisionDetection={closestCenter}
        autoScroll={false}
      >
        <ScheduleContainer
          key="scheduleContainer"
          id="scheduleContainer"
          shift="B"
          time="6PM to 6AM"
          dateRange={`${scheduleDate.startDate.toLocaleDateString()} - ${scheduleDate.endDate.toLocaleDateString()}`}
          sections={filterObjByKey(containers, [
            "employeeList",
            "absentList",
            "supervisorList",
          ])}
          supervisorList={containers.supervisorList}
          empty="Operator: Unassigned"
          style={{ gridColumn: "span 3" }}
        />
        <EmployeeList
          key="absentList"
          id="absentList"
          containerId="absentList"
          title="Absent"
          items={containers.absentList}
          className={styles.hideOnPrint}
          empty="NO REPORTED CALL OFFS."
        />
        {/* <EmployeeList
          key="vacationList"
          id="vacationList"
          containerId="vacationList"
          title="Vacation/Scheduled"
          items={containers.vacationList}
          empty="NONE SCHEDULED OFF"
        /> */}
        <EmployeeList
          key="employeeList"
          id="employeeList"
          containerId="employeeList"
          title="Employee List"
          items={containers.employeeList}
          className={styles.hideOnPrint}
          empty="All employees assigned"
        />
        <DragOverlay>
          {active ? (
            <Item key={`DragOverlay_${active}`} id={`DragOverlay_${active}`}>
              {active.fullName}
            </Item>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Layout>
  );
}

function handleDragStart(e, setActiveId, employeeList) {
  const { active } = e;
  const employee = findEmployee(employeeList, active);
  setActiveId(employee);
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
