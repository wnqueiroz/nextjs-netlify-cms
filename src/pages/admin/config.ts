import { CmsConfig, CmsBackend } from "netlify-cms-core";

const environment = process.env.NODE_ENV;

const backend: CmsBackend =
  environment === "development"
    ? {
        name: "git-gateway",
      }
    : {
        name: "github",
        repo: "wnqueiroz/nextjs-netlify-cms",
        branch: "main",
      };

export const config: CmsConfig = {
  backend,
  local_backend: environment === "development",
  media_folder: "public/assets/img",
  public_folder: "/assets/img",
  publish_mode: environment === "development" ? "simple" : "editorial_workflow",
  slug: {
    encoding: "ascii",
    clean_accents: true,
  },
  collections: [
    {
      name: "posts",
      label: "posts",
      folder: "posts",
      create: true,
      slug: "{{slug}}", // Estrutura do nome arquivo, exemplo: title.md
      fields: [
        { label: "Layout", name: "layout", widget: "hidden", default: "post" },
        { label: "Tags", name: "tags", widget: "list", default: [""] },
        {
          label: "Date",
          name: "date",
          widget: "datetime",
          picker_utc: true,
        },
        { label: "Cover", name: "cover", widget: "image", required: false },
        { label: "Title", name: "title", widget: "string" },
        { label: "Body", name: "body", widget: "markdown" },
        {
          label: "Author",
          name: "author",
          widget: "hidden",
          default: "",
        },
      ],
    },
  ],
};
