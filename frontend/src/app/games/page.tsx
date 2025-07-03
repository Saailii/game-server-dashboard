import CreateAppForm from "@/Components/Application/createApp";
import { Applications } from "@/Components/Application/applications";
import { cookies } from "next/headers";

async function getApps() {
  const cookiesStore = await cookies();
  console.log(cookiesStore.get("token")?.value);

  const response = await fetch("http://localhost:3333/applications", {
    cache: "no-store",
  });
  const data = await response.json();

  return data;
}

export default async function page() {
  const apps = await getApps();
  return (
    <div className="flex flex-col justify-center items-center w-full gap-5  ">
      <CreateAppForm />
      <Applications applications={apps} />
    </div>
  );
}
