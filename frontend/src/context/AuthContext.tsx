import { createContext, useContext, useEffect, useState } from "react";
import { TUser } from "../@types/User";
import { getCurrentUserApi } from "../service/authService";
import { Box } from "@mui/material";
import { TAuthContextStates } from "../@types/AuthContext";
import { HouseSidingSharp, ViewKanbanOutlined } from "@mui/icons-material";

export const initialState: TAuthContextStates = {
  token: "",
  user: null,
  setToken: () => {},
};
const AuthContext = createContext(initialState);
export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState<TUser | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);

  const getCurrentUser = async () => {
    try {
      const user = await getCurrentUserApi();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
    setIsAppReady(true);
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      setIsAppReady(true);
    }
  }, [token]);

  if (!isAppReady) return <Box>APP is loading.......</Box>;

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
