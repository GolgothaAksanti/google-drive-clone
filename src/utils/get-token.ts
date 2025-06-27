export const getTokenFromHeaders = (headers: Headers): string | null => {
  const authHeader = headers.get("Authorization");

  if (!authHeader) return null;

  const parts = authHeader.split(" ");

  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }

  return null;
};
