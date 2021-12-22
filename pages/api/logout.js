import { API_URL } from "@/config/config";
const cookie = require("cookie");
export default async (req, res) => {
  if (req.method === "POST") {
      // remove cookie from headers

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      })
    );
    return res.status(200).json({ message: "Logout successfully" });
  } else {
    return res.status(405).json({});
  }
};
