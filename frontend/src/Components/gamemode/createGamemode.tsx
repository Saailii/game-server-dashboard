"use client";
import { useAuth } from "@/context/authContext";
import cookie from "cookiejs";
import { FormEvent, useState } from "react";

export default function CreateGamemodeForm() {
  const [file, setFile] = useState<File | null>(null);
  const [gameName, setGameName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { user, RequireAuth } = useAuth();

  //RequireAuth();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      console.log("no file brother");
      return;
    }

    const token = cookie.get("token");

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("gameName", gameName);
    formdata.append("name", name);

    const response = await fetch("http://localhost:3333/game-compose", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="name" className="input">
        <span className="label">Name</span>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <label htmlFor="gameName" className="input">
        <span className="label">GameName</span>
        <input
          id="gameName"
          type="text"
          onChange={(e) => setGameName(e.currentTarget.value)}
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
      <button type="submit">J'espere sa fonctionne</button>
    </form>
  );
}
