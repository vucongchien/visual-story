import React, { useState } from 'react'
import { useSessions } from '../hooks/useSession'
import { Button } from './Button'
import { Link, useNavigate } from 'react-router-dom'

export const SessionList = () => {
    const { sessions} = useSessions();
    const navigate=useNavigate();

    const handleNavigateToSession = (sessionId: string) => {
        navigate(`/gameplay/${sessionId}`);
      };
      
  return (
    <div>
        
        {sessions.map((session, index) => (

           
        <Button type='button' variant='primary' key={session.id} onClick={()=>handleNavigateToSession(session.id)} >
            {session.title}
            </Button>

      ))}
     

    </div>
  )
}
