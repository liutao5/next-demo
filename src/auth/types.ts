import { ICompany } from "@/@types/company";

export type AuthUserType = null | {
  nick_name: string;
  gender: number;
  avatar: string | null;
  companies: ICompany[]
};

// export type Company = {
//   id: string;
//   full_name: string;
//   short_name: string;
//   logo: string | null;
//   show_name: string;
//   is_owner: boolean;
//   role_id: string | null;
//   invoice: Invoice;
// }

// type Invoice = {
//   is_vat_invoice_special: boolean;
//   title: string;
//   duty_paragraph: string;
//   address: string | null;
//   phone_number: string | null;
//   deposit_bank: string | null;
//   bank_account: string | null;
// }

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isExist: boolean;
  user: AuthUserType;
  companyId: string | null;
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
  isExist: boolean;
  user: AuthUserType;
  companyId: string | null;
  login: () => void;
  logout: () => void;
  saveCompany: (company: string) => void
  saveSession: (token: string) => void;
}