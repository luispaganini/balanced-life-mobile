import { useState, useEffect } from 'react';
import { IBodyDataInterface } from '@/interfaces/Body/IBodyDataInterface';
import { getLastFourBodyData } from '@/services/body/body';

interface UseBodyDataResult {
  bodyData: IBodyDataInterface[];
  isLoading: boolean;
  error: Error | null;
}

export function useBodyData(userId?: number): UseBodyDataResult {
  const [bodyData, setBodyData] = useState<IBodyDataInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getLastFourBodyData(userId);
        console.log("Fetched body data:", response);
        const sortedResponse = response.sort(
          (a, b) => new Date(a.datetime as Date).getTime() - new Date(b.datetime as Date).getTime()
        );
        setBodyData(sortedResponse);
      } catch (err) {
        console.error("Failed to fetch body data:", err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { bodyData, isLoading, error };
}