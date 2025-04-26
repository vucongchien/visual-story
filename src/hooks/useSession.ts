import { useState, useEffect, useCallback } from 'react';
import * as sessionApi from '../api/sessionApi';
import { SessionProps, CreateSessionPayload, ChoiceResponse } from '../types';

export function useSessions() {
  const [sessions, setSessions] = useState<SessionProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await sessionApi.fetchSessions();
      setSessions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async (payload: CreateSessionPayload): Promise<SessionProps> => {
    const newItem = await sessionApi.createSession(payload);
    setSessions(prev => [...prev, newItem]);
    return newItem;
  };
  

  const remove = async (id: string) => {
    await sessionApi.deleteSession(id);
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const getById = useCallback(async (id: string): Promise<SessionProps | null> => {
    try {
      return await sessionApi.fetchSessionById(id);
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  }, []);
  const postChoice =useCallback( async (sessionId: string, choiceIndex: number): Promise<ChoiceResponse | null> => {
    try {
      return await sessionApi.postChoice(sessionId, choiceIndex);
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  },[]);
  return { sessions, error, loading, load, add, remove,getById,postChoice };
}