export type AuthUserType = null | {
  mobile: string;
};

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (mobile: string, password: string) => Promise<void>;
  register: (mobile: string, password: string, code: string) => Promise<void>;
  logout: () => void;
};