const BASE_URL = "http://localhost:8000";

export const api = {
  async register(data: any) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }
    return response.json();
  },

  async login(data: any) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }
    return response.json();
  },

  async refreshToken(refreshToken: string) {
    const response = await fetch(`${BASE_URL}/auth/accessToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
      // If refresh fails, we should probably logout, but for now just throw
      const error = await response.json();
      throw new Error(error.message || "Token refresh failed");
    }
    return response.json();
  },
};
