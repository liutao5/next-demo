import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  Button,
  FormHelperText,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "@/auth/useAuthContext";
// components
import Iconify from "@/components/iconify";
import FormProvider, { RHFCodes, RHFTextField } from "@/components/hook-form";
import { PATH_DASHBOARD } from "@/routes/path";
import { useRouter } from "next/router";
import { useSnackbar } from "@/components/snackbar";
import useInterval from "@/hooks/useInterval";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoginStatus } from "../login";
import { post } from "@/utils/axios";
import { smsCheck, smsGet } from "@/api/auth";

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1?: string;
  code2?: string;
  code3?: string;
  code4?: string;
  afterSubmit?: string;
};

type Props = {
  mobile: string;
  changeStatus: (status: LoginStatus) => void;
  setCode: (code: number) => void;
};

export default function AuthVerifyCodeForm(props: Props) {
  const { mobile, changeStatus, setCode } = props;
  const [countdown, setCountdown] = useState(60);

  useInterval(() => setCountdown(countdown - 1), countdown === 0 ? null : 1000);

  const getVerifyCode = useCallback(async () => {
    setCountdown(60);
    if (mobile) {
      const res = await smsGet(mobile);
      console.log("getVerifyCode", res);
    }
  }, [mobile]);

  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string(),
    code2: Yup.string(),
    code3: Yup.string(),
    code4: Yup.string(),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
  };

  const methods = useForm<FormValuesProps>({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      console.log(mobile);
      if (mobile) {
        try {
          const code = parseInt(Object.values(data).join(""));
          const res = await smsCheck(mobile, code);
          if (res.error_code) {
            setError("afterSubmit", {
              message: res.user_tip,
            });
            return;
          }
          setCode(code);
          changeStatus("register");
        } catch (error) {
          console.error(error);
        }
      }
    },
    [mobile, changeStatus, setCode, setError]
  );

  return (
    <FormProvider methods={methods}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="h4" sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon onClick={() => changeStatus("initial")} />
          很高兴认识你
        </Typography>

        <Typography variant="body2">
          请输入发送至{mobile}的4位验证码，有效期15分钟。
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
        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4"]}
          onEndInput={handleSubmit(onSubmit)}
        />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4) && (
          <FormHelperText error sx={{ px: 2 }}>
            Code is required
          </FormHelperText>
        )}
        {!!errors.afterSubmit && (
          <FormHelperText error sx={{ px: 2 }}>
            验证码错误
          </FormHelperText>
        )}
      </Stack>
    </FormProvider>
  );
}
