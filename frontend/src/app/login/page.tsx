"use client";
import { AuthContext } from "@/context/authContext";
import cookie from "cookiejs";
import { useContext, useState } from "react";

interface token {
  token: Object;
}

export default function Page() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const onSubmitLoginForm = async () => {
    await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        cookie.set("token", data.token.token);
        window.location.href = "/";
      });
  };

  const onSubmitGithubForm = () => {
    window.location.href = "http://localhost:3333/auth/github";
  };

  return (
    <div className="h-3/4 w-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-start gap-3 border-2 border-base-100 p-5 rounded-lg w- ">
        <h1 className="text-2xl font-bold text-center w-full">Login</h1>
        <label className="label flex-col items-start">
          <span>Email</span>
          <input
            type="text"
            className="input"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
        <label className="label flex-col items-start">
          <span>Password</span>
          <input
            type="password"
            className="input"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <div className="flex gap-5 justify-center items-center w-full">
          <button
            className="btn btn-primary"
            onClick={() => onSubmitLoginForm()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
