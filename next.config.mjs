/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
			},
			{
				protocol: 'http',
				hostname: 'uhdtv.io',
			},
			{
				protocol: 'https',
				hostname: 'mango.blender.org',
			},
			{
				protocol: 'https',
				hostname: 'download.blender.org',
			},
		],
	},
};

export default nextConfig;
