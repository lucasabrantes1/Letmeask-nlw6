import { createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Home } from "./pages/Home";
import {NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from './context/AuthContext'

type User = { 
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/news" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;


