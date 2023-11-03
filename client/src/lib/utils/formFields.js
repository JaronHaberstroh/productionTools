export const createUser = [
  { type: "text", name: "fName", label: "First Name: " },
  { type: "text", name: "lName", label: "Last Name: " },
  {
    type: "text",
    name: "employeeNumber",
    label: "Employee Number: ",
  },
  { type: "date", name: "startDate", label: "Start Date: " },
  {
    type: "radio",
    name: "shift",
    label: "Shift: ",
    options: ["A", "B", "C", "D"],
  },
];

export const updateUser = [
  { type: "text", name: "fName", label: "First Name: " },
  { type: "text", name: "lName", label: "Last Name: " },
  {
    type: "text",
    name: "employeeNumber",
    label: "Employee Number: ",
  },
  { type: "date", name: "startDate", label: "Start Date: " },
  {
    type: "radio",
    name: "shift",
    label: "Shift: ",
    options: ["A", "B", "C", "D"],
  },
  {
    type: "section",
    name: "department",
    label: "Department: ",
    options: [1, 2, 3],
  },
  {
    type: "section",
    name: "currentPosition",
    label: "Current Position",
    options: [1, 2, 3],
  },
  {
    type: "section",
    name: "userRoles",
    label: "User Roles",
    options: [1, 2, 3],
  },
];

export const deleteUser = [
  { type: "text", name: "fName", label: "First Name: " },
  { type: "text", name: "lName", label: "Last Name: " },
  {
    type: "text",
    name: "employeeNumber",
    label: "Employee Number: ",
  },
];
