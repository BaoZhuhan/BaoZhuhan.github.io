---
title: 我是如何学会十字链表的
description: 
slug: 2024100301
date: 2024-10-03 00:00:00
image: algorithm.jpg
categories: 
    - C/C++
tags: 
    - 数据结构与算法
    - 笔记
comments: true
---

*本库包含作业答案，请确保阅读并完全同意[重要声明](https://baozhuhan.github.io//p/2024070101/)*

## 题目来源
> **6-4 稀疏矩阵的链式结构构建**<br>
> *Author：[陈越](https://person.zju.edu.cn/0096205#740580)*

[例题AC代码](#例题AC代码)

### 题目
请设计两个函数，一个根据读入的“行号 列号 元素值”三元组构建十字链表表示的稀疏矩阵，另一个从矩阵中查询指定行列上元素的值。

**函数接口定义**

```c
SparseMatrix BuildSparseMatrix( int n_row, int n_col, int n );
ElemSet GetElem( SparseMatrix matrix, int row, int col );
```
其中稀疏矩阵 `SparseMatrix` 的十字链表结构定义如下：

```c
typedef enum { head, term } NodeTag;
struct TermNode { /* 非零元素结点 */
    int row, col; /* 行号，列号 */
    ElemSet value;/* 元素值 */
};
typedef struct SparseMatrixNode *Position; /* 结点位置是指针 */
typedef Position SparseMatrix;
struct SparseMatrixNode {
    Position down;            /* 向下的列指针 */ 
    Position right;           /* 向右的行指针 */
    NodeTag tag;              /* 结点标记 */
    union {
        Position next;        /* 头结点链接指针 */
        struct TermNode term; /* 非零元素结点 */
    } u_region;               /* head和term的共用体 */
};
```
函数接口定义中，`ElemSet` 是用户定义的数据类型，这里默认为 int。函数 `BuildSparseMatrix` 的功能是创建 `n_row` 行、`n_col` 列、有 `n` 个非零元素的矩阵，非零元素按行优先、列号增序输入。注意：行、列号从 0 开始。函数 `GetElem` 的功能是返回矩阵 `matrix` 中第 `row` 行、第 `col` 列的元素值。若输入的行、列号非法，则在一行中输出 `ERROR` 并返回 0。

### 裁判测试程序样例：

```c
#include <stdio.h>
#include <stdlib.h>

typedef int ElemSet;
typedef enum { head, term } NodeTag;
struct TermNode { /* 非零元素结点 */
    int row, col; /* 行号，列号 */
    ElemSet value;/* 元素值 */
};
typedef struct SparseMatrixNode *Position; /* 结点位置是指针 */
typedef Position SparseMatrix;
struct SparseMatrixNode {
    Position down;            /* 向下的列指针 */ 
    Position right;           /* 向右的行指针 */
    NodeTag tag;              /* 结点标记 */
    union {
        Position next;        /* 头结点链接指针 */
        struct TermNode term; /* 非零元素结点 */
    } u_region;               /* head和term的共用体 */
};

SparseMatrix BuildSparseMatrix( int n_row, int n_col, int n );
ElemSet GetElem( SparseMatrix matrix, int row, int col );

int main(void)
{
    SparseMatrix matrix;
    int n_row, n_col, n;
    int m, row, col, i;
    
    scanf("%d %d %d", &n_row, &n_col, &n);
    matrix = BuildSparseMatrix(n_row, n_col, n);
    scanf("%d", &m);
    for (i=0; i<m; i++) {
        scanf("%d %d", &row, &col);
        printf("%d\n", GetElem(matrix, row, col));
    }
    
    return 0;
}
/* 你的代码将被嵌在这里 */
```

### 输入样例：

```in
4 5 7
0 0 18
0 3 2
1 1 27
2 3 -4
3 0 23
3 1 -1
3 4 12
6
0 0
3 4
1 1
2 3
1 4
2 2
```

### 输出样例：

```out
18
12
27
-4
0
0
```

## 语法知识补充

### 什么是 ``enum { head, term }`` 
> 定义一个枚举类型，需要使用 enum 关键字，后面跟着枚举类型的名称，以及用大括号 {} 括起来的一组枚举常量。每个枚举常量可以用一个标识符来表示，也可以为它们指定一个整数值，如果没有指定，那么默认从 0 开始递增。[^1]
<p align="right">— C enum(枚举) | 菜鸟教程</p>

下面给出题设代码和题设代码的调用，读者可以自行前往资料[^1]学习 ``enum`` 的使用。

**题设代码**
```c
typedef enum { head, term } NodeTag;
```
**例示调用**
```c
struct SparseMatrixNode matrix;
matrix.tag = term; //设置matrix为非零节点
```

[^1]: [C enum(枚举) | 菜鸟教程 (runoob.com)](https://www.runoob.com/cprogramming/c-enum.html)

### 什么是 ``union``

> The Union is a user-defined data type in C language that can contain elements of the different data types just like structure. But unlike structures, all the members in the C union are stored in the same memory location. Due to this, only one member can store data at the given instance.[^2]
<p align="right">— C Unions - GeeksforGeeks</p>

[^2]: [C Unions - GeeksforGeeks](https://www.geeksforgeeks.org/c-unions/)

通俗地说，``union`` 是一个可以包含多种不同数据类型的数据的结构，每个 ``union`` 对象只能存放一个成员。

```c
union {
        Position next;        /* 头结点链接指针 */
        struct TermNode term; /* 非零元素结点 */
    } u_region;               /* head和term的共用体 */
```

以题目中给出的代码为例子，当 ``SparseMatrixNode`` 是头节点时，即 ``matrix->tag`` 值为 ``head`` 时，``martix->u_region`` 存放 ``next`` 成员；当 ``SparseMatrixNode`` 是非零节点时，即 ``matrix->tag`` 值为 ``term`` 时，``martix->u_region`` 存放 ``term`` 成员。

## 数据结构学习

### 前置知识
1. 链表的定义和代码实现[^3]
2. 邻接表的定义和代码实现[^4]
3. 逆邻接表的定义[^5]
4. 图论基础&离散数学基础

### 十字链表


## 例题AC代码
```c
/* 初始化一个空十字链表 */
SparseMatrix InitMatrix(int n_row, int n_col){
    SparseMatrix matrix = (SparseMatrix)malloc(sizeof(struct SparseMatrixNode));
    matrix->down = (SparseMatrix)malloc(n_row * sizeof(struct SparseMatrixNode));
    matrix->right = (SparseMatrix)malloc(n_col * sizeof(struct SparseMatrixNode));

    for(int i = 0; i < n_row; i++){
        matrix->down[i].tag = head;
        matrix->down[i].down = &matrix->down[i];
        matrix->down[i].right = &matrix->down[i];
    }

    for(int i = 0; i < n_col; i++){
        matrix->right[i].tag = head;
        matrix->right[i].down = &matrix->right[i];
        matrix->right[i].right = &matrix->right[i];
    }

    matrix->tag = head;
    return matrix;
}

/* 对于每个非零元素，初始化一个非零元素结点 */
SparseMatrix InitNode(int row, int col, int value){
    SparseMatrix node = (SparseMatrix)malloc(sizeof(struct SparseMatrixNode));
    node->u_region.term.row = row;
    node->u_region.term.col = col;
    node->u_region.term.value = value;
    node->right = NULL;
    node->down = NULL;
    node->tag = term;
    return node;
}

SparseMatrix BuildSparseMatrix(int n_row, int n_col, int n){
    SparseMatrix matrix = InitMatrix(n_row, n_col);
    int row, col;
    ElemSet value;

    for(int i = 0; i < n; i++){
        scanf("%d %d %d", &row, &col, &value);

        if(row < 0 || row >= n_row || col < 0 || col >= n_col){
            printf("ERROR");
            continue;
        }

        SparseMatrix node = InitNode(row, col, value);

        SparseMatrix rowHead = &matrix->down[row];
        SparseMatrix p = rowHead;
        while(p->right != rowHead && p->right->u_region.term.col < col){
            p = p->right;
        }
        node->right = p->right;
        p->right = node;

        SparseMatrix colHead = &matrix->right[col];
        p = colHead;
        while(p->down != colHead && p->down->u_region.term.row < row){
            p = p->down;
        }
        node->down = p->down;
        p->down = node;
    }
    return matrix;
}

ElemSet GetElem(SparseMatrix matrix, int row, int col){
    if(row < 0 || col < 0 || matrix->down[row].down == NULL || matrix->right[col].right == NULL){
        printf("ERROR\n");
        return 0;
    }

    SparseMatrix rowHead = &matrix->down[row];
    SparseMatrix p = rowHead->right;

    while(p != rowHead && p->u_region.term.col < col){
        p = p->right;
    }

    if(p != rowHead && p->u_region.term.col == col){
        return p->u_region.term.value;
    }

    return 0;
}

```

[^3]: [链表 - OI Wiki (oi-wiki.org)](https://oi-wiki.org/ds/linked-list/)
[^4]: [邻接表（Adjacency List） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/618361957)
[^5]: [邻接表和逆邻接表-CSDN博客](https://blog.csdn.net/ASJBFJSB/article/details/100887364)
