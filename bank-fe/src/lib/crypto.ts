export const decryptData = async (token: string) => {
  const decoded = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await decoded.json();
  return data;
};
