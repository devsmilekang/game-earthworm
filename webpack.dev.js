const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, "/build"),
    compress: true,
    port: 9000,
    hot: true,
  },
  mode: "development",
  devtool: "inline-source-map",
});
