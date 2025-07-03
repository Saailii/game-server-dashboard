import CreateGamemodeForm from "@/Components/gamemode/createGamemode";
import { Gamemodes } from "@/Components/gamemode/gamemodes";

async function getGames() {
  const response = await fetch("http://localhost:3333/gamemode");
  const data = await response.json();
  console.log(data);

  return data;
}

export default async function page() {
  const games = await getGames();
  return (
    <div>
      <CreateGamemodeForm />
      <Gamemodes games={games} />
    </div>
  );
}
