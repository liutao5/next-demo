// next
import NextLink from "next/link";
import GuestGuard from "@/auth/GuestGuard";
import LoginLayout from "@/layouts/login";
import { PATH_AUTH } from "@/routes/path";
import { Link, Stack, Typography } from "@mui/material";
import Head from "next/head";
import AuthRegisterForm from "./AuthRegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>注册</title>
      </Head>

      <GuestGuard>
        <LoginLayout>
          <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
            <Typography variant="h4">Get started absolutely free.</Typography>

            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2">
                {" "}
                Already have an account?{" "}
              </Typography>

              <Link
                component={NextLink}
                href={PATH_AUTH.login}
                variant="subtitle2"
              >
                Sign in
              </Link>
            </Stack>
          </Stack>

          <AuthRegisterForm />

          {/* <Typography
            component="div"
            sx={{
              color: "text.secondary",
              mt: 3,
              typography: "caption",
              textAlign: "center",
            }}
          >
            {"By signing up, I agree to "}
            <Link underline="always" color="text.primary">
              Terms of Service
            </Link>
            {" and "}
            <Link underline="always" color="text.primary">
              Privacy Policy
            </Link>
            .
          </Typography> */}
        </LoginLayout>
      </GuestGuard>
    </>
  );
}
