import Logo from "@/components/logo";
import Image from "@/components/image";
import {
  StyledContent,
  StyledRoot,
  StyledSection,
  StyledSectionBg,
} from "./style";
import { Stack, Typography } from "@mui/material";

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, title, illustration }: Props) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: "absolute",
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection>
        <Typography
          variant="h3"
          sx={{ mb: 10, maxWidth: 480, textAlign: "center" }}
        >
          {title || "Hi, Welcome back"}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={
            illustration || "/assets/illustrations/illustration_dashboard.png"
          }
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
