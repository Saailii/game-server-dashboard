"use client";
import { useState } from "react";
import User from "../types/User";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");

  async function SumbitRegisterUserForm(user: User) {
    if (!user) {
      return "No no user provided";
    }
    const res = await fetch("http://localhost:3333/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });
  }

  return (
    <div className="flex flex-col justify-center items-center h-3/4 gap-3">
      <div className="flex flex-col shadow-lg gap-3 border-2 border-base-100 p-5 rounded-lg ">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-center">
          Register
        </h1>
        <label className="label flex-col items-start">
          <span>Email</span>
          <input
            className="input"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          ></input>
        </label>
        <label className="label flex-col items-start">
          <span>Password</span>
          <input
            className="input"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          ></input>
        </label>
        <label className="label flex-col items-start">
          <span>First Name</span>
          <input
            className="input"
            type="text"
            name="first_name"
            onChange={(e) => setFirst_name(e.currentTarget.value)}
          ></input>
        </label>
        <button
          className="btn btn-primary"
          onClick={() => {
            SumbitRegisterUserForm({
              email,
              password,
              first_name,
            });
          }}
        >
          Create User
        </button>
      </div>
    </div>
  );
}
