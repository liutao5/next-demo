// i18n
import ThemeProvider from "@/theme";
import "../locales/i18n";
import ThemeLocalization from "@/locales";
import { LicenseInfo } from "@mui/x-license-pro";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api_signature from "@/utils/axios";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const licenseKey =
  "b972836bdf5bc99bd9ab3c9eecc16bf0Tz03MjkzNCxFPTE3MjM5MDkzOTIwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y";
LicenseInfo.setLicenseKey(licenseKey);

console.log("api_signature", api_signature);

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>test</title>
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider>
          <ThemeLocalization>
            {getLayout(<Component {...pageProps} />)}
          </ThemeLocalization>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}
