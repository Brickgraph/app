/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withTM = require("next-transpile-modules")([
  "react-cytoscapejs",
  "react-force-graph-2d",
]);

module.exports = nextConfig;
module.exports = withTM({ ...nextConfig });
module.exports = { images: { domains: ["images.clerk.dev"] } };
