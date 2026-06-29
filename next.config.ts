import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Évite les warnings de lockfile quand le repo n'est pas à la racine du home
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
