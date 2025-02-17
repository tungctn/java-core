// src/constants/urls.ts
export const URL_LIST = {
  auth: {
    login: "/login",
  },
  root: {
    index: "/",
    home: "/home",
    profile: "/profile",
  },
  pricing: "/pricing",
  api: "/api",
  about: "/about-us",
};

export const colorBase = {
  // Core colors
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
