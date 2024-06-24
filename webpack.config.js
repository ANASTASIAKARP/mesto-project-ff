const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключите плагин
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // подключили плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // подключите к проекту mini-css-extract-plugin

module.exports = { 
  devtool: 'source-map', //для улучшения отслеживания breakpoint

  entry: { main: "./src/scripts/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development", // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    rules: [
      {
        // rules — это массив правил// добавим в него объект правил для бабеля
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: "babel-loader", // при обработке этих файлов нужно использовать babel-loader
        exclude: "/node_modules/", // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      //добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          "postcss-loader"
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};
