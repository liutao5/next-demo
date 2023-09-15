import Logo from "@/components/logo";
import { HEADER } from "@/config-global";
import { AppBar, Box, Button, Card, Container, Toolbar } from "@mui/material";
import Head from "next/head";
import CompanyNewEditForm from "./components/CompanyNewEditForm";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import GuestGuard from "@/auth/GuestGuard";
import { useRouter } from "next/router";
import { PATH_AUTH } from "@/routes/path";

export interface IRefProps {
  save: VoidFunction;
}

export default function CreateCompany() {
  const ref = useRef<any>(null);
  const { push } = useRouter();
  const saveCompany = () => {
    ref.current?.save();
  };

  return (
    <GuestGuard>
      <Head>
        <title>创建公司</title>
      </Head>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppBar color="transparent">
          <Toolbar
            disableGutters
            sx={{
              height: "60px",
            }}
          >
            <Container
              sx={{ height: 1, display: "flex", alignItems: "center" }}
            >
              <Logo />
              <Box sx={{ flexGrow: 1 }} />
              <Button
                sx={{ color: "#212b36" }}
                onClick={() => push(PATH_AUTH.login)}
              >
                取消
              </Button>
              <Button onClick={saveCompany}>保存</Button>
            </Container>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: "60px",
            px: 16,
            py: 4,
          }}
        >
          <CompanyNewEditForm ref={ref} />
        </Box>
      </Box>
    </GuestGuard>
  );
}
