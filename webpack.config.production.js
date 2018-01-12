const productionConfig = require('./webpack.config.js');   // 继承开发环境配置
const webpack = require("webpack");                 // webpack标准库

// 代码压缩插件
const uglifyJs = new webpack.optimize.UglifyJsPlugin({
    // 紧凑输出
    beautify: false,
    // 删除注释
    comments: false,
    // 压缩配置
    compress: {
        // 删除日志代码
        drop_console: true,
        // 删除无用代码不发出提示
        warnings: false,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
    }
});
productionConfig.plugins.push(uglifyJs);

// 添加环境变量
var definePlugin = new webpack.DefinePlugin({
    'process.env':{
        'NODE_ENV': JSON.stringify('production')
    }
});
productionConfig.plugins.push(definePlugin);

// 配置CDN地址前缀, 例如: http://cdn.yuerblog.cc/
productionConfig.output.publicPath = "";

// 模块导出最终配置
module.exports = productionConfig;
