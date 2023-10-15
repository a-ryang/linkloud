/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:8080/api/v1/:path*",
      },
      {
        source: "/api/v2/:path*",
        destination: "http://localhost:8080/api/v2/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
