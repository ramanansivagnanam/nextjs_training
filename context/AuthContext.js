import { createContext, useState, useEffect } from "react";
import { NEXT_URL } from "@/config/config";
import { useRouter } from "next/router";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, updateUser] = useState(null);
  const [error, updateError] = useState(null);

  useEffect(() => checkUserLoggedIn(user), []);

  // login
  const login = async ({ email, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      updateUser(data.user);
      router.push('/dashboard/');
    } else {
      updateError(data.message);
      updateError(null);
    }
  };
  // logout
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST"
    });
    if (res.ok) {
      updateUser(null);
      router.push('/');
    }

  };
  // register
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.ok) {
      updateUser(data.user);
      router.push('/dashboard/');
    } else {
      updateError(data.error);
    }
  };
  // check user logged in
  const checkUserLoggedIn = async (user) => {
    console.log("checkUserLoggedIn");
    const res = await fetch(`${NEXT_URL}/api/user`);
    if (res.ok) {
      const data = await res.json();
      updateUser(data.user);
      router.push('/dashboard/');

    } else {
      updateUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
