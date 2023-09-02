import LoginLayout from "@/layouts/login";
import NextLink from "next/link";
import { Alert, Box, Link, Stack, Tooltip, Typography } from "@mui/material";
import Head from "next/head";
import AuthLoginForm from "./AuthLoginForm";
import { PATH_AUTH } from "@/routes/path";
import GuestGuard from "@/auth/GuestGuard";
import { useLocales } from "@/locales";

export default function LoginPage() {
  const { translate } = useLocales();
  return (
    <>
      <Head>
        <title>{`${translate("login")}`}</title>
      </Head>
      <GuestGuard>
        <LoginLayout>
          <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
            <Typography variant="h4">Sign in to Minimal</Typography>

            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2">New user?</Typography>

              <Link
                component={NextLink}
                href={PATH_AUTH.register}
                variant="subtitle2"
              >
                Create an account
              </Link>
            </Stack>
          </Stack>

          <Alert severity="info" sx={{ mb: 3 }}>
            Use email : <strong>demo@minimals.cc</strong> / password :
            <strong> demo1234</strong>
          </Alert>

          <AuthLoginForm />
        </LoginLayout>
      </GuestGuard>
    </>
  );
}
