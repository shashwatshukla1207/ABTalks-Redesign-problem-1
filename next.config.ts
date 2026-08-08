export interface NextConfig {
  reactStrictMode?: boolean;
  images?: {
    remotePatterns?: Array<{
      protocol?: "http" | "https";
      hostname: string;
      port?: string;
      pathname?: string;
    }>;
  };
  [key: string]: unknown;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
