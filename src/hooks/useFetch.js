import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

const useFetch = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Starting with loading set to true
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flaging to track if the component is mounted

    setError(null);

    fetchData(url)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false); // Setting loading to false when data is available
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false); // Setting loading to false on error
        }
      });

    // Cleanup function to cancel the request on unmount
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
