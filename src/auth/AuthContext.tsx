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
import { setSession } from "./utils";
import { request } from "@/utils/axios";

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
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
      user: null,
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
      const token = storageAvailable ? localStorage.getItem("accessToken") : "";

      //  && isValidToken(accessToken)
      if (token) {
        setSession(token);

        // const response = await request("/api/account/my-account");

        // const { user } = response.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: {
              mobile: "test",
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
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
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (mobile: string, password: string) => {
    const response = await request("/login", {
      mobile,
      password: MD5(password).toString(),
    });
    const { token } = response;

    setSession(token);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          mobile,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (mobile: string, password: string, code: string) => {
      const response = await request("/reg", {
        mobile,
        password: MD5(password).toString(),
        code: parseInt(code),
      });
      const { token } = response;

      localStorage.setItem("accessToken", token);

      dispatch({
        type: Types.REGISTER,
        payload: {
          isAuthenticated: true,
          user: {
            mobile,
          },
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      login,
      register,
      logout,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
    ]
  );
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
