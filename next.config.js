/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
  swcMinify: false,
  env: {
    // HOST
    HOST_API_KEY: 'http://localhost:3000',
  },
  reactStrictMode: true,
	webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
}

module.exports = nextConfig
