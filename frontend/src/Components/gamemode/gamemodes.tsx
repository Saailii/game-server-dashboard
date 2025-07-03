"use client";
import Game from "@/app/types/Game";
import Link from "next/link";
import { FC } from "react";

interface GamemodeProps {
  games: Game[];
}

export const Gamemodes: FC<GamemodeProps> = ({ games }) => {
  console.log(games);

  return (
    <div>
      {games
        ? games.map((game) => (
            <div
              key={`${game.id}-${game.userId}`}
              className="card bg-base-100 w-96 shadow-sm"
            >
              <div className="card-body">
                <h3 className="card-title ">{game.name}</h3>
                <span>{game.gameName}</span>
                <Link href={`/games/${game.id}`} className="btn btn-primary">
                  See more
                </Link>
              </div>
            </div>
          ))
        : "Rien"}
    </div>
  );
};
