"use client";
import Link from "next/link";
import { FC } from "react";

interface GamemodeProps {
  games: Game[];
}

export interface Game {
  id: string;
  name: string;
  gameName: String;
  dockerFilePath: string;
  userId: string;
}

export const Gamemodes: FC<GamemodeProps> = ({ games }) => {
  return (
    <div>
      {games.map((game) => (
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
      ))}
    </div>
  );
};
