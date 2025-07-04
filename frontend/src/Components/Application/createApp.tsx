"use client";
import { useAuth } from "@/context/authContext";
import cookie from "cookiejs";
import { FormEvent, useState } from "react";

export default function CreateAppForm() {
  const [file, setFile] = useState<File | null>(null);
  const [appName, setAppName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { user, RequireAuth } = useAuth();

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    const token = cookie.get("token");

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("appName", appName);
    formdata.append("name", name);

    const response = await fetch("http://localhost:3333/game-compose", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    const data = await response.json();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 justify-center align-center w-98"
    >
      <label htmlFor="name" className="input">
        <span className="label">Name</span>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <label htmlFor="appName" className="input">
        <span className="label">App Name</span>
        <input
          id="appName"
          type="text"
          onChange={(e) => setAppName(e.currentTarget.value)}
        />
      </label>
      <label htmlFor="file" className="input">
        <span className="label">Docker-compose.yml file</span>
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      <button type="submit" className="btn btn-primary">
        Creer le docker compose
      </button>
    </form>
  );
}
