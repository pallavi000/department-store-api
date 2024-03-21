import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["access_token"],
};
