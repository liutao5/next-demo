/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
  swcMinify: false,
  env: {
    // HOST
    HOST_API_KEY: 'https://api-test-wusuan.mengqin.vip',
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
