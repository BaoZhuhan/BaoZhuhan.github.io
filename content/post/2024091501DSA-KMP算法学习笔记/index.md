---
title: KMP算法学习笔记-我是如何学会KMP算法
description: 
slug: 2024091501
date: 2024-09-15 00:00:00
image: algorithm.jpg
categories: 
    - C/C++
tags: 
    - 数据结构与算法
    - 笔记
comments: true
---

## 我看过的学习资料
> 1. [最浅显易懂的 KMP 算法讲解](https://www.bilibili.com/video/BV1AY4y157yL)<br>
>    推荐指数：⭐⭐⭐⭐
> 2. [KMP 学一遍忘一遍？ACM 金牌选手用可视化......](https://www.bilibili.com/video/BV1Er421K7kF)<br>
>    推荐指数：⭐⭐⭐
> 3. [前缀函数与 KMP 算法](https://oi-wiki.org/string/kmp/)<br>
>    推荐指数：⭐⭐⭐⭐

## 我是如何学会KMP算法的

对于浙大城市学院的同学而言，我们的教材是从“next数组”的角度去讲解KMP算法的，但我并不认为这是一种优雅的方式，我趋向于先按照KMP算法的原理去了解这个算法的本质，然后自己推演算法的代码，并且和网络上广泛认可的代码相比较。最后再了解一下教科书是如何讲解KMP算法的（仅仅为了考试）。

### 前置知识

1. C语言基础
2. 数据结构“串”
> 虽然教科书和老师的PPT会把串定义成极其复杂的数据结构，但是我们只需要了解串就是字符串就好了。你可以使用类似``char str[1024]``或者``char *str = (char*)malloc(1024 * sizeof(char))``的方法去定义一个字符串。

### 了解前缀数组

通过Oi Wiki的学习，我了解了前缀数组的定义。

以下内容引用自[Oi Wiki](https://oi-wiki.org/string/kmp/#%E5%89%8D%E7%BC%80%E5%87%BD%E6%95%B0)：

> #### 字符串前缀和后缀定义
> 
> 关于字符串前缀、真前缀，后缀、真后缀的定义详见 [字符串基础](./basic.md)
> 
> #### 前缀函数
> 
> ##### 定义
> 
> 给定一个长度为 n 的字符串 s，其 **前缀函数** 被定义为一个长度为 n 的数组 $\pi$。
> 其中 $\pi[i]$ 的定义是：
> 
> 1.  如果子串 $s[0\dots i]$ 有一对相等的真前缀与真后缀：$s[0\dots k-1]$ 和 $s[i - (k - 1) \dots i]$，那么 $\pi[i]$ 就是这个相等的真前缀（或者真后缀，因为它们相等）的长度，也就是 $\pi[i]=k$；
> 2.  如果不止有一对相等的，那么 $\pi[i]$ 就是其中最长的那一对的长度；
> 3.  如果没有相等的，那么 $\pi[i]=0$。
> 
> 简单来说 $\pi[i]$ 就是，子串 $s[0\dots i]$ 最长的相等的真前缀与真后缀的长度。
> 
> 用数学语言描述如下：
> 
> $$
> \pi[i] = \max_{k = 0 \dots i}\{k: s[0 \dots k - 1] = s[i - (k - 1) \dots i]\}
> $$
> 
> 特别地，规定 $\pi[0]=0$。
> 
> ##### 过程
> 
> 举例来说，对于字符串 `abcabcd`，
> 
> $\pi[0]=0$，因为 `a` 没有真前缀和真后缀，根据规定为 0
> 
> $\pi[1]=0$，因为 `ab` 无相等的真前缀和真后缀
> 
> $\pi[2]=0$，因为 `abc` 无相等的真前缀和真后缀
> 
> $\pi[3]=1$，因为 `abca` 只有一对相等的真前缀和真后缀：`a`，长度为 1
> 
> $\pi[4]=2$，因为 `abcab` 相等的真前缀和真后缀只有 `ab`，长度为 2
> 
> $\pi[5]=3$，因为 `abcabc` 相等的真前缀和真后缀只有 `abc`，长度为 3
> 
> $\pi[6]=0$，因为 `abcabcd` 无相等的真前缀和真后缀
> 
> 同理可以计算字符串 `aabaaab` 的前缀函数为 $[0, 1, 0, 1, 2, 2, 3]$。

### 了解KMP算法的大致原理
在了解前缀数组后，结合对OI Wiki的一点点解读，我初步了解了KMP算法的**大致原理**：

> 给定一个文本 t 和一个字符串 s，尝试找到并展示 s 在 t 中的所有出现。
> 
> 我们构造一个字符串 s + \# + t，其中 \# 为一个既不出现在 s 中也不出现在 t 中的分隔符。如果等式 $\pi[i] = n$ 成立，则意味着 s 完整出现在该位置（即其右端点位于位置 i）。注意该位置的下标是对字符串 s + \# + t 而言的。

### 通过视频简要了解KMP算法的实现方法

> 2. [KMP 学一遍忘一遍？ACM 金牌选手用可视化......](https://www.bilibili.com/video/BV1Er421K7kF)<br>
>    推荐指数：⭐⭐⭐

### 手推前缀数组模型

```C
int* my_pre(char* s, int* pi){
    pi = (int*)malloc(strlen(s) * sizeof(int));
    pi[0] = 0;
    int len = strlen(s);

    for(int i = 1; i < len; i++){
        int j = pi[i - 1];
        while(j > 0 && s[i] != s[j]){
            j = pi[j - 1];
        }
        if(s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}
```

在这一步最重要的是推出：
```C
        int j = pi[i - 1];
        while(j > 0 && s[i] != s[j]){
            j = pi[j - 1];
        }
```

也就是当新的字符不匹配时候的循环退回。

### 手推KMP算法

过掉Pintia题目：

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int* my_pre(char* s, int* pi, int len){
    pi = (int*)malloc(strlen(s) * sizeof(int));
    pi[0] = 0;

    for(int i = 1; i < len; i++){
        int j = pi[i - 1];
        while(j > 0 && s[i] != s[j]){
            j = pi[j - 1];
        }
        if(s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}

int main(){
    char s[1024];
    char t[1024];

    fgets(t, 1024, stdin);
    fgets(s, 1024, stdin);

    s[strcspn(s, "\n")] = 0;
    t[strcspn(t, "\n")] = 0;

    int slen = strlen(s);

    char n[1024];
    strcpy(n, s);
    n[slen] = '#';
    strcpy(n + slen + 1, t);

    int nlen = strlen(n);

    for(int i = 0; i < nlen; i++){
        if(n[i] >= 'a' && n[i] <= 'z'){
            n[i] = n[i] - 'a' + 'A';
        }
    }

    int* pi = my_pre(n, pi, nlen);

    for(int i = slen; i < nlen; i++){
        if(pi[i] == slen){
            printf("%d\n", i - slen - slen);
        }
    }

    // printf("\n%s\n", n);
    // for(int i = 0; i < nlen; i++){
    //     printf("%d", pi[i]);
    // }

    return 0;
}
```

## 刷题

1. 题目来源：[LeetCode-28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/)

My answer:

```C
int* pre(char* str, int len){
    int* pi = (int*)malloc(len * sizeof(int));
    pi[0] = 0;
    for(int i = 1; i < len; i++){
        int j = pi[i - 1];
        while(j > 0 && str[i] != str[j]){
            j = pi[j - 1];
        }
        if(str[i] == str[j]){
            j++;
        }
        pi[i] = j;
    }
    return pi;
}

int strStr(char* haystack, char* needle){
    int haystack_len = 0, needle_len = 0;

    while(needle[needle_len] != '\0'){ needle_len++; }
    while(haystack[haystack_len] != '\0'){ haystack_len++; }

    //KMP Algo
    char* str = (char*)malloc(20005 * sizeof(char));

    for(int i = 0; i < needle_len; i++){
        str[i] = needle[i];
    }
    str[needle_len] = '#';
    for(int i = 0; i < haystack_len; i++){
        str[needle_len + 1 + i] = haystack[i];
    }
    str[needle_len + haystack_len + 1] = '\0';

    int* pi = pre(str, needle_len + haystack_len + 1);

    for(int i = needle_len; i < needle_len + haystack_len + 1; i++){
        if(pi[i] == needle_len){
            free(pi);
            free(str);
            return (i - needle_len * 2);
        }
    }

    free(pi);
    free(str);
    return -1;
}
```
