import React, { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { SoundProvider } from './contexts/SoundContext';
import { ThemeProvider } from './contexts/ThemeContext';


function App() {
  
  
  return (
    <AuthProvider>
      <ThemeProvider>
      <SoundProvider>
        <AppRoutes />
      </SoundProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
