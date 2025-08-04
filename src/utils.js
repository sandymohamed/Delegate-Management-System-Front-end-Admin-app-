// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    localStorage.removeItem('accessToken')
    // localStorage.removeItem("user");
    return null;
  }

}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem("user");
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  if (decoded.exp > currentTime) {
    tokenExpired(decoded.exp);
    return true;
  }

  return false;
};

// export const isValidToken = (accessToken) => {
//   if (!accessToken || !localStorage.getItem('accessToken')) {
//     return false;
//   }

//   const decoded = jwtDecode(accessToken);

//   const currentTime = Date.now() / 1000;

//   return decoded.exp > currentTime;
// };


// ----------------------------------------------------------------------
export const getToken = () => localStorage.getItem('accessToken') || '';


// eslint-disable-next-line consistent-return
export const getUserFromToken = () => {
  const token = getToken();
  let payload;

  if (token) {
    payload = token.split(".")[1];
    payload = window.atob(payload);
    return JSON.parse(payload);

  }

}



// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  // const expiresIn = exp - currentTime;
  // const timeLeft = expiresIn * 1000;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    // alert('Token expired');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

// export const setSession = (accessToken, user) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);

//     // const myObjectString = JSON.stringify(user);

//     // localStorage.setItem('user', myObjectString);

//     // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//     // This function below will handle when token is expired
//     const { exp } = jwtDecode(accessToken);
//     tokenExpired(exp);

//   } else {
//     localStorage.removeItem('accessToken');
//     // localStorage.removeItem('user');

//     delete axios.defaults.headers.common.Authorization;
//   }
// };
