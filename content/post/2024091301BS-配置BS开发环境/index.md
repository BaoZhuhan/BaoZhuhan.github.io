---
title: 使用VScode配置BS开发环境
description: 
slug: 2024091301
date: 2024-09-13 11:22:24
image: BSlogo.webp
categories: 
    - 前端
    - 配置
tags: 
    - 笔记
    - B/S架构应用开发
comments: true
---

## 预备工作

关于如何下载或者安装VScode，网络上有许多介绍，这里不再赘述。简单贴出一些链接方便读者阅读：

1. [VScode——下载、安装、配置中文环境（windows）@知乎：终端研发部](https://zhuanlan.zhihu.com/p/342467129)
2. [VScode官网](https://code.visualstudio.com/)

## BS配置文件

1. 首先我们需要为BS的开发环境创建一个``配置文件``，请按顺序打开“文件->首选项->配置文件”

2. 请点击“新建配置文件”，在右侧的配置曲填写对应的选项。以下作者的配置选项：
    * 名称：前端
    * 复制自：无

3. 请点击“保存”，并切换到新建立的配置文件。

## 安装对应的扩展：

1. 打开“扩展”选项卡，安装BS需要的扩展，以下是作者的扩展列表分享：

* ESLint
* Live Server
* Path Intellisense
* Prettier-Code formatter
* HTML CSS Support
* CSS Peak
* Auto Import
* Stylelint

## 创作一个简单的网站来检验效果

1. 新建并在VScode中打开一个文件夹，在文件夹中新建``index.html``

index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
</head>
<body>
    <p>你的VScode已经被配置为前端开发</p>
</body>
</html>
```

2. 点击``Go Live``，查看打开的浏览器页面查看成果