# travel-admin-front

## 项目bug
```
1、打开编辑弹窗，富文本编辑只能出现第一个点击的数据内容，再点击第二个数据，富文本的模块依旧是显示第一个的内容
2、富文本bug解决，错误之处：监听数据的对象名写错，解决富文本插件input框内无法实时获取数据
```

## TinyMCE 富文本
```
问题总结：
1、
使用富文本会出现下拉框无法显示的问题，查证后发现是工具栏的下拉选择时的层级比弹窗的小，所以被弹窗遮挡了
工具栏的下拉框的层级提高，找到skins/skins.min.css文件
把class名为tox-tinymce-aux的第一个的z-index属性变大即可
```

#### Installation

1.  xxxx
2.  xxxx
3.  xxxx

#### Instructions

1.  xxxx
2.  xxxx
3.  xxxx

#### Contribution

1.  Fork the repository
2.  Create Feat_xxx branch
3.  Commit your code
4.  Create Pull Request


#### Gitee Feature

1.  You can use Readme\_XXX.md to support different languages, such as Readme\_en.md, Readme\_zh.md
2.  Gitee blog [blog.gitee.com](https://blog.gitee.com)
3.  Explore open source project [https://gitee.com/explore](https://gitee.com/explore)
4.  The most valuable open source project [GVP](https://gitee.com/gvp)
5.  The manual of Gitee [https://gitee.com/help](https://gitee.com/help)
6.  The most popular members  [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
