/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useReducer } from "react";
import type {
  AuthActionProp,
  AuthContextProp,
  AuthInitialStateProp,
} from "../types/types";

const AuthContext = createContext<AuthContextProp | null>(null);

const initialState: AuthInitialStateProp = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: AuthInitialStateProp, action: AuthActionProp) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payLoad, isAuthenticated: true };
    case "logout":
      return { ...state, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payLoad: FAKE_USER });
    } else {
        alert("invalid credentials")
    }
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext called outside the AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
