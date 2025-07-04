"use client";

import { useIsAuthor } from "@/hooks/useIsAuthor";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { FC } from "react";

type props = {
  appId: string;
  authorId: string;
  token: string | undefined;
};

export const AdminButton: FC<props> = ({ appId, authorId, token }) => {
  const isAuthor = useIsAuthor(authorId);

  if (!isAuthor) {
    return null;
  }

  return (
    <div>
      <button
        className="btn btn-warning"
        onClick={() => handleDelete(appId, token)}
      >
        Delete
      </button>
    </div>
  );
};

const handleDelete = async (appId: string, token: string | undefined) => {
  const response = await fetch(`http://localhost:3333/application/${appId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);

  window.location.href = "games";
};
