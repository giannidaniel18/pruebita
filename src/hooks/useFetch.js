import { useState } from "react";
import axios from "axios";

const BASEURL = process.env.REACT_APP_API_URL;

export default function useFetch() {
  const [requestStatus, setRequestStatus] = useState({});

  const startRequest = (method, url, payload, updateRequestStatus) => {
    setRequestStatus({});
    return axios({
      method: method,
      url: BASEURL + url,
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
      data: payload,
    })
      .then((response) => {
        const { data } = response;
        if (updateRequestStatus) {
          setRequestStatus({ responseStatus: "success", text: data.message, status: true });
        }
        console.log(data);
        return data;
      })
      .catch((error) => {
        const { response } = error;
        setRequestStatus({ responseStatus: "error", text: response.data.message, status: true });
        console.log(response);
      });
  };

  return { requestStatus, startRequest };
}
