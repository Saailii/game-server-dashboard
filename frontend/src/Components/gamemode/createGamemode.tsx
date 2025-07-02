"use client";
import { useAuth } from "@/context/authContext";
import cookie from "cookiejs";
import { FormEvent, useState } from "react";

export default function CreateGamemodeForm() {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      console.log("no file brother");
      return;
    }

    const token = cookie.get("token");

    const formdata = new FormData();
    formdata.append("file", file);

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="" className="label">
        <input
          type="file"
          className="input"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>
      <button type="submit">J'espere sa fonctionne</button>
    </form>
  );
}
