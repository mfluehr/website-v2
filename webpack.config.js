const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
      UglifyJsPlugin = require("uglifyjs-webpack-plugin");


const ejsOptions = {
  inject: false,
  minify: {
    removeComments: true
  }
};

//// const projectPlugins = projects.map((project) => new HtmlWebpackPlugin({
//   ...ejsOptions,
//   filename: `./projects/${project.folder}/index.html`,
//   template: `./projects/${project.folder}/index.ejs`,
//   project
// }));


module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    "main.js": [
      path.resolve(__dirname, "src/_js/index.js"),
      path.resolve(__dirname, "src/_js/body-overlay.js"),
      path.resolve(__dirname, "src/_js/projects.js"),
      path.resolve(__dirname, "src/_js/social.js"),
      path.resolve(__dirname, "src/_js/slides.js")
    ]
  },
  mode: "production",
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "dist")
  },


  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },


  plugins: [
    //// ...projectPlugins,
    new HtmlWebpackPlugin({
      ...ejsOptions,
      template: "./index.ejs"
    })
  ],


  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "compile-ejs-loader"
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "_images/[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "_styles/[name].css"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  watch: true
};
