import { useState, useCallback } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(false);

  const wrap = useCallback(
    <T extends any[], R>(fn: (...args: T) => Promise<R>) =>
      async (...args: T): Promise<R | undefined> => {
        setLoading(true);
        try {
          return await fn(...args);
        } finally {
          setLoading(false);
        }
      },
    []
  );

  return { loading, wrap };
}
