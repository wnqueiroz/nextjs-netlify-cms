/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(cfg) {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: { mode: ["react-component"] },
    });

    return cfg;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
