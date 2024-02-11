import { useRouter } from "next/router";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import Login from "@/pages/auth/login";
import LoadingScreen from "@/components/loading-screen";
import CreateCompany from "@/pages/auth/createCompany";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized, companyId } = useAuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // if (!companyId) {
  //   return <Login loginStatus="company" />;
  // }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <> {children} </>;
}
