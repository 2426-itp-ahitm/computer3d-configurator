export const API_URL = "http://localhost:8080/api";

export const KEYCLOAK_TOKEN_URL =
  "http://localhost:8000/realms/PcConfigurator/protocol/openid-connect/token";
export const KEYCLOAK_LOGOUT_URL =
  "http://localhost:8000/realms/PcConfigurator/protocol/openid-connect/logout";

export const CLIENT_ID = "quarkus-client";
export const CLIENT_SECRET = "LADfRrGskj7W6xt3BuXVmc6TKxvfApXS";

const ACCESS_KEY = "keycloakToken";
const REFRESH_KEY = "keycloakRefreshToken";

export function getStoredTokens() {
  return {
    accessToken: localStorage.getItem(ACCESS_KEY),
    refreshToken: localStorage.getItem(REFRESH_KEY),
  };
}

export function storeTokens(accessToken, refreshToken) {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function getAuthHeader() {
  const token = localStorage.getItem(ACCESS_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginWithPassword(username, password) {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("username", username);
  params.append("password", password);

  const res = await fetch(KEYCLOAK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) throw new Error("Login fehlgeschlagen");

  const data = await res.json();
  if (!data?.access_token || !data?.refresh_token) throw new Error("Ungültige Token-Antwort");

  storeTokens(data.access_token, data.refresh_token);
  return { accessToken: data.access_token, refreshToken: data.refresh_token };
}

export async function fetchMe(accessToken) {
  const res = await fetch(`${API_URL}/user/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Nicht eingeloggt");
  return res.json();
}

export async function logout() {
  const { refreshToken } = getStoredTokens();

  try {
    if (refreshToken) {
      const params = new URLSearchParams();
      params.append("client_id", CLIENT_ID);
      params.append("client_secret", CLIENT_SECRET);
      params.append("refresh_token", refreshToken);

      await fetch(KEYCLOAK_LOGOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
    }
  } finally {
    clearTokens();
  }
}
