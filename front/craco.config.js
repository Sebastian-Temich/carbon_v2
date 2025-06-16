const cracoAlias = require('craco-alias');
const sassResourcesLoader = require('craco-sass-resources-loader');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/assets/styles/global.scss',
      },
    },
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src', // this is from where all search in files will start
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  webpack: {
    rules: [
      // You need this, if you are using `import file from "file.ext"`, for `new URL(...)` syntax you don't need it
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
    configure: (webpackConfig) => {
      webpackConfig.optimization.minimize = true;
      webpackConfig.optimization.minimizer.push(
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: ['imagemin-mozjpeg', 'imagemin-pngquant', 'imagemin-webp'],
            },
          },
          generator: [
            {
              preset: 'webp',
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: ['imagemin-webp'],
              },
            },
          ],
        }),
      );
      return webpackConfig;
    },
  },
};
