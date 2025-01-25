---
title: Makefile入门学习笔记
description: Makefile快速入门的学习笔记和复习指南
slug: 2024082902
date: 2024-08-29 00:00:02
image: cmake.jpg
categories: 
    - C/C++
tags: 
    - 笔记
comments: true
---
# ！施工中
> 学习来源：[20分钟Makefile光速入门教程](https://www.bilibili.com/video/BV1tyWWeeEpp) By: [GeekHour](https://space.bilibili.com/102438649)<br>
> 推荐指数：⭐⭐⭐⭐

## 构建

### 定义
$$
\{ \text{源码文件, 资源文件} \} \rightarrow \text{可执行文件}
$$
### 过程
$$
\{ \text{源文件} \} \rightarrow \{ \text{预处理} \} \rightarrow \{ \text{编译} \} \rightarrow 
\{ \text{汇编} \} \rightarrow \{ \text{链接} \} \rightarrow \{ \text{打包部署} \}
$$

### 如何构建
1. 当单个文件的时，我们可以使用编译命令来构建程序
2. 当涉及到多个源文件和资源文件时，使用自动化的构建程序是更好的选择

## Make学习

访问[代码仓库](https://github.com/BaoZhuhan/TechStack/tree/main/Make)

### 使用命令编译执行源文件

创建 ``main.c`` ，编写一个简单的C程序
```c
#include <stdio.h>

int main(){
    printf("Hello, World!\n");
    return 0;
}
```
在shell[^1]中输入命令:

[^1]: 作者使用Windows 11环境， Shell通常指代“命令提示符”，获取[Microsoft官方支持](https://learn.microsoft.com/zh-cn/windows/terminal)

```shell
gcc main.c -o hello
```
使用GCC[^2]编译器编译``main.c``源文件，并生成可执行文件

[^2]: 关于如何安装GCC环境，作者不再赘述，可以查看[FreeCodeCamp-How to Install C and C++ Compilers on Windows](https://www.freecodecamp.org/news/how-to-install-c-and-cpp-compiler-on-windows/)

使用``./hello``运行可执行文件

## 简单使用Make

1. 创建头文件``message.h``
```c
void message()
```

2. 创建``message.c``
```c
#incldue <stdio.h>

void message() {
    printf("Hello, World!\n");
}
```

3. 修改``main.c``

```diff
#include <stdio.h>
#include "message.h"

int main(){
+    message();
-    printf("Hello, World!\n");
    return 0;
}
```

4. 添加``Makefile``

```makefile
hello: main.c message.c
    gcc main.c message.c -o hello
```

## Make规范技巧
1. 分步骤生成可执行文件

```makefile
hello: main.o message.o
    gcc main.o message.o -o hello

main.o: main.c
    gcc -c main.c

message.o: message.c
    gcc -c message.c
```

**优点**：如果只修改了``message.c``,那么``main.c``不会被重新执行

2. 伪目标

```diff
+ clean:
+   rm -f *o hello
```

**注意**：目录下不可以有和伪目标同名的文件