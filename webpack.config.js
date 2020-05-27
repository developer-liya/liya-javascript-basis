// webpack的配置文件遵循着CommonJs规范
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    // 也可以在入口文件中直接polyfill 就可以处理es6 等高级语法
    // entry: ['@babel/polyfill','./src/index.js'],
    // entry: './src/main.js',// 入口文件路径
    entry: {
        index: './src/index.js',
    },// 多页配置，是对象
    // 输出相关设置
    output: {
        // path.resolve()解析当前绝对路径的相对路径,webpack2起就规定必须是绝对路径
        path: path.resolve('./dist/'),// 输出目录必须是绝对路径
        // filename: 'bundle.js',// 输出的文件名
        filename: '[name].js',
        publicPath: '/'
    },
    mode: 'production',// 默认是production  可以手动设置development
    // watch: true, 开启server 控制
    devServer: {
        open: true,// 编译完是否直接浏览器打开
        hot: true,// 是否热重载
        port: 3000,// 设置端口号
        compress: true,
        // contentBase: './src'
    },
    // 带s都是数组  插件
    plugins: [
        // HtmlWebpackPlugin 是个构造函数 需要new 出来,生成一个index.html在当前目录下
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",//模板  就是当前目录下的index.html
            chunks: ['index']// chunks 就是 一段js 的意思  在这里设置你需要的js文件
        }),
        // new HtmlWebpackPlugin({
        //     filename: "other.html",
        //     template: "./src/other.html",
        //     chunks: ['other']
        // }),
        // 清理输出目录
        new CleanWebpackPlugin(),
        // 参数是 array 这个插件是用于把静态资源拷贝到你所需要的目录，可以用于视频、音频等，图片也可以拷贝但是不能参与打包
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.join(__dirname, 'assets'),// 需要是绝对路径
        //             to: 'assets'// 相对路径
        //         }
        //     ]
        // }),
        // 设置在压缩头部 说明的
        new webpack.BannerPlugin('haodf'),
        // 内置插件 把配置的变量注入到模块内
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
    ],
    // 配置loader
    module: {
        rules: [
            {
                // 匹配文件的正则
                test: /\.css$/,
                // webpack 读取loader时，是从右到左读取，将css文件先交给最右侧的loader处理
                // loader 的执行顺序是从右到左以管道的形式链式调用
                // css-loader: 解析css文件
                // style-loader: 将解析css的文件放到html中 使其生效
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                // less-loader 只是转成css文件 还需要其他两个处理css的loader
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                // less-loader 只是转成css文件 还需要其他两个处理css的loader
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|bmp|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: 'images',// 输出的路径 默认是在打包后的文件夹内
                        name: '[name]-[hash:4].[ext]'// 定义打包后的文件名
                    }
                }

            },
            {
                test: /\.(woff|woff2|eot|svg|ttf)$/,
                use: 'file-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    // 放到.babelrc文件中
                    // options: {
                    //     // 预设
                    //     presets:['@babel/env'],
                    //     // babel-loader 所需要的插件
                    //     plugins: [
                    //         '@babel/plugin-proposal-class-properties',
                    //         '@babel/plugin-transform-runtime'
                    //     ]
                    // }
                },
                // 不需要打包的js  正则匹配
                exclude: /node_modules/
            },
            // 可以吧html中的img标签中的本地图片资源参与到webpack 打包中来
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                //  require.resolve 用于解析node_module中jquery绝对路径
                // test: require.resolve('jquery'),
                // use: [{
                //     loader: 'expose-loader',// 全局注入，挂载到window
                //     options: '$'
                // }]
            }

        ]
    },
    // source-map 这种模式推荐 cheap-module-eval-source-map
    devtool: 'cheap-module-eval-source-map',
    // 打包的时候对文件大小限制提醒 设置
    performance: {
        hints: false, // 枚举
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }
    }
};
