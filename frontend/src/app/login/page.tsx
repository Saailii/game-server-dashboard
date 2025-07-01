"use client";
import { AuthContext } from "@/context/authContext";
import cookie from "cookiejs";
import { useContext, useState } from "react";

interface token {
  token: Object;
}

export default function Page() {
  const { user, RequireAuth } = useContext(AuthContext);
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const onSubmitLoginForm = async () => {
    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      cookie.set("token", data.token.token);
      window.location.href = "/";
    }
  };

  const onSubmitTest = async () => {
    if (!user) {
      const token = cookie.get("token");
      if (!token) {
        return console.warn("You are not connected");
      }
      const response = await fetch("http://localhost:3333/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      console.log(token);
    }
    console.log("Brother t'es deja connecte");
  };

  return (
    <div>
      <label className="label">
        <span>Email</span>
        <input
          type="text"
          className="input"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </label>
      <label className="label">
        <span>Password</span>
        <input
          type="password"
          className="input"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </label>
      <button className="btn btn-primary" onClick={() => onSubmitLoginForm()}>
        Login
      </button>
      <button className="btn btn-secondary" onClick={() => onSubmitTest()}>
        test me
      </button>
    </div>
  );
}
