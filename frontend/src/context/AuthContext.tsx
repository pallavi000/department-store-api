import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TUser } from "../@types/User";
import { getCurrentUserApi } from "../service/authService";
import { Box } from "@mui/material";
import { TAuthContextStates } from "../@types/AuthContext";
import { HouseSidingSharp, ViewKanbanOutlined } from "@mui/icons-material";
import { TCart } from "../@types/Cart";
import { getCartsApi } from "../service/cartService";

export const initialState: TAuthContextStates = {
  token: "",
  user: null,
  setToken: () => {},
  carts: [],
  setCarts: () => {},
};
const AuthContext = createContext(initialState);
export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState<TUser | null>(null);
  const [carts, setCarts] = useState<TCart[]>([]);
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

  const getCarts = async () => {
    try {
      const data = await getCartsApi();
      setCarts(data);
    } catch (error) {
      throw error;
    }
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      carts,
      setCarts,
    }),
    [token, user, carts]
  );

  useEffect(() => {
    if (token) {
      getCurrentUser();
      getCarts();
    } else {
      setIsAppReady(true);
    }
  }, [token]);

  if (!isAppReady) return <Box>APP is loading.......</Box>;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
