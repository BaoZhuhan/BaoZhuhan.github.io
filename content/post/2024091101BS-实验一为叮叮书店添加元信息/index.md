---
title: BS-实验一为叮叮书店添加元信息
description: BS-实验一为叮叮书店添加元信息
slug: 2024091101
date: 2024-09-11 00:00:00
image: BSlogo.webp
categories: 
    - 前端
tags: 
    - B/S架构应用开发
    - 作业
comments: true
---

*本库包含作业答案，请确保阅读并完全同意[重要声明](https://baozhuhan.github.io//p/2024070101/)*

访问[代码仓库]()

## 创建项目

1. VScode 创建并打开文件夹``bookstore``
2. 在``bookstore``下创建``index.html``

## 创建网页代码

3. 在``index.html``内创建如下代码：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>叮叮书店</title>
</head>
<body>
    
</body>
</html>
```
## 为“叮叮书店”项目首页添加头部信息

4. 在``index.html``中添加如下代码片段：

```diff
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>叮叮书店</title>
+    <meta name="keywords" content="网上书店，计算机，前端技术">
+    <meta name="description" content="叮叮书店是销售信息技术及相关图书的垂直网站">
+    <meta name="robots" content="index,follow">
+    <link rel="icon" herf="image/favicon.ico">
</head>
<body>
    
</body>
</html>
```
5. 添加网页图标，在``bookstore``下添加``image``，在``image``下添加适合的``favicon.ico``
