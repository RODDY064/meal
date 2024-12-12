import type { NextConfig } from "next";

const nextConfig: NextConfig =  {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Protocol of  Supabase 
        hostname: 'yolovjwjsubpdroyctdk.supabase.co', //  Supabase storage domain
        port: '', 
        pathname: '/storage/v1/object/public/images/**', // Path to the images folder in Supabase
      },
    ],
  },
};

export default nextConfig;
