import { useEffect, useState } from 'react';
import { OptionsData } from '../types';
import * as optionsData from '../api/optionApi'

export function useOptions() {
  const [options, setOptions] = useState<OptionsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await optionsData.fetchOptions() ;
        setOptions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { options, loading, error };
}
