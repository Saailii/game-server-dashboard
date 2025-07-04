import App from "@/app/types/App";
import { AdminButton } from "@/Components/Application/adminApp";
import { cookies } from "next/headers";

interface Application {
  contentFile: string;
  application: App;
  error: string;
}

async function getApp(id: string) {
  const response = await fetch(`http://localhost:3333/application/${id}`);
  const data = await response.json();

  return data;
}

export default async function Page({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;

  const data = await getApp(appId);

  return (
    <>
      <Application application={data} />
    </>
  );
}

const Application = async ({ application }: { application: Application }) => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!application.application) {
    return <h1>This app doesn't exist</h1>;
  }

  return (
    <div>
      <div className="w-4xl p-8">
        {application.application ? (
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold">
              {application.application.name}
            </h1>
            <span>{application.application.appName}</span>
            <div className="mockup-code w-full">
              <pre data-prefix="$">
                <code>{application.contentFile}</code>
              </pre>
            </div>
          </div>
        ) : application.error ? (
          <div className="text-7xl text-center ">{application.error}</div>
        ) : (
          <div>Pas d'erreur</div>
        )}
      </div>
      <AdminButton
        appId={application.application.id}
        authorId={application.application.userId}
        token={token?.value}
      />
    </div>
  );
};
