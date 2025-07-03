async function getGame(id: string) {
  const response = await fetch(`http://localhost:3333/gamemode/${id}`);
  const data = await response.json();
  console.log(data);

  return data;
}

export default async function Page({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;

  const gamemode = await getGame(gameId);
  return (
    <div>
      <h1>{gamemode.name}</h1>
      <span>{gamemode.gameName}</span>
    </div>
  );
}
