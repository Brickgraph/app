/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withTM = require("next-transpile-modules")(["react-cytoscapejs"]);

module.exports = nextConfig;
module.exports = withTM({ ...nextConfig });
