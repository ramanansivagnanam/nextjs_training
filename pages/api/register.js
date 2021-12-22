import { API_URL } from "@/config/config";
const cookie = require("cookie");
export default async (req, res) => {
  const { username , email, password } = req.body;
  if (req.method === "POST") {
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username,email, password }),
    });
    const data = await strapiRes.json();
    if (strapiRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", String(data.jwt), {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          secure: process.env.NODE_ENV !== "development",
          sameSite: 'strict',
          path: "/",
        })
      );
      // jwt http cookie
      return res.status(200).json({ user: data.user });
    } else {
      return res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    return res.status(405).json({});
  }
};
