---
title: 使用Winget更新系统软件（无需翻墙）
description: Winget 是微软推出的一款命令行工具，用于在 Windows 操作系统中安装、更新和管理软件。它提供了一个简单、快速且无需翻墙的方式来更新系统软件。通过使用 Winget，用户可以轻松地找到、安装和升级应用程序，同时确保软件来源的安全性和可靠性。本文将详细介绍如何使用 Winget 来更新系统软件，无需复杂的网络配置或使用第三方软件。

slug: 2024091201
date: 2024-09-12 02:31:35
image: winget.jpg
categories: 
    - 配置
tags: 
    - 
comments: true
---

访问[使用 WinGet 工具安装和管理应用程序](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/)获取更多winget帮助

## 更换winget源

使用``管理员模式``打开``Powershell``

输入以下命令，更换``winget``源为中科大镜像源[^1]

[^1]: 墙内访问较为稳定，适合境内使用

```shell
winget source remove winget
winget source add winget https://mirrors.ustc.edu.cn/winget-source
```

## 列出更新软件列表

```shell
winget upgrade
```

## 更新全部软件

```shell
winget upgrade --all
```