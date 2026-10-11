/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the native SQLite module out of the bundle
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
