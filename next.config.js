/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://api-test-wusuan.mengqin.vip',
  },
	webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
}

module.exports = nextConfig
