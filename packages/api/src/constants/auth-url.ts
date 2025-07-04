export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? "https://uket.co.kr"
      : "https://dev.uket.co.kr";

export const KAKAO_OPEN_CHAT_ID = "_cQLwn";
export const KAKAO_OPEN_CHAT_URL = `https://pf.kakao.com/${KAKAO_OPEN_CHAT_ID}`;

export const KAKAO_REDIRECT_URI = `${BASE_URL}/login/kakao`;
export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

export const GOOGLE_REDIRECT_URI = `${BASE_URL}/login/google`;
export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=email+profile&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}`;
