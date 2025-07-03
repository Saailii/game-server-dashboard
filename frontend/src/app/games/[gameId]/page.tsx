import Game from "@/app/types/Game";
import { FC } from "react";

async function getGame(id: string) {
  const response = await fetch(`http://localhost:3333/gamemode/${id}`);
  const data = await response.json();

  return data;
}

export default async function Page({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;

  const gamemode = await getGame(gameId);
  console.log(gamemode);

  return (
    <>
      <Gamemode gamemode={gamemode} />
    </>
  );
}

interface gamemodeType {
  gamemode: {
    contentFile: string;
    gamemode: Game;
    error: string;
  };
}

const Gamemode: FC<gamemodeType> = ({ gamemode }) => {
  return (
    <div>
      {gamemode.gamemode ? (
        <>
          <h1>{gamemode.gamemode.name}</h1>
          <span>{gamemode.gamemode.gameName}</span>
        </>
      ) : gamemode.error ? (
        <div className="text-7xl text-center ">{gamemode.error}</div>
      ) : (
        <div>Pas d'erreur</div>
      )}
    </div>
  );
};
