import { useState, useEffect, useCallback } from 'react';
import * as sessionApi from '../api/sessionApi';
import { SessionProps, CreateSessionPayload, ChoiceResponse } from '../types';

export function useSessions() {
  const sessionsFake: SessionProps[] = [
    {
      id: 'session-001',
      title: 'The Mysterious Cave',
      createdAt: '2023-10-15T08:30:00Z',
      currentChoices: [
        { text: 'Enter the cave' },
        { text: 'Walk around it' },
        { text: 'Return to village' }
      ],
      story: [
        {
          type: 'text',
          content: 'You stand before a dark cave entrance. The wind howls through the narrow opening.'
        },
        {
          type: 'choice',
          choiceText: 'What will you do?'
        }
      ]
    },
    {
      id: 'session-002',
      title: 'Space Station Crisis',
      createdAt: '2023-10-18T14:20:00Z',
      currentChoices: [
        { text: 'Investigate the anomaly' },
        { text: 'Seal the compartment' },
        { text: 'Evacuate immediately' }
      ],
      story: [
        {
          type: 'text',
          content: 'Alarms blare as the space station shakes violently. Oxygen levels are dropping.'
        },
        {
          type: 'choice',
          choiceText: 'Emergency protocol requires your decision:'
        }
      ]
    },
    {
      id: 'session-003',
      title: 'Detective Case Files',
      createdAt: '2023-10-20T09:45:00Z',
      currentChoices: [
        { text: 'Examine the murder weapon' },
        { text: 'Interview the butler' },
        { text: 'Search for fingerprints' }
      ],
      story: [
        {
          type: 'text',
          content: 'The body lies in the library, a single gunshot wound to the chest. The murder weapon is missing.'
        },
        {
          type: 'choice',
          choiceText: 'Your next investigative step:'
        },
        {
          type: 'text',
          content: 'You notice a faint smell of gunpowder near the window.'
        }
      ]
    },
    {
      id: 'session-004',
      title: 'Dragon\'s Keep',
      createdAt: '2023-10-22T16:10:00Z',
      currentChoices: [
        { text: 'Approach the dragon' },
        { text: 'Search for treasure' },
        { text: 'Look for another exit' }
      ],
      story: [
        {
          type: 'text',
          content: 'The dragon sleeps atop a mountain of gold, its massive wings twitching occasionally.'
        },
        {
          type: 'choice',
          choiceText: 'The beast hasn\'t noticed you yet. Do you:'
        }
      ]
    },
    {
      id: 'session-005',
      title: 'Cyber Heist',
      createdAt: '2023-10-25T11:30:00Z',
      currentChoices: [
        { text: 'Hack the mainframe' },
        { text: 'Disable security' },
        { text: 'Create a diversion' }
      ],
      story: [
        {
          type: 'text',
          content: 'The data vault is just beyond this final firewall. Security drones patrol the area.'
        },
        {
          type: 'choice',
          choiceText: 'Your team awaits your command:'
        }
      ]
    }
  ];
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
  return {sessionsFake, sessions, error, loading, load, add, remove,getById,postChoice };
}