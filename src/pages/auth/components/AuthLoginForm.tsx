import { useAuthContext } from "@/auth/useAuthContext";
import FormProvider, {
  RHFCheckbox,
  RHFTextField,
} from "@/components/hook-form";
import Iconify from "@/components/iconify";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as Yup from "yup";
// next
import NextLink from "next/link";
import { PATH_AUTH } from "@/routes/path";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { LoginStatus } from "../login";
import { get } from "@/utils/axios";
import { mobileCheck, smsGet } from "@/api/auth";

type FormValuesProps = {
  mobile: string;
  confirm?: boolean;
  afterSubmit?: string;
};

type Props = {
  changeStatus: (status: LoginStatus) => void;
  setMobile: (mobile: string) => void;
};

export default function AuthLoginForm(props: Props) {
  const { changeStatus, setMobile } = props;
  const [open, setOpen] = useState(false);

  const LoginSchema = Yup.object().shape({
    mobile: Yup.string().required("请输入手机号"),
  });

  const defaultValues = {
    mobile: "",
    confirm: false,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (!data.confirm) {
        setOpen(true);
        return;
      }
      const res = await mobileCheck(data.mobile);
      setMobile(data.mobile);
      if (res.exists) {
        changeStatus("exist");
      } else {
        const smsRes = await smsGet(data.mobile);
        if (smsRes.error_code) {
          console.log("smsRes", smsRes);
          setError("afterSubmit", {
            message: smsRes.user_tip || "登录失败",
          });
          return;
        }
        changeStatus("verify");
      }
    } catch (error: any) {
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h4">欢迎来到无算</Typography>

        <RHFTextField name="mobile" label="mobile" />
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          // loading={isSubmitSuccessful || isSubmitting}
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          登录/注册
        </LoadingButton>
        <RHFCheckbox
          label={<>我已阅读并同意服务协议和隐私协议</>}
          name="confirm"
        />
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
      </Stack>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, ::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Iconify icon="eva:google-fill" color="#DF3E30" />

        <Iconify icon="eva:github-fill" />

        <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
      </Stack>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>提示</DialogTitle>
        <DialogContent>
          点击确定表示您已阅读并同意服务协议和隐私协议
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button
            onClick={() => {
              handleClose();
              setValue("confirm", true);
            }}
          >
            同意
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
