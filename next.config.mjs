/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.imgur.com'
      },
      {
        hostname: 'www.cnnbrasil.com.br'
      },
      {
        hostname: 'upload.wikimedia.org'
      },
      {
        hostname: 'localplanet.com.br'
      },
      {
        hostname: 'media-cdn.tripadvisor.com'
      },
      {
        hostname: 'img.restaurantguru.com'
      },
      {
        hostname: 'catuaipalladium.com.br'
      },
      {
        hostname: 'localhost'
      }
    ]
  }
};

export default nextConfig;
