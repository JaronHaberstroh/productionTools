export const employeeDataMap = (reqBody) => {
  return {
    firstName: reqBody.fName,
    lastName: reqBody.lName,
    employeeNumber: reqBody.employeeNumber,
    startDate: reqBody.startDate,
    shift: reqBody.shift,
    currentPosition: reqBody.currentPosition,
  };
};
