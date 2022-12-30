import { useState } from "react";
import axios from "axios";

const BASEURL = process.env.REACT_APP_API_URL;

export default function useFetch() {
  const [requestStatus, setRequestStatus] = useState({});

  const startRequest = (method, url, payload, updateRequestStatus) => {
    console.log(payload);
    setRequestStatus({});
    return axios({
      method: method,
      url: BASEURL + url,
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
      data: payload,
    })
      .then((response) => {
        const { data } = response;
        console.log("🚀 ~ file: useFetch.js:20 ~ .then ~ data", data);
        setRequestStatus({ responseStatus: "success", text: data.message, status: updateRequestStatus });
        return { data, ok: true };
      })
      .catch((error) => {
        const { data } = error.response;
        console.log("🚀 ~ file: useFetch.js:26 ~ startRequest ~ data", data);
        setRequestStatus({ responseStatus: "error", text: data.message, status: updateRequestStatus });
        return { data, ok: false };
      });
  };

  return { requestStatus, startRequest };
}
