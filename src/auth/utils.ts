import { PATH_AUTH } from "@/routes/path";
import { axiosInstance } from "@/utils/axios";

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    console.log('Token expired');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
		// const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
		const exp = Date.now()/1000 + 20*60*1000
    tokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');

    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const setCompany = (companyId: string | null) => {
  if (companyId) {
    localStorage.setItem('companyId', companyId)
  } else {
    localStorage.removeItem('companyId')
  }
}

export const getCompany = () => {
  return localStorage.getItem('companyId')
}