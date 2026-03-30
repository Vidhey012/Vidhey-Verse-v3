/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static export for Netlify
  trailingSlash: true,
  images: {
    unoptimized: true,        // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      }
    ]
  },
  // Enable WebGL shaders
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    })
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: { publicPath: '/_next/static/', outputPath: 'static/' }
      }
    })
    return config
  }
}

module.exports = nextConfig
