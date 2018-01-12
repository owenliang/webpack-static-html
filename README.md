# webpack-static-html

如果你打算用webpack来编译PC和WAP站的多页面应用，并且采用类似PHP的语言实现页面数据嵌套，那么这个项目应该可以帮助你。

# 原理

* 简单的说，webpack是从js入口进行编译分析的，所以每个页面应该有一个js入口。其次，对于webpack来说，css、img、js、img都是模块，可以通过import/require引用。
* 与react/vue最大的一个差别是，因为html结构写在HTML文件中而不是jsx中，所以需要一个html-loader插件来帮我们解析HTML文件，提取出其中的img src作为图片模块，并进一步对图片模块进行编译提取(url-loader)。
