import { API_URL } from "@/config/config";
const cookie = require("cookie");
export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not authorized" });
      return;
    } else {
      const { token } = cookie.parse(req.headers.cookie);
      const strapiRes = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: { 
            "Authorization": `Bearer ${token}`
         },
      });
      const data = await strapiRes.json();
      console.log(data);
      if (strapiRes.ok) {
        res.status(200).json({ user: data });
      } else {
        res.status(403).json({ message: "Not authorized" });
      }
    }
  } else {
    return res.status(405).json({});
  }
};
