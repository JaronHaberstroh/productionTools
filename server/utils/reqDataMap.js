import { userDataFields } from "../models/user.js";

export const userDataMap = (reqBody) => {
  const userData = {};

  userDataFields.map((propName) => {
    if (reqBody[propName]) {
      userData[propName] = reqBody[propName];
    }
  });

  return userData;
};
