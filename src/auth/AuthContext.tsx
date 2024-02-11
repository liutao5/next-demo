import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import MD5 from "crypto-js/md5";
import {
  ActionMapType,
  AuthContextType,
  AuthStateType,
  AuthUserType,
} from "./types";
import localStorageAvailable from "@/utils/localStorageAvailable";
import { setCompany, setSession } from "./utils";
import { get, post } from "@/utils/axios";
import { ICompany } from "@/@types/company";

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
  COMPANY = "COMPANY",
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    companyId: string | null;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    isAuthenticated: boolean;
  };
  [Types.REGISTER]: {
    isAuthenticated: boolean;
  };
  [Types.LOGOUT]: undefined;
  [Types.COMPANY]: {
    companyId: string | null;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  isExist: false,
  user: null,
  companyId: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      ...state,
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      companyId: action.payload.companyId,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      companyId: null,
      user: null,
    };
  }
  if (action.type === Types.COMPANY) {
    return {
      ...state,
      companyId: action.payload.companyId,
    };
  }
  return state;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      // const token = storageAvailable
      //   ? localStorage.getItem("accessToken")
      //   : "";
      const token = "token_test";
      const companyId = storageAvailable
        ? localStorage.getItem("companyId")
        : "";
      if (token) {
        setSession(token);

        // const res = await get("/user");
        const res = {
          avatar: "test",
          companies: [],
          gender: 0,
          nick_name: "nick_test",
        };
        const { avatar, companies, gender, nick_name } = res;

        console.log("res", res);

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            companyId: null,
            user: {
              avatar,
              companies,
              gender,
              nick_name,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            companyId: null,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          companyId: null,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(() => {
    dispatch({
      type: Types.LOGIN,
      payload: {
        isAuthenticated: true,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    setCompany(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const saveSession = useCallback((token: string) => {
    setSession(token);
    dispatch({
      type: Types.LOGIN,
      payload: {
        isAuthenticated: true,
      },
    });
  }, []);

  const saveCompany = useCallback(
    (companyId: string) => {
      console.log("save company", companyId);
      setCompany(companyId);
      initialize();
    },
    [initialize]
  );

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      isExist: state.isExist,
      user: state.user,
      companyId: state.companyId,
      login,
      logout,
      saveCompany,
      saveSession,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.isExist,
      state.user,
      state.companyId,
      login,
      logout,
      saveCompany,
      saveSession,
    ]
  );
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
