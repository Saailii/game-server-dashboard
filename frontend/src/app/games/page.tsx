import CreateGamemodeForm from "@/Components/gamemode/createGamemode";
import { Gamemodes } from "@/Components/gamemode/gamemodes";
import { cookies } from "next/headers";

async function getGames() {
  const cookiesStore = await cookies();
  console.log(cookiesStore.get("token")?.value);

  const response = await fetch("http://localhost:3333/gamemode", {
    cache: "no-store",
  });
  const data = await response.json();

  return data;
}

export default async function page() {
  const games = await getGames();
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <CreateGamemodeForm />
      <Gamemodes games={games} />
    </div>
  );
}
