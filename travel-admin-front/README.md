# travel-admin-front

### 项目提交变化
```
组长：俞皓文
组员：刘金升、冉晨阳、黄浩、蒲浩翔
```

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

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
