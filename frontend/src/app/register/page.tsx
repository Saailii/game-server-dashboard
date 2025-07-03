"use client";
import { useState } from "react";
import User from "../types/User";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");

  async function SumbitRegisterUserForm(user: User) {
    console.log(user);

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
    <div className="flex flex-col justify-center ">
      <label className="label">
        <span>Email</span>
        <input
          className="input"
          type="text"
          name="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></input>
      </label>
      <label className="label">
        <span>Password</span>
        <input
          className="input"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></input>
      </label>
      <label className="label">
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
  );
}
