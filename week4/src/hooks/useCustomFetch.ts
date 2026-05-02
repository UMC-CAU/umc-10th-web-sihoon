import { useEffect, useState } from 'react';
import axios from 'axios';

interface UseFetchResult<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

// url이 바뀌면 자동으로 재요청함
function useCustomFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // url이 없으면 패칭 안 함
    if (!url) return;

    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data: responseData } = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(responseData);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]); // url이 바뀔 때마다 재요청

  return { data, isPending, isError };
}

export default useCustomFetch;
