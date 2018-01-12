const path = require("path"); // 处理文件路径的标准库
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // CSS提取插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HTML生成插件

// webpack.config.js模块导出的所有符号（webpack配置信息）
// 参考：https://webpack.js.org/configuration/
module.exports = {
    // 单页应用入口
    entry: {
        index: './src/page/index/entry.js',
        about: './src/page/about/entry.js',
    },

    // 编译输出配置
    output: {
        path: path.resolve(__dirname, 'dist'),          // 保存路径
        filename: 'js/[name].[chunkhash].js',    // js文件名
    },

    // 测试服务器配置
    devServer: {
        port: 8080,             // 监听端口
        compress: true,         // gzip压缩
    },

    // 模块配置
    module: {
        rules: [
            // es6语法转换
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: ['es2015'],
                    plugins: [
                        ["transform-object-rest-spread"],
                        ["transform-runtime"]
                    ]
                }
            },
            // css编码与提取
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?"
                })
            },
            // 图片内联与编码
            {
                // 小于1KB的图片使用base64内联
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=1024&name=image/[name].[hash].[ext]' // 图片提取到images目录
            },
            // 提取html中直接引用的本地文件
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },

    // 插件配置
    plugins: [
        // 提取多个chunk之间的公共内容到一个公共chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['index', 'about'],
            minChunks: 2,
        }),
        // CSS编译成独立文件，通过<link>引入
        new ExtractTextPlugin("css/[name].[contenthash].css"),
        // HTML生成插件
        new HtmlWebpackPlugin({
            title: '',
            filename : 'index.html',
            inject: 'head', // [js|css]注入到body部分
            template: 'src/page/index/index.html', // 静态页
            chunks: ['index', 'common'] // entry中定义的入口chunk, 以及抽取出去的公用chunk
        }),
        new HtmlWebpackPlugin({
            title: '',
            filename : 'about.html',
            inject: 'head', // [js|css]注入到body部分
            template: 'src/page/about/about.html', // 静态页
            chunks: ['about', 'common'] // entry中定义的入口chunk, 以及抽取出去的公用chunk
        }),
        // 自动加载类库
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ],
};