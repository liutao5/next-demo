import LoginLayout from "@/layouts/login";
import NextLink from "next/link";
import { Alert, Box, Link, Stack, Tooltip, Typography } from "@mui/material";
import Head from "next/head";
import AuthLoginForm from "./components/AuthLoginForm";
import { PATH_AUTH } from "@/routes/path";
import GuestGuard from "@/auth/GuestGuard";
import { useLocales } from "@/locales";
import AuthVerifyCodeForm from "./components/AuthVerifyCodeForm";
import SelectCompanyForm from "./components/SelectCompanyForm";
import { useAuthContext } from "@/auth/useAuthContext";
import { createContext, useCallback, useState } from "react";
import AuthPasswordForm from "./components/AuthPasswordForm";
import AuthRegisterForm from "./components/AuthRegisterForm";

export type LoginStatus =
  | "initial"
  | "exist"
  | "register"
  | "verify"
  | "company";

type Props = {
  loginStatus?: LoginStatus;
};

export default function LoginPage(props: Props) {
  const { translate } = useLocales();
  const [mobile, setMobile] = useState<string>("");
  const [code, setCode] = useState<number>(0);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(
    props.loginStatus || "initial"
  );

  const back = () => {
    setLoginStatus("initial");
    setMobile("");
    setCode(0);
  };

  const renderContent = useCallback(() => {
    switch (loginStatus) {
      case "initial":
        return (
          <AuthLoginForm changeStatus={setLoginStatus} setMobile={setMobile} />
        );
      case "exist":
        return (
          <AuthPasswordForm
            changeStatus={setLoginStatus}
            mobile={mobile}
            back={back}
          />
        );
      case "verify":
        return (
          <AuthVerifyCodeForm
            mobile={mobile}
            changeStatus={setLoginStatus}
            setCode={setCode}
          />
        );
      case "register":
        return (
          <AuthRegisterForm
            code={code}
            mobile={mobile}
            changeStatus={setLoginStatus}
          />
        );
      case "company":
        return <SelectCompanyForm />;
      default:
        return (
          <AuthLoginForm changeStatus={setLoginStatus} setMobile={setMobile} />
        );
    }
  }, [code, loginStatus, mobile]);

  return (
    <>
      <Head>
        <title>{translate("login")}</title>
      </Head>
      <GuestGuard>
        <LoginLayout>{renderContent()}</LoginLayout>
      </GuestGuard>
    </>
  );
}
