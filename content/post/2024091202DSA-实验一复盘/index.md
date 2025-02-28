---
title: 数据结构与算法-实验一复盘
description: 在这篇文章中，我们深入探讨了数据结构与算法课程的实验一，重点复盘了几个关键的字符串操作函数。文章详细解析了如何实现求子串、插入子串、删除子串以及替换子串的功能，并通过具体的代码示例展示了每个函数的实现过程。此外，还提供了一个编程题，讨论了如何在不区分大小写的情况下进行字符串匹配。无论是对初学者还是有经验的程序员，这篇文章都是理解和掌握字符串操作的宝贵资源。
slug: 2024091202
date: 2024-09-12 02:47:00
image: algorithm.jpg
categories: 
    - C/C++
tags: 
    - 数据结构与算法
    - 作业
comments: true
---

*本库包含作业答案，请确保阅读并完全同意[重要声明](https://baozhuhan.github.io//p/2024070101/)*

## 函数题

### 6-1 求子串*

请编写函数，求子串。

#### 函数原型
```c
char* StrMid(char *dst, const char *src, int idx, int len);
```

说明：函数取源串 src 下标 idx 处开始的 len 个字符，保存到目的串 dst 中，函数值为 dst。若 len 值不正确，则自动修正。若 idx 值不正确，则目的串为空串。

#### 裁判程序

```c
#include <stdio.h>

char* StrMid(char *dst, const char *src, int idx, int len);

int main()
{
    char a[128], b[128];
    int s, n;
    gets(a);
    scanf("%d%d", &s, &n);
    StrMid(b, a, s, n);
    puts(b);
    return 0;
}

/* 你提交的代码将被嵌在这里 */
```

输入样例1
```
abcd
1 2
```
输出样例1
```
bc
```
输入样例2
```
abcd
1 5
```
注：5 不正确，按 3 处理。

输出样例2
```
bcd
```
输入样例3
```
abcd
-5 2
```
输出样例3
```
```
注：输出为空串。

相关习题：求左子串、求右子串。

#### AC代码

```c
char* StrMid(char *dst, const char *src, int idx, int len){
    int j = 0;
    for (int i = 0 ; i <= (idx + len) && src[i] != '\0' && idx >= 0; i++){
        if (i >= idx && i < (idx + len) ){
            dst[j++] = src[i];
        }
    }
    dst[j] = '\0';
    return dst;
}
```
### 6-2 插入子串*
请编写函数，在目的串中插入源串。

#### 函数原型
```c
char* StrInsert(char *dst, int idx, const char *src);
```
说明：dst 为指示目的串起始地址的指针，idx 为插入位置(下标)，src 为指示源串起始地址的指针。函数在目的串 dst 下标 idx 处插入源串 src，函数值为 dst。若 idx 不正确，则不插入子串。

要求：直接在原数组上完成操作，不要借助其它数组。

#### 裁判程序
```c
#include <stdio.h>

char* StrInsert(char *dst, int idx, const char *src);

int main()
{
    char a[1024], b[1024];
    int i;
    gets(a);
    scanf("%d%*c", &i);
    gets(b);
    StrInsert(a, i, b);
    puts(a);
    return 0;
}

/* 你提交的代码将被嵌在这里 */
```

输入样例1
```
abcd
0
ef
```
输出样例1
```
efabcd
```
输入样例2
```
abcd
2
ef
```
输出样例2
```
abefcd
```
输入样例3
```
abcd
4
ef
```

输出样例3
```
abcdef
```
输入样例4
```
abcd
10
ef
```
输出样例4
```
abcd
```

#### AC代码

```c
char* StrInsert(char *dst, int idx, const char *src) {
    if (idx < 0) return dst;

    int dstlen = 0;
    for (int i = 0; dst[i] != '\0'; i++) {
        dstlen++;
    }
    if (idx > dstlen) return dst;

    int srclen = 0;
    for (int i = 0; src[i] != '\0'; i++) {
        srclen++;
    }

    for (int i = dstlen; i >= idx; i--) {
        dst[i + srclen] = dst[i];
    }

    for (int i = 0; i < srclen; i++) {
        dst[idx + i] = src[i];
    }

    return dst;
}
```

### 6-3 删除子串*
请编写函数，删除子串。

#### 函数原型
```c
char* StrRemove(char *str, int idx, int len);
```
说明：str 为指示字符串起始地址的指针，idx 为子串的起始位置(下标)，len 为子串的长度。函数删除字符串 str 中从下标 idx 处开始、长度为 len 的子串，函数值为 str。若 len 值不正确，则自动修正。若 idx 值不正确，则不删除子串。

要求：直接在原数组上完成操作，不要借助其它数组。

#### 裁判程序
```c
#include <stdio.h>

char* StrRemove(char *str, int idx, int len);

int main()
{
    char a[1024];
    int i, n;
    gets(a);
    scanf("%d%d", &i, &n);
    StrRemove(a, i, n);
    puts(a);
    return 0;
}

/* 你提交的代码将被嵌在这里 */
```
输入样例1
```
abcd
1 2
```
输出样例1
```
ad
```
输入样例2
```
abcd
1 5
```
注：5 不正确，按3处理。

输出样例2
```
a
```
输入样例3
```
abcd
2 -5
```
注：-5 不正确，按 0 处理。

输出样例3
```
abcd
```
输入样例4
```
abcd
-1 2
```
输出样例4
```
abcd
```
#### AC代码
```c
char* StrRemove(char* str, int idx, int len){
    int s = 0, i;
    for(;str[s] != '\0';s++);
    if(idx >= s || idx < 0 || len <= 0) return str;
    //if(len>s-idx) len=s-idx;
    for(i = idx;i < idx + len;i++){
        if(i + len >= s) break;
        str[i] = str[i + len];
    }
    str[i] = '\0';
    return str;
}
```

### 6-4 替换子串*
请编写函数，替换子串。
#### 函数原型
```c
// 替换子串
char* StrStuff(char *dst, int idx, int len, const char *src);
```
说明：dst 为指示目的串起始地址的指针，idx 为待删除子串的起始位置(下标)，len 为待删除子串的长度，src 为指示待插入源串的起始地址的指针。函数将目的串 dst 中从下标 idx 处开始、长度为 len 的子串替换为源串 src，函数值为 dst。

要求：函数能容错运行。若 len 不正确，则自动修正。若 idx 不正确，则不作任何处理。
#### 裁判程序
```c
#include <stdio.h>

// 替换子串
char* StrStuff(char *dst, int idx, int len, const char *src);

int main()
{
    char a[1024], b[1024];
    int i, n;
    gets(a);
    scanf("%d%d%*c", &i, &n);
    gets(b);
    StrStuff(a, i, n, b);
    puts(a);
    return 0;
}

/* 你提交的代码将被嵌在这里 */
```
输入样例1
```
abcd
1 2
efg
```
输出样例1
```
aefgd
```
输入样例2
```
abcd
1 5 (注：按3处理)
efgh
```
输出样例2
```
aefgh
```
输入样例3
```
abcd
2 -5 (注：按0处理)
efg
```
输出样例3
```
abefgcd
```
输入样例4
```
abcd
8 3
efg
```
输出样例4
```
abcd
```
#### AC代码
```c
char* StrInsert(char *dst, int idx, const char *src) {
    if (idx < 0) return dst;

    int dstlen = 0;
    for (int i = 0; dst[i] != '\0'; i++) {
        dstlen++;
    }
    if (idx > dstlen) return dst;

    int srclen = 0;
    for (int i = 0; src[i] != '\0'; i++) {
        srclen++;
    }

    for (int i = dstlen; i >= idx; i--) {
        dst[i + srclen] = dst[i];
    }

    for (int i = 0; i < srclen; i++) {
        dst[idx + i] = src[i];
    }

    return dst;
}

char* StrRemove(char *str, int idx, int len){
    if(idx < 0 || len <= 0 ) return str;
    int strlen = 0;
    for(int i = 0 ; str[i] != '\0' ; i++){
        strlen++;
    } 

    if(idx > strlen-1 ) return str;
    if(idx + len > strlen-1 ) len = strlen-idx;

    for(int i = idx; i + len < strlen; i++){
        str[i] = str[i + len];
    }
    str[strlen - len] = '\0';
    return str;
}

// 替换子串
char* StrStuff(char *dst, int idx, int len, const char *src){
    StrRemove(dst, idx , len);
    StrInsert(dst, idx,src);
    return dst;
}
```
## 编程题
### 7-1 字符串匹配(不区分大小写)
输入两个可能由大小写字母、数字、空格、特殊字符等构成的字符串A和B，找出字符串B在字符串A中出现的位置，并将所有这些位置打印出来，注意英文字母不区分大小写。
#### 输入格式:
分两行分别输入字符串A与字符串B
#### 输出格式:
输出由若干行组成，分别输出字符串B在字符串A中出现的位置。

输入样例1:
```
Ab AbDaB aB
ab ab
```
输出样例1:
```
0
6
```
输入样例2:
```
AabAdkj-2Aabad.-
aaba
```
输出样例2:
```
0
9
```

#### AC代码

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

void toLowerCase(char *str) {
    for (int i = 0; str[i]; i++) {
        str[i] = tolower(str[i]);
    }
}
void findOccurrences(char *A, char *B) {
    int lenA = strlen(A);
    int lenB = strlen(B);
    for (int i = 0; i <= lenA - lenB; i++) {
        if (strncmp(&A[i], B, lenB) == 0) {
            printf("%d\n", i);
        }
    }
}

int main() {
    char A[1000], B[1000];
    
    fgets(A, 1000, stdin);
    fgets(B, 1000, stdin);
    
    A[strcspn(A, "\n")] = 0;
    B[strcspn(B, "\n")] = 0;
    
    toLowerCase(A);
    toLowerCase(B);
    
    findOccurrences(A, B);
    
    return 0;
}
```