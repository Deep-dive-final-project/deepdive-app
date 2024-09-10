import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.error("Login error:", error);
  }
};
