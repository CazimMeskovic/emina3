/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lwcgfqhdtzbamoklrjlx.supabase.co', // 👈 Tvoj URL iz .env fajla
        pathname: '/storage/v1/object/public/**', // 👈 Ovo dopušta storage i slike!
      },
    ],
  },
};

export default nextConfig;