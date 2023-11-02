import { useState, useEffect } from "react";
import { fetchData } from "../lib/api/userApi.js";

const response = await fetchData("/employee");

export default function EmployeeList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      console.log("response: " + response);
      setData(response);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      {data && <p>Data from Express.js: {data.message}</p>}
    </div>
  );
}
