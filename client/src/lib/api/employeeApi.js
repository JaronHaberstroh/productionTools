import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchData = async (endpoint) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const sendData = async (endpoint, formData) => {
  try {
    const response = await instance.post(endpoint, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Data sent successfully", JSON.stringify(response.data));
    }
  } catch (err) {
    console.error("Error: ", err);
  }
};
