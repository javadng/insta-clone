/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["s2.uupload.ir"],
  },
  env: {
    NEXTAUTH_SECRET: "Cx7zXs8776dpI22L8PszoRZUYnCg7vDj7pN/rFzTAyA=",
    NEXTAUTH_URL: "https://instaclone-javad.iran.liara.run",
  },
};

module.exports = nextConfig;
