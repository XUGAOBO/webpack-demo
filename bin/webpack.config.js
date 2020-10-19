const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');

const webpackConfig = {
  devtool: false, // 此选项控制是否生成，以及如何生成 source map
  resolve: {
    alias: {
      demo: path.join(__dirname, '../src/components'),
    },
    // 尝试按顺序解析文件后缀名, 如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    extensions: ['*', '.js', '.jsx', '.less', '.css'],
  },
  // 入口配置
  entry: {
    bundle: config.entry,
    vendor: ['react', 'react-dom', 'react-router-dom'],
  },
  // 输出配置
  output: {
    filename: '[name]-[hash:8].js',
    // chunkFilename: '[name]-[chunkhash:8].js',
    path: config.path,
  },
  module: {
    // 解析器配置
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    // 大于相关浏览器版本无需用到 preset-env
                    edge: '17',
                    firefox: '60',
                    chrome: '67',
                    safari: '11.1',
                  },
                  corejs: '3', // 声明corejs版本
                  // 根据代码逻辑中用到的 ES6+语法进行方法的导入，而不是全部导入
                  useBuiltIns: 'usage', // useBuiltIns就是是否开启自动支持 polyfill，它能自动给每个文件添加其需要的poly-fill。
                },
              ],
              '@babel/preset-react',
            ],
            plugins: ['@babel/proposal-class-properties'], // Support for the experimental syntax 'classProperties' isn't currently enabled
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 只在开发模式中启用热更新
              hmr: process.env.NODE_ENV === 'development',
              // 如果模块热更新不起作用，重新加载全部样式
              reloadAll: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss', // 说明options里面插件的使用是针对于谁的，我们这里是针对于postcss的
                plugins: [
                  // 这里的插件只是这对于postcss
                  require('autoprefixer')(), // 引入添加前缀的插件,第二个空括号是将该插件执行
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 不超过100byte, 则转换成base64位
              name: 'assets/img/[name].[hash:8].[ext]', // 图片输出路径
              // esModule: false, //默认为true即使用ES模块语法, 造成GET http://localhost:端口/[object%20Module] 404 (Not Found)
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/blob/[name].[hash:8].[ext]', // 音视频输出路径
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/font/[name].[hash:8].[ext]', // 字体输出路径
            },
          },
        ],
      },
    ],
  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: config.template,
      inject: true, // 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
      filename: 'index.html',
      minify: {
        // 压缩html
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格
      },
    }),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? 'assets/style.css' : 'assets/style.[hash:8].css', // 配置样式文件输出路径
    }),
  ],
};

module.exports = webpackConfig;
