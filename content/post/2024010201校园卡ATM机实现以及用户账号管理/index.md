---
title: 校园卡ATM机实现以及用户账号管理（Python，期末，大作业，小项目）
description: 本文介绍了基于Python的校园卡账户管理系统，包括用户账户创建、登录、余额查询、交易操作以及管理员权限管理，数据存储在Excel文件中。
slug: 2024010201
date: 2024-01-02 00:00:00
image: Pythonlogo.png
categories: 
    - Python
tags: 
    - 作业
comments: true
---

## 简介：
本文介绍了基于Python的校园卡账户管理系统，包括用户账户创建、登录、余额查询、交易操作以及管理员权限管理，数据存储在Excel文件中。

## （1）主要函数
校园卡账户管理系统，包括创建、管理和删除用户账户，以及管理员功能。系统通过控制台接口与用户交互，操作包括账户登录、余额查询、取款、存款、账户信息修改等。

#### 主要功能
| 账户管理 | 管理员功能 | 数据存储 |
| --------- | ---------- | -------- |
| 创建新用户账户。 | 管理员登录。 | 用户数据存储在本地的 "users.xlsx" Excel文件中。 |
| 登录、修改和删除现有账户。 | 访问高级管理功能，如查看所有账户信息。 | 包括用户ID、密码和账户余额等信息。 |
| 查询账户余额。 |  |  |
| 存款和取款操作。 |  |  |


#### 主要函数
| 函数名             | 目的                                   | 备注                                       |
|-------------------|----------------------------------------|-------------------------------------------|
| `deleteID(userID)` | 删除指定ID的用户账户。                 | 需检查账户余额是否为零。                 |
| `changeID(userID)` | 修改指定ID的用户账号。                 | 要求用户输入新账号。                     |
| `changePassword(userID)` | 修改指定ID的用户密码。               | 要求用户输入并确认新密码。               |
| `checkBalance(userID)` | 查询指定ID的账户余额。                 |                                            |
| `withDraw(userID)` | 用户指定账户取款。                     | 要求用户输入取款金额。                   |
| `deposite(userID)` | 用户指定账户存款。                     | 要求用户输入存款金额。                   |
| `cardin()`        | 账号登录功能。                         | 用户输入账号和密码进行登录。             |
| `newUser()`       | 创建新的校园卡账号。                   | 用户输入账号和密码。                     |
| `maintain(userID = "0")` | 管理已有校园卡账号。             | 提供查询余额、取款、存款、修改密码、修改账号和删除账户等选项。 |
| `checkAdmin()`    | 验证管理员账户。                       |                                            |
| `genshi()`        | 管理员模式，提供高级功能。             |                                            |

### 数据存储
所有用户数据存储在本地的 "users.xlsx" Excel文件中。

下面详细介绍各个函数

#### 函数功能描述

| 函数名 | 目的 | 参数 | 功能 | 依赖/返回 |
| ------- | ---- | ---- | ---- | ---------- |
| `deleteID(userID)` | 删除由 `userID` 标识的用户账户。 | `userID` - 要删除的用户账户的唯一标识符。 | 遍历DataFrame `df`，检查并可能删除账户。 | pandas库进行DataFrame操作。 |
| `changeID(userID)` | 修改特定用户账户的ID。 | `userID` - 需要修改ID的用户账户的唯一标识符。 | 允许用户更新账号ID到DataFrame `df` 中。 | 无。打印消息到控制台。 |
| `changePassword(userID)` | 允许用户为特定账户更改密码。 | `userID` - 需要更改密码的用户账户的唯一标识符。 | 用户输入并确认新密码，更新到DataFrame `df` 中。 | 无。打印消息到控制台。 |
| `checkBalance(userID)` | 查询指定用户账户的余额。 | `userID` - 需要查询余额的用户账户的唯一标识符。 | 查找并打印关联账户的余额。 | 无。打印消息到控制台。 |
| `withDraw(userID)` | 允许用户从指定账户中取款。 | `userID` - 需要进行取款操作的用户账户的唯一标识符。 | 扣除取款金额并更新DataFrame `df` 及 "users.xlsx" 文件。 | 无。打印消息到控制台。 |
| `deposite(userID)` | 允许用户向指定账户存款。 | `userID` - 需要进行存款操作的用户账户的唯一标识符。 | 添加金额到账户余额，并更新相关文件。 | 无。打印消息到控制台。 |
| `cardin()` | 登录功能，进行账号密码校验。 | 无。 | 用户输入学号和密码进行登录。 | 成功返回账号ID，失败返回"0"。 |
| `newUser()` | 创建新的校园卡账号。 | 无。 | 用户输入学号和密码，添加新记录到DataFrame `df`。 | 创建成功返回True，否则返回False。 |
| `maintain(userID = "0")` | 对已有校园卡账号进行管理。 | `userID` - 默认为"0"，表示未登录状态。 | 登录后，根据用户输入执行相应操作。 | 无。打印消息到控制台。 |
| `checkAdmin()` | 验证管理员账户。 | 无。 | 用户输入管理员密码进行验证。 | 密码正确返回True，否则返回False。 |
| `genshi()` | 管理员模式，提供高级功能。 | 无。 | 管理员验证通过后，执行相应操作。 | 无。打印消息到控制台。 |

### 主循环：

主循环提供新建账户、登录账户、管理员功能入口等选项。用户通过输入对应的数字选择操作。管理员功能需要特殊的输入（"114514"）来访问。

## （2）主要方法
在主程序部分，首先读取已存在的用户数据（存储在"users.xlsx"文件中），然后通过循环让用户选择要执行的操作。用户可以选择新建账户、登录账户、关机等操作。如果用户选择进入管理员模式，将调用genshi()函数显示管理员菜单，并根据用户的输入执行相应的操作。最后，将更新后的用户数据保存到"users.xlsx"文件中，并打印关机提示信息。

### 二 依赖和前提条件：
> 1. excel（“users.xlsx”,sheet_name=’Sheet1’,index=False）
> 2. pandas
> 3. python

### 三 注意事项和限制：
数据存储：这段代码使用Excel文件来存储用户账户信息，包括学号、密码和余额。在使用此代码之前，请确保已经创建了一个名为"users.xlsx"的Excel文件，并且该文件中包含以下列名：id、password、wallet。

输入验证：在实际应用中，为了提高安全性和用户体验，建议对用户输入进行验证。例如，检查输入的学号是否已存在，密码是否符合要求等。

错误处理：在实际应用中，应该添加适当的错误处理机制，以便在出现异常情况时能够给出友好的错误提示。例如，当用户输入的学号不存在或密码错误时，应该给出相应的提示信息。

权限控制：在实际应用中，应该根据用户的角色（如管理员、普通用户等）来限制其操作权限。例如，只有管理员才能执行删除账户的操作。

安全性：在实际应用中，应该采取一些安全措施来保护用户的账户信息，例如加密存储密码、限制登录尝试次数等。

界面友好性：虽然这段代码主要是通过命令行界面与用户交互，但可以考虑将其封装成一个图形界面程序，以提高用户体验。

### 四 测试和使用指南：
#### 使用手册：
##### 1 注册新账户：
根据提示，输入“1“弹出注册界面。再输入学号，接着设定密码，再确认密码。完成账户注册。

##### 2 登录账号：
根据提示，输入“2“进入登录界面。根据提示输入学号和密码，完成登录。

##### 3 查询余额：
在登录状态下，输入“3“查询余额。

##### 4 取款：
在登录状态下，输入“4“进入取款界面。输入取款数，完成取款。（模拟）

##### 5 存款：
在登录状态下，输入“5“接入存款界面。输入存款数，完成存款。（模拟）

##### 6 退卡（登出）：
在登录状态下，输入“6“退卡。

##### 7 修改密码
在登录状态下，输入“8“进入修改密码界面。输入两遍新密码，完成修改密码。（注：不是找回密码）

##### 8 修改学号
在登录状态下，输入“9“进入修改学号界面。输入新账号，完成修改账号。

##### 9 删除账户：
   在登录状态下，输入“0“完成删除账户。（账户余额为零方可完成）

##### 10 管理员模式；
   在未登录状态下，输入“114514“进入管理员模式：

      在管理员模式中输入“1“可新建账户

                        “2“可登录任意账户（只需输入账户）

                        “3“可显示所有账号密码

                        “4“可推出管理员模式

##### 11 关机（管理员操作）
    输入“7“，进入管理员身份验证，输入管理员密码，完成关机。

## 部分源代码：

```python
# -*- coding: utf-8 -*-
#author :32301227, time：2024年1月1日11:12:06 version:1.0.0
 
import pandas as pd
def deleteID(userID):
    #删除账户
    print("--------------------------")
    for i in df.index :
        if df.at[i,"id"] == userID :
            if df.at[i,"wallet"] != 0 :
                print("余额尚不为 0 ，请先取款， 删除账户失败")
                print("--------------------------")
                return
            else :
                df.drop(index = i, inplace=True)
                print("您的账户",userID,"已删除")
                print("--------------------------")
                return
 
def changeID(userID):
    #修改账户ID
    print("--------------------------")
    newID = str(input("请输入新的账号: "))
    if newID in df['id'].values:
        print("该账号已存在，请输入一个新的账号")
        return
    for i in df.index :
        if df.at[i,"id"] == userID:
            df.loc[i,"id"] = newID
            
            print("修改账号成功")
            print("--------------------------")
            break
    return
def changePassword(userID):
    #修改密码
    print("--------------------------")
    if userID not in df['id'].values:
        print("该账号不存在")
        return
    newPassword = str(input("请输入新的密码: "))
    checkPassword = str(input("请再次输入密码： "))
    if newPassword == checkPassword :
        for i in df.index :
            if df.at[i,"id"] == userID:
                df.loc[i,"password"] = newPassword
                
                print("修改密码成功")
                print("--------------------------")
                return
    else :
        print("两次密码不一致，修改密码失败")
        print("--------------------------")
        return
 
def checkBalance(userID):
    #实现余额查询功能
    print("--------------------------")
    for i in df.index :
        if str(df.at[i,"id"]) == userID :
            print("您的余额是 : " , df.at[i,"wallet"] , " 元")
            print("--------------------------")
            break
    return
def withDraw(userID):
    #取款
    print("--------------------------")
    userInput = int(input("请输入取款金额： "))  
    for i in df.index :
        if df.at[i,"id"] == userID:
            if float(df.at[i,"wallet"]) < float(userInput):
                print("余额不足，取款失败")
                print("--------------------------")
                return
            df.at[i,"wallet"] -= userInput  # Subtract the withdrawal amount from the current balance
            print("取款成功，您的余额是 : ", df.at[i,"wallet"], " 元")
            print("--------------------------")
            return
def deposite(userID):
    #存款
    print("--------------------------")
    userInput = int(input("请存入： "))
    for i in df.index :
        if df.at[i,"id"] == userID:
            df.at[i,"wallet"] += userInput  # Add the deposit amount to the current balance
            print("您已成功存入" , userInput , " 元 ， 当前账户余额"   , df.at[i,"wallet"] ," 元" )
            print("--------------------------")
            return
    print("账号不存在，存款失败")
    print("--------------------------")
    return
def cardin():
    #登录，账号密码校验
    #成功则为账号，失败则为"0"
    print("--------------------------")
    userID = str(input("请输入你的学号： "))
    if userID not in df['id'].values:
        print("错误的账号或密码")
        print("--------------------------")
        return "0"
    userPassword = str(input("请输入你的密码： "))
    for i in df.index:
        if str(df.at[i,"id"]) == str(userID) and userPassword == df.at[i,"password"]:
            print("成功登录")
            print("--------------------------")
            return userID
    print("错误的账号或密码")
    print("--------------------------")
    return "0"
 
def newUser():
    #新建校园网账号
    print("--------------------------")
    newID = str(input("请输入你的学号： "))
    if newID in df['id'].values:
        print("该学号已存在，请输入一个新的学号")
        return
    newPassword = str(input("请设置一个密码： "))
    checkPassword = str(input("请再次输入密码： "))
    if newPassword == checkPassword:
        df.loc[df.shape[0]] = [newID, newPassword, 0]  # Add a new row to the DataFrame
        print("新账号创建成功")
        print("--------------------------")
        return
    else:
        print("两次密码不一致，新账号创建失败")
        print("--------------------------")
        return
```

```python
def checkAdmin():
    #验证管理员账户
    print("--------------------------")
    adminPassword = "123456"
    userInput = str(input("请输入管理员密码： "))
    if userInput == adminPassword :
        return True
    print("管理员密码错误")
    print("--------------------------")
    return False
```

```python
df = pd.read_excel("users.xlsx") #读取excel
flag = True
while(flag == True):
    try :   
        while(True):
            print("--------------------------")
            print("[1] 新建账户")
            print("[2] 登录账户")
            print("[7] 关机（仅管理员）")
            print("--------------------------")
            userInput = input("请输入操作对应的数字： ")
            if userInput == "1":
                newUser()
            elif userInput == "2":
                userID = cardin()  # Call the cardin function to log the user in and get the userID
                if userID != "0":  # If the login was successful, call the maintain function with the userID
                    maintain(userID)
            elif userInput == "7":
                res = checkAdmin()
                if res == True :
                    break
                else :
                    continue
            elif userInput == "114514":
                genshi()
            else:
                print("错误的输入，请重试")
                print("--------------------------")
                continue  
        #end
        df.to_excel("users.xlsx", sheet_name='Sheet1', index=False) #保存到excel
        print("--------------------------")
        print("关机，程序结束")
        flag = False
    except :
        print("--------------------------")
        print("sorry i know there are some bugs , so try again pls");
"""
功能对照
1 新建账户
2 登录账户
3 查询余额
4 取款
5 存款
6 退卡
7 关机（管理员）
8 修改密码
9 修改学号
0 删除账户
114514 管理员模式
"""
```