"use client";
import App from "@/app/types/App";
import Link from "next/link";
import { FC } from "react";

interface ApplicationProps {
  applications: App[];
}

export const Applications: FC<ApplicationProps> = ({ applications }) => {
  console.log(applications);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
      {applications
        ? applications.map((application) => (
            <div
              key={`${application.id}-${application.userId}`}
              className="card bg-base-100 w-96 shadow-sm"
            >
              <div className="card-body">
                <h3 className="card-title ">{application.name}</h3>
                <span>{application.appName}</span>
                <Link
                  href={`/games/${application.id}`}
                  className="btn btn-primary"
                >
                  See more
                </Link>
              </div>
            </div>
          ))
        : "Pas de serveur de jeu ou quoi que ce soit"}
    </div>
  );
};
