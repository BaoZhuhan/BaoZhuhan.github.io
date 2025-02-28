---
title: HOW TO AUTOMATE "chaoxing.com"
description: re for WWL :)
slug: 2024100101en
date: 2024-10-01 00:00:00
image: automate.png
categories: 
    - 闲谈
tags: 
    - 攻略
comments: true
license: MIT
---

*Working: This article is not yet finished*<br>
*The methods introduced in this article are for reference only. Please ensure you read and fully agree to the **Important Declaration**[^1][^2]*

## Overview

This article aims to introduce a methodology that allows students to build an automated tool for completing courses on Chaoxing. This tool can efficiently automate the completion of large online courses.

**Table of Contents**
1. Configure a Chromium-based Browser
2. Configure the Tampermonkey Extension
3. Install the Chaoxing Learning Assistant [One-Click Start] [Minimize Running] Extension
4. How to Complete Courses
5. [Advanced] Configure a Local Server
6. [Advanced] Configure the Question Bank

## Configure a Chromium-Based Browser

To successfully use the automated Chaoxing tool, you first need to install a Chromium-based browser on your computer. This is because many automation scripts and extensions rely on the compatibility and functionality provided by Chromium. Below are several commonly used Chromium-based browsers, and you can choose according to your needs:

![edge](1.png)

1. [Microsoft Edge](https://www.microsoft.com/zh-cn/edge) is the pre-installed browser on Windows systems. **This article will demonstrate based on Edge.**

2. [Google Chrome](https://www.google.com/intl/zh-CN/chrome/) is one of the most widely used browsers globally, known for its fast loading speed and rich extension ecosystem.

3. [Opera](https://www.opera.com/zh-cn) is a feature-rich browser with built-in VPN and ad blocker, enhancing user privacy and browsing experience.

If you are not familiar with how to install a browser or have questions about choosing between different browsers, you can refer to Microsoft's official article on [Switching to Microsoft Edge for a Better Browsing Experience](https://support.microsoft.com/zh-cn/microsoft-edge/%E5%88%87%E6%8D%A2%E5%88%B0-microsoft-edge-%E4%BB%A5%E8%8E%B7%E5%8F%96%E6%9B%B4%E5%A5%BD%E7%9A%84%E6%B5%8F%E8%A7%88%E4%BD%93%E9%AA%8C-160fa918-d581-4932-9e4e-1075c4713595#:~:text=%E6%9C%89%E5%85%B3%E5%A6%82%E4%BD%95%E4%B8%8B%E8%BD%BD%E5%92%8C%E5%AE%89%E8%A3%85%20Microsoft%20Edge%20%E7%9A%84%E6%AD%A5%E9%AA%A4%201%20%E8%BD%AC%E5%88%B0%20Microsoft%20Edge,%E4%B8%8B%E8%BD%BD%20%E2%80%9D%E6%8C%89%E9%92%88%E5%B9%B6%E5%90%8C%E6%84%8F%E6%9D%A1%E6%AC%BE%20%26%20%E6%9D%A1%E4%BB%B6%E3%80%82%205%20%E8%BF%90%E8%A1%8C%E5%AE%89%E8%A3%85%E7%A8%8B%E5%BA%8F%20-%20%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B0%86%E5%9C%A8%E4%B8%8B%E8%BD%BD%E5%90%8E%E5%BC%80%E5%A7%8B%E4%B8%8B%E8%BD%BD%E5%B9%B6%E5%AE%89%E8%A3%85%E3%80%82) for learning how to download Microsoft Edge.

## Configure the Tampermonkey Extension

Tampermonkey is a popular browser extension that allows users to run custom JavaScript scripts on web pages to automate tasks and customize functionalities. Below, I will introduce three methods to obtain the Tampermonkey extension in the Microsoft Edge browser:

### Method 1: Get it from the Edge Official Extension Store

1. Open the Edge browser.
2. Enter ``edge://extensions/`` in the address bar to open the Edge extension management page.
3. At the bottom left of the page, enable “Developer mode” and click the link to “Get extensions.”<br>
![edge://extensions](2.png)
4. Search for "Tampermonkey" in the [Edge Extension Store](https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions-Home?hl=zh-CN).<br>
![edge extensions store](3.png)
5. Find the [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/iikmkjmpaadaobahmlepeloendndfphd?hl=zh-CN) extension and click the “Get” button.
6. Confirm the installation. Once the installation is complete, the Tampermonkey icon will appear in the browser toolbar.
![edge extensions icons](4.png)

### Method 2: Get it from the Minimalist Extensions Website

The Minimalist Extensions website serves as a proxy for the Chrome browser extension store and can be accessed without a VPN.

1. Open the Edge browser.
2. Visit [Minimalist Extensions](https://chrome.zzzmh.cn/).
3. Search for the [Tampermonkey](https://chrome.zzzmh.cn/info/dhdgffkkebhmkfjojejmpbldmpobfkfo) extension.
4. Click the “Recommended Download” or “Alternative Download” button to obtain an installation package containing the extension, then unzip to get the extension files.<br>
![jijian-extension](5.png)
5. Enter ``edge://extensions/`` in the address bar to open the Edge extension management page and enable “Developer mode” on the left side.
![edge://extensions/](3.png)
6. Drag the Tampermonkey extension from the file explorer into the Edge extension management page.
7. Confirm the installation. Once the installation is complete, the Tampermonkey icon will appear in the browser toolbar.
![edge extensions icons](4.png)

### Method 3: Get it from the Google Chrome Extension Store

This method requires a connection to an overseas network; readers need to configure it themselves.

1. Open the Edge browser.
2. Visit the [Google Chrome Extension Store](https://chrome.google.com/webstore).
3. Enter "Tampermonkey" in the search box and press Enter.
4. Find the Tampermonkey extension and click the “Add to Chrome” button.
5. The browser will prompt you to confirm the installation; click “Add Extension.”
6. Once the installation is complete, the Tampermonkey icon will appear in the browser toolbar.

## Install the Chaoxing Learning Assistant [One-Click Start] [Minimize Running] Extension
*The Chaoxing Learning Assistant [One-Click Start] [Minimize Running] extension is only a **demonstration extension**; readers can also choose better extensions and share them in the comments section.*

The Chaoxing Learning Assistant is a JavaScript script used for automating course completion and runs based on the Tampermonkey extension. Below are the steps to install this extension:

### Get the Script from GreasyFork

1. Click the Tampermonkey icon.
2. Click on “Get New Script” to enter the [Tampermonkey Script Yellow Pages](https://www.tampermonkey.net/scripts.php).
![get new](6.png)
3. Click the GreasyFork link to enter the [GreasyFork Official Website](https://greasyfork.org/zh-CN).
![greasyfork](7.png)
4. Search for "Chaoxing Learning Assistant" to find this [script](https://greasyfork.org/zh-CN/scripts/469522-%E8%B6%85%E6%98%9F%E5%AD%A6%E4%B9%A0%E9%80%9A%E4%B9%9D%E4%B9%9D%E5%8A%A9%E6%89%8B-%E4%B8%80%E9%94%AE%E5%90%AF%E5%8A%A8-%E6%9C%80%E5%B0%8F%E5%8C%96%E8%BF%90%E8%A1%8C) page and click “Install.”
![chaoxing99](8.png)
5. In the pop-up Tampermonkey page, click “Install.”

## How to Complete Courses

1. Open [Chaoxing Learning](https://v8.chaoxing.com/).
2. Log in to your account and open the course you want to complete.
3. Click the pop-up course completion window.
![tanchuang](

9.png)
4. The script will start running and complete the course automatically.

## [Advanced] Configure the Question Bank

*To enable the question bank feature, users need to provide questions and answers on the Chaoxing Learning platform. However, this section is not yet complete and will be updated later.*

1. Get a question bank (this section is not yet complete).
2. Test the question bank by running the relevant script.

## Important Declaration

*The methods introduced in this article are for reference only. If you decide to use them, please understand the following points:*

1. **Safety Issues**: Running automation scripts on Chaoxing may lead to account suspension or bans. Please ensure you understand the potential risks before proceeding.
2. **Legal Issues**: Automating course completion may violate the terms of service of Chaoxing or the educational institution. Be sure to verify whether the methods mentioned in this article align with your local laws and regulations before using them.
3. **Educational Ethics**: Education is a means to acquire knowledge and skills. Using automation tools to bypass the learning process is not recommended. We advocate for integrity in learning and encourage students to engage genuinely with their education.

[^1]: For more details, see the **Important Declaration** above.
[^2]: This article is still under development, and the information may be updated at any time. 
