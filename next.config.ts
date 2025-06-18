import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds: true, 

  },
  typescript:{
    ignoreBuildErrors: true
  },
  // experimental:{
  //   staleTimes:{
  //     dynamic:30
  //   }
  // }
};

export default nextConfig;
