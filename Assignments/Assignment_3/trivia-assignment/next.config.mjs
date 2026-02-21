/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/**', // Matches any image path
      },
      {
        protocol: 'https',
        hostname: 'irs.www.warnerbros.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
