import { NextPage } from "next";
import dynamic from "next/dynamic";
import { CMS } from "netlify-cms-core";

import { config } from "./config";

const DynamicComponent = dynamic(
  async () => {
    const cms = (await import("netlify-cms-app")) as unknown as CMS;

    cms.registerEventListener({
      name: "preSave",
      handler: ({ author: { name = "name", login = "login" }, entry }) =>
        entry.get("data").set("author", { name, login }),
    });

    return cms.init({ config }) as any;
  },
  { ssr: false, loading: () => <p>Loading...</p> }
);

const AdminPage: NextPage = () => <DynamicComponent />;

export default AdminPage;
