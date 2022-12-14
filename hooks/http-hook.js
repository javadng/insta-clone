import { useCallback, useState } from "react";

const useHttp = () => {
  const [httpState, setHttpState] = useState({
    message: null,
    status: null,
    data: null,
  });

  const sendRequest = useCallback(
    async (urlpath, options) => {
      try {
        setHttpState({
          message: "Sending request",
          status: "LOADING",
          data: null,
        });

        const response = await fetch(urlpath, options ? options : null);

        const result = await response.json();

        if (!response.ok)
          throw new Error(
            `${response.status}.${response.statusText}. ${result.message || ""}`
          );

        setHttpState({
          message: result.message,
          status: "SUCCESS",
          data: result.data,
        });
      } catch (error) {
        setHttpState({
          message: error.message || "Somthing went wrong.",
          status: "ERROR",
          data: null,
        });
      }
    },
    [setHttpState]
  );

  return { sendRequest, httpState };
};

export default useHttp;
