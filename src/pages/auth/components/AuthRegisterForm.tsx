import { useState } from "react";
import * as Yup from "yup";
import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { RHFTextField } from "@/components/hook-form";
import Iconify from "@/components/iconify";
import { LoadingButton } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuthContext } from "@/auth/useAuthContext";
import { LoginStatus } from "../login";
import { register } from "@/api/auth";
import { setSession } from "@/auth/utils";

type FormValuesProps = {
  password: string;
  confirmPassword: string;
  afterSubmit?: string;
};
type Props = {
  code: number;
  mobile: string;
  changeStatus: (status: LoginStatus) => void;
};
export default function AuthRegisterForm(props: Props) {
  const { code, mobile, changeStatus } = props;
  const { saveSession } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const passwordSchema = Yup.object().shape({
    password: Yup.string().required("请输入密码"),
    confirmPassword: Yup.string()
      .required("请输入确认密码")
      .oneOf([Yup.ref("password"), ""], "两次密码不一致"),
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(passwordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const res = await register(mobile, code, data.password);
    if (res) {
      saveSession(res.token);
      changeStatus("company");
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon onClick={() => changeStatus("initial")} />
          设置密码
        </Typography>
        <RHFTextField
          name="password"
          label="输入密码"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirmPassword"
          label="确认密码"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitSuccessful || isSubmitting}
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
          确定
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
