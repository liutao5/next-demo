// next
import NextLink from "next/link";
import GuestGuard from "@/auth/GuestGuard";
import LoginLayout from "@/layouts/login";
import { PATH_AUTH } from "@/routes/path";
import { Button, Link, Stack, Typography } from "@mui/material";
import Head from "next/head";
import AuthRegisterForm from "./components/AuthVerifyCodeForm";
import { useEffect, useRef, useState } from "react";
import useInterval from "@/hooks/useInterval";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RegisterPage() {
  const [countdown, setCountdown] = useState(60);

  useInterval(() => setCountdown(countdown - 1), countdown === 0 ? null : 1000);

  const getVerifyCode = () => {
    setCountdown(60);
  };

  return (
    <>
      <Head>
        <title>验证码</title>
      </Head>

      <GuestGuard>
        <LoginLayout>
          <Stack
            spacing={2}
            sx={{ mb: 5, position: "relative" }}
            alignItems="flex-start"
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ArrowBackIcon />
              很高兴认识你
            </Typography>

            <Typography variant="body2">
              请输入发送至123123的6位验证码，有效期15分钟。
              <br />
              {countdown}秒后尝试重新获取验证码
            </Typography>

            <Button
              disabled={countdown !== 0}
              variant="text"
              onClick={getVerifyCode}
            >
              重新获取验证码
            </Button>
          </Stack>

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
