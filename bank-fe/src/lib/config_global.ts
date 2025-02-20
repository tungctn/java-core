// src/constants/urls.ts
export const URL_LIST = {
  auth: {
    login: "/login",
  },
  root: {
    index: "/",
    home: "/home",
    profile: "/profile",
    transactions: "/transactions",
    transfer: "/transfer",
    settings: "/settings",
  },
  pricing: "/pricing",
  api: "/api",
  about: "/about-us",
};

export const colorBase = {
  black: "#000000",
  white: "#ffffff",
  text1: "#272727",
  text2: "#424242",
  text3: "#515151",
  text4: "#6D6D6D",
  text5: "#9C9C9C",
  text6: "#CACACA",
  text7: "#E8E8E8",
  blueA: "#3E4DE0",
  blueA1: "#6A76EA",
  blueA3: "#A4ACF2",
  blueA4: "#D4D8FF",
  blueB: "#5A88E0",
  blueB1: "#82A6EC",
  blueB2: "#C1D2FF",
  blueB3: "#D5E0FF",
  blueB4: "#EEF2FF",
  purple: "#B091FF",
  purple1: "#C9B4FF",
  purple2: "#D7C8FF",
  purple3: "#EDE5FF",
};

export const googleClientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
  "115482098004-r9m2ld45v59rarn9q7bvgjeicj2n1n1h.apps.googleusercontent.com";

export const statusResponse = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
