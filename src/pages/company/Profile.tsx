import { useAuthContext } from "@/auth/useAuthContext";
import { CustomAvatar } from "@/components/custom-avatar";
import { bgBlur } from "@/utils/cssStyles";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "@/components/image";
import { useEffect, useState } from "react";
import { ICompany } from "@/@types/company";
import { getCompany } from "@/auth/utils";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  "&:before": {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const StyledInfo = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(6),
    bottom: theme.spacing(6),
  },
}));

type Props = {
  logo?: string;
  full_name?: string;
  short_name?: string;
};

export default function CompanyProfile(company: Props) {
  const { logo, full_name, short_name } = company;

  if (!company) {
    return <>lodding</>;
  }

  return (
    <StyledRoot>
      <StyledInfo>
        <CustomAvatar
          src={logo}
          alt={logo}
          name={full_name}
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">{full_name}</Typography>

          <Typography sx={{ opacity: 0.72 }}>{short_name}</Typography>
        </Box>
      </StyledInfo>

      <Image
        alt="cover"
        src={logo}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
    </StyledRoot>
  );
}
