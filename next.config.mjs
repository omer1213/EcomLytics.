// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ["picsum.photos"], // Add this to allow picsum.photos images
//     },
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: [
//             'pk-live-21.slatic.net',
//             'static-01.daraz.pk', // 👈 added this new one
//         ],
//     },
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ["picsum.photos"], // Add this to allow picsum.photos images
//     },
// }

// module.exports = nextConfig



//claudeee
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Existing domains
      {
        protocol: 'https',
        hostname: 'pk-live-21.slatic.net',
      },
      {
        protocol: 'https',
        hostname: 'static-01.daraz.pk',
      },
      // New domain that was causing the error
      {
        protocol: 'https',
        hostname: 'sg-test-11.slatic.net',
      },
      // Common e-commerce image domains (to prevent future errors)
      {
        protocol: 'https',
        hostname: '*.slatic.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.daraz.pk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.daraz.com',
        pathname: '/**',
      },
      // Generic patterns for common CDNs
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;